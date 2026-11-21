// One place to change the business contact details used across the site and the student portal.
export const WHATSAPP_NUMBER = "27693126747";
export const PHONE_DISPLAY = "069 312 6747";
export const EMAIL = "mastermindtutoringmmt@gmail.com";

export function whatsappLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
