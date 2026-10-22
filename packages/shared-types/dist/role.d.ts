import { z } from "zod";
import { type Action, type Resource } from "./enums.js";
export declare const rolePermissionInputSchema: z.ZodObject<{
    resource: z.ZodNativeEnum<typeof Resource>;
    action: z.ZodNativeEnum<typeof Action>;
}, "strip", z.ZodTypeAny, {
    resource: Resource;
    action: Action;
}, {
    resource: Resource;
    action: Action;
}>;
export declare const createRoleRequestSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    permissions: z.ZodEffects<z.ZodArray<z.ZodObject<{
        resource: z.ZodNativeEnum<typeof Resource>;
        action: z.ZodNativeEnum<typeof Action>;
    }, "strip", z.ZodTypeAny, {
        resource: Resource;
        action: Action;
    }, {
        resource: Resource;
        action: Action;
    }>, "many">, {
        resource: Resource;
        action: Action;
    }[], {
        resource: Resource;
        action: Action;
    }[]>;
}, "strict", z.ZodTypeAny, {
    name: string;
    permissions: {
        resource: Resource;
        action: Action;
    }[];
    description?: string | undefined;
}, {
    name: string;
    permissions: {
        resource: Resource;
        action: Action;
    }[];
    description?: string | undefined;
}>;
export declare const updateRoleRequestSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    permissions: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodObject<{
        resource: z.ZodNativeEnum<typeof Resource>;
        action: z.ZodNativeEnum<typeof Action>;
    }, "strip", z.ZodTypeAny, {
        resource: Resource;
        action: Action;
    }, {
        resource: Resource;
        action: Action;
    }>, "many">, {
        resource: Resource;
        action: Action;
    }[], {
        resource: Resource;
        action: Action;
    }[]>>;
}, "strict", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    permissions?: {
        resource: Resource;
        action: Action;
    }[] | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    permissions?: {
        resource: Resource;
        action: Action;
    }[] | undefined;
}>, {
    name?: string | undefined;
    description?: string | undefined;
    permissions?: {
        resource: Resource;
        action: Action;
    }[] | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    permissions?: {
        resource: Resource;
        action: Action;
    }[] | undefined;
}>;
export interface RolePermission {
    id: string;
    roleId: string;
    resource: Resource;
    action: Action;
}
export interface RolePermissionInput {
    resource: Resource;
    action: Action;
}
export interface Role {
    id: string;
    name: string;
    description?: string | null;
    isSystem: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface RoleWithPermissions extends Role {
    permissions: RolePermission[];
}
export interface RoleListItem extends Role {
    _count: {
        users: number;
        permissions: number;
    };
}
export type CreateRoleRequest = z.infer<typeof createRoleRequestSchema>;
export type UpdateRoleRequest = z.infer<typeof updateRoleRequestSchema>;
export interface CreateRoleResponse {
    id: string;
    name: string;
    description?: string | null;
    isSystem: boolean;
    permissions: RolePermissionInput[];
    createdAt: string;
}
export type UpdateRoleResponse = RoleWithPermissions;
//# sourceMappingURL=role.d.ts.map