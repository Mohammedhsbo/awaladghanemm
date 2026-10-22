import { z } from "zod";
export const createCustomerInquirySchema = z.object({
    customerId: z.string().uuid(),
    address: z.string().trim().min(1),
    phone: z.string().trim().min(1).max(20),
    occupation: z.string().trim().min(1).max(200),
    occupationAddress: z.string().trim().min(1),
});
//# sourceMappingURL=customer-inquiry.js.map