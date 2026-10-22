import { z } from "zod";
export var Resource;
(function (Resource) {
    Resource["MOTORCYCLE"] = "motorcycle";
    Resource["ORDER"] = "order";
    Resource["RESERVATION"] = "reservation";
    Resource["PAYMENT"] = "payment";
    Resource["INSTALLMENT"] = "installment";
    Resource["FINANCING_CONTRACT"] = "financing_contract";
    Resource["LETTER"] = "letter";
    Resource["CUSTOMER"] = "customer";
    Resource["SUPPLIER"] = "supplier";
    Resource["PURCHASE"] = "purchase";
    Resource["TRANSFER"] = "transfer";
    Resource["BRANCH"] = "branch";
    Resource["USER"] = "user";
    Resource["ROLE"] = "role";
    Resource["REPORT"] = "report";
    Resource["SETTING"] = "setting";
    Resource["WEB_CONTENT"] = "web_content";
    Resource["INVOICES"] = "invoices";
    Resource["PAYMENTS"] = "payments";
    Resource["CONFIGURATION"] = "configuration";
    Resource["NOTIFICATION"] = "notification";
    Resource["POS"] = "pos";
    Resource["SCHEDULER"] = "scheduler";
})(Resource || (Resource = {}));
export var Action;
(function (Action) {
    Action["CREATE"] = "create";
    Action["READ"] = "read";
    Action["UPDATE"] = "update";
    Action["DELETE"] = "delete";
    Action["EXPORT"] = "export";
    Action["REFUND"] = "refund";
    Action["APPROVE"] = "approve";
    Action["CONFIRM"] = "confirm";
})(Action || (Action = {}));
export var Language;
(function (Language) {
    Language["AR"] = "ar";
    Language["EN"] = "en";
})(Language || (Language = {}));
export var MotorcycleStatus;
(function (MotorcycleStatus) {
    MotorcycleStatus["IN_TRANSIT"] = "in_transit";
    MotorcycleStatus["AVAILABLE"] = "available";
    MotorcycleStatus["RESERVED"] = "reserved";
    MotorcycleStatus["SOLD"] = "sold";
    MotorcycleStatus["IN_TRANSFER"] = "in_transfer";
    MotorcycleStatus["MAINTENANCE"] = "maintenance";
    MotorcycleStatus["RETURNED"] = "returned";
})(MotorcycleStatus || (MotorcycleStatus = {}));
export var PurchaseStatus;
(function (PurchaseStatus) {
    PurchaseStatus["DRAFT"] = "draft";
    PurchaseStatus["ORDERED"] = "ordered";
    PurchaseStatus["PARTIALLY_RECEIVED"] = "partially_received";
    PurchaseStatus["RECEIVED"] = "received";
    PurchaseStatus["CANCELLED"] = "cancelled";
})(PurchaseStatus || (PurchaseStatus = {}));
export var TransferStatus;
(function (TransferStatus) {
    TransferStatus["INITIATED"] = "initiated";
    TransferStatus["IN_TRANSIT"] = "in_transit";
    TransferStatus["RECEIVED"] = "received";
    TransferStatus["CANCELLED"] = "cancelled";
})(TransferStatus || (TransferStatus = {}));
export var ReservationStatus;
(function (ReservationStatus) {
    ReservationStatus["ACTIVE"] = "active";
    ReservationStatus["CONVERTED"] = "converted";
    ReservationStatus["EXPIRED"] = "expired";
    ReservationStatus["CANCELLED"] = "cancelled";
})(ReservationStatus || (ReservationStatus = {}));
export const resourceSchema = z.nativeEnum(Resource);
export const actionSchema = z.nativeEnum(Action);
export const languageSchema = z.nativeEnum(Language);
export const motorcycleStatusSchema = z.nativeEnum(MotorcycleStatus);
export const purchaseStatusSchema = z.nativeEnum(PurchaseStatus);
export const transferStatusSchema = z.nativeEnum(TransferStatus);
export const reservationStatusSchema = z.nativeEnum(ReservationStatus);
//# sourceMappingURL=enums.js.map