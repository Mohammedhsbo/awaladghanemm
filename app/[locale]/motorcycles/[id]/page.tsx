import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ProductGallery } from "@/components/ProductGallery";
import { SimilarMotorcycles, SimilarMotorcyclesSkeleton } from "@/components/SimilarMotorcycles";
import { conditionLabel, displayName, formatCurrency, fuelTypeLabel, getMotorcycle, normalizeImages } from "@/lib/catalog-api";
import { Bike, Calendar, Fuel, Gauge, MapPin, Palette, ShieldCheck, Tag } from "lucide-react";
import { BuyNowButton } from "@/components/BuyNowButton";

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, id } = await params;
  try {
    const motorcycle = await getMotorcycle(id);
    const title = `${displayName(motorcycle.brand, locale)} ${motorcycle.model} ${motorcycle.year}`;
    const description = motorcycle.descriptionEn ?? `${title} available at ${displayName(motorcycle.branch, locale)}.`;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
      },
    };
  } catch {
    return { title: "Motorcycle" };
  }
}

export default async function MotorcycleDetailsPage({ params }: PageProps) {
  const t = await getTranslations("motorcycleDetails");
  const { locale, id } = await params;
  let motorcycle;
  try {
    motorcycle = await getMotorcycle(id);
  } catch {
    notFound();
  }

  const title = `${displayName(motorcycle.brand, locale)} ${motorcycle.model}`;
  const images = normalizeImages(motorcycle.images);
  const condition = conditionLabel(motorcycle.condition, locale);
  const fuelType = fuelTypeLabel(motorcycle.fuelType, locale);
  const description = locale === "ar"
    ? motorcycle.descriptionAr || motorcycle.descriptionEn || "دراجة نارية للرحلات الطويلة"
    : motorcycle.descriptionEn || motorcycle.descriptionAr || "A long-distance motorcycle built for comfort and endurance.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${title} ${motorcycle.year}`,
    brand: displayName(motorcycle.brand, locale),
    model: motorcycle.model,
    color: motorcycle.color,
    offers: {
      "@type": "Offer",
      priceCurrency: "EGP",
      price: motorcycle.price,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative overflow-hidden bg-gradient-to-br from-[#071a35] via-[#0d3d83] to-[#061a36] py-10 text-white sm:py-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(59,130,246,0.3),transparent_42%),linear-gradient(90deg,rgba(3,12,28,0.35),transparent)]" />
        <div className="section-shell">
          <nav aria-label={locale === "ar" ? "مسار التنقل" : "Breadcrumb"} className="relative flex flex-wrap items-center gap-2 text-sm text-blue-100">
            <Link href="/" className="transition hover:text-white">{locale === "ar" ? "الرئيسية" : "Home"}</Link>
            <span aria-hidden="true">‹</span>
            <Link href="/motorcycles" className="transition hover:text-white">{t("backToInventory")}</Link>
            <span aria-hidden="true">‹</span>
            <span className="text-white/75">{motorcycle.model}</span>
          </nav>
          <div className="relative mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">{displayName(motorcycle.brand, locale)}</p>
              <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-6xl">{motorcycle.model}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-blue-100">
                <span className="inline-flex items-center gap-2"><Calendar size={17} className="text-sky-300" />{motorcycle.year}</span>
                {motorcycle.engineSize && <><span className="text-white/40">|</span><span className="inline-flex items-center gap-2"><Gauge size={17} className="text-sky-300" />{motorcycle.engineSize}</span></>}
                <span className="text-white/40">|</span>
                <span className="inline-flex items-center gap-2"><Bike size={18} className="text-sky-300" />{displayName(motorcycle.category, locale)}</span>
                <span className="rounded-full bg-sky-500 px-3 py-1 text-xs font-bold text-white">{condition}</span>
              </div>
            </div>
            <div className="w-fit rounded-2xl border border-white/60 bg-white px-6 py-4 text-slate-950 shadow-xl sm:px-7">
              <p className="text-sm font-medium text-slate-500">{t("price")}</p>
              <p className="mt-1 text-3xl font-black sm:text-4xl">{formatCurrency(motorcycle.price)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-10 pt-8 sm:pt-10">
        <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_20px_45px_rgba(15,23,42,0.06)] sm:p-5">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-emerald-600">
                <ShieldCheck size={18} className="fill-current" />
                <span className="text-sm font-bold">{t("inStock")}</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Spec icon={<ShieldCheck size={18} />} label={t("condition")} value={condition} />
                <Spec icon={<Tag size={18} />} label={t("brand")} value={displayName(motorcycle.brand, locale)} />
                <Spec icon={<Bike size={18} />} label={t("model")} value={motorcycle.model} />
                {fuelType && <Spec icon={<Fuel size={18} />} label={t("fuelType")} value={fuelType} />}
                {motorcycle.engineSize && <Spec icon={<Gauge size={18} />} label={t("engineSize")} value={motorcycle.engineSize} />}
                <Spec icon={<Calendar size={18} />} label={t("year")} value={String(motorcycle.year)} />
                <Spec icon={<Palette size={18} />} label={t("color")} value={motorcycle.color || t("notSpecified")} />
                <Spec icon={<MapPin size={18} />} label={t("branch")} value={displayName(motorcycle.branch, locale)} />
              </div>

              <div className="space-y-3 rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-500">{locale === "ar" ? "السعر" : "Price"}</span>
                  <span className="text-xl font-black text-slate-950">{formatCurrency(motorcycle.price)}</span>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <BuyNowButton
                    motorcycle={{
                      id: motorcycle.id,
                      model: motorcycle.model,
                      year: motorcycle.year,
                      price: motorcycle.price,
                      brand: {
                        nameEn: motorcycle.brand.nameEn,
                        nameAr: motorcycle.brand.nameAr,
                      },
                      image: normalizeImages(motorcycle.images)[0],
                    }}
                  />
                  <Link
                    href={`/reserve/${motorcycle.id}`}
                    className="inline-flex flex-1 items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
                  >
                    {locale === "ar" ? "احجز الموتوسيكل" : "Reserve Motorcycle"}
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-[20px] border border-slate-200 bg-slate-100 p-2 sm:p-3">
              <ProductGallery images={images} title={title} />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-14">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black">{t("overview")}</h2>
          <p className="mt-4 max-w-3xl leading-7 text-zinc-700">
            {description || t("descriptionFallback")}
          </p>
        </div>
      </section>

      <Suspense fallback={<SimilarMotorcyclesSkeleton locale={locale} />}>
        <SimilarMotorcycles motorcycle={motorcycle} locale={locale} />
      </Suspense>
    </div>
  );
}

function Spec({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-md border border-zinc-200 p-4">
      <div className="flex items-center gap-2 text-zinc-500">{icon}<span className="text-xs font-bold uppercase tracking-[0.14em]">{label}</span></div>
      <p className="mt-2 font-bold text-zinc-950">{value}</p>
    </div>
  );
}
