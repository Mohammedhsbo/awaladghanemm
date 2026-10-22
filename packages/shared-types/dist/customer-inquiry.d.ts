import { z } from "zod";
export declare const createCustomerInquirySchema: z.ZodObject<{
    customerId: z.ZodString;
    address: z.ZodString;
    phone: z.ZodString;
    occupation: z.ZodString;
    occupationAddress: z.ZodString;
}, "strip", z.ZodTypeAny, {
    phone: string;
    address: string;
    customerId: string;
    occupation: string;
    occupationAddress: string;
}, {
    phone: string;
    address: string;
    customerId: string;
    occupation: string;
    occupationAddress: string;
}>;
export type CreateCustomerInquiryDto = z.infer<typeof createCustomerInquirySchema>;
export interface CustomerInquiryResponse {
    id: string;
    customerId: string;
    customer: {
        id: string;
        name: string;
        phone: string;
    };
    address: string;
    phone: string;
    occupation: string;
    occupationAddress: string;
    idCardFrontImage: string;
    idCardBackImage: string;
    createdBy: string;
    createdAt: string;
}
//# sourceMappingURL=customer-inquiry.d.ts.map