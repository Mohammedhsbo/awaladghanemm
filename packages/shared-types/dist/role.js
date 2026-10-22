import { z } from "zod";
import { actionSchema, resourceSchema } from "./enums.js";
const roleNameSchema = z
    .string()
    .trim()
    .min(1)
    .max(100)
    .regex(/^[A-Za-z0-9_ ]+$/);
export const rolePermissionInputSchema = z.object({
    resource: resourceSchema,
    action: actionSchema,
});
const uniquePermissions = (permissions) => {
    const keys = new Set(permissions.map((permission) => `${permission.resource}:${permission.action}`));
    return keys.size === permissions.length;
};
export const createRoleRequestSchema = z
    .object({
    name: roleNameSchema,
    description: z.string().trim().optional(),
    permissions: z.array(rolePermissionInputSchema).refine(uniquePermissions, {
        message: "Role permissions must not contain duplicates",
    }),
})
    .strict();
export const updateRoleRequestSchema = z
    .object({
    name: roleNameSchema.optional(),
    description: z.string().trim().optional(),
    permissions: z
        .array(rolePermissionInputSchema)
        .refine(uniquePermissions, {
        message: "Role permissions must not contain duplicates",
    })
        .optional(),
})
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
});
//# sourceMappingURL=role.js.map