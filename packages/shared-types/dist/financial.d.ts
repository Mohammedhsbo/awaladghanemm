import { z } from "zod";
export declare enum InvoiceStatus {
    DRAFT = "draft",
    ISSUED = "issued",
    PARTIALLY_PAID = "partially_paid",
    PAID = "paid",
    OVERPAID = "overpaid",
    CANCELLED = "cancelled",
    REFUNDED = "refunded"
}
export declare const invoiceStatusSchema: z.ZodNativeEnum<typeof InvoiceStatus>;
export declare enum PaymentStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed",
    CANCELLED = "cancelled",
    REFUNDED = "refunded",
    PARTIALLY_REFUNDED = "partially_refunded"
}
export declare const paymentStatusSchema: z.ZodNativeEnum<typeof PaymentStatus>;
export declare enum PaymentMethod {
    CASH = "cash",
    CARD = "card",
    BANK_TRANSFER = "bank_transfer",
    CHEQUE = "cheque"
}
export declare const paymentMethodSchema: z.ZodNativeEnum<typeof PaymentMethod>;
export declare enum RefundStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed",
    CANCELLED = "cancelled"
}
export declare const refundStatusSchema: z.ZodNativeEnum<typeof RefundStatus>;
export declare enum FinancingContractStatus {
    ACTIVE = "active",
    COMPLETED = "completed",
    DEFAULTED = "defaulted",
    CANCELLED = "cancelled"
}
export declare const financingContractStatusSchema: z.ZodNativeEnum<typeof FinancingContractStatus>;
export declare enum InstallmentStatus {
    UPCOMING = "upcoming",
    DUE = "due",
    PAID = "paid",
    OVERDUE = "overdue"
}
export declare const installmentStatusSchema: z.ZodNativeEnum<typeof InstallmentStatus>;
export declare enum InstallmentFrequency {
    MONTHLY = "monthly",
    QUARTERLY = "quarterly"
}
export declare const installmentFrequencySchema: z.ZodNativeEnum<typeof InstallmentFrequency>;
export interface Invoice {
    id: string;
    invoiceNumber: string;
    customerId: string;
    orderId?: string | null;
    reservationId?: string | null;
    branchId: string;
    userId: string;
    status: InvoiceStatus;
    totalAmount: number;
    paidAmount: number;
    remainingAmount: number;
    address?: string | null;
    issueDate?: Date | null;
    dueDate?: Date | null;
    notes?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare const invoiceSchema: z.ZodObject<{
    id: z.ZodString;
    invoiceNumber: z.ZodString;
    customerId: z.ZodString;
    orderId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    reservationId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    branchId: z.ZodString;
    userId: z.ZodString;
    status: z.ZodNativeEnum<typeof InvoiceStatus>;
    totalAmount: z.ZodNumber;
    paidAmount: z.ZodNumber;
    remainingAmount: z.ZodNumber;
    address: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    issueDate: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
    dueDate: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
    notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    status: InvoiceStatus;
    branchId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    invoiceNumber: string;
    userId: string;
    totalAmount: number;
    paidAmount: number;
    remainingAmount: number;
    notes?: string | null | undefined;
    address?: string | null | undefined;
    orderId?: string | null | undefined;
    reservationId?: string | null | undefined;
    issueDate?: Date | null | undefined;
    dueDate?: Date | null | undefined;
}, {
    status: InvoiceStatus;
    branchId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    invoiceNumber: string;
    userId: string;
    totalAmount: number;
    paidAmount: number;
    remainingAmount: number;
    notes?: string | null | undefined;
    address?: string | null | undefined;
    orderId?: string | null | undefined;
    reservationId?: string | null | undefined;
    issueDate?: Date | null | undefined;
    dueDate?: Date | null | undefined;
}>;
export interface InvoiceItem {
    id: string;
    invoiceId: string;
    motorcycleId: string;
    description: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    totalPrice: number;
    createdAt: Date;
}
export declare const invoiceItemSchema: z.ZodObject<{
    id: z.ZodString;
    invoiceId: z.ZodString;
    motorcycleId: z.ZodString;
    description: z.ZodString;
    quantity: z.ZodNumber;
    unitPrice: z.ZodNumber;
    discount: z.ZodDefault<z.ZodNumber>;
    totalPrice: z.ZodNumber;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    description: string;
    id: string;
    createdAt: Date;
    invoiceId: string;
    motorcycleId: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    totalPrice: number;
}, {
    description: string;
    id: string;
    createdAt: Date;
    invoiceId: string;
    motorcycleId: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    discount?: number | undefined;
}>;
export interface CashDetails {
    amountReceived: number;
    change: number;
}
export declare const cashDetailsSchema: z.ZodObject<{
    amountReceived: z.ZodNumber;
    change: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    amountReceived: number;
    change: number;
}, {
    amountReceived: number;
    change: number;
}>;
export interface Payment {
    id: string;
    paymentReference: string;
    invoiceId: string;
    customerId: string;
    branchId: string;
    userId: string;
    amount: number;
    method: PaymentMethod;
    status: PaymentStatus;
    reference?: string | null;
    externalTransactionId?: string | null;
    providerId?: string | null;
    idempotencyKey: string;
    cashAmountReceived?: number | null;
    cashChange?: number | null;
    confirmedAt?: Date | null;
    failedAt?: Date | null;
    failureReason?: string | null;
    notes?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare const paymentSchema: z.ZodObject<{
    id: z.ZodString;
    paymentReference: z.ZodString;
    invoiceId: z.ZodString;
    customerId: z.ZodString;
    branchId: z.ZodString;
    userId: z.ZodString;
    amount: z.ZodNumber;
    method: z.ZodNativeEnum<typeof PaymentMethod>;
    status: z.ZodNativeEnum<typeof PaymentStatus>;
    reference: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    externalTransactionId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    providerId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    idempotencyKey: z.ZodString;
    cashAmountReceived: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    cashChange: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    confirmedAt: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
    failedAt: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
    failureReason: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    status: PaymentStatus;
    branchId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    userId: string;
    invoiceId: string;
    paymentReference: string;
    amount: number;
    method: PaymentMethod;
    idempotencyKey: string;
    notes?: string | null | undefined;
    reference?: string | null | undefined;
    externalTransactionId?: string | null | undefined;
    providerId?: string | null | undefined;
    cashAmountReceived?: number | null | undefined;
    cashChange?: number | null | undefined;
    confirmedAt?: Date | null | undefined;
    failedAt?: Date | null | undefined;
    failureReason?: string | null | undefined;
}, {
    status: PaymentStatus;
    branchId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    userId: string;
    invoiceId: string;
    paymentReference: string;
    amount: number;
    method: PaymentMethod;
    idempotencyKey: string;
    notes?: string | null | undefined;
    reference?: string | null | undefined;
    externalTransactionId?: string | null | undefined;
    providerId?: string | null | undefined;
    cashAmountReceived?: number | null | undefined;
    cashChange?: number | null | undefined;
    confirmedAt?: Date | null | undefined;
    failedAt?: Date | null | undefined;
    failureReason?: string | null | undefined;
}>;
export interface PaymentAllocation {
    id: string;
    paymentId: string;
    invoiceId: string;
    amount: number;
    createdAt: Date;
}
export declare const paymentAllocationSchema: z.ZodObject<{
    id: z.ZodString;
    paymentId: z.ZodString;
    invoiceId: z.ZodString;
    amount: z.ZodNumber;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    invoiceId: string;
    amount: number;
    paymentId: string;
}, {
    id: string;
    createdAt: Date;
    invoiceId: string;
    amount: number;
    paymentId: string;
}>;
export interface Refund {
    id: string;
    refundReference: string;
    paymentId: string;
    amount: number;
    reason: string;
    method: PaymentMethod;
    status: string;
    processedBy: string;
    processedAt?: Date | null;
    notes?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare const refundSchema: z.ZodObject<{
    id: z.ZodString;
    refundReference: z.ZodString;
    paymentId: z.ZodString;
    amount: z.ZodNumber;
    reason: z.ZodString;
    method: z.ZodNativeEnum<typeof PaymentMethod>;
    status: z.ZodString;
    processedBy: z.ZodString;
    processedAt: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
    notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    status: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    reason: string;
    amount: number;
    method: PaymentMethod;
    paymentId: string;
    refundReference: string;
    processedBy: string;
    notes?: string | null | undefined;
    processedAt?: Date | null | undefined;
}, {
    status: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    reason: string;
    amount: number;
    method: PaymentMethod;
    paymentId: string;
    refundReference: string;
    processedBy: string;
    notes?: string | null | undefined;
    processedAt?: Date | null | undefined;
}>;
export declare const createInvoiceSchema: z.ZodObject<{
    customerId: z.ZodString;
    orderId: z.ZodOptional<z.ZodString>;
    reservationId: z.ZodOptional<z.ZodString>;
    branchId: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    totalAmount: z.ZodNumber;
    items: z.ZodArray<z.ZodObject<{
        motorcycleId: z.ZodString;
        description: z.ZodString;
        quantity: z.ZodNumber;
        unitPrice: z.ZodNumber;
        discount: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        description: string;
        motorcycleId: string;
        quantity: number;
        unitPrice: number;
        discount: number;
    }, {
        description: string;
        motorcycleId: string;
        quantity: number;
        unitPrice: number;
        discount?: number | undefined;
    }>, "many">;
    dueDate: z.ZodOptional<z.ZodDate>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    customerId: string;
    totalAmount: number;
    items: {
        description: string;
        motorcycleId: string;
        quantity: number;
        unitPrice: number;
        discount: number;
    }[];
    notes?: string | undefined;
    branchId?: string | undefined;
    address?: string | undefined;
    orderId?: string | undefined;
    reservationId?: string | undefined;
    dueDate?: Date | undefined;
}, {
    customerId: string;
    totalAmount: number;
    items: {
        description: string;
        motorcycleId: string;
        quantity: number;
        unitPrice: number;
        discount?: number | undefined;
    }[];
    notes?: string | undefined;
    branchId?: string | undefined;
    address?: string | undefined;
    orderId?: string | undefined;
    reservationId?: string | undefined;
    dueDate?: Date | undefined;
}>;
export type CreateInvoiceRequest = z.infer<typeof createInvoiceSchema>;
export declare const updateInvoiceSchema: z.ZodObject<{
    notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    dueDate: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
}, "strict", z.ZodTypeAny, {
    notes?: string | null | undefined;
    dueDate?: Date | null | undefined;
}, {
    notes?: string | null | undefined;
    dueDate?: Date | null | undefined;
}>;
export type UpdateInvoiceRequest = z.infer<typeof updateInvoiceSchema>;
export declare const createPaymentSchema: z.ZodObject<{
    idempotencyKey: z.ZodString;
    invoiceId: z.ZodString;
    amount: z.ZodNumber;
    method: z.ZodNativeEnum<typeof PaymentMethod>;
    reference: z.ZodOptional<z.ZodString>;
    externalTransactionId: z.ZodOptional<z.ZodString>;
    providerId: z.ZodOptional<z.ZodString>;
    cashDetails: z.ZodOptional<z.ZodObject<{
        amountReceived: z.ZodNumber;
        change: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        amountReceived: number;
        change: number;
    }, {
        amountReceived: number;
        change: number;
    }>>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    invoiceId: string;
    amount: number;
    method: PaymentMethod;
    idempotencyKey: string;
    notes?: string | undefined;
    reference?: string | undefined;
    externalTransactionId?: string | undefined;
    providerId?: string | undefined;
    cashDetails?: {
        amountReceived: number;
        change: number;
    } | undefined;
}, {
    invoiceId: string;
    amount: number;
    method: PaymentMethod;
    idempotencyKey: string;
    notes?: string | undefined;
    reference?: string | undefined;
    externalTransactionId?: string | undefined;
    providerId?: string | undefined;
    cashDetails?: {
        amountReceived: number;
        change: number;
    } | undefined;
}>;
export type CreatePaymentRequest = z.infer<typeof createPaymentSchema>;
export declare const confirmPaymentSchema: z.ZodObject<{
    externalTransactionId: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    notes?: string | undefined;
    externalTransactionId?: string | undefined;
}, {
    notes?: string | undefined;
    externalTransactionId?: string | undefined;
}>;
export type ConfirmPaymentRequest = z.infer<typeof confirmPaymentSchema>;
export declare const cancelPaymentSchema: z.ZodObject<{
    reason: z.ZodString;
}, "strip", z.ZodTypeAny, {
    reason: string;
}, {
    reason: string;
}>;
export type CancelPaymentRequest = z.infer<typeof cancelPaymentSchema>;
export declare const createRefundSchema: z.ZodObject<{
    paymentId: z.ZodString;
    amount: z.ZodNumber;
    reason: z.ZodString;
    method: z.ZodNativeEnum<typeof PaymentMethod>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    reason: string;
    amount: number;
    method: PaymentMethod;
    paymentId: string;
    notes?: string | undefined;
}, {
    reason: string;
    amount: number;
    method: PaymentMethod;
    paymentId: string;
    notes?: string | undefined;
}>;
export type CreateRefundRequest = z.infer<typeof createRefundSchema>;
/** Maximum refund amount as percentage of payment (100%) */
export declare const MAX_REFUND_PERCENT = 1;
/** Idempotency key retention period in hours */
export declare const IDEMPOTENCY_KEY_RETENTION_HOURS = 24;
/** Financial amount precision (2 decimal places) */
export declare const FINANCIAL_PRECISION = 2;
/** Maximum decimal places for financial calculations */
export declare const MAX_DECIMAL_PLACES = 2;
export interface FinancingContract {
    id: string;
    contractNumber: string;
    customerId: string;
    orderId: string;
    branchId: string;
    createdBy: string;
    approvedBy?: string | null;
    totalAmount: number;
    downPayment: number;
    financingAmount: number;
    numberOfInstallments: number;
    installmentFrequency: InstallmentFrequency;
    interestRate: number;
    startDate: Date;
    status: FinancingContractStatus;
    approvedAt?: Date | null;
    completedAt?: Date | null;
    notes?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare const financingContractSchema: z.ZodObject<{
    id: z.ZodString;
    contractNumber: z.ZodString;
    customerId: z.ZodString;
    orderId: z.ZodString;
    branchId: z.ZodString;
    createdBy: z.ZodString;
    approvedBy: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    totalAmount: z.ZodNumber;
    downPayment: z.ZodNumber;
    financingAmount: z.ZodNumber;
    numberOfInstallments: z.ZodNumber;
    installmentFrequency: z.ZodNativeEnum<typeof InstallmentFrequency>;
    interestRate: z.ZodNumber;
    startDate: z.ZodDate;
    status: z.ZodNativeEnum<typeof FinancingContractStatus>;
    approvedAt: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
    completedAt: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
    notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    status: FinancingContractStatus;
    branchId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    startDate: Date;
    orderId: string;
    totalAmount: number;
    contractNumber: string;
    createdBy: string;
    downPayment: number;
    financingAmount: number;
    numberOfInstallments: number;
    installmentFrequency: InstallmentFrequency;
    interestRate: number;
    notes?: string | null | undefined;
    approvedBy?: string | null | undefined;
    approvedAt?: Date | null | undefined;
    completedAt?: Date | null | undefined;
}, {
    status: FinancingContractStatus;
    branchId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    startDate: Date;
    orderId: string;
    totalAmount: number;
    contractNumber: string;
    createdBy: string;
    downPayment: number;
    financingAmount: number;
    numberOfInstallments: number;
    installmentFrequency: InstallmentFrequency;
    interestRate: number;
    notes?: string | null | undefined;
    approvedBy?: string | null | undefined;
    approvedAt?: Date | null | undefined;
    completedAt?: Date | null | undefined;
}>;
export interface Installment {
    id: string;
    contractId: string;
    installmentNumber: number;
    dueDate: Date;
    amount: number;
    paidAmount: number;
    status: InstallmentStatus;
    paidAt?: Date | null;
    notes?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare const installmentSchema: z.ZodObject<{
    id: z.ZodString;
    contractId: z.ZodString;
    installmentNumber: z.ZodNumber;
    dueDate: z.ZodDate;
    amount: z.ZodNumber;
    paidAmount: z.ZodNumber;
    status: z.ZodNativeEnum<typeof InstallmentStatus>;
    paidAt: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
    notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    status: InstallmentStatus;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    paidAmount: number;
    dueDate: Date;
    amount: number;
    contractId: string;
    installmentNumber: number;
    notes?: string | null | undefined;
    paidAt?: Date | null | undefined;
}, {
    status: InstallmentStatus;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    paidAmount: number;
    dueDate: Date;
    amount: number;
    contractId: string;
    installmentNumber: number;
    notes?: string | null | undefined;
    paidAt?: Date | null | undefined;
}>;
export declare const createFinancingContractSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    orderId: z.ZodString;
    customerId: z.ZodString;
    branchId: z.ZodOptional<z.ZodString>;
    totalAmount: z.ZodNumber;
    downPayment: z.ZodDefault<z.ZodNumber>;
    numberOfInstallments: z.ZodNumber;
    installmentFrequency: z.ZodDefault<z.ZodNativeEnum<typeof InstallmentFrequency>>;
    interestRate: z.ZodDefault<z.ZodNumber>;
    startDate: z.ZodDate;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    customerId: string;
    startDate: Date;
    orderId: string;
    totalAmount: number;
    downPayment: number;
    numberOfInstallments: number;
    installmentFrequency: InstallmentFrequency;
    interestRate: number;
    notes?: string | undefined;
    branchId?: string | undefined;
}, {
    customerId: string;
    startDate: Date;
    orderId: string;
    totalAmount: number;
    numberOfInstallments: number;
    notes?: string | undefined;
    branchId?: string | undefined;
    downPayment?: number | undefined;
    installmentFrequency?: InstallmentFrequency | undefined;
    interestRate?: number | undefined;
}>, {
    customerId: string;
    startDate: Date;
    orderId: string;
    totalAmount: number;
    downPayment: number;
    numberOfInstallments: number;
    installmentFrequency: InstallmentFrequency;
    interestRate: number;
    notes?: string | undefined;
    branchId?: string | undefined;
}, {
    customerId: string;
    startDate: Date;
    orderId: string;
    totalAmount: number;
    numberOfInstallments: number;
    notes?: string | undefined;
    branchId?: string | undefined;
    downPayment?: number | undefined;
    installmentFrequency?: InstallmentFrequency | undefined;
    interestRate?: number | undefined;
}>, {
    customerId: string;
    startDate: Date;
    orderId: string;
    totalAmount: number;
    downPayment: number;
    numberOfInstallments: number;
    installmentFrequency: InstallmentFrequency;
    interestRate: number;
    notes?: string | undefined;
    branchId?: string | undefined;
}, {
    customerId: string;
    startDate: Date;
    orderId: string;
    totalAmount: number;
    numberOfInstallments: number;
    notes?: string | undefined;
    branchId?: string | undefined;
    downPayment?: number | undefined;
    installmentFrequency?: InstallmentFrequency | undefined;
    interestRate?: number | undefined;
}>;
export type CreateFinancingContractRequest = z.infer<typeof createFinancingContractSchema>;
export declare const updateFinancingContractSchema: z.ZodObject<{
    notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    status: z.ZodOptional<z.ZodNativeEnum<typeof FinancingContractStatus>>;
}, "strict", z.ZodTypeAny, {
    notes?: string | null | undefined;
    status?: FinancingContractStatus | undefined;
}, {
    notes?: string | null | undefined;
    status?: FinancingContractStatus | undefined;
}>;
export type UpdateFinancingContractRequest = z.infer<typeof updateFinancingContractSchema>;
export declare const approveFinancingContractSchema: z.ZodObject<{
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    notes?: string | undefined;
}, {
    notes?: string | undefined;
}>;
export type ApproveFinancingContractRequest = z.infer<typeof approveFinancingContractSchema>;
export interface InstallmentScheduleItem {
    installmentNumber: number;
    dueDate: Date;
    amount: number;
}
export interface InstallmentCalculationResult {
    financingAmount: number;
    installments: InstallmentScheduleItem[];
    totalInstallmentAmount: number;
}
/** Maximum number of installments allowed */
export declare const MAX_INSTALLMENTS = 120;
/** Minimum financing amount */
export declare const MIN_FINANCING_AMOUNT = 100;
/** Days in a month for monthly frequency (approximation) */
export declare const DAYS_PER_MONTH = 30;
/** Months in a quarter */
export declare const MONTHS_PER_QUARTER = 3;
//# sourceMappingURL=financial.d.ts.map