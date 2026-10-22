import { z } from "zod";
const nameArSchema = z.string().trim().min(1).max(200);
const nameEnSchema = z.string().trim().min(1).max(200);
const uuidSchema = z.string().uuid();
const sortOrderSchema = z.number().int().default(0);
export const createCategoryRequestSchema = z
    .object({
    nameAr: nameArSchema,
    nameEn: nameEnSchema,
    parentId: uuidSchema.optional(),
    sortOrder: sortOrderSchema.optional(),
})
    .strict();
export const updateCategoryRequestSchema = z
    .object({
    nameAr: nameArSchema.optional(),
    nameEn: nameEnSchema.optional(),
    parentId: uuidSchema.optional(),
    isActive: z.boolean().optional(),
    sortOrder: sortOrderSchema.optional(),
})
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
});
export const listCategoriesQuerySchema = z
    .object({
    isActive: z.coerce.boolean().optional(),
    flat: z.coerce.boolean().default(false),
})
    .strict();
//# sourceMappingURL=category.js.map