// One place to change the number used for enquiry links in the members area.
export const WHATSAPP_NUMBER = "27660397779";

export function whatsappLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
