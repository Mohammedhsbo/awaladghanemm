import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { MotorcycleCard } from "@/components/MotorcycleCard";
import { displayName, formatCurrency, listBrands, listCategories, listMotorcycles } from "@/lib/catalog-api";
import { getOfferSettings, listInstallmentDurations } from "@/lib/financing-api";
import { getHomepageOffer } from "@/lib/homepage-offer";
import { BadgeCheck, CalendarDays, CreditCard, MapPin, ShieldCheck, Sparkles, Tag, Truck, Wrench } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations("home");
  const { locale } = await params;
  const [{ items: featured }, { items: latest }, brands, categories, settings, durations] = await Promise.all([
    listMotorcycles({ limit: 6, sort: "price", order: "desc" }).catch(() => ({ items: [], meta: { total: 0, page: 1, limit: 6, totalPages: 0 } })),
    listMotorcycles({ limit: 4, sort: "createdAt", order: "desc" }).catch(() => ({ items: [], meta: { total: 0, page: 1, limit: 4, totalPages: 0 } })),
    listBrands().catch(() => []),
    listCategories().catch(() => []),
    getOfferSettings().catch((error: unknown) => {
      console.error("Unable to load homepage offer settings", error);
      return null;
    }),
    listInstallmentDurations().catch((error: unknown) => {
      console.error("Unable to load homepage installment durations", error);
      return [];
    }),
  ]);
  const heroBike = featured[0] ?? latest[0];
  const inventoryUnavailable = featured.length === 0 && latest.length === 0 && brands.length === 0 && categories.length === 0;
  const headline = t("hero.newHeadline").split(" ");
  const brandCounts = new Map<string, number>();
  for (const bike of [...featured, ...latest]) brandCounts.set(bike.brand.id, (brandCounts.get(bike.brand.id) ?? 0) + 1);
  const offer = getHomepageOffer(settings, heroBike, durations);

  return (
    <div className="bg-white">
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#0051b8] text-white">
        <div className="absolute inset-0 -z-10">
          <img src="/hero.png" alt="" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(42,132,215,0.7)_0%,rgba(0,81,184,0.58)_48%,rgba(0,49,139,0.88)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,47,122,0.28)_0%,transparent_45%)]" />
        </div>

        <div className="section-shell relative z-10 flex w-full flex-1 items-center pb-12 pt-28 sm:pb-16 lg:pt-32">
          <div className="flex w-full flex-col gap-12 md:flex-row md:items-center md:justify-between md:gap-10">
            <div className="flex w-full flex-col items-start text-start md:w-[34%] md:max-w-[26rem] md:translate-x-8 md:translate-y-6">
              <h2 className="max-w-[20rem] text-3xl font-black leading-tight drop-shadow-md sm:text-4xl lg:text-[3.25rem]">
                {t("hero.rightHeadline")}
              </h2>
              <p className="mt-[4.5rem] max-w-[18rem] text-base font-medium leading-relaxed text-white/90 sm:text-xl">
                {t("hero.rightSubheadline")}
              </p>

              <div className="mt-8 flex w-full max-w-lg items-center gap-4 rounded-[1.75rem] border border-cyan-300/50 bg-blue-900/20 px-5 py-4 shadow-lg backdrop-blur-sm sm:mt-12 md:mt-24 md:max-w-[25rem] sm:px-7 sm:py-5">
                <CalendarDays className="h-7 w-7 shrink-0 text-white sm:h-8 sm:w-8" strokeWidth={1.7} />
                <span className="flex-1 text-sm font-medium leading-relaxed text-white/90 sm:text-base">
                  {t("hero.yearsInstallment")}
                </span>
                <span className="h-11 w-px shrink-0 bg-white/70" />
                <span className="flex shrink-0 items-baseline gap-2">
                  <span className="text-5xl font-black leading-none sm:text-6xl">{t("hero.yearsValue")}</span>
                  <span className="text-sm font-bold sm:text-base">{t("hero.yearsLabel")}</span>
                </span>
              </div>
            </div>

            <div className="flex w-full flex-col items-start text-start md:w-[36%] md:max-w-[28rem] md:-translate-y-5">
              <h1 className="max-w-[21rem] text-4xl font-black leading-[1.15] drop-shadow-lg sm:text-5xl lg:text-[4.5rem] md:-translate-y-2">
                {locale === "ar" ? (
                  <>
                    {headline.slice(0, 2).join(" ")}
                    <br />
                    {headline.slice(2, -1).join(" ")}{" "}
                  </>
                ) : (
                  `${headline.slice(0, -1).join(" ")} `
                )}
                <span className="relative inline-block pb-2">
                  {headline[headline.length - 1]}
                  <span className="absolute inset-x-0 bottom-0 h-1 rounded-full bg-cyan-300" />
                </span>
              </h1>
              <p className="mt-5 max-w-lg text-base font-medium leading-relaxed text-white/90 sm:text-lg">
                {t("hero.newSubheadline")}
              </p>

              {offer && (
                <div className="mt-5 grid w-full max-w-[26rem] grid-cols-2 gap-4 sm:gap-5">
                  <div className="flex min-h-44 flex-col items-center justify-center rounded-[1.5rem] border border-white/70 bg-white/90 px-4 py-5 text-[#0753ae] shadow-xl backdrop-blur-sm sm:min-h-48 sm:px-5">
                    <div className="mb-3 flex items-center gap-2 text-center text-xs font-bold leading-tight sm:text-sm">
                      <Tag className="h-5 w-5 shrink-0" strokeWidth={1.8} />
                      <span>{t("hero.discountLabel")}</span>
                    </div>
                    <span className="text-5xl font-black leading-none sm:text-6xl">{offer.discountPercentage}%</span>
                  </div>
                  <div className="flex min-h-44 flex-col items-center justify-center rounded-[1.5rem] border border-white/70 bg-white/90 px-4 py-5 text-[#0753ae] shadow-xl backdrop-blur-sm sm:min-h-48 sm:px-5">
                    <div className="mb-2 flex w-full items-center justify-between gap-2 text-[11px] font-bold sm:text-xs">
                      <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" />{t("hero.installmentLabel")}</span>
                      <span>{t("hero.installmentDownpayment")}</span>
                    </div>
                    <span className="text-5xl font-black leading-none sm:text-6xl">{offer.installmentDurationMonths}</span>
                    <span className="mt-1 text-sm font-black">{t("hero.installmentMonths")}</span>
                    <span className="mt-3 w-full border-t border-blue-200 pt-2 text-center text-sm font-bold sm:text-base">
                      {formatCurrency(offer.downPaymentAmount)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </section>

      <section className="relative z-10 w-full bg-white text-[#003887] shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
          {/* Subtle curved top effect */}
          <div className="absolute -top-6 left-0 right-0 h-12 bg-white" style={{ borderRadius: '50% 50% 0 0 / 100% 100% 0 0' }}></div>
          
          <div className="section-shell relative z-10 py-6 lg:py-8 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <div className="flex flex-col gap-6 lg:gap-8">
              
              {/* Trust Badges */}
              <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 w-full">
                <div className="font-bold text-lg hidden lg:block whitespace-nowrap">{t("hero.trustTitle")}</div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 sm:divide-x sm:divide-x-reverse divide-blue-200 w-full text-sm font-bold">
                  <div className="flex items-center gap-3 justify-center lg:justify-start px-4">
                    <Truck size={28} strokeWidth={2.5} className="text-[#0051b8] shrink-0" />
                    <span className="leading-tight text-start">{t("hero.trust3")}</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center px-4">
                    <Wrench size={28} strokeWidth={2.5} className="text-[#0051b8] shrink-0" />
                    <span className="leading-tight text-start">{t("hero.trust2")}</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center lg:justify-end px-4">
                    <ShieldCheck size={28} strokeWidth={2.5} className="text-[#0051b8] shrink-0" />
                    <span className="leading-tight text-start">{t("hero.trust1")}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
      </section>

      {/* BRANDS SECTION */}
      <section className="bg-white py-6 border-b border-zinc-100 relative z-20">
        <div className="section-shell">
          <div className="flex items-end gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            
            {/* Brand items */}
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/motorcycles?brandId=${brand.id}`}
                className="shrink-0 flex flex-col items-center gap-2 group min-w-[90px] max-w-[120px]"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={displayName(brand, locale)}
                      className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 drop-shadow-sm"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-zinc-100 flex items-center justify-center">
                      <span className="text-2xl font-black text-zinc-400 group-hover:text-zinc-700 transition-colors">
                        {displayName(brand, locale).charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors text-center leading-tight">
                  {displayName(brand, locale)}
                </span>
              </Link>
            ))}

            {/* "All" button at the end */}
            <Link
              href="/motorcycles"
              className="shrink-0 flex flex-col items-center gap-2 group min-w-[90px] max-w-[120px]"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-10 h-10 text-zinc-400 group-hover:text-zinc-700 transition-colors" fill="currentColor">
                  <rect x="2" y="2" width="16" height="16" rx="3"/>
                  <rect x="22" y="2" width="16" height="16" rx="3"/>
                  <rect x="2" y="22" width="16" height="16" rx="3"/>
                  <rect x="22" y="22" width="16" height="16" rx="3"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors text-center">
                {t("hero.brandsAll")}
              </span>
            </Link>

          </div>
        </div>
      </section>


      <section className="section-shell py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">{t("featuredLabel")}</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-zinc-950">{t("featuredSubtitle")}</h2>
          </div>
          <Link href="/motorcycles" className="hidden text-sm font-bold text-zinc-900 hover:text-blue-700 sm:inline-flex">{t("viewAll")}</Link>
        </div>
        {featured.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((motorcycle, index) => <MotorcycleCard key={motorcycle.id} motorcycle={motorcycle} locale={locale} priority={index < 2} />)}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center">
            <h3 className="text-lg font-bold">{inventoryUnavailable ? t("emptyUnavailable") : t("emptyNoneAvailable")}</h3>
            <p className="mt-2 text-zinc-600">{inventoryUnavailable ? t("emptyUnavailableDescription") : t("emptyNoneAvailableDescription")}</p>
          </div>
        )}
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {[
            [BadgeCheck, "Verified motorcycles"],
            [CreditCard, "Reservation deposits"],
            [Wrench, "Service-ready records"],
            [MapPin, "Branch availability"],
            [ShieldCheck, "Secure accounts"],
            [Sparkles, "Premium experience"],
          ].map(([Icon, label]) => (
            <div key={String(label)} className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
              <Icon className="text-blue-700" size={22} />
              <p className="mt-4 text-sm font-bold text-zinc-950">{String(label)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-900 py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')] bg-repeat"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-800 to-transparent mix-blend-multiply pointer-events-none"></div>
        <div className="section-shell grid gap-8 md:grid-cols-[1fr_auto] md:items-center relative z-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-200">{t("installmentOffer")}</p>
            <h2 className="mt-2 text-4xl font-black tracking-tight">{t("title")}</h2>
            <p className="mt-4 max-w-2xl text-blue-100">{t("description")}</p>
          </div>
          <Link href="/account/financing" className="inline-flex rounded-md bg-white px-6 py-3 text-sm font-bold text-blue-900 transition hover:bg-blue-50 shadow-md">
            {t("installmentOffer")}
          </Link>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Latest arrivals</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Fresh into inventory</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((motorcycle) => <MotorcycleCard key={motorcycle.id} motorcycle={motorcycle} locale={locale} />)}
        </div>
      </section>

      <section className="section-shell pb-16">
        <div className="rounded-lg bg-blue-900 p-8 text-white md:p-12 relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')] bg-repeat"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-800 to-transparent mix-blend-multiply pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-black tracking-tight">Your next motorcycle is waiting.</h2>
            <p className="mt-3 max-w-2xl text-blue-100">Search live inventory, review details, and reserve through the real backend reservation flow.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/motorcycles" className="rounded-md bg-white px-5 py-3 text-center text-sm font-bold text-blue-900 shadow-md hover:bg-blue-50 transition">Explore Inventory</Link>
              <Link href="/register" className="rounded-md border border-white/50 px-5 py-3 text-center text-sm font-bold text-white hover:bg-white/10 transition">Create Account</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
