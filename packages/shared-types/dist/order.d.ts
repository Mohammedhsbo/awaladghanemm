import { z } from "zod";
export declare enum OrderStatus {
    DRAFT = "draft",
    CONFIRMED = "confirmed",
    PROCESSING = "processing",
    AWAITING_DELIVERY = "awaiting_delivery",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
    REFUNDED = "refunded"
}
export declare const orderStatusSchema: z.ZodNativeEnum<typeof OrderStatus>;
export interface OrderItem {
    id: string;
    orderId: string;
    motorcycleId: string;
    unitPrice: number;
    discount: number;
}
export declare const orderItemSchema: z.ZodObject<{
    id: z.ZodString;
    orderId: z.ZodString;
    motorcycleId: z.ZodString;
    unitPrice: z.ZodNumber;
    discount: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    id: string;
    orderId: string;
    motorcycleId: string;
    unitPrice: number;
    discount: number;
}, {
    id: string;
    orderId: string;
    motorcycleId: string;
    unitPrice: number;
    discount?: number | undefined;
}>;
export interface OrderItemWithMotorcycle extends OrderItem {
    motorcycle: {
        id: string;
        vin: string;
        model: string;
        year: number;
        color?: string | null;
        brand: {
            id: string;
            nameAr: string;
            nameEn: string;
        };
        currentStatus: string;
    };
}
export interface Order {
    id: string;
    orderNumber: string;
    customerId: string;
    branchId: string;
    userId: string;
    status: OrderStatus;
    totalAmount: number;
    discount: number;
    netAmount: number;
    address?: string | null;
    notes?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare const orderSchema: z.ZodObject<{
    id: z.ZodString;
    orderNumber: z.ZodString;
    customerId: z.ZodString;
    branchId: z.ZodString;
    userId: z.ZodString;
    status: z.ZodNativeEnum<typeof OrderStatus>;
    totalAmount: z.ZodNumber;
    discount: z.ZodDefault<z.ZodNumber>;
    netAmount: z.ZodNumber;
    address: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    status: OrderStatus;
    branchId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    userId: string;
    totalAmount: number;
    discount: number;
    orderNumber: string;
    netAmount: number;
    notes?: string | null | undefined;
    address?: string | null | undefined;
}, {
    status: OrderStatus;
    branchId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    userId: string;
    totalAmount: number;
    orderNumber: string;
    netAmount: number;
    notes?: string | null | undefined;
    address?: string | null | undefined;
    discount?: number | undefined;
}>;
export interface OrderWithRelations extends Order {
    customer: {
        id: string;
        name: string;
        phone: string;
        email?: string | null;
        defaultAddress?: {
            addressLine: string;
            city?: string | null;
        } | null;
    };
    branch: {
        id: string;
        nameAr: string;
        nameEn: string;
    };
    user: {
        id: string;
        name: string;
    };
    items: OrderItemWithMotorcycle[];
    statusHistory?: Array<{
        status: string;
        changedAt: string;
        changedBy: {
            id: string;
            name: string;
        };
        reason?: string;
    }>;
    payments?: {
        totalPaid: number;
        remainingBalance: number;
    };
}
export interface OrderListItem {
    id: string;
    orderNumber: string;
    customer: {
        id: string;
        name: string;
        phone: string;
    };
    branch: {
        id: string;
        nameAr: string;
        nameEn: string;
    };
    status: OrderStatus;
    itemCount: number;
    totalAmount: number;
    discount: number;
    netAmount: number;
    createdAt: Date;
}
export declare const createOrderSchema: z.ZodObject<{
    customerId: z.ZodString;
    branchId: z.ZodOptional<z.ZodString>;
    motorcycleIds: z.ZodArray<z.ZodString, "many">;
    discount: z.ZodDefault<z.ZodNumber>;
    address: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    isDraft: z.ZodDefault<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    customerId: string;
    discount: number;
    motorcycleIds: string[];
    isDraft: boolean;
    notes?: string | undefined;
    branchId?: string | undefined;
    address?: string | undefined;
}, {
    customerId: string;
    motorcycleIds: string[];
    notes?: string | undefined;
    branchId?: string | undefined;
    address?: string | undefined;
    discount?: number | undefined;
    isDraft?: boolean | undefined;
}>;
export type CreateOrderDto = z.infer<typeof createOrderSchema>;
export declare const updateOrderSchema: z.ZodEffects<z.ZodObject<{
    customerId: z.ZodOptional<z.ZodString>;
    motorcycleIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    discount: z.ZodOptional<z.ZodNumber>;
    address: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    notes?: string | undefined;
    address?: string | undefined;
    customerId?: string | undefined;
    discount?: number | undefined;
    motorcycleIds?: string[] | undefined;
}, {
    notes?: string | undefined;
    address?: string | undefined;
    customerId?: string | undefined;
    discount?: number | undefined;
    motorcycleIds?: string[] | undefined;
}>, {
    notes?: string | undefined;
    address?: string | undefined;
    customerId?: string | undefined;
    discount?: number | undefined;
    motorcycleIds?: string[] | undefined;
}, {
    notes?: string | undefined;
    address?: string | undefined;
    customerId?: string | undefined;
    discount?: number | undefined;
    motorcycleIds?: string[] | undefined;
}>;
export type UpdateOrderDto = z.infer<typeof updateOrderSchema>;
export declare const changeOrderStatusSchema: z.ZodObject<{
    status: z.ZodNativeEnum<typeof OrderStatus>;
    reason: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    status: OrderStatus;
    reason?: string | undefined;
}, {
    status: OrderStatus;
    reason?: string | undefined;
}>;
export type ChangeOrderStatusDto = z.infer<typeof changeOrderStatusSchema>;
export declare const cancelOrderSchema: z.ZodObject<{
    reason: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    reason?: string | undefined;
}, {
    reason?: string | undefined;
}>;
export type CancelOrderDto = z.infer<typeof cancelOrderSchema>;
export declare const listOrdersQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    customerId: z.ZodOptional<z.ZodString>;
    branchId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNativeEnum<typeof OrderStatus>>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    sort: z.ZodDefault<z.ZodEnum<["createdAt", "netAmount", "orderNumber"]>>;
    order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strict", z.ZodTypeAny, {
    sort: "createdAt" | "orderNumber" | "netAmount";
    order: "asc" | "desc";
    page: number;
    limit: number;
    status?: OrderStatus | undefined;
    branchId?: string | undefined;
    search?: string | undefined;
    customerId?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}, {
    sort?: "createdAt" | "orderNumber" | "netAmount" | undefined;
    status?: OrderStatus | undefined;
    order?: "asc" | "desc" | undefined;
    branchId?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    customerId?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}>;
export type ListOrdersQuery = z.infer<typeof listOrdersQuerySchema>;
export interface CreateOrderResponse {
    id: string;
    orderNumber: string;
    customer: {
        id: string;
        name: string;
        phone: string;
    };
    branch: {
        id: string;
        nameAr: string;
        nameEn: string;
    };
    user: {
        id: string;
        name: string;
    } | null;
    status: OrderStatus;
    items: Array<{
        id: string;
        motorcycle: {
            id: string;
            vin: string;
            model: string;
            brand: {
                nameAr: string;
                nameEn: string;
            };
        };
        unitPrice: number;
        discount: number;
    }>;
    totalAmount: number;
    discount: number;
    netAmount: number;
    notes?: string | null;
    createdAt: string;
}
export interface OrderStatusChangeResponse {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    previousStatus: OrderStatus;
    updatedAt: string;
}
export interface ConfirmOrderResponse {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    netAmount: number;
    updatedAt: string;
}
export interface OrderHistoryEntry {
    id: string;
    action: string;
    before?: {
        status?: OrderStatus;
    };
    after: {
        status: OrderStatus;
    };
    user: {
        id: string;
        name: string;
    };
    reason?: string;
    createdAt: string;
}
export declare const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]>;
export declare function isValidOrderStatusTransition(from: OrderStatus, to: OrderStatus): boolean;
export declare function getMotorcycleStatusForOrderStatus(orderStatus: OrderStatus): "available" | "sold" | null;
//# sourceMappingURL=order.d.ts.map