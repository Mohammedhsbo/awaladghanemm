import { z } from "zod";
import { ReservationStatus } from "./enums.js";
/** Default reservation duration in days */
export declare const DEFAULT_RESERVATION_DAYS = 7;
/** Maximum allowed reservation extension in days from today */
export declare const MAX_RESERVATION_DAYS = 90;
/** Minimum deposit percentage (10%) */
export declare const MIN_DEPOSIT_PERCENT = 0.1;
/** Hard minimum deposit amount (EGP) */
export declare const MIN_DEPOSIT_AMOUNT_EGP = 1000;
export declare const reservationSchema: z.ZodObject<{
    id: z.ZodString;
    reservationNumber: z.ZodString;
    customerId: z.ZodString;
    motorcycleId: z.ZodString;
    branchId: z.ZodString;
    userId: z.ZodString;
    status: z.ZodNativeEnum<typeof ReservationStatus>;
    totalPrice: z.ZodNumber;
    paidAmount: z.ZodNumber;
    remainingAmount: z.ZodNumber;
    address: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    expiresAt: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
    notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    convertedOrderId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    status: ReservationStatus;
    branchId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    userId: string;
    paidAmount: number;
    remainingAmount: number;
    motorcycleId: string;
    totalPrice: number;
    reservationNumber: string;
    notes?: string | null | undefined;
    address?: string | null | undefined;
    expiresAt?: Date | null | undefined;
    convertedOrderId?: string | null | undefined;
}, {
    status: ReservationStatus;
    branchId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    userId: string;
    paidAmount: number;
    remainingAmount: number;
    motorcycleId: string;
    totalPrice: number;
    reservationNumber: string;
    notes?: string | null | undefined;
    address?: string | null | undefined;
    expiresAt?: Date | null | undefined;
    convertedOrderId?: string | null | undefined;
}>;
export type Reservation = z.infer<typeof reservationSchema>;
export declare const createReservationSchema: z.ZodObject<{
    customerId: z.ZodString;
    motorcycleId: z.ZodString;
    branchId: z.ZodOptional<z.ZodString>;
    paidAmount: z.ZodNumber;
    paymentReference: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    expirationDays: z.ZodOptional<z.ZodNumber>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    customerId: string;
    paidAmount: number;
    motorcycleId: string;
    notes?: string | undefined;
    branchId?: string | undefined;
    address?: string | undefined;
    paymentReference?: string | undefined;
    expirationDays?: number | undefined;
}, {
    customerId: string;
    paidAmount: number;
    motorcycleId: string;
    notes?: string | undefined;
    branchId?: string | undefined;
    address?: string | undefined;
    paymentReference?: string | undefined;
    expirationDays?: number | undefined;
}>;
export type CreateReservationRequest = z.infer<typeof createReservationSchema>;
export declare const updateReservationSchema: z.ZodObject<{
    expiresAt: z.ZodOptional<z.ZodDate>;
    address: z.ZodOptional<z.ZodString>;
    notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strict", z.ZodTypeAny, {
    notes?: string | null | undefined;
    address?: string | undefined;
    expiresAt?: Date | undefined;
}, {
    notes?: string | null | undefined;
    address?: string | undefined;
    expiresAt?: Date | undefined;
}>;
export type UpdateReservationRequest = z.infer<typeof updateReservationSchema>;
export declare const cancelReservationSchema: z.ZodObject<{
    reason: z.ZodOptional<z.ZodString>;
    requestRefund: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    requestRefund: boolean;
    reason?: string | undefined;
}, {
    reason?: string | undefined;
    requestRefund?: boolean | undefined;
}>;
export type CancelReservationRequest = z.infer<typeof cancelReservationSchema>;
export declare const convertReservationSchema: z.ZodObject<{
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    notes?: string | undefined;
}, {
    notes?: string | undefined;
}>;
export type ConvertReservationRequest = z.infer<typeof convertReservationSchema>;
export declare const extendReservationSchema: z.ZodObject<{
    expiresAt: z.ZodDate;
    reason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    expiresAt: Date;
    reason?: string | undefined;
}, {
    expiresAt: Date;
    reason?: string | undefined;
}>;
export type ExtendReservationRequest = z.infer<typeof extendReservationSchema>;
/**
 * Validates that a deposit amount satisfies business rules.
 *
 * Rules:
 * - Must be > 0
 * - Must be >= minimum (max of 10% of totalPrice or MIN_DEPOSIT_AMOUNT_EGP)
 * - Cannot exceed totalPrice
 *
 * @returns null if valid, or an error code string if invalid
 */
export declare function validateDepositAmount(paidAmount: number, totalPrice: number): "INVALID_DEPOSIT_AMOUNT" | null;
/**
 * Calculates the remaining amount owed on a reservation.
 * Always returns a value >= 0, rounded to 2 decimal places.
 */
export declare function calculateRemainingAmount(totalPrice: number, paidAmount: number): number;
/**
 * Validates whether a reservation status transition is allowed.
 *
 * @returns null if valid, or an error code string if the transition is not permitted
 */
export declare function validateStatusTransition(from: ReservationStatus, to: ReservationStatus): "RESERVATION_NOT_ACTIVE" | "RESERVATION_ALREADY_CONVERTED" | "INVALID_STATUS_TRANSITION" | null;
/**
 * Returns true if the reservation is past its expiration date.
 */
export declare function isReservationExpired(expiresAt: Date | null | undefined): boolean;
/**
 * Calculates the number of days until a reservation expires.
 * Returns null if no expiration date is set.
 * Returns negative values for already-expired reservations.
 */
export declare function daysUntilExpiry(expiresAt: Date | null | undefined): number | null;
//# sourceMappingURL=reservation.d.ts.map