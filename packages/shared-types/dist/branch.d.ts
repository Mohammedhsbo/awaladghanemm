import { z } from "zod";
export declare const createBranchRequestSchema: z.ZodObject<{
    nameAr: z.ZodString;
    nameEn: z.ZodString;
    address: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    isActive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strict", z.ZodTypeAny, {
    isActive: boolean;
    nameAr: string;
    nameEn: string;
    phone?: string | undefined;
    address?: string | undefined;
}, {
    nameAr: string;
    nameEn: string;
    phone?: string | undefined;
    isActive?: boolean | undefined;
    address?: string | undefined;
}>;
export declare const updateBranchRequestSchema: z.ZodEffects<z.ZodObject<{
    nameAr: z.ZodOptional<z.ZodString>;
    nameEn: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    phone?: string | undefined;
    isActive?: boolean | undefined;
    nameAr?: string | undefined;
    nameEn?: string | undefined;
    address?: string | undefined;
}, {
    phone?: string | undefined;
    isActive?: boolean | undefined;
    nameAr?: string | undefined;
    nameEn?: string | undefined;
    address?: string | undefined;
}>, {
    phone?: string | undefined;
    isActive?: boolean | undefined;
    nameAr?: string | undefined;
    nameEn?: string | undefined;
    address?: string | undefined;
}, {
    phone?: string | undefined;
    isActive?: boolean | undefined;
    nameAr?: string | undefined;
    nameEn?: string | undefined;
    address?: string | undefined;
}>;
export declare const listBranchesQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    isActive?: boolean | undefined;
    search?: string | undefined;
}, {
    isActive?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    search?: string | undefined;
}>;
export type CreateBranchRequest = z.infer<typeof createBranchRequestSchema>;
export type UpdateBranchRequest = z.infer<typeof updateBranchRequestSchema>;
export type ListBranchesQuery = z.infer<typeof listBranchesQuerySchema>;
export declare const branchIdSchema: z.ZodString;
//# sourceMappingURL=branch.d.ts.map