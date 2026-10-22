import { z } from "zod";
export declare enum POSTransactionType {
    ORDER = "order",
    RESERVATION = "reservation"
}
export declare const posTransactionTypeSchema: z.ZodNativeEnum<typeof POSTransactionType>;
export interface POSDashboardData {
    currentUser: {
        id: string;
        name: string;
        role: string;
        branch: {
            id: string;
            nameAr: string;
            nameEn: string;
        } | null;
        permissions: {
            canApplyDiscount: boolean;
            maxDiscountPercent: number;
            maxDiscountAmount: number;
            canCreateCustomer: boolean;
            canSwitchBranch: boolean;
        };
    };
    todayStats: {
        ordersCreated: number;
        reservationsCreated: number;
        totalSales: number;
        availableMotorcycles: number;
    };
    recentTransactions: Array<{
        id: string;
        type: "order" | "reservation";
        number: string;
        customerName: string;
        motorcycleModel: string;
        amount: number;
        createdAt: string;
    }>;
}
export interface POSCustomerSearchResult {
    id: string;
    name: string;
    phone: string;
    email?: string;
    recentOrderCount: number;
    activeReservationCount: number;
    lastTransactionDate?: string;
    defaultAddress?: {
        addressLine: string;
        city?: string;
    };
}
export interface POSCustomerSearchResponse {
    items: POSCustomerSearchResult[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export declare const posCustomerSearchSchema: z.ZodObject<{
    q: z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>>;
    limit: z.ZodDefault<z.ZodNumber>;
    page: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    q: string;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    q?: string | undefined;
}>;
export type POSCustomerSearchQuery = z.infer<typeof posCustomerSearchSchema>;
export interface POSMotorcycleSearchResult {
    id: string;
    vin: string;
    model: string;
    year: number;
    color?: string;
    brand: {
        nameAr: string;
        nameEn: string;
        logo?: string;
    };
    category: {
        nameAr: string;
        nameEn: string;
    };
    price: number;
    status: string;
    images: string[];
}
export declare const posMotorcycleSearchSchema: z.ZodObject<{
    q: z.ZodOptional<z.ZodString>;
    branchId: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    branchId?: string | undefined;
    q?: string | undefined;
}, {
    branchId?: string | undefined;
    limit?: number | undefined;
    q?: string | undefined;
}>;
export type POSMotorcycleSearchQuery = z.infer<typeof posMotorcycleSearchSchema>;
export interface DiscountLimits {
    cashier: {
        maxPercent: number;
        maxAmount: number;
    };
    branch_manager: {
        maxPercent: number;
        maxAmount: number;
    };
    super_admin: {
        maxPercent: number;
        maxAmount: number;
    };
}
export declare const DISCOUNT_LIMITS: DiscountLimits;
export declare function getDiscountLimits(role: string): {
    maxPercent: number;
    maxAmount: number;
};
export declare function canApplyDiscount(discountAmount: number, totalAmount: number, role: string): {
    authorized: boolean;
    reason?: string;
};
export declare function generateIdempotencyKey(userId: string, data: {
    customerId: string;
    motorcycleId: string;
    timestamp?: number;
}): string;
export declare const idempotencyKeySchema: z.ZodString;
export declare const validatePOSTransactionSchema: z.ZodObject<{
    customerId: z.ZodString;
    motorcycleId: z.ZodString;
    type: z.ZodNativeEnum<typeof POSTransactionType>;
    discount: z.ZodOptional<z.ZodNumber>;
    depositAmount: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    type: POSTransactionType;
    customerId: string;
    motorcycleId: string;
    discount?: number | undefined;
    depositAmount?: number | undefined;
}, {
    type: POSTransactionType;
    customerId: string;
    motorcycleId: string;
    discount?: number | undefined;
    depositAmount?: number | undefined;
}>;
export type ValidatePOSTransactionDto = z.infer<typeof validatePOSTransactionSchema>;
export interface ValidatePOSTransactionResponse {
    valid: boolean;
    customer: {
        id: string;
        name: string;
        isActive: boolean;
    };
    motorcycle: {
        id: string;
        vin: string;
        model: string;
        price: number;
        status: string;
        isAvailable: boolean;
    };
    calculations: {
        totalAmount: number;
        discountAmount: number;
        netAmount: number;
        depositAmount?: number;
        remainingAmount?: number;
    };
    discountAuthorization: {
        authorized: boolean;
        reason?: string;
    };
    warnings: string[];
}
export declare const createPOSTransactionSchema: z.ZodObject<{
    type: z.ZodNativeEnum<typeof POSTransactionType>;
    customerId: z.ZodString;
    motorcycleId: z.ZodString;
    discount: z.ZodOptional<z.ZodObject<{
        amount: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        reason?: string | undefined;
    }, {
        amount: number;
        reason?: string | undefined;
    }>>;
    reservationData: z.ZodOptional<z.ZodObject<{
        depositAmount: z.ZodNumber;
        expirationDays: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        depositAmount: number;
        expirationDays?: number | undefined;
    }, {
        depositAmount: number;
        expirationDays?: number | undefined;
    }>>;
    address: z.ZodOptional<z.ZodString>;
    idempotencyKey: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: POSTransactionType;
    customerId: string;
    motorcycleId: string;
    idempotencyKey: string;
    notes?: string | undefined;
    address?: string | undefined;
    discount?: {
        amount: number;
        reason?: string | undefined;
    } | undefined;
    reservationData?: {
        depositAmount: number;
        expirationDays?: number | undefined;
    } | undefined;
}, {
    type: POSTransactionType;
    customerId: string;
    motorcycleId: string;
    idempotencyKey: string;
    notes?: string | undefined;
    address?: string | undefined;
    discount?: {
        amount: number;
        reason?: string | undefined;
    } | undefined;
    reservationData?: {
        depositAmount: number;
        expirationDays?: number | undefined;
    } | undefined;
}>;
export type CreatePOSTransactionDto = z.infer<typeof createPOSTransactionSchema>;
export interface CreatePOSTransactionResponse {
    id: string;
    type: "order" | "reservation";
    number: string;
    customer: {
        id: string;
        name: string;
        phone: string;
    };
    motorcycle: {
        id: string;
        vin: string;
        model: string;
        brand: {
            nameAr: string;
            nameEn: string;
        };
    };
    totalAmount: number;
    discount: number;
    netAmount: number;
    depositAmount?: number;
    remainingAmount?: number;
    expiresAt?: string;
    createdAt: string;
}
export declare const posActiveReservationsQuerySchema: z.ZodObject<{
    branchId: z.ZodOptional<z.ZodString>;
    customerId: z.ZodOptional<z.ZodString>;
    expiringInDays: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    branchId?: string | undefined;
    customerId?: string | undefined;
    expiringInDays?: number | undefined;
}, {
    branchId?: string | undefined;
    customerId?: string | undefined;
    expiringInDays?: number | undefined;
}>;
export type POSActiveReservationsQuery = z.infer<typeof posActiveReservationsQuerySchema>;
export interface POSActiveReservation {
    id: string;
    reservationNumber: string;
    customer: {
        id: string;
        name: string;
        phone: string;
    };
    motorcycle: {
        id: string;
        vin: string;
        model: string;
        brand: string;
    };
    depositAmount: number;
    totalAmount: number;
    remainingAmount: number;
    expiresAt: string;
    expiresInDays: number;
    isExpiringSoon: boolean;
    createdAt: string;
}
export declare const convertPOSReservationSchema: z.ZodObject<{
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    notes?: string | undefined;
}, {
    notes?: string | undefined;
}>;
export type ConvertPOSReservationDto = z.infer<typeof convertPOSReservationSchema>;
export declare enum OfflineOperationType {
    CUSTOMER_CREATE = "customer_create",
    CUSTOMER_UPDATE = "customer_update"
}
export declare const offlineOperationTypeSchema: z.ZodNativeEnum<typeof OfflineOperationType>;
export interface OfflineOperation {
    id: string;
    type: OfflineOperationType;
    data: any;
    timestamp: string;
    userId: string;
    branchId: string;
}
export declare const queueOfflineOperationSchema: z.ZodObject<{
    type: z.ZodNativeEnum<typeof OfflineOperationType>;
    data: z.ZodAny;
    localTimestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: OfflineOperationType;
    localTimestamp: string;
    data?: any;
}, {
    type: OfflineOperationType;
    localTimestamp: string;
    data?: any;
}>;
export type QueueOfflineOperationDto = z.infer<typeof queueOfflineOperationSchema>;
export interface OfflineSyncStatus {
    isOnline: boolean;
    lastSyncAt?: string;
    queuedOperations: number;
    syncInProgress: boolean;
    conflicts: Array<{
        operationId: string;
        type: string;
        reason: string;
        resolution: string;
    }>;
}
export interface QueuedOperation {
    id: string;
    type: OfflineOperationType;
    data: any;
    status: "pending" | "synced" | "failed";
    createdAt: string;
    expiresAt: string;
}
export declare enum POSErrorCode {
    MOTORCYCLE_NOT_AVAILABLE = "MOTORCYCLE_NOT_AVAILABLE",
    IDEMPOTENCY_CONFLICT = "IDEMPOTENCY_CONFLICT",
    DISCOUNT_UNAUTHORIZED = "DISCOUNT_UNAUTHORIZED",
    CUSTOMER_INACTIVE = "CUSTOMER_INACTIVE",
    INVALID_DEPOSIT_AMOUNT = "INVALID_DEPOSIT_AMOUNT",
    RESERVATION_NOT_ACTIVE = "RESERVATION_NOT_ACTIVE",
    BRANCH_SCOPE_VIOLATION = "BRANCH_SCOPE_VIOLATION",
    TRANSACTION_TIMEOUT = "TRANSACTION_TIMEOUT",
    QUEUE_LIMIT_EXCEEDED = "QUEUE_LIMIT_EXCEEDED",
    OPERATION_TOO_LARGE = "OPERATION_TOO_LARGE",
    OPERATION_EXPIRED = "OPERATION_EXPIRED",
    INVALID_OFFLINE_OPERATION = "INVALID_OFFLINE_OPERATION"
}
//# sourceMappingURL=pos.d.ts.map