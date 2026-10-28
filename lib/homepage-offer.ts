import type { Motorcycle } from "./catalog-api";
import type { InstallmentDuration, OfferSettings } from "./financing-api";

export interface HomepageOffer {
  discountPercentage: number;
  downPaymentAmount: number;
  installmentDurationMonths: number;
  originalPrice: number;
  discountedPrice: number;
}

export function getHomepageOffer(
  settings: OfferSettings | null,
  motorcycle: Pick<Motorcycle, "price" | "status"> | null,
  durations: readonly Pick<InstallmentDuration, "months">[],
): HomepageOffer | null {
  if (settings?.enabled !== true || motorcycle?.status !== "available") return null;

  const { discountPercentage, downPaymentAmount, installmentDurationMonths } = settings;
  if (
    !Number.isFinite(discountPercentage)
    || discountPercentage <= 0
    || discountPercentage > 100
    || downPaymentAmount === null
    || !Number.isFinite(downPaymentAmount)
    || downPaymentAmount < 0
    || !Number.isInteger(installmentDurationMonths)
    || installmentDurationMonths < 1
    || installmentDurationMonths > 120
    || !durations.some((duration) => duration.months === installmentDurationMonths)
    || !Number.isFinite(motorcycle.price)
    || motorcycle.price <= 0
  ) {
    return null;
  }

  const discountedPrice = motorcycle.price * (1 - discountPercentage / 100);
  if (!Number.isFinite(discountedPrice) || discountedPrice <= 0 || downPaymentAmount >= discountedPrice) {
    return null;
  }

  return {
    discountPercentage,
    downPaymentAmount,
    installmentDurationMonths,
    originalPrice: motorcycle.price,
    discountedPrice,
  };
}
