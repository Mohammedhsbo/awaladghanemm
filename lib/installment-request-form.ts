export const customerDocumentTypes = [
  "EMPLOYEE",
  "PENSION",
  "COMMERCIAL_REGISTRY",
  "NEITHER",
] as const;

export type CustomerDocumentType = (typeof customerDocumentTypes)[number];
export type InstallmentDocumentKey =
  | "supportingDocumentImage"
  | "buyerIdFrontImage"
  | "buyerIdBackImage"
  | "guarantor1IdFrontImage"
  | "guarantor1IdBackImage"
  | "guarantor2IdFrontImage"
  | "guarantor2IdBackImage";

export type InstallmentDocumentFiles = Partial<Record<InstallmentDocumentKey, File | null>>;
export type InstallmentDocumentUrls = Partial<Record<InstallmentDocumentKey, string>>;

const imageMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
export const maxCustomerDocumentSize = 5 * 1024 * 1024;

export function isEmploymentDocumentType(documentType: CustomerDocumentType) {
  return documentType === "EMPLOYEE" || documentType === "PENSION";
}

export function requiredInstallmentDocumentKeys(documentType: CustomerDocumentType): InstallmentDocumentKey[] {
  const buyerIds: InstallmentDocumentKey[] = ["buyerIdFrontImage", "buyerIdBackImage"];
  if (documentType === "NEITHER") {
    return [
      ...buyerIds,
      "guarantor1IdFrontImage",
      "guarantor1IdBackImage",
      "guarantor2IdFrontImage",
      "guarantor2IdBackImage",
    ];
  }
  return ["supportingDocumentImage", ...buyerIds];
}

export function validateCustomerDocumentFile(file: Pick<File, "type" | "size">) {
  if (!imageMimeTypes.has(file.type)) return "unsupported" as const;
  if (file.size < 1 || file.size > maxCustomerDocumentSize) return "size" as const;
  return null;
}

export function missingInstallmentRequestFields(
  documentType: CustomerDocumentType,
  values: Record<string, string>,
) {
  const missing: string[] = [];
  for (const key of ["buyerName", "buyerPhone"]) {
    if (!values[key]?.trim()) missing.push(key);
  }
  if (isEmploymentDocumentType(documentType)) {
    for (const key of ["buyerAddress", "buyerOccupation"]) {
      if (!values[key]?.trim()) missing.push(key);
    }
  }
  if (documentType === "NEITHER") {
    for (const key of ["guarantorName", "guarantorPhone", "secondGuarantorName", "secondGuarantorPhone"]) {
      if (!values[key]?.trim()) missing.push(key);
    }
  }
  return missing;
}

export function buildInstallmentRequestPayload(input: {
  values: Record<string, string>;
  documentType: CustomerDocumentType;
  motorcycleId: string;
  financingCompanyId: string;
  installmentDurationId: string;
  downPayment: number;
  monthlyInstallment: number;
  documentUrls: InstallmentDocumentUrls;
}) {
  const { values, documentUrls } = input;
  const completedValues = Object.fromEntries(Object.entries(values).filter(([key, value]) => {
    if (value.trim() === "") return false;
    if (!isEmploymentDocumentType(input.documentType)
      && ["buyerAddress", "buyerOccupation", "buyerOccupationAddress"].includes(key)) return false;
    if (input.documentType !== "NEITHER"
      && (key.startsWith("guarantor") || key.startsWith("secondGuarantor"))) return false;
    return true;
  }));
  return {
    ...completedValues,
    documentType: input.documentType,
    motorcycleId: input.motorcycleId,
    financingCompanyId: input.financingCompanyId,
    installmentDurationId: input.installmentDurationId,
    downPayment: input.downPayment,
    monthlyInstallment: input.monthlyInstallment,
    buyerNationalIdImage: documentUrls.buyerIdFrontImage,
    buyerNationalIdBackImage: documentUrls.buyerIdBackImage,
    salarySlipImage: documentUrls.supportingDocumentImage,
    guarantorNationalIdImage: documentUrls.guarantor1IdFrontImage,
    guarantorNationalIdBackImage: documentUrls.guarantor1IdBackImage,
    secondGuarantorNationalIdImage: documentUrls.guarantor2IdFrontImage,
    secondGuarantorNationalIdBackImage: documentUrls.guarantor2IdBackImage,
  };
}
