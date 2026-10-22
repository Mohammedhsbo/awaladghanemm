import { z } from "zod";
export declare const supplierSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    contactPerson: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    phone: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    email: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    address: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    isActive: z.ZodBoolean;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    name: string;
    isActive: boolean;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    notes?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    address?: string | null | undefined;
    contactPerson?: string | null | undefined;
}, {
    name: string;
    isActive: boolean;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    notes?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    address?: string | null | undefined;
    contactPerson?: string | null | undefined;
}>;
export type Supplier = z.infer<typeof supplierSchema>;
export declare const createSupplierSchema: z.ZodObject<{
    name: z.ZodString;
    contactPerson: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    notes?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    address?: string | undefined;
    contactPerson?: string | undefined;
}, {
    name: string;
    notes?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    address?: string | undefined;
    contactPerson?: string | undefined;
}>;
export type CreateSupplierRequest = z.infer<typeof createSupplierSchema>;
export declare const updateSupplierSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    contactPerson: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    phone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    email: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    address: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
} & {
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    notes?: string | undefined;
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    isActive?: boolean | undefined;
    address?: string | undefined;
    contactPerson?: string | undefined;
}, {
    notes?: string | undefined;
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    isActive?: boolean | undefined;
    address?: string | undefined;
    contactPerson?: string | undefined;
}>;
export type UpdateSupplierRequest = z.infer<typeof updateSupplierSchema>;
//# sourceMappingURL=supplier.d.ts.map