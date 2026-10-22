import { z } from "zod";
export declare const transferItemSchema: z.ZodObject<{
    id: z.ZodString;
    transferId: z.ZodString;
    motorcycleId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    motorcycleId: string;
    transferId: string;
}, {
    id: string;
    motorcycleId: string;
    transferId: string;
}>;
export type TransferItem = z.infer<typeof transferItemSchema>;
export declare const transferSchema: z.ZodObject<{
    id: z.ZodString;
    transferNumber: z.ZodString;
    fromBranchId: z.ZodString;
    toBranchId: z.ZodString;
    userId: z.ZodString;
    status: z.ZodNativeEnum<typeof import("./enums.js").TransferStatus>;
    notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    completedAt: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    items: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        transferId: z.ZodString;
        motorcycleId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        motorcycleId: string;
        transferId: string;
    }, {
        id: string;
        motorcycleId: string;
        transferId: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    status: import("./enums.js").TransferStatus;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    transferNumber: string;
    fromBranchId: string;
    toBranchId: string;
    notes?: string | null | undefined;
    items?: {
        id: string;
        motorcycleId: string;
        transferId: string;
    }[] | undefined;
    completedAt?: Date | null | undefined;
}, {
    status: import("./enums.js").TransferStatus;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    transferNumber: string;
    fromBranchId: string;
    toBranchId: string;
    notes?: string | null | undefined;
    items?: {
        id: string;
        motorcycleId: string;
        transferId: string;
    }[] | undefined;
    completedAt?: Date | null | undefined;
}>;
export type Transfer = z.infer<typeof transferSchema>;
export declare const createTransferSchema: z.ZodObject<{
    fromBranchId: z.ZodOptional<z.ZodString>;
    toBranchId: z.ZodString;
    motorcycleIds: z.ZodArray<z.ZodString, "many">;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    toBranchId: string;
    motorcycleIds: string[];
    notes?: string | undefined;
    fromBranchId?: string | undefined;
}, {
    toBranchId: string;
    motorcycleIds: string[];
    notes?: string | undefined;
    fromBranchId?: string | undefined;
}>;
export type CreateTransferRequest = z.infer<typeof createTransferSchema>;
//# sourceMappingURL=transfer.d.ts.map