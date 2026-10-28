import assert from "node:assert/strict";
import test from "node:test";
import { getHomepageOffer } from "./homepage-offer.ts";

const motorcycle = { price: 100_000, status: "available" };
const activeDurations = [{ months: 12 }, { months: 24 }];
const settings = {
  enabled: true,
  discountPercentage: 30,
  downPaymentAmount: 4_000,
  installmentDurationMonths: 24,
  currency: "EGP",
};

test("shows an enabled offer with valid settings on an available motorcycle", () => {
  assert.deepEqual(getHomepageOffer(settings, motorcycle, activeDurations), {
    discountPercentage: 30,
    downPaymentAmount: 4_000,
    installmentDurationMonths: 24,
    originalPrice: 100_000,
    discountedPrice: 70_000,
  });
  assert.equal(motorcycle.price, 100_000);
});

test("hides disabled or unconfigured offers", () => {
  assert.equal(getHomepageOffer({ ...settings, enabled: false }, motorcycle, activeDurations), null);
  assert.equal(getHomepageOffer({ ...settings, downPaymentAmount: null }, motorcycle, activeDurations), null);
  assert.equal(getHomepageOffer({ ...settings, downPaymentAmount: undefined }, motorcycle, activeDurations), null);
  assert.equal(getHomepageOffer(null, motorcycle, activeDurations), null);
});

test("accepts a configured zero down payment under existing validation rules", () => {
  assert.equal(getHomepageOffer({ ...settings, downPaymentAmount: 0 }, motorcycle, activeDurations)?.downPaymentAmount, 0);
});

test("uses updated discount, down payment, and duration from settings", () => {
  assert.deepEqual(
    getHomepageOffer({
      ...settings,
      discountPercentage: 15,
      downPaymentAmount: 8_500,
      installmentDurationMonths: 12,
    }, motorcycle, activeDurations),
    {
      discountPercentage: 15,
      downPaymentAmount: 8_500,
      installmentDurationMonths: 12,
      originalPrice: 100_000,
      discountedPrice: 85_000,
    },
  );
});

test("hides offers with invalid settings, inactive durations, or ineligible motorcycles", () => {
  assert.equal(getHomepageOffer({ ...settings, discountPercentage: 0 }, motorcycle, activeDurations), null);
  assert.equal(getHomepageOffer({ ...settings, discountPercentage: 101 }, motorcycle, activeDurations), null);
  assert.equal(getHomepageOffer({ ...settings, downPaymentAmount: -1 }, motorcycle, activeDurations), null);
  assert.equal(getHomepageOffer({ ...settings, installmentDurationMonths: 36 }, motorcycle, activeDurations), null);
  assert.equal(getHomepageOffer(settings, { ...motorcycle, status: "sold" }, activeDurations), null);
  assert.equal(getHomepageOffer(settings, { ...motorcycle, price: Number.NaN }, activeDurations), null);
  assert.equal(getHomepageOffer(settings, { ...motorcycle, price: 5_000 }, activeDurations), null);
});
