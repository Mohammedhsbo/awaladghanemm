import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  ArrowLeft,
  BadgeCheck,
  Banknote,
  ClipboardCheck,
  FileCheck2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { listFinancingCompanies, type FinancingCompany } from "@/lib/financing-api";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("installment");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function InstallmentPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ locale }, query, t] = await Promise.all([
    params,
    searchParams,
    getTranslations("installment"),
  ]);
  const rawMotorcycleId = query.motorcycleId;
  const motorcycleId = Array.isArray(rawMotorcycleId) ? rawMotorcycleId[0] : rawMotorcycleId;
  const requestHref = motorcycleId
    ? `/installment-request?motorcycleId=${encodeURIComponent(motorcycleId)}` as never
    : "/installment-request";

  let companies: FinancingCompany[] = [];
  let companiesFailed = false;
  try {
    companies = await listFinancingCompanies();
  } catch {
    companiesFailed = true;
  }

  const steps = [
    { icon: BadgeCheck, title: t("step1Title"), description: t("step1Description") },
    { icon: Banknote, title: t("step2Title"), description: t("step2Description") },
    { icon: ClipboardCheck, title: t("step3Title"), description: t("step3Description") },
  ];

  return (
    <div className="overflow-hidden bg-white" dir={locale === "ar" ? "rtl" : "ltr"}>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#002f7a] via-[#0051b8] to-[#0878e8] text-white">
        <div aria-hidden="true" className="absolute inset-0 opacity-20">
          <div className="absolute -end-24 -top-24 h-80 w-80 rounded-full border-[40px] border-white/30" />
          <div className="absolute -bottom-40 -start-24 h-96 w-96 rounded-full border-[50px] border-white/20" />
          <Sparkles className="absolute end-[18%] top-[22%] h-10 w-10 text-white/70" />
        </div>
        <div className="section-shell relative grid min-h-[440px] items-center gap-12 py-20 md:min-h-[500px] md:grid-cols-[1.2fr_0.8fr] md:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-blue-50 backdrop-blur">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              {t("eyebrow")}
            </span>
            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-50 sm:text-xl">
              {t("description")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={requestHref}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-black text-blue-800 shadow-xl shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {t("apply")}
                <ArrowLeft className={`h-5 w-5 ${locale === "en" ? "rotate-180" : ""}`} aria-hidden="true" />
              </Link>
              <Link
                href="/motorcycles"
                className="inline-flex min-h-14 items-center justify-center rounded-xl border border-white/40 bg-white/10 px-7 py-4 font-bold text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {t("browse")}
              </Link>
            </div>
          </div>

          <div className="hidden justify-center md:flex" aria-hidden="true">
            <div className="relative grid h-64 w-64 place-items-center rounded-full border border-white/25 bg-white/10 shadow-2xl shadow-blue-950/30 backdrop-blur-sm lg:h-80 lg:w-80">
              <div className="absolute inset-5 rounded-full border border-white/20" />
              <Banknote className="h-28 w-28 text-white drop-shadow-lg lg:h-36 lg:w-36" strokeWidth={1.25} />
              <span className="absolute -bottom-3 rounded-full bg-white px-5 py-2 text-sm font-black text-blue-800 shadow-lg">
                {t("stepsEyebrow")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black tracking-wide text-blue-700">{t("stepsEyebrow")}</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">{t("stepsTitle")}</h2>
        </div>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <li key={title} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-blue-700">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="text-3xl font-black text-blue-100" aria-hidden="true">0{index + 1}</span>
              </div>
              <h3 className="mt-5 text-xl font-black text-slate-900">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="section-shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black tracking-wide text-blue-700">{t("companiesEyebrow")}</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">{t("companiesTitle")}</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">{t("companiesDescription")}</p>
          </div>

          {companiesFailed ? (
            <p role="status" className="mx-auto mt-8 max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center font-semibold text-amber-900">
              {t("companiesError")}
            </p>
          ) : companies.length === 0 ? (
            <p role="status" className="mx-auto mt-8 max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center leading-7 text-slate-600">
              {t("companiesEmpty")}
            </p>
          ) : (
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {companies.map((company) => (
                <li key={company.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
                      <Banknote className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-black text-slate-900">{company.name}</h3>
                      {Number.isFinite(Number(company.annualInterestRate)) && (
                        <p className="mt-2 text-sm text-slate-600">
                          {t("companyRate")}
                          <span className="ms-1 font-black text-blue-800">
                            {new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(Number(company.annualInterestRate))}%
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-3xl border border-blue-100 bg-blue-50 p-7 sm:p-10 md:flex-row md:items-center">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-blue-700 shadow-sm">
            <FileCheck2 className="h-7 w-7" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-2xl font-black text-slate-950">{t("informationTitle")}</h2>
            <p className="mt-3 leading-8 text-slate-700">{t("informationDescription")}</p>
          </div>
        </div>
      </section>

      <section className="bg-blue-950 py-16 text-white sm:py-20">
        <div className="section-shell text-center">
          <p className="text-sm font-bold text-blue-300">{t("ctaEyebrow")}</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">{t("ctaDescription")}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={requestHref}
              className="inline-flex min-h-14 items-center justify-center rounded-xl bg-white px-7 py-3.5 font-black text-blue-900 transition hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {t("ctaApply")}
            </Link>
            <Link
              href="/motorcycles"
              className="inline-flex min-h-14 items-center justify-center rounded-xl border border-white/40 px-7 py-3.5 font-bold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {t("ctaBrowse")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
