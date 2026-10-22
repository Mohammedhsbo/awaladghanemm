import { z } from "zod";
// Base schemas
const nameSchema = z.string().trim().min(2, "Name must be at least 2 characters").max(200, "Name is too long");
const emailSchema = z.string().trim().email("Invalid email format").max(255, "Email is too long");
const nationalIdSchema = z.string().trim().regex(/^[a-zA-Z0-9]+$/, "National ID must be alphanumeric").max(20, "National ID is too long");
const notesSchema = z.string().max(2000, "Notes are too long");
const passwordSchema = z.string().min(8, "Password must be at least 8 characters");
const uuidSchema = z.string().uuid();
// Phone validation schema - accepts international format or 9-15 digits
const phoneRawSchema = z.string().trim().min(1, "Phone is required");
// Phone normalization utility
export function normalizePhone(phone) {
    // Remove spaces and dashes
    let normalized = phone.replace(/[\s-]/g, "");
    // Preserve international format (starts with +)
    // Validation: must start with + or be 9-15 digits
    if (!normalized.startsWith("+") && !/^\d{9,15}$/.test(normalized)) {
        throw new Error("Invalid phone format");
    }
    return normalized;
}
// Phone schema with normalization
export const phoneSchema = phoneRawSchema.transform((val) => normalizePhone(val));
// RegisterCustomerDto (e-commerce self-registration)
export const registerCustomerSchema = z
    .object({
    name: nameSchema,
    phone: phoneSchema,
    email: emailSchema,
    password: passwordSchema,
    nationalId: nationalIdSchema.optional(),
    occupationAddress: z.string().trim().max(500).optional(),
    address: z
        .object({
        label: z.string().max(100).optional(),
        addressLine: z.string().trim().min(1, "Address line is required").max(500),
        city: z.string().max(100).optional(),
        region: z.string().max(100).optional(),
        postalCode: z.string().max(20).optional(),
        country: z.string().max(100).optional(),
    })
        .optional(),
})
    .strict();
// CreateCustomerDto (staff creation - POS/Admin)
export const createCustomerSchema = z
    .object({
    name: nameSchema,
    phone: phoneSchema,
    email: emailSchema.optional(),
    nationalId: nationalIdSchema.optional(),
    occupationAddress: z.string().trim().max(500).optional(),
    notes: notesSchema.optional(),
    address: z
        .object({
        label: z.string().max(100).optional(),
        addressLine: z.string().trim().min(1, "Address line is required").max(500),
        city: z.string().max(100).optional(),
        region: z.string().max(100).optional(),
        postalCode: z.string().max(20).optional(),
        country: z.string().max(100).optional(),
    })
        .optional(),
})
    .strict();
// UpdateCustomerDto
export const updateCustomerSchema = z
    .object({
    name: nameSchema.optional(),
    phone: phoneSchema.optional(),
    email: emailSchema.optional(),
    nationalId: nationalIdSchema.optional(),
    occupationAddress: z.string().trim().max(500).optional(),
    notes: notesSchema.optional(),
    isActive: z.boolean().optional(),
})
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
});
// CustomerSearchDto (for POS search)
export const customerSearchSchema = z
    .object({
    q: z.string().trim().min(1, "Search query is required"),
    limit: z.coerce.number().int().positive().max(20).default(10),
})
    .strict();
// Customer list query schema
export const listCustomersQuerySchema = z
    .object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
    search: z.string().trim().optional(),
    hasEmail: z.coerce.boolean().optional(),
    hasNationalId: z.coerce.boolean().optional(),
    isActive: z.coerce.boolean().optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    sort: z.enum(["name", "createdAt"]).default("createdAt"),
    order: z.enum(["asc", "desc"]).default("desc"),
})
    .strict();
// Change password schema (e-commerce)
export const changeCustomerPasswordSchema = z
    .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: passwordSchema,
})
    .strict();
// Deactivate customer schema
export const deactivateCustomerSchema = z
    .object({
    reason: z.string().trim().min(1, "Reason is required"),
})
    .strict();
//# sourceMappingURL=customer.js.map