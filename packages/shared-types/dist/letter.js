import { z } from "zod";
// ─────────────────────────────────────────────────────────
// Letter Status & Type Enums
// ─────────────────────────────────────────────────────────
export var LetterStatus;
(function (LetterStatus) {
    LetterStatus["ISSUED"] = "issued";
    LetterStatus["RECEIVED"] = "received";
    LetterStatus["NOT_RECEIVED"] = "not_received";
})(LetterStatus || (LetterStatus = {}));
export const letterStatusSchema = z.nativeEnum(LetterStatus);
export var LetterType;
(function (LetterType) {
    LetterType["RECEIPT"] = "receipt";
    LetterType["DELIVERY"] = "delivery";
})(LetterType || (LetterType = {}));
export const letterTypeSchema = z.nativeEnum(LetterType);
export var LetterAction;
(function (LetterAction) {
    LetterAction["CREATED"] = "created";
    LetterAction["ISSUED"] = "issued";
    LetterAction["CONFIRMED"] = "confirmed";
    LetterAction["NOT_RECEIVED_RECORDED"] = "not_received_recorded";
    LetterAction["CANCELLED"] = "cancelled";
    LetterAction["DOCUMENT_GENERATED"] = "document_generated";
})(LetterAction || (LetterAction = {}));
export const letterActionSchema = z.nativeEnum(LetterAction);
export const letterSchema = z.object({
    id: z.string().uuid(),
    letterNumber: z.string().max(30),
    customerId: z.string().uuid(),
    motorcycleId: z.string().uuid(),
    orderId: z.string().uuid().optional().nullable(),
    reservationId: z.string().uuid().optional().nullable(),
    branchId: z.string().uuid(),
    type: letterTypeSchema,
    status: letterStatusSchema,
    issuedAt: z.date(),
    confirmedAt: z.date().optional().nullable(),
    expectedDeliveryDate: z.date().optional().nullable(),
    documentStorageRef: z.string().max(255).optional().nullable(),
    userId: z.string().uuid(),
    confirmedBy: z.string().uuid().optional().nullable(),
    notes: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export const letterDocumentSchema = z.object({
    id: z.string().uuid(),
    letterId: z.string().uuid(),
    documentType: z.string().min(1).max(50),
    fileName: z.string().min(1).max(255),
    fileSize: z.number().int().positive(),
    mimeType: z.string().min(1).max(100),
    storageRef: z.string().min(1).max(500),
    version: z.number().int().positive().default(1),
    createdBy: z.string().uuid(),
    createdAt: z.date(),
});
export const letterHistorySchema = z.object({
    id: z.string().uuid(),
    letterId: z.string().uuid(),
    action: z.string().min(1).max(50),
    fromStatus: z.string().max(20).optional().nullable(),
    toStatus: z.string().max(20).optional().nullable(),
    actorId: z.string().uuid(),
    reason: z.string().max(500).optional().nullable(),
    notes: z.string().optional().nullable(),
    createdAt: z.date(),
});
// ─────────────────────────────────────────────────────────
// DTOs
// ─────────────────────────────────────────────────────────
export const createLetterDtoSchema = z.object({
    customerId: z.string().uuid(),
    motorcycleId: z.string().uuid(),
    orderId: z.string().uuid().optional(),
    reservationId: z.string().uuid().optional(),
    type: letterTypeSchema.default(LetterType.RECEIPT),
    expectedDeliveryDate: z.string().datetime().optional(),
    notes: z.string().optional(),
});
export const confirmReceiptDtoSchema = z.object({
    confirmedAt: z.string().datetime().optional(),
    reason: z.string().optional(),
    notes: z.string().optional(),
});
export const recordNonReceiptDtoSchema = z.object({
    reason: z.string().min(1).max(500),
    notes: z.string().optional(),
});
export const generateDocumentDtoSchema = z.object({
    documentType: z.enum(["delivery", "receipt"]),
    regenerate: z.boolean().optional().default(false),
});
export const updateLetterDtoSchema = z.object({
    expectedDeliveryDate: z.string().datetime().optional(),
    notes: z.string().optional(),
});
// ─────────────────────────────────────────────────────────
// Status Transition Validation
// ─────────────────────────────────────────────────────────
export const LETTER_STATUS_TRANSITIONS = {
    [LetterStatus.ISSUED]: [LetterStatus.RECEIVED, LetterStatus.NOT_RECEIVED],
    [LetterStatus.NOT_RECEIVED]: [LetterStatus.RECEIVED],
    [LetterStatus.RECEIVED]: [], // Terminal state
};
export function isValidLetterStatusTransition(fromStatus, toStatus) {
    const allowedTransitions = LETTER_STATUS_TRANSITIONS[fromStatus];
    return allowedTransitions.includes(toStatus);
}
export function validateLetterStatusTransition(fromStatus, toStatus) {
    if (!isValidLetterStatusTransition(fromStatus, toStatus)) {
        throw new Error(`Invalid status transition from ${fromStatus} to ${toStatus}. Allowed transitions: ${LETTER_STATUS_TRANSITIONS[fromStatus].join(", ")}`);
    }
}
export const letterQueryParamsSchema = z.object({
    customerId: z.string().uuid().optional(),
    motorcycleId: z.string().uuid().optional(),
    orderId: z.string().uuid().optional(),
    reservationId: z.string().uuid().optional(),
    status: letterStatusSchema.optional(),
    type: letterTypeSchema.optional(),
    branchId: z.string().uuid().optional(),
    search: z.string().optional(),
    pendingOnly: z.boolean().optional(),
    issuedAfter: z.string().datetime().optional(),
    issuedBefore: z.string().datetime().optional(),
    page: z.number().int().positive().optional(),
    limit: z.number().int().positive().max(100).optional(),
    sort: z.string().optional(),
    order: z.enum(["asc", "desc"]).optional(),
});
//# sourceMappingURL=letter.js.map