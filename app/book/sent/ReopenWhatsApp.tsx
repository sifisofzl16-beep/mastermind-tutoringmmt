"use client";

import { useSyncExternalStore } from "react";
import Icon from "../../_site/Icons";

function readLink() {
  try {
    return sessionStorage.getItem("mmt-booking-link");
  } catch {
    return null;
  }
}
const noop = () => () => {};

/** Opens WhatsApp again with the same booking message, in case the first window was closed or blocked. */
export default function ReopenWhatsApp({ fallback }: { fallback: string }) {
  const saved = useSyncExternalStore(noop, readLink, () => null);
  return (
    <a
      href={saved ?? fallback}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-navy hover:bg-gold-2"
    >
      <Icon name="chat" className="h-5 w-5" />
      {saved ? "WhatsApp did not open? Open it again" : "Open WhatsApp"}
    </a>
  );
}
