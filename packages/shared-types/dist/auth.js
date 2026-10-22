import { z } from "zod";
import { languageSchema } from "./enums.js";
const emailSchema = z.string().trim().email().max(255);
const passwordSchema = z.string().min(8);
const nameSchema = z.string().trim().min(1).max(200);
const phoneSchema = z.string().trim().max(20);
export const registerRequestSchema = z
    .object({
    name: nameSchema,
    phone: phoneSchema,
    email: emailSchema,
    password: passwordSchema,
})
    .strict();
export const loginRequestSchema = z
    .object({
    email: emailSchema,
    password: z.string().min(1),
})
    .strict();
export const changePasswordRequestSchema = z
    .object({
    currentPassword: z.string().min(1),
    newPassword: passwordSchema,
})
    .strict();
export const currentUserResponseSchema = z.object({
    id: z.string().uuid(),
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema.optional().nullable(),
    role: z.object({
        id: z.string().uuid(),
        name: z.string(),
        permissions: z.array(z.object({
            resource: z.string(),
            action: z.string(),
        })),
    }),
    branchId: z.string().uuid().optional().nullable(),
    branch: z
        .object({
        id: z.string().uuid(),
        nameAr: z.string(),
        nameEn: z.string(),
    })
        .optional()
        .nullable(),
    lang: languageSchema,
    lastLoginAt: z.string().datetime().optional().nullable(),
});
//# sourceMappingURL=auth.js.map