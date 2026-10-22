import { z } from "zod";
export declare enum Resource {
    MOTORCYCLE = "motorcycle",
    ORDER = "order",
    RESERVATION = "reservation",
    PAYMENT = "payment",
    INSTALLMENT = "installment",
    FINANCING_CONTRACT = "financing_contract",
    LETTER = "letter",
    CUSTOMER = "customer",
    SUPPLIER = "supplier",
    PURCHASE = "purchase",
    TRANSFER = "transfer",
    BRANCH = "branch",
    USER = "user",
    ROLE = "role",
    REPORT = "report",
    SETTING = "setting",
    WEB_CONTENT = "web_content",
    INVOICES = "invoices",
    PAYMENTS = "payments",
    CONFIGURATION = "configuration",
    NOTIFICATION = "notification",
    POS = "pos",
    SCHEDULER = "scheduler"
}
export declare enum Action {
    CREATE = "create",
    READ = "read",
    UPDATE = "update",
    DELETE = "delete",
    EXPORT = "export",
    REFUND = "refund",
    APPROVE = "approve",
    CONFIRM = "confirm"
}
export declare enum Language {
    AR = "ar",
    EN = "en"
}
export declare enum MotorcycleStatus {
    IN_TRANSIT = "in_transit",
    AVAILABLE = "available",
    RESERVED = "reserved",
    SOLD = "sold",
    IN_TRANSFER = "in_transfer",
    MAINTENANCE = "maintenance",
    RETURNED = "returned"
}
export declare enum PurchaseStatus {
    DRAFT = "draft",
    ORDERED = "ordered",
    PARTIALLY_RECEIVED = "partially_received",
    RECEIVED = "received",
    CANCELLED = "cancelled"
}
export declare enum TransferStatus {
    INITIATED = "initiated",
    IN_TRANSIT = "in_transit",
    RECEIVED = "received",
    CANCELLED = "cancelled"
}
export declare enum ReservationStatus {
    ACTIVE = "active",
    CONVERTED = "converted",
    EXPIRED = "expired",
    CANCELLED = "cancelled"
}
export declare const resourceSchema: z.ZodNativeEnum<typeof Resource>;
export declare const actionSchema: z.ZodNativeEnum<typeof Action>;
export declare const languageSchema: z.ZodNativeEnum<typeof Language>;
export declare const motorcycleStatusSchema: z.ZodNativeEnum<typeof MotorcycleStatus>;
export declare const purchaseStatusSchema: z.ZodNativeEnum<typeof PurchaseStatus>;
export declare const transferStatusSchema: z.ZodNativeEnum<typeof TransferStatus>;
export declare const reservationStatusSchema: z.ZodNativeEnum<typeof ReservationStatus>;
export type PermissionKey = `${Resource}:${Action}`;
//# sourceMappingURL=enums.d.ts.map