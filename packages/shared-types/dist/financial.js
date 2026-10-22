import { z } from "zod";
// ─────────────────────────────────────────────────────────
// Financial Status Enums
// ─────────────────────────────────────────────────────────
export var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus["DRAFT"] = "draft";
    InvoiceStatus["ISSUED"] = "issued";
    InvoiceStatus["PARTIALLY_PAID"] = "partially_paid";
    InvoiceStatus["PAID"] = "paid";
    InvoiceStatus["OVERPAID"] = "overpaid";
    InvoiceStatus["CANCELLED"] = "cancelled";
    InvoiceStatus["REFUNDED"] = "refunded";
})(InvoiceStatus || (InvoiceStatus = {}));
export const invoiceStatusSchema = z.nativeEnum(InvoiceStatus);
export var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["COMPLETED"] = "completed";
    PaymentStatus["FAILED"] = "failed";
    PaymentStatus["CANCELLED"] = "cancelled";
    PaymentStatus["REFUNDED"] = "refunded";
    PaymentStatus["PARTIALLY_REFUNDED"] = "partially_refunded";
})(PaymentStatus || (PaymentStatus = {}));
export const paymentStatusSchema = z.nativeEnum(PaymentStatus);
export var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CASH"] = "cash";
    PaymentMethod["CARD"] = "card";
    PaymentMethod["BANK_TRANSFER"] = "bank_transfer";
    PaymentMethod["CHEQUE"] = "cheque";
})(PaymentMethod || (PaymentMethod = {}));
export const paymentMethodSchema = z.nativeEnum(PaymentMethod);
export var RefundStatus;
(function (RefundStatus) {
    RefundStatus["PENDING"] = "pending";
    RefundStatus["COMPLETED"] = "completed";
    RefundStatus["FAILED"] = "failed";
    RefundStatus["CANCELLED"] = "cancelled";
})(RefundStatus || (RefundStatus = {}));
export const refundStatusSchema = z.nativeEnum(RefundStatus);
export var FinancingContractStatus;
(function (FinancingContractStatus) {
    FinancingContractStatus["ACTIVE"] = "active";
    FinancingContractStatus["COMPLETED"] = "completed";
    FinancingContractStatus["DEFAULTED"] = "defaulted";
    FinancingContractStatus["CANCELLED"] = "cancelled";
})(FinancingContractStatus || (FinancingContractStatus = {}));
export const financingContractStatusSchema = z.nativeEnum(FinancingContractStatus);
export var InstallmentStatus;
(function (InstallmentStatus) {
    InstallmentStatus["UPCOMING"] = "upcoming";
    InstallmentStatus["DUE"] = "due";
    InstallmentStatus["PAID"] = "paid";
    InstallmentStatus["OVERDUE"] = "overdue";
})(InstallmentStatus || (InstallmentStatus = {}));
export const installmentStatusSchema = z.nativeEnum(InstallmentStatus);
export var InstallmentFrequency;
(function (InstallmentFrequency) {
    InstallmentFrequency["MONTHLY"] = "monthly";
    InstallmentFrequency["QUARTERLY"] = "quarterly";
})(InstallmentFrequency || (InstallmentFrequency = {}));
export const installmentFrequencySchema = z.nativeEnum(InstallmentFrequency);
export const invoiceSchema = z.object({
    id: z.string().uuid(),
    invoiceNumber: z.string().max(50),
    customerId: z.string().uuid(),
    orderId: z.string().uuid().optional().nullable(),
    reservationId: z.string().uuid().optional().nullable(),
    branchId: z.string().uuid(),
    userId: z.string().uuid(),
    status: invoiceStatusSchema,
    totalAmount: z.number().min(0),
    paidAmount: z.number().min(0),
    remainingAmount: z.number().min(0),
    address: z.string().max(1000).optional().nullable(),
    issueDate: z.coerce.date().optional().nullable(),
    dueDate: z.coerce.date().optional().nullable(),
    notes: z.string().max(5000).optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});
export const invoiceItemSchema = z.object({
    id: z.string().uuid(),
    invoiceId: z.string().uuid(),
    motorcycleId: z.string().uuid(),
    description: z.string().min(1).max(2000),
    quantity: z.number().int().min(1),
    unitPrice: z.number().min(0),
    discount: z.number().min(0).default(0),
    totalPrice: z.number().min(0),
    createdAt: z.coerce.date(),
});
export const cashDetailsSchema = z.object({
    amountReceived: z.number().positive("Amount received must be positive"),
    change: z.number().min(0, "Change cannot be negative"),
});
export const paymentSchema = z.object({
    id: z.string().uuid(),
    paymentReference: z.string().max(50),
    invoiceId: z.string().uuid(),
    customerId: z.string().uuid(),
    branchId: z.string().uuid(),
    userId: z.string().uuid(),
    amount: z.number().positive("Payment amount must be positive"),
    method: paymentMethodSchema,
    status: paymentStatusSchema,
    reference: z.string().max(200).optional().nullable(),
    externalTransactionId: z.string().max(200).optional().nullable(),
    providerId: z.string().max(100).optional().nullable(),
    idempotencyKey: z.string().max(200),
    cashAmountReceived: z.number().min(0).optional().nullable(),
    cashChange: z.number().min(0).optional().nullable(),
    confirmedAt: z.coerce.date().optional().nullable(),
    failedAt: z.coerce.date().optional().nullable(),
    failureReason: z.string().max(1000).optional().nullable(),
    notes: z.string().max(5000).optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});
export const paymentAllocationSchema = z.object({
    id: z.string().uuid(),
    paymentId: z.string().uuid(),
    invoiceId: z.string().uuid(),
    amount: z.number().positive("Allocation amount must be positive"),
    createdAt: z.coerce.date(),
});
export const refundSchema = z.object({
    id: z.string().uuid(),
    refundReference: z.string().max(50),
    paymentId: z.string().uuid(),
    amount: z.number().positive("Refund amount must be positive"),
    reason: z.string().min(1).max(2000),
    method: paymentMethodSchema,
    status: z.string().max(20),
    processedBy: z.string().uuid(),
    processedAt: z.coerce.date().optional().nullable(),
    notes: z.string().max(5000).optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});
// ─────────────────────────────────────────────────────────
// Invoice DTOs
// ─────────────────────────────────────────────────────────
export const createInvoiceSchema = z.object({
    customerId: z.string().uuid("Invalid customer ID"),
    orderId: z.string().uuid().optional(),
    reservationId: z.string().uuid().optional(),
    branchId: z.string().uuid("Invalid branch ID").optional(),
    address: z.string().max(1000).optional(),
    totalAmount: z.number().positive("Total amount must be positive"),
    items: z
        .array(z.object({
        motorcycleId: z.string().uuid("Invalid motorcycle ID"),
        description: z.string().min(1).max(2000),
        quantity: z.number().int().min(1),
        unitPrice: z.number().min(0),
        discount: z.number().min(0).default(0),
    }))
        .min(1, "Invoice must have at least one item"),
    dueDate: z.coerce.date().optional(),
    notes: z.string().max(5000).optional(),
});
export const updateInvoiceSchema = z
    .object({
    notes: z.string().max(5000).optional().nullable(),
    dueDate: z.coerce.date().optional().nullable(),
})
    .strict();
// ─────────────────────────────────────────────────────────
// Payment DTOs
// ─────────────────────────────────────────────────────────
export const createPaymentSchema = z.object({
    idempotencyKey: z.string().min(1, "Idempotency key is required"),
    invoiceId: z.string().uuid("Invalid invoice ID"),
    amount: z
        .number({ required_error: "Payment amount is required" })
        .positive("Payment amount must be positive")
        .multipleOf(0.01, "Amount cannot have more than 2 decimal places"),
    method: paymentMethodSchema,
    reference: z.string().max(200).optional(),
    externalTransactionId: z.string().max(200).optional(),
    providerId: z.string().max(100).optional(),
    cashDetails: cashDetailsSchema.optional(),
    notes: z.string().max(5000).optional(),
});
export const confirmPaymentSchema = z.object({
    externalTransactionId: z.string().max(200).optional(),
    notes: z.string().max(5000).optional(),
});
export const cancelPaymentSchema = z.object({
    reason: z.string().min(1).max(1000),
});
// ─────────────────────────────────────────────────────────
// Refund DTOs
// ─────────────────────────────────────────────────────────
export const createRefundSchema = z.object({
    paymentId: z.string().uuid("Invalid payment ID"),
    amount: z
        .number({ required_error: "Refund amount is required" })
        .positive("Refund amount must be positive")
        .multipleOf(0.01, "Amount cannot have more than 2 decimal places"),
    reason: z.string().min(1, "Refund reason is required").max(2000),
    method: paymentMethodSchema,
    notes: z.string().max(5000).optional(),
});
// ─────────────────────────────────────────────────────────
// Financial Constants
// ─────────────────────────────────────────────────────────
/** Maximum refund amount as percentage of payment (100%) */
export const MAX_REFUND_PERCENT = 1.0;
/** Idempotency key retention period in hours */
export const IDEMPOTENCY_KEY_RETENTION_HOURS = 24;
/** Financial amount precision (2 decimal places) */
export const FINANCIAL_PRECISION = 2;
/** Maximum decimal places for financial calculations */
export const MAX_DECIMAL_PLACES = 2;
export const financingContractSchema = z.object({
    id: z.string().uuid(),
    contractNumber: z.string().max(50),
    customerId: z.string().uuid(),
    orderId: z.string().uuid(),
    branchId: z.string().uuid(),
    createdBy: z.string().uuid(),
    approvedBy: z.string().uuid().optional().nullable(),
    totalAmount: z.number().positive("Total amount must be positive"),
    downPayment: z.number().min(0, "Down payment cannot be negative"),
    financingAmount: z.number().positive("Financing amount must be positive"),
    numberOfInstallments: z.number().int().min(1, "Must have at least one installment"),
    installmentFrequency: installmentFrequencySchema,
    interestRate: z.number().min(0).max(100, "Interest rate must be between 0 and 100"),
    startDate: z.coerce.date(),
    status: financingContractStatusSchema,
    approvedAt: z.coerce.date().optional().nullable(),
    completedAt: z.coerce.date().optional().nullable(),
    notes: z.string().max(5000).optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});
export const installmentSchema = z.object({
    id: z.string().uuid(),
    contractId: z.string().uuid(),
    installmentNumber: z.number().int().min(1),
    dueDate: z.coerce.date(),
    amount: z.number().positive("Installment amount must be positive"),
    paidAmount: z.number().min(0, "Paid amount cannot be negative"),
    status: installmentStatusSchema,
    paidAt: z.coerce.date().optional().nullable(),
    notes: z.string().max(5000).optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});
// ─────────────────────────────────────────────────────────
// Financing DTOs
// ─────────────────────────────────────────────────────────
export const createFinancingContractSchema = z
    .object({
    orderId: z.string().uuid("Invalid order ID"),
    customerId: z.string().uuid("Invalid customer ID"),
    branchId: z.string().uuid("Invalid branch ID").optional(),
    totalAmount: z
        .number({ required_error: "Total amount is required" })
        .positive("Total amount must be positive")
        .multipleOf(0.01, "Amount cannot have more than 2 decimal places"),
    downPayment: z
        .number()
        .min(0, "Down payment cannot be negative")
        .multipleOf(0.01, "Amount cannot have more than 2 decimal places")
        .default(0),
    numberOfInstallments: z
        .number({ required_error: "Number of installments is required" })
        .int("Number of installments must be an integer")
        .min(1, "Must have at least one installment")
        .max(120, "Maximum 120 installments allowed"),
    installmentFrequency: installmentFrequencySchema.default(InstallmentFrequency.MONTHLY),
    interestRate: z
        .number()
        .min(0, "Interest rate cannot be negative")
        .max(100, "Interest rate cannot exceed 100%")
        .multipleOf(0.01, "Interest rate cannot have more than 2 decimal places")
        .default(0),
    startDate: z.coerce.date(),
    notes: z.string().max(5000).optional(),
})
    .refine((data) => data.downPayment < data.totalAmount, {
    message: "Down payment must be less than total amount",
    path: ["downPayment"],
})
    .refine((data) => data.downPayment >= 0, {
    message: "Down payment cannot be negative",
    path: ["downPayment"],
});
export const updateFinancingContractSchema = z
    .object({
    notes: z.string().max(5000).optional().nullable(),
    status: financingContractStatusSchema.optional(),
})
    .strict();
export const approveFinancingContractSchema = z.object({
    notes: z.string().max(5000).optional(),
});
// ─────────────────────────────────────────────────────────
// Financing Constants
// ─────────────────────────────────────────────────────────
/** Maximum number of installments allowed */
export const MAX_INSTALLMENTS = 120;
/** Minimum financing amount */
export const MIN_FINANCING_AMOUNT = 100;
/** Days in a month for monthly frequency (approximation) */
export const DAYS_PER_MONTH = 30;
/** Months in a quarter */
export const MONTHS_PER_QUARTER = 3;
//# sourceMappingURL=financial.js.map