import { z } from "zod";
import type { Address } from "./address.js";
export declare function normalizePhone(phone: string): string;
export declare const phoneSchema: z.ZodEffects<z.ZodString, string, string>;
export interface Customer {
    id: string;
    name: string;
    phone: string;
    email?: string | null;
    passwordHash?: string | null;
    nationalId?: string | null;
    address?: string | null;
    notes?: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface CustomerWithAddresses extends Customer {
    addresses: Address[];
}
export interface CustomerListItem {
    id: string;
    name: string;
    phone: string;
    email?: string | null;
    nationalId?: string | null;
    isActive: boolean;
    orderCount?: number;
    lastOrderDate?: string | null;
    createdAt: string;
}
export interface CustomerSearchResult {
    id: string;
    name: string;
    phone: string;
    email?: string | null;
    nationalId?: string | null;
    defaultAddress?: {
        id: string;
        addressLine: string;
        city?: string | null;
    } | null;
}
export interface CustomerStats {
    totalOrders: number;
    totalSpent: number;
    lastOrderDate?: string | null;
    activeReservations: number;
    activeInstallmentPlans: number;
}
export interface CustomerDetailResponse extends CustomerWithAddresses {
    stats?: CustomerStats;
}
export declare const registerCustomerSchema: z.ZodObject<{
    name: z.ZodString;
    phone: z.ZodEffects<z.ZodString, string, string>;
    email: z.ZodString;
    password: z.ZodString;
    nationalId: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodObject<{
        label: z.ZodOptional<z.ZodString>;
        addressLine: z.ZodString;
        city: z.ZodOptional<z.ZodString>;
        region: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        addressLine: string;
        label?: string | undefined;
        city?: string | undefined;
        region?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    }, {
        addressLine: string;
        label?: string | undefined;
        city?: string | undefined;
        region?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
    phone: string;
    address?: {
        addressLine: string;
        label?: string | undefined;
        city?: string | undefined;
        region?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    } | undefined;
    nationalId?: string | undefined;
}, {
    name: string;
    email: string;
    password: string;
    phone: string;
    address?: {
        addressLine: string;
        label?: string | undefined;
        city?: string | undefined;
        region?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    } | undefined;
    nationalId?: string | undefined;
}>;
export type RegisterCustomerDto = z.infer<typeof registerCustomerSchema>;
export declare const createCustomerSchema: z.ZodObject<{
    name: z.ZodString;
    phone: z.ZodEffects<z.ZodString, string, string>;
    email: z.ZodOptional<z.ZodString>;
    nationalId: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodObject<{
        label: z.ZodOptional<z.ZodString>;
        addressLine: z.ZodString;
        city: z.ZodOptional<z.ZodString>;
        region: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        addressLine: string;
        label?: string | undefined;
        city?: string | undefined;
        region?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    }, {
        addressLine: string;
        label?: string | undefined;
        city?: string | undefined;
        region?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    name: string;
    phone: string;
    notes?: string | undefined;
    email?: string | undefined;
    address?: {
        addressLine: string;
        label?: string | undefined;
        city?: string | undefined;
        region?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    } | undefined;
    nationalId?: string | undefined;
}, {
    name: string;
    phone: string;
    notes?: string | undefined;
    email?: string | undefined;
    address?: {
        addressLine: string;
        label?: string | undefined;
        city?: string | undefined;
        region?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    } | undefined;
    nationalId?: string | undefined;
}>;
export type CreateCustomerDto = z.infer<typeof createCustomerSchema>;
export declare const updateCustomerSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    email: z.ZodOptional<z.ZodString>;
    nationalId: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    notes?: string | undefined;
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    isActive?: boolean | undefined;
    nationalId?: string | undefined;
}, {
    notes?: string | undefined;
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    isActive?: boolean | undefined;
    nationalId?: string | undefined;
}>, {
    notes?: string | undefined;
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    isActive?: boolean | undefined;
    nationalId?: string | undefined;
}, {
    notes?: string | undefined;
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    isActive?: boolean | undefined;
    nationalId?: string | undefined;
}>;
export type UpdateCustomerDto = z.infer<typeof updateCustomerSchema>;
export declare const customerSearchSchema: z.ZodObject<{
    q: z.ZodString;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    limit: number;
    q: string;
}, {
    q: string;
    limit?: number | undefined;
}>;
export type CustomerSearchDto = z.infer<typeof customerSearchSchema>;
export declare const listCustomersQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    hasEmail: z.ZodOptional<z.ZodBoolean>;
    hasNationalId: z.ZodOptional<z.ZodBoolean>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    sort: z.ZodDefault<z.ZodEnum<["name", "createdAt"]>>;
    order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strict", z.ZodTypeAny, {
    sort: "name" | "createdAt";
    order: "asc" | "desc";
    page: number;
    limit: number;
    isActive?: boolean | undefined;
    search?: string | undefined;
    hasEmail?: boolean | undefined;
    hasNationalId?: boolean | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}, {
    sort?: "name" | "createdAt" | undefined;
    order?: "asc" | "desc" | undefined;
    isActive?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    hasEmail?: boolean | undefined;
    hasNationalId?: boolean | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}>;
export type ListCustomersQuery = z.infer<typeof listCustomersQuerySchema>;
export declare const changeCustomerPasswordSchema: z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
}, "strict", z.ZodTypeAny, {
    currentPassword: string;
    newPassword: string;
}, {
    currentPassword: string;
    newPassword: string;
}>;
export type ChangeCustomerPasswordDto = z.infer<typeof changeCustomerPasswordSchema>;
export declare const deactivateCustomerSchema: z.ZodObject<{
    reason: z.ZodString;
}, "strict", z.ZodTypeAny, {
    reason: string;
}, {
    reason: string;
}>;
export type DeactivateCustomerDto = z.infer<typeof deactivateCustomerSchema>;
export interface CustomerSummary {
    customerId: string;
    totalOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    totalSpent: number;
    totalPaid: number;
    outstandingBalance: number;
    activeReservations: number;
    expiredReservations: number;
    activeInstallmentPlans: number;
    overdueInstallments: number;
    lastOrderDate?: string | null;
    lastPaymentDate?: string | null;
}
//# sourceMappingURL=customer.d.ts.map