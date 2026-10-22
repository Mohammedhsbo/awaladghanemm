export function normalizeWhatsAppPhone(phone, defaultCountryCode = "966") {
    const digits = phone.replace(/[^0-9+]/g, "");
    if (digits.startsWith("+"))
        return digits.slice(1);
    if (digits.startsWith("00"))
        return digits.slice(2);
    if (digits.startsWith("05"))
        return `${defaultCountryCode}${digits.slice(1)}`;
    if (digits.startsWith("01"))
        return `20${digits.slice(1)}`;
    if (digits.startsWith("0"))
        return `${defaultCountryCode}${digits.slice(1)}`;
    return digits;
}
export function buildWhatsAppUrl(phone, message) {
    return `https://wa.me/${normalizeWhatsAppPhone(phone)}?text=${encodeURIComponent(message)}`;
}
//# sourceMappingURL=whatsapp.js.map