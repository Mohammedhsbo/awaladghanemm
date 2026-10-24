import assert from "node:assert/strict";
import test from "node:test";
import {
  buildInstallmentRequestPayload,
  isEmploymentDocumentType,
  missingInstallmentRequestFields,
  requiredInstallmentDocumentKeys,
  validateCustomerDocumentFile,
} from "./installment-request-form.ts";

test("matches Desktop buyer-field requirements by document type", () => {
  assert.equal(isEmploymentDocumentType("EMPLOYEE"), true);
  assert.equal(isEmploymentDocumentType("PENSION"), true);
  assert.equal(isEmploymentDocumentType("COMMERCIAL_REGISTRY"), false);
  assert.equal(isEmploymentDocumentType("NEITHER"), false);

  const buyer = { buyerName: "Buyer", buyerPhone: "01234567890" };
  assert.deepEqual(missingInstallmentRequestFields("EMPLOYEE", buyer), ["buyerAddress", "buyerOccupation"]);
  assert.deepEqual(missingInstallmentRequestFields("PENSION", buyer), ["buyerAddress", "buyerOccupation"]);
  assert.deepEqual(missingInstallmentRequestFields("COMMERCIAL_REGISTRY", buyer), []);
  assert.deepEqual(missingInstallmentRequestFields("NEITHER", buyer), [
    "guarantorName",
    "guarantorPhone",
    "secondGuarantorName",
    "secondGuarantorPhone",
  ]);
});

test("requires only each document type's applicable uploads", () => {
  assert.deepEqual(requiredInstallmentDocumentKeys("EMPLOYEE"), [
    "supportingDocumentImage",
    "buyerIdFrontImage",
    "buyerIdBackImage",
  ]);
  assert.deepEqual(requiredInstallmentDocumentKeys("PENSION"), requiredInstallmentDocumentKeys("EMPLOYEE"));
  assert.deepEqual(requiredInstallmentDocumentKeys("COMMERCIAL_REGISTRY"), requiredInstallmentDocumentKeys("EMPLOYEE"));
  assert.deepEqual(requiredInstallmentDocumentKeys("NEITHER"), [
    "buyerIdFrontImage",
    "buyerIdBackImage",
    "guarantor1IdFrontImage",
    "guarantor1IdBackImage",
    "guarantor2IdFrontImage",
    "guarantor2IdBackImage",
  ]);
});

test("accepts only supported image types up to 5 MB", () => {
  assert.equal(validateCustomerDocumentFile({ type: "image/jpeg", size: 10 }), null);
  assert.equal(validateCustomerDocumentFile({ type: "image/png", size: 5 * 1024 * 1024 }), null);
  assert.equal(validateCustomerDocumentFile({ type: "image/webp", size: 10 }), null);
  assert.equal(validateCustomerDocumentFile({ type: "application/pdf", size: 10 }), "unsupported");
  assert.equal(validateCustomerDocumentFile({ type: "image/gif", size: 10 }), "unsupported");
  assert.equal(validateCustomerDocumentFile({ type: "image/jpeg", size: 0 }), "size");
  assert.equal(validateCustomerDocumentFile({ type: "image/jpeg", size: 5 * 1024 * 1024 + 1 }), "size");
});

test("maps uploaded files and preserves the cart-selected motorcycle without placeholder fields", () => {
  const payload = buildInstallmentRequestPayload({
    values: {
      buyerName: "Buyer",
      buyerPhone: "01234567890",
      buyerOccupationAddress: "Work address",
      guarantorName: "First guarantor",
      guarantorPhone: "01234567891",
      secondGuarantorName: "Second guarantor",
      secondGuarantorPhone: "01234567892",
    },
    documentType: "NEITHER",
    motorcycleId: "2932b985-ab85-4cdd-891b-6281793023b6",
    financingCompanyId: "company-id",
    installmentDurationId: "duration-id",
    downPayment: 100,
    monthlyInstallment: 50,
    documentUrls: {
      buyerIdFrontImage: "buyer-front-url",
      buyerIdBackImage: "buyer-back-url",
      guarantor1IdFrontImage: "first-front-url",
      guarantor1IdBackImage: "first-back-url",
      guarantor2IdFrontImage: "second-front-url",
      guarantor2IdBackImage: "second-back-url",
    },
  });

  assert.equal(payload.motorcycleId, "2932b985-ab85-4cdd-891b-6281793023b6");
  assert.equal(payload.documentType, "NEITHER");
  assert.equal(payload.buyerNationalIdImage, "buyer-front-url");
  assert.equal(payload.guarantorNationalIdImage, "first-front-url");
  assert.equal(payload.secondGuarantorNationalIdImage, "second-front-url");
  assert.equal("apartmentContractImage" in payload, false);
  assert.equal(payload.guarantorName, "First guarantor");
  assert.equal(payload.secondGuarantorName, "Second guarantor");
});

test("omits guarantor and apartment fields for employee submissions", () => {
  const payload = buildInstallmentRequestPayload({
    values: {
      buyerName: "Buyer",
      buyerPhone: "01234567890",
      buyerAddress: "Buyer address",
      buyerOccupation: "Engineer",
      buyerOccupationAddress: "Work address",
      guarantorName: "Stale hidden value",
      secondGuarantorName: "Stale hidden value",
      buyerEmail: "",
    },
    documentType: "EMPLOYEE",
    motorcycleId: "motorcycle-from-cart",
    financingCompanyId: "company-id",
    installmentDurationId: "duration-id",
    downPayment: 100,
    monthlyInstallment: 50,
    documentUrls: {
      supportingDocumentImage: "salary-slip-url",
      buyerIdFrontImage: "buyer-front-url",
      buyerIdBackImage: "buyer-back-url",
    },
  });

  assert.equal(payload.salarySlipImage, "salary-slip-url");
  assert.equal(payload.buyerNationalIdBackImage, "buyer-back-url");
  assert.equal("guarantorName" in payload, false);
  assert.equal("secondGuarantorName" in payload, false);
  assert.equal("apartmentContractImage" in payload, false);
  assert.equal("buyerEmail" in payload, false);
});
