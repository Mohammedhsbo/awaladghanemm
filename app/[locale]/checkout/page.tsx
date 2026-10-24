"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient, ApiError } from "@/lib/api-client";
import { getStoreSettings } from "@/lib/financing-api";
import { CheckCircle, Copy, CreditCard, Truck, Phone, AlertCircle, ChevronRight, Loader2, ShieldCheck } from "lucide-react";

interface CartItem {
  id: string;
  vin: string;
  model: string;
  year: number;
  price: number;
  brand: { nameEn: string; nameAr: string };
  image?: string;
}

type PaymentMethod = "instapay" | "cash" | "";
type OrderType = "purchase" | "installment";
type DeliveryAddress = {
  governorate: string;
  city: string;
  street: string;
  buildingNumber: string;
  floor: string;
  apartment: string;
  instructions: string;
};

const MAX_PAYMENT_PROOF_SIZE = 5 * 1024 * 1024;
const SUPPORTED_PAYMENT_PROOF_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function CheckoutPage() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  const orderType: OrderType = (searchParams.get("type") as OrderType) ?? "purchase";

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [storeSettings, setStoreSettings] = useState<{ contactPhone?: string | null; instagramUrl?: string | null; instaPayAccount?: string | null } | null>(null);
  const [customer, setCustomer] = useState<{ id: string; name: string; phone: string; email?: string } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadingProof, setIsUploadingProof] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<"review" | "payment" | "confirmed">("review");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Name & phone for guest/quick checkout
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    governorate: "",
    city: "",
    street: "",
    buildingNumber: "",
    floor: "",
    apartment: "",
    instructions: "",
  });
  const [senderIdentifier, setSenderIdentifier] = useState("");
  const [senderName, setSenderName] = useState("");
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const uploadedProof = useRef<{ file: File; paymentProofId: string } | null>(null);
  const submissionInProgress = useRef(false);

  useEffect(() => {
    if (authLoading) return;
    loadData();
  }, [authLoading, isAuthenticated, user]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [settings] = await Promise.all([
        getStoreSettings().catch(() => null),
      ]);
      setStoreSettings(settings);

      const cartData = localStorage.getItem("cart");
      if (cartData) setCartItems(JSON.parse(cartData));

      if (isAuthenticated && user?.id) {
        try {
          const cust = await apiClient.get<{
            id: string;
            name: string;
            phone: string;
            email?: string;
            addresses?: Array<{ addressLine: string; city?: string | null; region?: string | null; notes?: string | null; isDefault: boolean }>;
          }>(`/customers/${user.id}`);
          setCustomer(cust);
          setContactName(cust.name);
          setContactPhone(cust.phone);
          const defaultAddress = cust.addresses?.find((address) => address.isDefault);
          if (defaultAddress) {
            setDeliveryAddress((current) => ({
              ...current,
              governorate: defaultAddress.region ?? "",
              city: defaultAddress.city ?? "",
              street: defaultAddress.addressLine,
              instructions: defaultAddress.notes ?? "",
            }));
          }
        } catch {
          setCustomer(null);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmOrder = () => {
    if (submissionInProgress.current) return;
    if (!paymentMethod) {
      setError(isAr ? "يرجى اختيار طريقة الدفع." : "Select a payment method.");
      return;
    }
    if (!contactName.trim() || !contactPhone.trim()) {
      setError(isAr ? "يرجى إدخال اسم المستلم ورقم هاتفه." : "Enter the recipient name and phone number.");
      setStep("review");
      return;
    }
    if (!deliveryAddress.governorate.trim() || !deliveryAddress.city.trim() || !deliveryAddress.street.trim()) {
      setError(isAr ? "يرجى استكمال المحافظة والمدينة والشارع." : "Complete the governorate, city, and street.");
      setStep("review");
      return;
    }
    if (paymentMethod === "instapay") {
      if (!storeSettings?.instaPayAccount?.trim()) {
        setError(isAr ? "الدفع عبر InstaPay غير متاح حالياً. يرجى اختيار الدفع عند الاستلام." : "InstaPay is not configured. Please choose cash on delivery.");
        return;
      }
      if (!paymentProof) {
        setError(isAr ? "يرجى إرفاق صورة إثبات التحويل." : "Attach the transfer proof image.");
        return;
      }
      if (!SUPPORTED_PAYMENT_PROOF_TYPES.includes(paymentProof.type) || paymentProof.size > MAX_PAYMENT_PROOF_SIZE) {
        setError(isAr ? "يجب أن تكون الصورة بصيغة JPEG أو PNG أو WebP وألا يتجاوز حجمها 5 ميجابايت." : "Use a JPEG, PNG, or WebP image no larger than 5 MB.");
        return;
      }
      if (!senderIdentifier.trim()) {
        setError(isAr ? "يرجى إدخال رقم الحساب أو المحفظة المحوّل منها." : "Enter the sender account or wallet identifier.");
        return;
      }
    }

    submissionInProgress.current = true;
    startTransition(async () => {
      setError(null);
      try {
        let paymentProofId: string | undefined;
        if (paymentMethod === "instapay" && paymentProof) {
          if (uploadedProof.current?.file === paymentProof) {
            paymentProofId = uploadedProof.current.paymentProofId;
          } else {
            setIsUploadingProof(true);
            const form = new FormData();
            form.append("file", paymentProof);
            const upload = await apiClient.postForm<{ paymentProofId: string }>("/upload/order-payment-proof", form);
            paymentProofId = upload.paymentProofId;
            uploadedProof.current = { file: paymentProof, paymentProofId };
          }
        }

        let order: { id: string };
        order = await apiClient.post<{ id: string }>("/orders", {
          customerId: customer!.id,
          motorcycleIds: cartItems.map(i => i.id),
          discount: 0,
          isDraft: false,
          paymentMethod,
          orderType,
          deliveryAddress: {
            recipientName: contactName.trim(),
            recipientPhone: contactPhone.trim(),
            governorate: deliveryAddress.governorate.trim(),
            city: deliveryAddress.city.trim(),
            street: deliveryAddress.street.trim(),
            buildingNumber: deliveryAddress.buildingNumber.trim(),
            floor: deliveryAddress.floor.trim(),
            apartment: deliveryAddress.apartment.trim(),
            instructions: deliveryAddress.instructions.trim(),
          },
          ...(paymentMethod === "instapay" ? {
            paymentProofId,
            senderIdentifier: senderIdentifier.trim(),
            ...(senderName.trim() ? { senderName: senderName.trim() } : {}),
          } : {}),
        });
        localStorage.removeItem("cart");
        uploadedProof.current = null;
        setOrderId(order.id);
        setStep("confirmed");
      } catch (err) {
        setError(isAr ? "تعذر إتمام الطلب. تحقق من البيانات وحاول مرة أخرى." : (err instanceof ApiError ? err.message : "Error confirming order"));
      } finally {
        setIsUploadingProof(false);
        submissionInProgress.current = false;
      }
    });
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-zinc-500">
          <Loader2 size={32} className="animate-spin text-blue-600" />
          <p className="text-sm font-medium">{isAr ? "جاري التحميل..." : "Loading..."}</p>
        </div>
      </div>
    );
  }

  // Guard: guests cannot access checkout
  if (!isAuthenticated) {
    if (typeof window !== "undefined") {
      window.location.replace(`/${locale}/login?redirect=${encodeURIComponent(`/${locale}/checkout?type=${orderType}`)}`);
    }
    return (
      <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-zinc-500">
          <Loader2 size={32} className="animate-spin text-blue-600" />
          <p className="text-sm font-medium">{isAr ? "جاري التحويل..." : "Redirecting..."}</p>
        </div>
      </div>
    );
  }

  if (step === "confirmed") {
    return (
      <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center p-4" dir={isAr ? "rtl" : "ltr"}>
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h1 className="text-2xl font-black text-zinc-900 mb-2">{isAr ? "تم تأكيد طلبك!" : "Order Confirmed!"}</h1>
          <p className="text-zinc-500 text-sm mb-1">{isAr ? "رقم الطلب" : "Order ID"}</p>
          <p className="font-mono text-sm font-bold text-zinc-800 bg-zinc-100 rounded-lg px-4 py-2 mb-6 inline-block">{orderId}</p>

          {paymentMethod === "instapay" && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 mb-6 text-start">
              <p className="text-sm font-bold text-amber-800 mb-1">{isAr ? "📲 في انتظار تأكيد الدفع" : "📲 Awaiting Payment Confirmation"}</p>
              <p className="text-xs text-amber-700">{isAr ? "سيتواصل معك فريقنا بعد التحقق من الحوالة." : "Our team will contact you after verifying the transfer."}</p>
            </div>
          )}
          {paymentMethod === "cash" && (
            <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 mb-6 text-start">
              <p className="text-sm font-bold text-blue-800 mb-1">{isAr ? "🚚 الدفع عند الاستلام" : "🚚 Cash on Delivery"}</p>
              <p className="text-xs text-blue-700">{isAr ? "سنتواصل معك لتحديد موعد التسليم." : "We'll contact you to schedule delivery."}</p>
            </div>
          )}

          <button
            onClick={() => router.push("/motorcycles")}
            className="w-full rounded-full bg-blue-600 py-3 text-sm font-black text-white hover:bg-blue-700 transition"
          >
            {isAr ? "العودة إلى المتجر" : "Back to Store"}
          </button>
        </div>
      </div>
    );
  }

  const instaPayNumber = storeSettings?.instaPayAccount?.trim() ?? "";

  return (
    <div className="min-h-screen bg-[#f7f7f7]" dir={isAr ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 sticky top-0 z-30">
        <div className="section-shell py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="text-zinc-500 hover:text-zinc-900 transition">
              <ChevronRight size={20} className={isAr ? "" : "rotate-180"} />
            </button>
            <div>
              <h1 className="text-lg font-black text-zinc-900">
                {orderType === "installment" ? (isAr ? "طلب تقسيط" : "Installment Request") : (isAr ? "إتمام الشراء" : "Checkout")}
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${step === "review" ? "bg-blue-100 text-blue-700" : "text-zinc-400"}`}>{isAr ? "١. المراجعة" : "1. Review"}</span>
                <span className="text-zinc-300">›</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${step === "payment" ? "bg-blue-100 text-blue-700" : "text-zinc-400"}`}>{isAr ? "٢. الدفع" : "2. Payment"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-shell py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* LEFT — Main content */}
          <div className="lg:col-span-2 space-y-4">

            {/* STEP 1: Review */}
            {step === "review" && (
              <>
                {/* Order items */}
                <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
                  <h2 className="text-base font-black text-zinc-900 mb-4">{isAr ? "الموتوسيكل المطلوب" : "Motorcycle(s)"}</h2>
                  {cartItems.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-zinc-400 text-sm">{isAr ? "السلة فارغة" : "Cart is empty"}</p>
                      <button onClick={() => router.push("/motorcycles")} className="mt-3 text-blue-600 text-sm font-bold hover:underline">
                        {isAr ? "تصفح الموتوسيكلات" : "Browse Motorcycles"}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
                          {item.image && (
                            <img src={item.image} alt={item.model} className="w-16 h-16 object-contain rounded-lg bg-white shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-black text-zinc-900 text-sm">{isAr ? item.brand.nameAr : item.brand.nameEn} {item.model}</p>
                            <p className="text-xs text-zinc-500 mt-0.5">{item.year}</p>
                          </div>
                          <div className="text-end">
                            <p className="font-black text-zinc-900 text-sm">{item.price.toLocaleString("ar-EG")}</p>
                            <p className="text-xs text-zinc-400">{isAr ? "ج.م" : "EGP"}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
                  <h2 className="text-base font-black text-zinc-900 mb-4">{isAr ? "بياناتك" : "Your Details"}</h2>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 mb-1">{isAr ? "الاسم الكامل" : "Full Name"}</label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-blue-400 transition"
                        placeholder={isAr ? "أدخل اسمك الكامل" : "Enter your full name"}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 mb-1">{isAr ? "رقم الهاتف" : "Phone Number"}</label>
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-blue-400 transition"
                        placeholder="01xxxxxxxxx"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-zinc-800 pt-2">{isAr ? "عنوان التسليم" : "Delivery Address"}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {([
                        ["governorate", isAr ? "المحافظة" : "Governorate", true],
                        ["city", isAr ? "المدينة أو المنطقة" : "City / area", true],
                        ["street", isAr ? "الشارع" : "Street", true],
                        ["buildingNumber", isAr ? "رقم المبنى" : "Building number", false],
                        ["floor", isAr ? "الدور" : "Floor", false],
                        ["apartment", isAr ? "الشقة" : "Apartment", false],
                      ] as const).map(([field, label, required]) => (
                        <div key={field}>
                          <label htmlFor={`delivery-${field}`} className="block text-xs font-bold text-zinc-500 mb-1">{label}</label>
                          <input
                            id={`delivery-${field}`}
                            type="text"
                            value={deliveryAddress[field]}
                            onChange={(event) => setDeliveryAddress((current) => ({ ...current, [field]: event.target.value }))}
                            required={required}
                            maxLength={field === "street" ? 200 : 100}
                            className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-blue-400 transition"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label htmlFor="delivery-instructions" className="block text-xs font-bold text-zinc-500 mb-1">{isAr ? "تعليمات إضافية للتوصيل" : "Additional delivery instructions"}</label>
                      <textarea
                        id="delivery-instructions"
                        value={deliveryAddress.instructions}
                        onChange={(event) => setDeliveryAddress((current) => ({ ...current, instructions: event.target.value }))}
                        maxLength={1000}
                        rows={3}
                        className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-blue-400 transition"
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}

                <button
                  disabled={cartItems.length === 0 || !contactName.trim() || !contactPhone.trim() || !deliveryAddress.governorate.trim() || !deliveryAddress.city.trim() || !deliveryAddress.street.trim()}
                  onClick={() => setStep("payment")}
                  className="w-full rounded-full bg-blue-600 py-4 text-sm font-black text-white hover:bg-blue-700 disabled:opacity-50 transition shadow-md"
                >
                  {isAr ? "التالي — اختر طريقة الدفع" : "Next — Choose Payment"}
                </button>
              </>
            )}

            {/* STEP 2: Payment */}
            {step === "payment" && (
              <>
                {/* Payment method selection */}
                <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
                  <h2 className="text-base font-black text-zinc-900 mb-4">{isAr ? "طريقة الدفع" : "Payment Method"}</h2>
                  <div className="space-y-3">
                    
                    {/* Cash on Delivery */}
                    <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${paymentMethod === "cash" ? "border-blue-600 bg-blue-50" : "border-zinc-200 hover:border-zinc-300"}`}>
                      <input type="radio" name="payment" value="cash" checked={paymentMethod === "cash"} onChange={() => { setPaymentMethod("cash"); setError(null); }} disabled={isPending || isUploadingProof} className="mt-1 accent-blue-600" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Truck size={18} className="text-blue-600" />
                          <span className="font-black text-zinc-900 text-sm">{isAr ? "الدفع عند الاستلام" : "Cash on Delivery"}</span>
                        </div>
                        <p className="text-xs text-zinc-500">{isAr ? "ادفع نقداً عند استلام الموتوسيكل" : "Pay in cash when you receive your motorcycle"}</p>
                      </div>
                    </label>

                    {/* InstaPay */}
                    <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${paymentMethod === "instapay" ? "border-blue-600 bg-blue-50" : "border-zinc-200 hover:border-zinc-300"}`}>
                      <input type="radio" name="payment" value="instapay" checked={paymentMethod === "instapay"} onChange={() => { setPaymentMethod("instapay"); setError(null); }} disabled={isPending || isUploadingProof} className="mt-1 accent-blue-600" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CreditCard size={18} className="text-blue-600" />
                          <span className="font-black text-zinc-900 text-sm">{isAr ? "التحويل عبر InstaPay" : "Transfer via InstaPay"}</span>
                        </div>
                        <p className="text-xs text-zinc-500">{isAr ? "حوّل إجمالي الطلب إلى معرّف InstaPay ثم أرفق صورة الإيصال." : "Transfer the order total to the InstaPay identifier and attach the receipt."}</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* InstaPay Instructions */}
                {paymentMethod === "instapay" && (
                  <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
                    <h2 className="text-base font-black text-zinc-900 mb-4">{isAr ? "تعليمات التحويل عبر InstaPay" : "InstaPay Transfer Instructions"}</h2>
                    <ol className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">١</span>
                        <p className="text-sm text-zinc-700 pt-1">{isAr ? "افتح تطبيق إنستاباي على هاتفك" : "Open InstaPay app on your phone"}</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">٢</span>
                        <div className="pt-1">
                          <p className="text-sm text-zinc-700">
                            {isAr
                              ? `حوّل إجمالي الطلب ${totalAmount.toLocaleString("ar-EG")} ج.م إلى معرّف InstaPay التالي:`
                              : `Transfer the order total of ${totalAmount.toLocaleString("en-EG")} EGP to this InstaPay identifier:`}
                          </p>
                          {instaPayNumber ? (
                            <div className="mt-2 flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2">
                              <span className="font-mono font-black text-zinc-900 text-sm flex-1" dir="auto">{instaPayNumber}</span>
                              <button
                                type="button"
                                onClick={() => handleCopy(instaPayNumber)}
                                className="text-blue-600 hover:text-blue-800 transition shrink-0"
                                title={isAr ? "نسخ المعرّف" : "Copy identifier"}
                              >
                                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                              </button>
                            </div>
                          ) : (
                            <p role="alert" className="mt-2 text-sm text-red-700">
                              {isAr ? "معرّف InstaPay غير متاح حالياً. يرجى اختيار الدفع عند الاستلام." : "The InstaPay identifier is unavailable. Please choose cash on delivery."}
                            </p>
                          )}
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">٣</span>
                        <p className="text-sm text-zinc-700 pt-1">{isAr ? "بعد التحويل أرفق صورة الإثبات وأدخل بيانات الحساب المحوّل منه؛ ستتم مراجعة التحويل قبل تأكيد استلامه." : "After transferring, attach the proof and provide the sender account details. The transfer will be reviewed before it is confirmed."}</p>
                      </li>
                    </ol>
                    <div className="mt-5 space-y-3">
                      <div>
                        <label htmlFor="payment-proof" className="block text-xs font-bold text-zinc-600 mb-1">{isAr ? "صورة إثبات التحويل" : "Transfer receipt image"}</label>
                        <input
                          id="payment-proof"
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          required
                          disabled={isPending || isUploadingProof}
                          onChange={(event) => {
                            const selected = event.target.files?.[0] ?? null;
                            setPaymentProof(null);
                            uploadedProof.current = null;
                            if (selected && !SUPPORTED_PAYMENT_PROOF_TYPES.includes(selected.type)) {
                              setError(isAr ? "يرجى اختيار صورة بصيغة JPEG أو PNG أو WebP." : "Choose a JPEG, PNG, or WebP image.");
                              event.target.value = "";
                            } else if (selected && selected.size > MAX_PAYMENT_PROOF_SIZE) {
                              setError(isAr ? "يجب ألا يتجاوز حجم الصورة 5 ميجابايت." : "The image must be no larger than 5 MB.");
                              event.target.value = "";
                            } else {
                              setError(null);
                              setPaymentProof(selected);
                            }
                          }}
                          className="block w-full text-sm text-zinc-700 file:me-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-bold file:text-blue-700"
                        />
                        <p className="mt-1 text-xs text-zinc-400">{isAr ? "JPEG أو PNG أو WebP، بحد أقصى 5 ميجابايت." : "JPEG, PNG, or WebP; maximum 5 MB."}</p>
                        {paymentProof && <p className="mt-1 text-xs text-zinc-600">{paymentProof.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="sender-identifier" className="block text-xs font-bold text-zinc-600 mb-1">{isAr ? "رقم الحساب أو المحفظة المحوّل منها" : "Sender InstaPay identifier or account number"}</label>
                        <input
                          id="sender-identifier"
                          type="text"
                          value={senderIdentifier}
                          onChange={(event) => setSenderIdentifier(event.target.value)}
                          maxLength={120}
                          autoComplete="off"
                          dir="auto"
                          required
                          disabled={isPending || isUploadingProof}
                          className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-blue-400 transition"
                        />
                      </div>
                      <div>
                        <label htmlFor="sender-name" className="block text-xs font-bold text-zinc-600 mb-1">{isAr ? "اسم صاحب التحويل (اختياري)" : "Transfer sender name (optional)"}</label>
                        <input
                          id="sender-name"
                          type="text"
                          value={senderName}
                          onChange={(event) => setSenderName(event.target.value)}
                          maxLength={200}
                          autoComplete="name"
                          disabled={isPending || isUploadingProof}
                          className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-blue-400 transition"
                        />
                      </div>
                    </div>
                    {storeSettings?.contactPhone && (
                      <a
                        href={`https://wa.me/${storeSettings.contactPhone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex items-center gap-2 text-sm font-bold text-green-600 hover:text-green-700 transition"
                      >
                        <Phone size={16} />
                        {isAr ? "تواصل معنا على واتساب" : "Contact us on WhatsApp"}
                      </a>
                    )}
                  </div>
                )}

                {/* Cash Instructions */}
                {paymentMethod === "cash" && (
                  <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
                    <h2 className="text-base font-black text-zinc-900 mb-3">{isAr ? "تعليمات الدفع عند الاستلام" : "Cash on Delivery Info"}</h2>
                    <ul className="space-y-2 text-sm text-zinc-700">
                      <li className="flex items-start gap-2"><span className="text-blue-600 mt-0.5">•</span> {isAr ? "سيتواصل معك فريقنا لتحديد موعد التسليم" : "Our team will contact you to schedule delivery"}</li>
                      <li className="flex items-start gap-2"><span className="text-blue-600 mt-0.5">•</span> {isAr ? "يُرجى تجهيز المبلغ كاملاً عند الاستلام" : "Please prepare the full amount at the time of delivery"}</li>
                      <li className="flex items-start gap-2"><span className="text-blue-600 mt-0.5">•</span> {isAr ? "التوصيل داخل الإسكندرية فقط" : "Delivery within Alexandria only"}</li>
                    </ul>
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("review")}
                    disabled={isPending || isUploadingProof}
                    className="flex-1 rounded-full border-2 border-zinc-300 py-3.5 text-sm font-bold text-zinc-700 hover:border-zinc-500 transition"
                  >
                    {isAr ? "رجوع" : "Back"}
                  </button>
                  <button
                    onClick={handleConfirmOrder}
                    disabled={isPending || isUploadingProof || (paymentMethod === "instapay" && !instaPayNumber)}
                    className="flex-1 rounded-full bg-blue-600 py-3.5 text-sm font-black text-white hover:bg-blue-700 disabled:opacity-60 transition shadow-md flex items-center justify-center gap-2"
                  >
                    {isPending || isUploadingProof ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
                    {isUploadingProof
                      ? (isAr ? "جاري رفع إثبات التحويل..." : "Uploading proof...")
                      : isPending
                        ? (isAr ? "جاري التأكيد..." : "Confirming...")
                        : (isAr ? "تأكيد الطلب" : "Confirm Order")}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* RIGHT — Order summary sticky */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5 sticky top-24">
              <h2 className="text-base font-black text-zinc-900 mb-4">{isAr ? "ملخص الطلب" : "Order Summary"}</h2>
              <div className="space-y-2 text-sm">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-zinc-700">
                    <span className="truncate max-w-[60%]">{isAr ? item.brand.nameAr : item.brand.nameEn} {item.model}</span>
                    <span className="font-bold">{item.price.toLocaleString("ar-EG")}</span>
                  </div>
                ))}
                {cartItems.length === 0 && <p className="text-zinc-400 text-center py-2">{isAr ? "لا توجد عناصر" : "No items"}</p>}
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-zinc-500">{isAr ? "الإجمالي" : "Total"}</span>
                  <div className="text-end">
                    <span className="text-2xl font-black text-zinc-900">{totalAmount.toLocaleString("ar-EG")}</span>
                    <span className="text-xs text-zinc-400 ms-1">{isAr ? "ج.م" : "EGP"}</span>
                  </div>
                </div>
              </div>
              {orderType === "installment" && (
                <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800 font-medium">
                  {isAr ? "⚡ طلب تقسيط — سيتم مراجعة الطلب من قِبل الفريق" : "⚡ Installment request — will be reviewed by our team"}
                </div>
              )}
              <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400">
                <ShieldCheck size={14} className="text-green-500" />
                {isAr ? "طلبك آمن ومحمي" : "Your order is secure"}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
