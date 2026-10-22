import { API_BASE, apiClient } from "./api-client";

export interface FinancingCompany { id: string; name: string; annualInterestRate: number; }
export interface InstallmentDuration { id: string; months: number; }
export interface StoreSettings {
  instagramUrl?: string | null;
  contactPhone?: string | null;
  defaultDepositAmount?: number | null;
  defaultDepositPercentage?: number | null;
}
export interface InstallmentCalculation {
  motorcyclePrice: number;
  downPayment: number;
  annualInterestRate: number;
  financingAmount: number;
  financedAmount: number;
  totalInterest: number;
  totalAmountDue: number;
  months: number;
  monthlyInstallment: number;
}

export function listFinancingCompanies() {
  return apiClient.get<FinancingCompany[]>("/financing-companies");
}

export function listInstallmentDurations() {
  return apiClient.get<InstallmentDuration[]>("/installment-durations");
}

export function getStoreSettings() {
  return apiClient.get<StoreSettings | null>("/store-settings");
}

export function calculateInstallment(input: { motorcycleId: string; installmentDurationId: string; downPayment: number; financingCompanyId?: string }) {
  return apiClient.post<InstallmentCalculation>("/installment-calculations", input);
}

export function submitInstallmentRequest(input: Record<string, unknown>) {
  return apiClient.post("/installment-requests", input);
}

export async function uploadInstallmentDocument(file: File) {
  const form = new FormData();
  form.append("file", file);
  
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const res = await fetch(`${API_BASE}/upload/customer`, {
    method: "POST",
    headers: token ? { "Authorization": `Bearer ${token}` } : {},
    body: form,
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error?.message || "Failed to upload document");
  }
  return data.data as { url: string };
}
