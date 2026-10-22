import { z } from "zod";
const nameArSchema = z.string().trim().min(1).max(200);
const nameEnSchema = z.string().trim().min(1).max(200);
const logoSchema = z.string().trim().url().max(500);
const uuidSchema = z.string().uuid();
const sortOrderSchema = z.number().int().default(0);
export const createBrandRequestSchema = z
    .object({
    nameAr: nameArSchema,
    nameEn: nameEnSchema,
    logo: logoSchema.optional(),
    sortOrder: sortOrderSchema.optional(),
})
    .strict();
export const updateBrandRequestSchema = z
    .object({
    nameAr: nameArSchema.optional(),
    nameEn: nameEnSchema.optional(),
    logo: logoSchema.optional(),
    isActive: z.boolean().optional(),
    sortOrder: sortOrderSchema.optional(),
})
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
});
export const listBrandsQuerySchema = z
    .object({
    isActive: z.coerce.boolean().optional(),
})
    .strict();
//# sourceMappingURL=brand.js.map