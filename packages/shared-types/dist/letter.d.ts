import { z } from "zod";
export declare enum LetterStatus {
    ISSUED = "issued",
    RECEIVED = "received",
    NOT_RECEIVED = "not_received"
}
export declare const letterStatusSchema: z.ZodNativeEnum<typeof LetterStatus>;
export declare enum LetterType {
    RECEIPT = "receipt",
    DELIVERY = "delivery"
}
export declare const letterTypeSchema: z.ZodNativeEnum<typeof LetterType>;
export declare enum LetterAction {
    CREATED = "created",
    ISSUED = "issued",
    CONFIRMED = "confirmed",
    NOT_RECEIVED_RECORDED = "not_received_recorded",
    CANCELLED = "cancelled",
    DOCUMENT_GENERATED = "document_generated"
}
export declare const letterActionSchema: z.ZodNativeEnum<typeof LetterAction>;
export interface Letter {
    id: string;
    letterNumber: string;
    customerId: string;
    motorcycleId: string;
    orderId?: string | null;
    reservationId?: string | null;
    branchId: string;
    type: LetterType;
    status: LetterStatus;
    issuedAt: Date;
    confirmedAt?: Date | null;
    expectedDeliveryDate?: Date | null;
    documentStorageRef?: string | null;
    userId: string;
    confirmedBy?: string | null;
    notes?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare const letterSchema: z.ZodObject<{
    id: z.ZodString;
    letterNumber: z.ZodString;
    customerId: z.ZodString;
    motorcycleId: z.ZodString;
    orderId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    reservationId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    branchId: z.ZodString;
    type: z.ZodNativeEnum<typeof LetterType>;
    status: z.ZodNativeEnum<typeof LetterStatus>;
    issuedAt: z.ZodDate;
    confirmedAt: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
    expectedDeliveryDate: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
    documentStorageRef: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    userId: z.ZodString;
    confirmedBy: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    type: LetterType;
    status: LetterStatus;
    branchId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    userId: string;
    motorcycleId: string;
    letterNumber: string;
    issuedAt: Date;
    notes?: string | null | undefined;
    orderId?: string | null | undefined;
    reservationId?: string | null | undefined;
    confirmedAt?: Date | null | undefined;
    expectedDeliveryDate?: Date | null | undefined;
    documentStorageRef?: string | null | undefined;
    confirmedBy?: string | null | undefined;
}, {
    type: LetterType;
    status: LetterStatus;
    branchId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    userId: string;
    motorcycleId: string;
    letterNumber: string;
    issuedAt: Date;
    notes?: string | null | undefined;
    orderId?: string | null | undefined;
    reservationId?: string | null | undefined;
    confirmedAt?: Date | null | undefined;
    expectedDeliveryDate?: Date | null | undefined;
    documentStorageRef?: string | null | undefined;
    confirmedBy?: string | null | undefined;
}>;
export interface LetterDocument {
    id: string;
    letterId: string;
    documentType: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    storageRef: string;
    version: number;
    createdBy: string;
    createdAt: Date;
}
export declare const letterDocumentSchema: z.ZodObject<{
    id: z.ZodString;
    letterId: z.ZodString;
    documentType: z.ZodString;
    fileName: z.ZodString;
    fileSize: z.ZodNumber;
    mimeType: z.ZodString;
    storageRef: z.ZodString;
    version: z.ZodDefault<z.ZodNumber>;
    createdBy: z.ZodString;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    createdBy: string;
    letterId: string;
    documentType: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    storageRef: string;
    version: number;
}, {
    id: string;
    createdAt: Date;
    createdBy: string;
    letterId: string;
    documentType: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    storageRef: string;
    version?: number | undefined;
}>;
export interface LetterHistory {
    id: string;
    letterId: string;
    action: string;
    fromStatus?: string | null;
    toStatus?: string | null;
    actorId: string;
    reason?: string | null;
    notes?: string | null;
    createdAt: Date;
}
export declare const letterHistorySchema: z.ZodObject<{
    id: z.ZodString;
    letterId: z.ZodString;
    action: z.ZodString;
    fromStatus: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    toStatus: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    actorId: z.ZodString;
    reason: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    action: string;
    id: string;
    createdAt: Date;
    letterId: string;
    actorId: string;
    notes?: string | null | undefined;
    reason?: string | null | undefined;
    fromStatus?: string | null | undefined;
    toStatus?: string | null | undefined;
}, {
    action: string;
    id: string;
    createdAt: Date;
    letterId: string;
    actorId: string;
    notes?: string | null | undefined;
    reason?: string | null | undefined;
    fromStatus?: string | null | undefined;
    toStatus?: string | null | undefined;
}>;
export declare const createLetterDtoSchema: z.ZodObject<{
    customerId: z.ZodString;
    motorcycleId: z.ZodString;
    orderId: z.ZodOptional<z.ZodString>;
    reservationId: z.ZodOptional<z.ZodString>;
    type: z.ZodDefault<z.ZodNativeEnum<typeof LetterType>>;
    expectedDeliveryDate: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: LetterType;
    customerId: string;
    motorcycleId: string;
    notes?: string | undefined;
    orderId?: string | undefined;
    reservationId?: string | undefined;
    expectedDeliveryDate?: string | undefined;
}, {
    customerId: string;
    motorcycleId: string;
    notes?: string | undefined;
    type?: LetterType | undefined;
    orderId?: string | undefined;
    reservationId?: string | undefined;
    expectedDeliveryDate?: string | undefined;
}>;
export type CreateLetterDto = z.infer<typeof createLetterDtoSchema>;
export declare const confirmReceiptDtoSchema: z.ZodObject<{
    confirmedAt: z.ZodOptional<z.ZodString>;
    reason: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    notes?: string | undefined;
    reason?: string | undefined;
    confirmedAt?: string | undefined;
}, {
    notes?: string | undefined;
    reason?: string | undefined;
    confirmedAt?: string | undefined;
}>;
export type ConfirmReceiptDto = z.infer<typeof confirmReceiptDtoSchema>;
export declare const recordNonReceiptDtoSchema: z.ZodObject<{
    reason: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    reason: string;
    notes?: string | undefined;
}, {
    reason: string;
    notes?: string | undefined;
}>;
export type RecordNonReceiptDto = z.infer<typeof recordNonReceiptDtoSchema>;
export declare const generateDocumentDtoSchema: z.ZodObject<{
    documentType: z.ZodEnum<["delivery", "receipt"]>;
    regenerate: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    documentType: "receipt" | "delivery";
    regenerate: boolean;
}, {
    documentType: "receipt" | "delivery";
    regenerate?: boolean | undefined;
}>;
export type GenerateDocumentDto = z.infer<typeof generateDocumentDtoSchema>;
export declare const updateLetterDtoSchema: z.ZodObject<{
    expectedDeliveryDate: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    notes?: string | undefined;
    expectedDeliveryDate?: string | undefined;
}, {
    notes?: string | undefined;
    expectedDeliveryDate?: string | undefined;
}>;
export type UpdateLetterDto = z.infer<typeof updateLetterDtoSchema>;
export declare const LETTER_STATUS_TRANSITIONS: Record<LetterStatus, LetterStatus[]>;
export declare function isValidLetterStatusTransition(fromStatus: LetterStatus, toStatus: LetterStatus): boolean;
export declare function validateLetterStatusTransition(fromStatus: LetterStatus, toStatus: LetterStatus): void;
export interface LetterWithRelations extends Letter {
    customer?: {
        id: string;
        name: string;
        phone: string;
        email?: string | null;
    };
    motorcycle?: {
        id: string;
        vin: string;
        model: string;
        year: number;
        color?: string | null;
        brand?: {
            nameEn: string;
            nameAr: string;
        };
    };
    order?: {
        id: string;
        orderNumber: string;
        status: string;
    } | null;
    reservation?: {
        id: string;
        reservationNumber: string;
        status: string;
    } | null;
    branch?: {
        id: string;
        nameEn: string;
        nameAr: string;
    };
    creator?: {
        id: string;
        name: string;
    };
    confirmer?: {
        id: string;
        name: string;
    } | null;
    documents?: LetterDocument[];
    history?: LetterHistory[];
}
export interface LetterSummary {
    id: string;
    letterNumber: string;
    customerName: string;
    motorcycleVin: string;
    motorcycleModel: string;
    status: LetterStatus;
    type: LetterType;
    issuedAt: Date;
    confirmedAt?: Date | null;
    daysPending?: number | null;
}
export interface LetterQueryParams {
    customerId?: string;
    motorcycleId?: string;
    orderId?: string;
    reservationId?: string;
    status?: LetterStatus;
    type?: LetterType;
    branchId?: string;
    search?: string;
    pendingOnly?: boolean;
    issuedAfter?: Date;
    issuedBefore?: Date;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
    sort?: string;
    order?: "asc" | "desc";
}
export declare const letterQueryParamsSchema: z.ZodObject<{
    customerId: z.ZodOptional<z.ZodString>;
    motorcycleId: z.ZodOptional<z.ZodString>;
    orderId: z.ZodOptional<z.ZodString>;
    reservationId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNativeEnum<typeof LetterStatus>>;
    type: z.ZodOptional<z.ZodNativeEnum<typeof LetterType>>;
    branchId: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    pendingOnly: z.ZodOptional<z.ZodBoolean>;
    issuedAfter: z.ZodOptional<z.ZodString>;
    issuedBefore: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    order: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    type?: LetterType | undefined;
    sort?: string | undefined;
    status?: LetterStatus | undefined;
    order?: "asc" | "desc" | undefined;
    branchId?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    customerId?: string | undefined;
    orderId?: string | undefined;
    reservationId?: string | undefined;
    motorcycleId?: string | undefined;
    pendingOnly?: boolean | undefined;
    issuedAfter?: string | undefined;
    issuedBefore?: string | undefined;
}, {
    type?: LetterType | undefined;
    sort?: string | undefined;
    status?: LetterStatus | undefined;
    order?: "asc" | "desc" | undefined;
    branchId?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    customerId?: string | undefined;
    orderId?: string | undefined;
    reservationId?: string | undefined;
    motorcycleId?: string | undefined;
    pendingOnly?: boolean | undefined;
    issuedAfter?: string | undefined;
    issuedBefore?: string | undefined;
}>;
export interface CreateLetterResponse {
    success: boolean;
    letter: LetterWithRelations;
    message: string;
}
export interface ListLettersResponse {
    letters: any[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export interface LetterDetailResponse {
    letter: LetterWithRelations;
}
//# sourceMappingURL=letter.d.ts.map