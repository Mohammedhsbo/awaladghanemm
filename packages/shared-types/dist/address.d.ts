import { z } from "zod";
export interface Address {
    id: string;
    customerId: string;
    label: string;
    addressLine: string;
    city?: string | null;
    region?: string | null;
    postalCode?: string | null;
    country: string;
    isDefault: boolean;
    notes?: string | null;
    createdAt: string;
    updatedAt: string;
}
export declare const createAddressSchema: z.ZodObject<{
    label: z.ZodDefault<z.ZodString>;
    addressLine: z.ZodString;
    city: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    postalCode: z.ZodOptional<z.ZodString>;
    country: z.ZodDefault<z.ZodString>;
    isDefault: z.ZodDefault<z.ZodBoolean>;
    notes: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    label: string;
    addressLine: string;
    country: string;
    isDefault: boolean;
    city?: string | undefined;
    region?: string | undefined;
    postalCode?: string | undefined;
    notes?: string | undefined;
}, {
    addressLine: string;
    label?: string | undefined;
    city?: string | undefined;
    region?: string | undefined;
    postalCode?: string | undefined;
    country?: string | undefined;
    isDefault?: boolean | undefined;
    notes?: string | undefined;
}>;
export type CreateAddressDto = z.infer<typeof createAddressSchema>;
export declare const updateAddressSchema: z.ZodEffects<z.ZodObject<{
    label: z.ZodOptional<z.ZodString>;
    addressLine: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    postalCode: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    isDefault: z.ZodOptional<z.ZodBoolean>;
    notes: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    label?: string | undefined;
    addressLine?: string | undefined;
    city?: string | undefined;
    region?: string | undefined;
    postalCode?: string | undefined;
    country?: string | undefined;
    isDefault?: boolean | undefined;
    notes?: string | undefined;
}, {
    label?: string | undefined;
    addressLine?: string | undefined;
    city?: string | undefined;
    region?: string | undefined;
    postalCode?: string | undefined;
    country?: string | undefined;
    isDefault?: boolean | undefined;
    notes?: string | undefined;
}>, {
    label?: string | undefined;
    addressLine?: string | undefined;
    city?: string | undefined;
    region?: string | undefined;
    postalCode?: string | undefined;
    country?: string | undefined;
    isDefault?: boolean | undefined;
    notes?: string | undefined;
}, {
    label?: string | undefined;
    addressLine?: string | undefined;
    city?: string | undefined;
    region?: string | undefined;
    postalCode?: string | undefined;
    country?: string | undefined;
    isDefault?: boolean | undefined;
    notes?: string | undefined;
}>;
export type UpdateAddressDto = z.infer<typeof updateAddressSchema>;
export interface AddressListItem {
    id: string;
    label: string;
    addressLine: string;
    city?: string | null;
    region?: string | null;
    postalCode?: string | null;
    country: string;
    isDefault: boolean;
    notes?: string | null;
    createdAt: string;
}
//# sourceMappingURL=address.d.ts.map