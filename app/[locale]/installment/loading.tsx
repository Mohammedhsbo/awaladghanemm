import { getTranslations } from "next-intl/server";

export default async function InstallmentLoading() {
  const t = await getTranslations("common");
  return (
    <div className="section-shell py-20" role="status" aria-live="polite">
      <span className="sr-only">{t("loading")}</span>
      <div className="h-72 animate-pulse rounded-3xl bg-blue-100" />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[0, 1, 2].map((step) => (
          <div key={step} className="h-48 animate-pulse rounded-2xl bg-slate-100" />
        ))}
      </div>
    </div>
  );
}
