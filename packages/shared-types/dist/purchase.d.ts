import { z } from "zod";
export declare const purchaseItemSchema: z.ZodObject<{
    id: z.ZodString;
    purchaseId: z.ZodString;
    motorcycleId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    model: z.ZodString;
    vin: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    quantity: z.ZodNumber;
    unitCost: z.ZodNumber;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    quantity: number;
    model: string;
    purchaseId: string;
    unitCost: number;
    motorcycleId?: string | null | undefined;
    vin?: string | null | undefined;
}, {
    id: string;
    createdAt: Date;
    quantity: number;
    model: string;
    purchaseId: string;
    unitCost: number;
    motorcycleId?: string | null | undefined;
    vin?: string | null | undefined;
}>;
export type PurchaseItem = z.infer<typeof purchaseItemSchema>;
export declare const purchaseSchema: z.ZodObject<{
    id: z.ZodString;
    purchaseNumber: z.ZodString;
    supplierId: z.ZodString;
    branchId: z.ZodString;
    userId: z.ZodString;
    totalAmount: z.ZodNumber;
    status: z.ZodNativeEnum<typeof import("./enums.js").PurchaseStatus>;
    receivedAt: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
    notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    items: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        purchaseId: z.ZodString;
        motorcycleId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        model: z.ZodString;
        vin: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        quantity: z.ZodNumber;
        unitCost: z.ZodNumber;
        createdAt: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: Date;
        quantity: number;
        model: string;
        purchaseId: string;
        unitCost: number;
        motorcycleId?: string | null | undefined;
        vin?: string | null | undefined;
    }, {
        id: string;
        createdAt: Date;
        quantity: number;
        model: string;
        purchaseId: string;
        unitCost: number;
        motorcycleId?: string | null | undefined;
        vin?: string | null | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    status: import("./enums.js").PurchaseStatus;
    branchId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    totalAmount: number;
    purchaseNumber: string;
    supplierId: string;
    notes?: string | null | undefined;
    items?: {
        id: string;
        createdAt: Date;
        quantity: number;
        model: string;
        purchaseId: string;
        unitCost: number;
        motorcycleId?: string | null | undefined;
        vin?: string | null | undefined;
    }[] | undefined;
    receivedAt?: Date | null | undefined;
}, {
    status: import("./enums.js").PurchaseStatus;
    branchId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    totalAmount: number;
    purchaseNumber: string;
    supplierId: string;
    notes?: string | null | undefined;
    items?: {
        id: string;
        createdAt: Date;
        quantity: number;
        model: string;
        purchaseId: string;
        unitCost: number;
        motorcycleId?: string | null | undefined;
        vin?: string | null | undefined;
    }[] | undefined;
    receivedAt?: Date | null | undefined;
}>;
export type Purchase = z.infer<typeof purchaseSchema>;
export declare const createPurchaseItemRequestSchema: z.ZodObject<{
    model: z.ZodString;
    vin: z.ZodOptional<z.ZodString>;
    quantity: z.ZodNumber;
    unitCost: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    quantity: number;
    model: string;
    unitCost: number;
    vin?: string | undefined;
}, {
    quantity: number;
    model: string;
    unitCost: number;
    vin?: string | undefined;
}>;
export type CreatePurchaseItemRequest = z.infer<typeof createPurchaseItemRequestSchema>;
export declare const createPurchaseSchema: z.ZodObject<{
    supplierId: z.ZodString;
    branchId: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        model: z.ZodString;
        vin: z.ZodOptional<z.ZodString>;
        quantity: z.ZodNumber;
        unitCost: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        quantity: number;
        model: string;
        unitCost: number;
        vin?: string | undefined;
    }, {
        quantity: number;
        model: string;
        unitCost: number;
        vin?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    items: {
        quantity: number;
        model: string;
        unitCost: number;
        vin?: string | undefined;
    }[];
    supplierId: string;
    notes?: string | undefined;
    branchId?: string | undefined;
}, {
    items: {
        quantity: number;
        model: string;
        unitCost: number;
        vin?: string | undefined;
    }[];
    supplierId: string;
    notes?: string | undefined;
    branchId?: string | undefined;
}>;
export type CreatePurchaseRequest = z.infer<typeof createPurchaseSchema>;
export declare const updatePurchaseSchema: z.ZodObject<{
    supplierId: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    items: z.ZodOptional<z.ZodArray<z.ZodObject<{
        model: z.ZodString;
        vin: z.ZodOptional<z.ZodString>;
        quantity: z.ZodNumber;
        unitCost: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        quantity: number;
        model: string;
        unitCost: number;
        vin?: string | undefined;
    }, {
        quantity: number;
        model: string;
        unitCost: number;
        vin?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    notes?: string | undefined;
    items?: {
        quantity: number;
        model: string;
        unitCost: number;
        vin?: string | undefined;
    }[] | undefined;
    supplierId?: string | undefined;
}, {
    notes?: string | undefined;
    items?: {
        quantity: number;
        model: string;
        unitCost: number;
        vin?: string | undefined;
    }[] | undefined;
    supplierId?: string | undefined;
}>;
export type UpdatePurchaseRequest = z.infer<typeof updatePurchaseSchema>;
export declare const receivePurchaseItemSchema: z.ZodObject<{
    purchaseItemId: z.ZodString;
    vin: z.ZodString;
}, "strip", z.ZodTypeAny, {
    vin: string;
    purchaseItemId: string;
}, {
    vin: string;
    purchaseItemId: string;
}>;
export declare const receivePurchaseSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        purchaseItemId: z.ZodString;
        vin: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        vin: string;
        purchaseItemId: string;
    }, {
        vin: string;
        purchaseItemId: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    items: {
        vin: string;
        purchaseItemId: string;
    }[];
}, {
    items: {
        vin: string;
        purchaseItemId: string;
    }[];
}>;
export type ReceivePurchaseRequest = z.infer<typeof receivePurchaseSchema>;
//# sourceMappingURL=purchase.d.ts.map