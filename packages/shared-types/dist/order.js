import { z } from "zod";
// ─────────────────────────────────────────────────────────
// Order Status Enum
// ─────────────────────────────────────────────────────────
export var OrderStatus;
(function (OrderStatus) {
    OrderStatus["DRAFT"] = "draft";
    OrderStatus["CONFIRMED"] = "confirmed";
    OrderStatus["PROCESSING"] = "processing";
    OrderStatus["AWAITING_DELIVERY"] = "awaiting_delivery";
    OrderStatus["COMPLETED"] = "completed";
    OrderStatus["CANCELLED"] = "cancelled";
    OrderStatus["REFUNDED"] = "refunded";
})(OrderStatus || (OrderStatus = {}));
export const orderStatusSchema = z.nativeEnum(OrderStatus);
export const orderItemSchema = z.object({
    id: z.string().uuid(),
    orderId: z.string().uuid(),
    motorcycleId: z.string().uuid(),
    unitPrice: z.number().min(0, "Unit price must be positive"),
    discount: z.number().min(0, "Discount cannot be negative").default(0),
});
export const orderSchema = z.object({
    id: z.string().uuid(),
    orderNumber: z.string().max(30),
    customerId: z.string().uuid(),
    branchId: z.string().uuid(),
    userId: z.string().uuid(),
    status: orderStatusSchema,
    totalAmount: z.number().min(0),
    discount: z.number().min(0).default(0),
    netAmount: z.number().min(0),
    address: z.string().max(1000).optional().nullable(),
    notes: z.string().max(2000, "Notes are too long").optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});
// ─────────────────────────────────────────────────────────
// Create Order DTOs
// ─────────────────────────────────────────────────────────
export const createOrderSchema = z
    .object({
    customerId: z.string().uuid("Invalid customer ID"),
    branchId: z.string().uuid("Invalid branch ID").optional(),
    motorcycleIds: z
        .array(z.string().uuid("Invalid motorcycle ID"))
        .min(1, "At least one motorcycle is required")
        .max(50, "Cannot order more than 50 motorcycles at once"),
    discount: z
        .number()
        .min(0, "Discount cannot be negative")
        .default(0),
    address: z.string().max(1000, "Address is too long").optional(), // Delivery/billing address snapshot
    notes: z.string().max(2000, "Notes are too long").optional(),
    isDraft: z.boolean().default(false), // POS only
})
    .strict();
// ─────────────────────────────────────────────────────────
// Update Order DTOs
// ─────────────────────────────────────────────────────────
export const updateOrderSchema = z
    .object({
    customerId: z.string().uuid("Invalid customer ID").optional(),
    motorcycleIds: z
        .array(z.string().uuid("Invalid motorcycle ID"))
        .min(1, "At least one motorcycle is required")
        .max(50, "Cannot order more than 50 motorcycles at once")
        .optional(),
    discount: z.number().min(0, "Discount cannot be negative").optional(),
    address: z.string().max(1000, "Address is too long").optional(),
    notes: z.string().max(2000, "Notes are too long").optional(),
})
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
});
// ─────────────────────────────────────────────────────────
// Order Status Transition DTOs
// ─────────────────────────────────────────────────────────
export const changeOrderStatusSchema = z
    .object({
    status: orderStatusSchema,
    reason: z.string().max(500, "Reason is too long").optional(),
})
    .strict();
// ─────────────────────────────────────────────────────────
// Cancel Order DTOs
// ─────────────────────────────────────────────────────────
export const cancelOrderSchema = z
    .object({
    reason: z.string().max(500, "Reason is too long").optional(),
})
    .strict();
// ─────────────────────────────────────────────────────────
// Order Query/Filter DTOs
// ─────────────────────────────────────────────────────────
export const listOrdersQuerySchema = z
    .object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
    search: z.string().trim().optional(), // Order number, customer name, phone, VIN
    customerId: z.string().uuid().optional(),
    branchId: z.string().uuid().optional(),
    status: orderStatusSchema.optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    sort: z.enum(["createdAt", "netAmount", "orderNumber"]).default("createdAt"),
    order: z.enum(["asc", "desc"]).default("desc"),
})
    .strict();
// ─────────────────────────────────────────────────────────
// Order Validation Helpers
// ─────────────────────────────────────────────────────────
export const ORDER_STATUS_TRANSITIONS = {
    [OrderStatus.DRAFT]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
    [OrderStatus.CONFIRMED]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
    [OrderStatus.PROCESSING]: [
        OrderStatus.AWAITING_DELIVERY,
        OrderStatus.COMPLETED,
        OrderStatus.REFUNDED,
    ],
    [OrderStatus.AWAITING_DELIVERY]: [OrderStatus.COMPLETED],
    [OrderStatus.COMPLETED]: [], // Terminal state
    [OrderStatus.CANCELLED]: [], // Terminal state
    [OrderStatus.REFUNDED]: [], // Terminal state
};
export function isValidOrderStatusTransition(from, to) {
    return ORDER_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}
export function getMotorcycleStatusForOrderStatus(orderStatus) {
    switch (orderStatus) {
        case OrderStatus.DRAFT:
            return null; // No change
        case OrderStatus.CONFIRMED:
        case OrderStatus.PROCESSING:
        case OrderStatus.AWAITING_DELIVERY:
        case OrderStatus.COMPLETED:
            return "sold";
        case OrderStatus.CANCELLED:
        case OrderStatus.REFUNDED:
            return "available";
        default:
            return null;
    }
}
//# sourceMappingURL=order.js.map