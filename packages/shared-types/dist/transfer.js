import { z } from "zod";
import { transferStatusSchema } from "./enums.js";
export const transferItemSchema = z.object({
    id: z.string().uuid(),
    transferId: z.string().uuid(),
    motorcycleId: z.string().uuid(),
});
export const transferSchema = z.object({
    id: z.string().uuid(),
    transferNumber: z.string().max(50),
    fromBranchId: z.string().uuid(),
    toBranchId: z.string().uuid(),
    userId: z.string().uuid(),
    status: transferStatusSchema,
    notes: z.string().optional().nullable(),
    completedAt: z.coerce.date().optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    items: z.array(transferItemSchema).optional(),
});
export const createTransferSchema = z.object({
    fromBranchId: z.string().uuid("Invalid source branch ID").optional(),
    toBranchId: z.string().uuid("Invalid destination branch ID"),
    motorcycleIds: z.array(z.string().uuid()).min(1, "At least one motorcycle must be selected"),
    notes: z.string().optional(),
});
//# sourceMappingURL=transfer.js.map