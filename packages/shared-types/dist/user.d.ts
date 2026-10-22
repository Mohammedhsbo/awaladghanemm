import { z } from "zod";
import { Language } from "./enums.js";
import type { RoleListItem } from "./role.js";
export declare const createUserRequestSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    whatsappSenderNumber: z.ZodOptional<z.ZodString>;
    roleId: z.ZodString;
    branchId: z.ZodOptional<z.ZodString>;
    lang: z.ZodDefault<z.ZodNativeEnum<typeof Language>>;
}, "strict", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
    roleId: string;
    lang: Language;
    phone?: string | undefined;
    whatsappSenderNumber?: string | undefined;
    branchId?: string | undefined;
}, {
    name: string;
    email: string;
    password: string;
    roleId: string;
    phone?: string | undefined;
    whatsappSenderNumber?: string | undefined;
    branchId?: string | undefined;
    lang?: Language | undefined;
}>;
export declare const updateUserRequestSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    whatsappSenderNumber: z.ZodOptional<z.ZodString>;
    roleId: z.ZodOptional<z.ZodString>;
    branchId: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    lang: z.ZodOptional<z.ZodNativeEnum<typeof Language>>;
}, "strict", z.ZodTypeAny, {
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    whatsappSenderNumber?: string | undefined;
    roleId?: string | undefined;
    branchId?: string | undefined;
    lang?: Language | undefined;
    isActive?: boolean | undefined;
}, {
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    whatsappSenderNumber?: string | undefined;
    roleId?: string | undefined;
    branchId?: string | undefined;
    lang?: Language | undefined;
    isActive?: boolean | undefined;
}>, {
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    whatsappSenderNumber?: string | undefined;
    roleId?: string | undefined;
    branchId?: string | undefined;
    lang?: Language | undefined;
    isActive?: boolean | undefined;
}, {
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    whatsappSenderNumber?: string | undefined;
    roleId?: string | undefined;
    branchId?: string | undefined;
    lang?: Language | undefined;
    isActive?: boolean | undefined;
}>;
export declare const selfUpdateUserRequestSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    whatsappSenderNumber: z.ZodOptional<z.ZodString>;
    currentPassword: z.ZodOptional<z.ZodString>;
    newPassword: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    name?: string | undefined;
    phone?: string | undefined;
    whatsappSenderNumber?: string | undefined;
    currentPassword?: string | undefined;
    newPassword?: string | undefined;
}, {
    name?: string | undefined;
    phone?: string | undefined;
    whatsappSenderNumber?: string | undefined;
    currentPassword?: string | undefined;
    newPassword?: string | undefined;
}>, {
    name?: string | undefined;
    phone?: string | undefined;
    whatsappSenderNumber?: string | undefined;
    currentPassword?: string | undefined;
    newPassword?: string | undefined;
}, {
    name?: string | undefined;
    phone?: string | undefined;
    whatsappSenderNumber?: string | undefined;
    currentPassword?: string | undefined;
    newPassword?: string | undefined;
}>, {
    name?: string | undefined;
    phone?: string | undefined;
    whatsappSenderNumber?: string | undefined;
    currentPassword?: string | undefined;
    newPassword?: string | undefined;
}, {
    name?: string | undefined;
    phone?: string | undefined;
    whatsappSenderNumber?: string | undefined;
    currentPassword?: string | undefined;
    newPassword?: string | undefined;
}>;
export declare const resetPasswordRequestSchema: z.ZodObject<{
    newPassword: z.ZodString;
}, "strict", z.ZodTypeAny, {
    newPassword: string;
}, {
    newPassword: string;
}>;
export declare const listUsersQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    roleId: z.ZodOptional<z.ZodString>;
    branchId: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    roleId?: string | undefined;
    branchId?: string | undefined;
    isActive?: boolean | undefined;
    search?: string | undefined;
}, {
    roleId?: string | undefined;
    branchId?: string | undefined;
    isActive?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    search?: string | undefined;
}>;
export interface Branch {
    id: string;
    nameAr: string;
    nameEn: string;
    address?: string | null;
    phone?: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface BranchSummary {
    id: string;
    nameAr: string;
    nameEn: string;
}
export interface User {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    phone?: string | null;
    whatsappSenderNumber?: string | null;
    branchId?: string | null;
    roleId: string;
    lang: Language;
    isActive: boolean;
    lastLoginAt?: string | null;
    createdAt: string;
    updatedAt: string;
}
export interface UserListItem {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    whatsappSenderNumber?: string | null;
    role: Pick<RoleListItem, "id" | "name">;
    branch?: BranchSummary | null;
    isActive: boolean;
    lastLoginAt?: string | null;
    createdAt: string;
}
export interface UserResponse {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    whatsappSenderNumber?: string | null;
    roleId: string;
    branchId?: string | null;
    lang: Language;
    isActive: boolean;
    createdAt: string;
}
export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;
export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;
export type ResetPasswordRequest = z.infer<typeof resetPasswordRequestSchema>;
export type ListUsersQuery = z.infer<typeof listUsersQuerySchema>;
export type SelfUpdateUserRequest = z.infer<typeof selfUpdateUserRequestSchema>;
//# sourceMappingURL=user.d.ts.map