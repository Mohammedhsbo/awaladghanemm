import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import {
  conditionLabel,
  displayName,
  formatCurrency,
  fuelTypeLabel,
  listMotorcycles,
  normalizeImages,
  type Motorcycle,
} from "@/lib/catalog-api";
import { Fuel, Gauge, Palette } from "lucide-react";
import { MotorcycleVisual } from "./MotorcycleVisual";

interface SimilarMotorcyclesProps {
  motorcycle: Motorcycle;
  locale: string;
}

export async function SimilarMotorcycles({ motorcycle, locale }: SimilarMotorcyclesProps) {
  const t = await getTranslations("motorcycleDetails");
  const results = await Promise.allSettled([
    listMotorcycles({ brandId: motorcycle.brand.id, limit: 100 }),
    listMotorcycles({ limit: 100 }),
  ]);
  const availableItems: Motorcycle[] = [];

  for (const [index, result] of results.entries()) {
    if (result.status === "fulfilled") {
      availableItems.push(...result.value.items);
    } else {
      console.error(`Unable to load ${index === 0 ? "same-brand" : "fallback"} motorcycle recommendations`, result.reason);
    }
  }

  const candidates = new Map<string, Motorcycle>();
  for (const item of availableItems) {
    if (item.id !== motorcycle.id && item.status.toLowerCase() === "available") {
      candidates.set(item.id, item);
    }
  }

  const recommendations = [...candidates.values()]
    .map((item) => ({ item, score: similarityScore(motorcycle, item) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ item }) => item);

  if (recommendations.length === 0) return null;

  return (
    <section className="bg-slate-50 py-14 sm:py-16">
      <div className="section-shell">
        <div className="mb-7">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">{t("similarEyebrow")}</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{t("similarTitle")}</h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">{t("similarSubtitle")}</p>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
          {recommendations.map((item) => (
            <SimilarMotorcycleCard key={item.id} motorcycle={item} locale={locale} detailsLabel={t("viewDetails")} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function SimilarMotorcyclesSkeleton({ locale }: { locale: string }) {
  const isArabic = locale === "ar";

  return (
    <section className="bg-slate-50 py-14 sm:py-16" aria-busy="true">
      <div className="section-shell">
        <div className="mb-7">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
            {isArabic ? "اختيارات مميزة" : "Curated for you"}
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            {isArabic ? "منتجات مشابهة" : "Similar motorcycles"}
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            {isArabic ? "جاري تحميل الموتوسيكلات المتاحة..." : "Loading available motorcycles..."}
          </p>
        </div>
        <div className="-mx-4 flex snap-x gap-4 overflow-hidden px-4 pb-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="w-[82%] shrink-0 snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white md:w-auto">
              <div className="aspect-[4/3] animate-pulse bg-slate-200" />
              <div className="space-y-3 p-5">
                <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200" />
                <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                <div className="h-10 animate-pulse rounded-lg bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SimilarMotorcycleCard({
  motorcycle,
  locale,
  detailsLabel,
}: {
  motorcycle: Motorcycle;
  locale: string;
  detailsLabel: string;
}) {
  const images = normalizeImages(motorcycle.images);
  const title = `${displayName(motorcycle.brand, locale)} ${motorcycle.model}`;
  const fuelType = fuelTypeLabel(motorcycle.fuelType, locale);

  return (
    <Link
      href={`/motorcycles/${motorcycle.id}`}
      className="group w-[82%] shrink-0 snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl md:w-auto"
    >
      <article className="flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <MotorcycleVisual
            src={images[0]}
            alt={title}
            className="transition duration-500 group-hover:scale-105"
          />
          <span className="absolute start-3 top-3 rounded-full bg-blue-700 px-3 py-1 text-xs font-bold text-white shadow-sm">
            {conditionLabel(motorcycle.condition, locale)}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700">
            {displayName(motorcycle.brand, locale)}
          </p>
          <h3 className="mt-1 text-lg font-black text-slate-950 transition group-hover:text-blue-700">{motorcycle.model}</h3>

          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-xs text-slate-600">
            {motorcycle.color && (
              <span className="inline-flex items-center gap-1"><Palette size={14} />{motorcycle.color}</span>
            )}
            {fuelType && (
              <span className="inline-flex items-center gap-1"><Fuel size={14} />{fuelType}</span>
            )}
            {motorcycle.engineSize && (
              <span className="inline-flex items-center gap-1"><Gauge size={14} />{motorcycle.engineSize}</span>
            )}
          </div>

          <div className="mt-auto flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
            <div>
              <p className="text-xs text-slate-500">{locale === "ar" ? "السعر" : "Price"}</p>
              <p className="mt-1 text-base font-black text-slate-950">{formatCurrency(motorcycle.price)}</p>
            </div>
            <span className="rounded-lg bg-blue-700 px-3 py-2 text-xs font-bold text-white transition group-hover:bg-blue-800">
              {detailsLabel}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function similarityScore(current: Motorcycle, candidate: Motorcycle) {
  let score = current.brand.id === candidate.brand.id ? 100 : 0;
  const currentModel = normalizeModel(current.model);
  const candidateModel = normalizeModel(candidate.model);

  if (currentModel && candidateModel) {
    if (currentModel === candidateModel) {
      score += 40;
    } else if (currentModel.split(" ").some((word) => candidateModel.split(" ").includes(word))) {
      score += 15;
    }
  }

  const currentCapacity = parseCapacity(current.engineSize);
  const candidateCapacity = parseCapacity(candidate.engineSize);
  if (currentCapacity && candidateCapacity) {
    const difference = Math.abs(currentCapacity - candidateCapacity);
    if (difference <= 150 || difference / Math.max(currentCapacity, candidateCapacity) <= 0.25) {
      score += 30;
    }
  }

  if (current.category.id === candidate.category.id) score += 12;
  if (current.fuelType && current.fuelType.toLowerCase() === candidate.fuelType?.toLowerCase()) score += 8;
  return score;
}

function normalizeModel(model: string) {
  return model.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function parseCapacity(engineSize: string | null | undefined) {
  const value = Number.parseFloat(engineSize ?? "");
  return Number.isFinite(value) ? value : null;
}
