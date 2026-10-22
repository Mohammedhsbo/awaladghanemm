import { z } from "zod";
export declare const createCategoryRequestSchema: z.ZodObject<{
    nameAr: z.ZodString;
    nameEn: z.ZodString;
    parentId: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, "strict", z.ZodTypeAny, {
    nameAr: string;
    nameEn: string;
    sortOrder?: number | undefined;
    parentId?: string | undefined;
}, {
    nameAr: string;
    nameEn: string;
    sortOrder?: number | undefined;
    parentId?: string | undefined;
}>;
export declare const updateCategoryRequestSchema: z.ZodEffects<z.ZodObject<{
    nameAr: z.ZodOptional<z.ZodString>;
    nameEn: z.ZodOptional<z.ZodString>;
    parentId: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    sortOrder: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, "strict", z.ZodTypeAny, {
    isActive?: boolean | undefined;
    nameAr?: string | undefined;
    nameEn?: string | undefined;
    sortOrder?: number | undefined;
    parentId?: string | undefined;
}, {
    isActive?: boolean | undefined;
    nameAr?: string | undefined;
    nameEn?: string | undefined;
    sortOrder?: number | undefined;
    parentId?: string | undefined;
}>, {
    isActive?: boolean | undefined;
    nameAr?: string | undefined;
    nameEn?: string | undefined;
    sortOrder?: number | undefined;
    parentId?: string | undefined;
}, {
    isActive?: boolean | undefined;
    nameAr?: string | undefined;
    nameEn?: string | undefined;
    sortOrder?: number | undefined;
    parentId?: string | undefined;
}>;
export declare const listCategoriesQuerySchema: z.ZodObject<{
    isActive: z.ZodOptional<z.ZodBoolean>;
    flat: z.ZodDefault<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    flat: boolean;
    isActive?: boolean | undefined;
}, {
    flat?: boolean | undefined;
    isActive?: boolean | undefined;
}>;
export interface Category {
    id: string;
    nameAr: string;
    nameEn: string;
    parentId?: string | null;
    isActive: boolean;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
}
export interface CategoryTreeItem extends Category {
    children?: CategoryTreeItem[];
    _count?: {
        motorcycles: number;
    };
}
export interface CategoryFlatItem extends Category {
    depth: number;
    path: string;
    _count?: {
        motorcycles: number;
    };
}
export interface CategoryWithRelations extends Category {
    parent?: CategorySummary | null;
    children: CategorySummary[];
    _count: {
        motorcycles: number;
    };
}
export interface CategorySummary {
    id: string;
    nameAr: string;
    nameEn: string;
    sortOrder?: number;
}
export type CreateCategoryRequest = z.infer<typeof createCategoryRequestSchema>;
export type UpdateCategoryRequest = z.infer<typeof updateCategoryRequestSchema>;
export type ListCategoriesQuery = z.infer<typeof listCategoriesQuerySchema>;
export interface CreateCategoryResponse {
    id: string;
    nameAr: string;
    nameEn: string;
    parentId?: string | null;
    isActive: boolean;
    sortOrder: number;
    createdAt: string;
}
export type UpdateCategoryResponse = Category;
export type GetCategoryResponse = CategoryWithRelations;
//# sourceMappingURL=category.d.ts.map