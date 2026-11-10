// One place to change the business contact details used across the site and the student portal.
export const WHATSAPP_NUMBER = "27655112416";
export const PHONE_DISPLAY = "065 511 2416";
export const EMAIL = "mastermindtutoringmmt@gmail.com";

export function whatsappLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
