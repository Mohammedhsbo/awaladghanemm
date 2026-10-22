import { z } from "zod";
import { type Language } from "./enums.js";
import type { RolePermissionInput } from "./role.js";
import type { BranchSummary } from "./user.js";
export declare const registerRequestSchema: z.ZodObject<{
    name: z.ZodString;
    phone: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strict", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
    phone: string;
}, {
    name: string;
    email: string;
    password: string;
    phone: string;
}>;
export declare const loginRequestSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strict", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const changePasswordRequestSchema: z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
}, "strict", z.ZodTypeAny, {
    currentPassword: string;
    newPassword: string;
}, {
    currentPassword: string;
    newPassword: string;
}>;
export type RegisterRequest = z.infer<typeof registerRequestSchema>;
export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type ChangePasswordRequest = z.infer<typeof changePasswordRequestSchema>;
export interface ApiSuccessResponse<T> {
    success: true;
    data: T;
    meta?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
export interface ApiErrorResponse {
    success: false;
    error: {
        code: string;
        message: string;
        details?: unknown;
    };
}
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
export interface RegisterResponse {
    id: string;
    name: string;
    email: string;
    phone: string;
}
export interface AuthRole {
    id: string;
    name: string;
    permissions: RolePermissionInput[];
}
export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: AuthRole;
    branchId?: string | null;
    lang: Language;
}
export interface LoginResponse {
    accessToken: string;
    user: AuthUser;
}
export interface RefreshTokenResponse {
    accessToken: string;
}
export interface CurrentUserResponse extends AuthUser {
    phone?: string | null;
    branch?: BranchSummary | null;
    lastLoginAt?: string | null;
}
export type LogoutResponse = null;
export type ChangePasswordResponse = null;
export declare const currentUserResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    role: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        permissions: z.ZodArray<z.ZodObject<{
            resource: z.ZodString;
            action: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            resource: string;
            action: string;
        }, {
            resource: string;
            action: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        name: string;
        permissions: {
            resource: string;
            action: string;
        }[];
        id: string;
    }, {
        name: string;
        permissions: {
            resource: string;
            action: string;
        }[];
        id: string;
    }>;
    branchId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    branch: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        nameAr: z.ZodString;
        nameEn: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        nameAr: string;
        nameEn: string;
    }, {
        id: string;
        nameAr: string;
        nameEn: string;
    }>>>;
    lang: z.ZodNativeEnum<typeof Language>;
    lastLoginAt: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    role: {
        name: string;
        permissions: {
            resource: string;
            action: string;
        }[];
        id: string;
    };
    name: string;
    email: string;
    lang: Language;
    id: string;
    branch?: {
        id: string;
        nameAr: string;
        nameEn: string;
    } | null | undefined;
    phone?: string | null | undefined;
    branchId?: string | null | undefined;
    lastLoginAt?: string | null | undefined;
}, {
    role: {
        name: string;
        permissions: {
            resource: string;
            action: string;
        }[];
        id: string;
    };
    name: string;
    email: string;
    lang: Language;
    id: string;
    branch?: {
        id: string;
        nameAr: string;
        nameEn: string;
    } | null | undefined;
    phone?: string | null | undefined;
    branchId?: string | null | undefined;
    lastLoginAt?: string | null | undefined;
}>;
//# sourceMappingURL=auth.d.ts.map