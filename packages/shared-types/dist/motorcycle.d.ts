import { z } from "zod";
import { type MotorcycleStatus } from "./enums.js";
import type { BrandSummary } from "./brand.js";
import type { CategorySummary } from "./category.js";
import type { BranchSummary } from "./user.js";
export declare const createMotorcycleRequestSchema: z.ZodObject<{
    vin: z.ZodString;
    engineNumber: z.ZodOptional<z.ZodString>;
    model: z.ZodString;
    year: z.ZodNumber;
    color: z.ZodOptional<z.ZodString>;
    engineSize: z.ZodOptional<z.ZodString>;
    descriptionAr: z.ZodOptional<z.ZodString>;
    descriptionEn: z.ZodOptional<z.ZodString>;
    price: z.ZodNumber;
    costPrice: z.ZodNumber;
    brandId: z.ZodString;
    categoryId: z.ZodString;
    branchId: z.ZodString;
    images: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    status: z.ZodOptional<z.ZodNativeEnum<typeof MotorcycleStatus>>;
}, "strict", z.ZodTypeAny, {
    branchId: string;
    vin: string;
    model: string;
    year: number;
    price: number;
    costPrice: number;
    brandId: string;
    categoryId: string;
    images: string[];
    status?: MotorcycleStatus | undefined;
    engineNumber?: string | undefined;
    color?: string | undefined;
    engineSize?: string | undefined;
    descriptionAr?: string | undefined;
    descriptionEn?: string | undefined;
}, {
    branchId: string;
    vin: string;
    model: string;
    year: number;
    price: number;
    costPrice: number;
    brandId: string;
    categoryId: string;
    status?: MotorcycleStatus | undefined;
    engineNumber?: string | undefined;
    color?: string | undefined;
    engineSize?: string | undefined;
    descriptionAr?: string | undefined;
    descriptionEn?: string | undefined;
    images?: string[] | undefined;
}>;
export declare const updateMotorcycleRequestSchema: z.ZodEffects<z.ZodObject<{
    vin: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodString>;
    year: z.ZodOptional<z.ZodNumber>;
    color: z.ZodOptional<z.ZodString>;
    engineNumber: z.ZodOptional<z.ZodString>;
    engineSize: z.ZodOptional<z.ZodString>;
    descriptionAr: z.ZodOptional<z.ZodString>;
    descriptionEn: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    costPrice: z.ZodOptional<z.ZodNumber>;
    brandId: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodString>;
    images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strict", z.ZodTypeAny, {
    vin?: string | undefined;
    engineNumber?: string | undefined;
    model?: string | undefined;
    year?: number | undefined;
    color?: string | undefined;
    engineSize?: string | undefined;
    descriptionAr?: string | undefined;
    descriptionEn?: string | undefined;
    price?: number | undefined;
    costPrice?: number | undefined;
    brandId?: string | undefined;
    categoryId?: string | undefined;
    images?: string[] | undefined;
}, {
    vin?: string | undefined;
    engineNumber?: string | undefined;
    model?: string | undefined;
    year?: number | undefined;
    color?: string | undefined;
    engineSize?: string | undefined;
    descriptionAr?: string | undefined;
    descriptionEn?: string | undefined;
    price?: number | undefined;
    costPrice?: number | undefined;
    brandId?: string | undefined;
    categoryId?: string | undefined;
    images?: string[] | undefined;
}>, {
    vin?: string | undefined;
    engineNumber?: string | undefined;
    model?: string | undefined;
    year?: number | undefined;
    color?: string | undefined;
    engineSize?: string | undefined;
    descriptionAr?: string | undefined;
    descriptionEn?: string | undefined;
    price?: number | undefined;
    costPrice?: number | undefined;
    brandId?: string | undefined;
    categoryId?: string | undefined;
    images?: string[] | undefined;
}, {
    vin?: string | undefined;
    engineNumber?: string | undefined;
    model?: string | undefined;
    year?: number | undefined;
    color?: string | undefined;
    engineSize?: string | undefined;
    descriptionAr?: string | undefined;
    descriptionEn?: string | undefined;
    price?: number | undefined;
    costPrice?: number | undefined;
    brandId?: string | undefined;
    categoryId?: string | undefined;
    images?: string[] | undefined;
}>;
export declare const statusTransitionRequestSchema: z.ZodObject<{
    status: z.ZodNativeEnum<typeof MotorcycleStatus>;
    reason: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    status: MotorcycleStatus;
    reason?: string | undefined;
}, {
    status: MotorcycleStatus;
    reason?: string | undefined;
}>;
export declare const listMotorcyclesQuerySchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    brandId: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodString>;
    branchId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNativeEnum<typeof MotorcycleStatus>>;
    minPrice: z.ZodOptional<z.ZodNumber>;
    maxPrice: z.ZodOptional<z.ZodNumber>;
    minYear: z.ZodOptional<z.ZodNumber>;
    maxYear: z.ZodOptional<z.ZodNumber>;
    color: z.ZodOptional<z.ZodString>;
    sort: z.ZodDefault<z.ZodEnum<["price", "year", "createdAt", "model"]>>;
    order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strict", z.ZodTypeAny, {
    sort: "createdAt" | "model" | "year" | "price";
    order: "asc" | "desc";
    page: number;
    limit: number;
    status?: MotorcycleStatus | undefined;
    branchId?: string | undefined;
    search?: string | undefined;
    color?: string | undefined;
    brandId?: string | undefined;
    categoryId?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    minYear?: number | undefined;
    maxYear?: number | undefined;
}, {
    sort?: "createdAt" | "model" | "year" | "price" | undefined;
    status?: MotorcycleStatus | undefined;
    order?: "asc" | "desc" | undefined;
    branchId?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    color?: string | undefined;
    brandId?: string | undefined;
    categoryId?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    minYear?: number | undefined;
    maxYear?: number | undefined;
}>, {
    sort: "createdAt" | "model" | "year" | "price";
    order: "asc" | "desc";
    page: number;
    limit: number;
    status?: MotorcycleStatus | undefined;
    branchId?: string | undefined;
    search?: string | undefined;
    color?: string | undefined;
    brandId?: string | undefined;
    categoryId?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    minYear?: number | undefined;
    maxYear?: number | undefined;
}, {
    sort?: "createdAt" | "model" | "year" | "price" | undefined;
    status?: MotorcycleStatus | undefined;
    order?: "asc" | "desc" | undefined;
    branchId?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    color?: string | undefined;
    brandId?: string | undefined;
    categoryId?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    minYear?: number | undefined;
    maxYear?: number | undefined;
}>, {
    sort: "createdAt" | "model" | "year" | "price";
    order: "asc" | "desc";
    page: number;
    limit: number;
    status?: MotorcycleStatus | undefined;
    branchId?: string | undefined;
    search?: string | undefined;
    color?: string | undefined;
    brandId?: string | undefined;
    categoryId?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    minYear?: number | undefined;
    maxYear?: number | undefined;
}, {
    sort?: "createdAt" | "model" | "year" | "price" | undefined;
    status?: MotorcycleStatus | undefined;
    order?: "asc" | "desc" | undefined;
    branchId?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    color?: string | undefined;
    brandId?: string | undefined;
    categoryId?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    minYear?: number | undefined;
    maxYear?: number | undefined;
}>;
export interface Motorcycle {
    id: string;
    vin: string;
    engineNumber?: string | null;
    model: string;
    year: number;
    color?: string | null;
    engineSize?: string | null;
    descriptionAr?: string | null;
    descriptionEn?: string | null;
    price: number;
    costPrice: number;
    status: MotorcycleStatus;
    images: string[];
    branchId: string;
    brandId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
}
export interface MotorcycleListItem {
    id: string;
    vin: string;
    engineNumber?: string | null;
    model: string;
    year: number;
    color?: string | null;
    engineSize?: string | null;
    price: number;
    brand: BrandSummary;
    category: CategorySummary;
    branch: BranchSummary;
    status: MotorcycleStatus;
    images: string[];
    createdAt: string;
}
export interface MotorcycleDetails extends Motorcycle {
    brand: BrandSummary;
    category: CategorySummary;
    branch: BranchSummary;
}
export interface MotorcycleStatusHistory {
    id: string;
    action: string;
    before: {
        status: MotorcycleStatus;
    };
    after: {
        status: MotorcycleStatus;
    };
    user: {
        id: string;
        name: string;
    };
    reason?: string | null;
    createdAt: string;
}
export interface InventorySummaryByBranch {
    branchId: string;
    branch: BranchSummary;
    statusCounts: Record<MotorcycleStatus, number>;
    total: number;
}
export type CreateMotorcycleRequest = z.infer<typeof createMotorcycleRequestSchema>;
export type UpdateMotorcycleRequest = z.infer<typeof updateMotorcycleRequestSchema>;
export type StatusTransitionRequest = z.infer<typeof statusTransitionRequestSchema>;
export type ListMotorcyclesQuery = z.infer<typeof listMotorcyclesQuerySchema>;
export interface CreateMotorcycleResponse {
    id: string;
    vin: string;
    engineNumber?: string | null;
    model: string;
    year: number;
    color?: string | null;
    engineSize?: string | null;
    descriptionAr?: string | null;
    descriptionEn?: string | null;
    price: number;
    costPrice: number;
    brand: BrandSummary;
    category: CategorySummary;
    branch: BranchSummary;
    status: MotorcycleStatus;
    images: string[];
    createdAt: string;
}
export interface StatusTransitionResponse {
    id: string;
    vin: string;
    model: string;
    status: MotorcycleStatus;
    previousStatus: MotorcycleStatus;
    updatedAt: string;
}
export type UpdateMotorcycleResponse = CreateMotorcycleResponse;
export type GetMotorcycleResponse = MotorcycleDetails;
//# sourceMappingURL=motorcycle.d.ts.map