import { z } from "zod";
export declare const createBrandRequestSchema: z.ZodObject<{
    nameAr: z.ZodString;
    nameEn: z.ZodString;
    logo: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, "strict", z.ZodTypeAny, {
    nameAr: string;
    nameEn: string;
    logo?: string | undefined;
    sortOrder?: number | undefined;
}, {
    nameAr: string;
    nameEn: string;
    logo?: string | undefined;
    sortOrder?: number | undefined;
}>;
export declare const updateBrandRequestSchema: z.ZodEffects<z.ZodObject<{
    nameAr: z.ZodOptional<z.ZodString>;
    nameEn: z.ZodOptional<z.ZodString>;
    logo: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    sortOrder: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, "strict", z.ZodTypeAny, {
    isActive?: boolean | undefined;
    nameAr?: string | undefined;
    nameEn?: string | undefined;
    logo?: string | undefined;
    sortOrder?: number | undefined;
}, {
    isActive?: boolean | undefined;
    nameAr?: string | undefined;
    nameEn?: string | undefined;
    logo?: string | undefined;
    sortOrder?: number | undefined;
}>, {
    isActive?: boolean | undefined;
    nameAr?: string | undefined;
    nameEn?: string | undefined;
    logo?: string | undefined;
    sortOrder?: number | undefined;
}, {
    isActive?: boolean | undefined;
    nameAr?: string | undefined;
    nameEn?: string | undefined;
    logo?: string | undefined;
    sortOrder?: number | undefined;
}>;
export declare const listBrandsQuerySchema: z.ZodObject<{
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    isActive?: boolean | undefined;
}, {
    isActive?: boolean | undefined;
}>;
export interface Brand {
    id: string;
    nameAr: string;
    nameEn: string;
    logo?: string | null;
    isActive: boolean;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
}
export interface BrandListItem extends Brand {
    _count?: {
        motorcycles: number;
    };
}
export interface BrandSummary {
    id: string;
    nameAr: string;
    nameEn: string;
    logo?: string | null;
}
export type CreateBrandRequest = z.infer<typeof createBrandRequestSchema>;
export type UpdateBrandRequest = z.infer<typeof updateBrandRequestSchema>;
export type ListBrandsQuery = z.infer<typeof listBrandsQuerySchema>;
export interface CreateBrandResponse {
    id: string;
    nameAr: string;
    nameEn: string;
    logo?: string | null;
    isActive: boolean;
    sortOrder: number;
    createdAt: string;
}
export type UpdateBrandResponse = Brand;
export type GetBrandResponse = BrandListItem;
//# sourceMappingURL=brand.d.ts.map