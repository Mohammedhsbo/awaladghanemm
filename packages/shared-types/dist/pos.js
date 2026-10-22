import { z } from "zod";
// ─────────────────────────────────────────────────────────
// POS Transaction Types
// ─────────────────────────────────────────────────────────
export var POSTransactionType;
(function (POSTransactionType) {
    POSTransactionType["ORDER"] = "order";
    POSTransactionType["RESERVATION"] = "reservation";
})(POSTransactionType || (POSTransactionType = {}));
export const posTransactionTypeSchema = z.nativeEnum(POSTransactionType);
export const posCustomerSearchSchema = z.object({
    q: z.string().trim().refine((value) => value.length === 0 || value.length >= 2, {
        message: "Search term must be at least 2 characters",
    }).optional().default(""),
    limit: z.coerce.number().min(1).max(20).default(10),
    page: z.coerce.number().int().min(1).default(1),
});
export const posMotorcycleSearchSchema = z.object({
    q: z.string().min(2, "Search term must be at least 2 characters").optional(),
    branchId: z.string().uuid().optional(),
    limit: z.coerce.number().min(1).max(50).default(20),
});
export const DISCOUNT_LIMITS = {
    cashier: {
        maxPercent: 5,
        maxAmount: 2000,
    },
    branch_manager: {
        maxPercent: 15,
        maxAmount: 10000,
    },
    super_admin: {
        maxPercent: 100,
        maxAmount: Number.MAX_SAFE_INTEGER,
    },
};
export function getDiscountLimits(role) {
    const normalizedRole = role.toLowerCase();
    if (normalizedRole === "super_admin") {
        return DISCOUNT_LIMITS.super_admin;
    }
    if (normalizedRole === "branch_manager" || normalizedRole.includes("manager")) {
        return DISCOUNT_LIMITS.branch_manager;
    }
    // Default to cashier limits
    return DISCOUNT_LIMITS.cashier;
}
export function canApplyDiscount(discountAmount, totalAmount, role) {
    const limits = getDiscountLimits(role);
    const discountPercent = (discountAmount / totalAmount) * 100;
    if (discountAmount > limits.maxAmount) {
        return {
            authorized: false,
            reason: `Discount amount exceeds limit for ${role} (${limits.maxAmount} EGP)`,
        };
    }
    if (discountPercent > limits.maxPercent) {
        return {
            authorized: false,
            reason: `Discount percentage exceeds limit for ${role} (${limits.maxPercent}%)`,
        };
    }
    return { authorized: true };
}
// ─────────────────────────────────────────────────────────
// Idempotency Key Generation
// ─────────────────────────────────────────────────────────
export function generateIdempotencyKey(userId, data) {
    const ts = data.timestamp || Date.now();
    return `pos-${userId}-${data.customerId}-${data.motorcycleId}-${ts}`;
}
export const idempotencyKeySchema = z
    .string()
    .min(10, "Idempotency key too short")
    .regex(/^pos-/, "Invalid idempotency key format");
// ─────────────────────────────────────────────────────────
// POS Transaction DTOs
// ─────────────────────────────────────────────────────────
export const validatePOSTransactionSchema = z.object({
    customerId: z.string().uuid(),
    motorcycleId: z.string().uuid(),
    type: posTransactionTypeSchema,
    discount: z.number().min(0).optional(),
    depositAmount: z.number().min(0).optional(),
});
export const createPOSTransactionSchema = z.object({
    type: posTransactionTypeSchema,
    customerId: z.string().uuid(),
    motorcycleId: z.string().uuid(),
    discount: z
        .object({
        amount: z.number().min(0),
        reason: z.string().optional(),
    })
        .optional(),
    reservationData: z
        .object({
        depositAmount: z.number().min(0),
        expirationDays: z.number().min(1).max(90).optional(),
    })
        .optional(),
    address: z.string().max(1000).optional(),
    idempotencyKey: idempotencyKeySchema,
    notes: z.string().max(1000).optional(),
});
// ─────────────────────────────────────────────────────────
// POS Active Reservations
// ─────────────────────────────────────────────────────────
export const posActiveReservationsQuerySchema = z.object({
    branchId: z.string().uuid().optional(),
    customerId: z.string().uuid().optional(),
    expiringInDays: z.coerce.number().min(0).max(30).optional(),
});
export const convertPOSReservationSchema = z.object({
    notes: z.string().max(1000).optional(),
});
// ─────────────────────────────────────────────────────────
// POS Offline Support
// ─────────────────────────────────────────────────────────
export var OfflineOperationType;
(function (OfflineOperationType) {
    OfflineOperationType["CUSTOMER_CREATE"] = "customer_create";
    OfflineOperationType["CUSTOMER_UPDATE"] = "customer_update";
})(OfflineOperationType || (OfflineOperationType = {}));
export const offlineOperationTypeSchema = z.nativeEnum(OfflineOperationType);
export const queueOfflineOperationSchema = z.object({
    type: offlineOperationTypeSchema,
    data: z.any(),
    localTimestamp: z.string(),
});
// ─────────────────────────────────────────────────────────
// POS Error Codes
// ─────────────────────────────────────────────────────────
export var POSErrorCode;
(function (POSErrorCode) {
    POSErrorCode["MOTORCYCLE_NOT_AVAILABLE"] = "MOTORCYCLE_NOT_AVAILABLE";
    POSErrorCode["IDEMPOTENCY_CONFLICT"] = "IDEMPOTENCY_CONFLICT";
    POSErrorCode["DISCOUNT_UNAUTHORIZED"] = "DISCOUNT_UNAUTHORIZED";
    POSErrorCode["CUSTOMER_INACTIVE"] = "CUSTOMER_INACTIVE";
    POSErrorCode["INVALID_DEPOSIT_AMOUNT"] = "INVALID_DEPOSIT_AMOUNT";
    POSErrorCode["RESERVATION_NOT_ACTIVE"] = "RESERVATION_NOT_ACTIVE";
    POSErrorCode["BRANCH_SCOPE_VIOLATION"] = "BRANCH_SCOPE_VIOLATION";
    POSErrorCode["TRANSACTION_TIMEOUT"] = "TRANSACTION_TIMEOUT";
    POSErrorCode["QUEUE_LIMIT_EXCEEDED"] = "QUEUE_LIMIT_EXCEEDED";
    POSErrorCode["OPERATION_TOO_LARGE"] = "OPERATION_TOO_LARGE";
    POSErrorCode["OPERATION_EXPIRED"] = "OPERATION_EXPIRED";
    POSErrorCode["INVALID_OFFLINE_OPERATION"] = "INVALID_OFFLINE_OPERATION";
})(POSErrorCode || (POSErrorCode = {}));
//# sourceMappingURL=pos.js.map