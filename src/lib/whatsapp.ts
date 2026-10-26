export const WHATSAPP = {
  communityUrl: "https://chat.whatsapp.com/G4sGk613psAHPIDpmOq4RE",
  contactNumber: "917705993928",
  displayNumber: "+91 77059 93928",
} as const;

/** Build an official click-to-chat URL with an encoded message. */
export function waMeLink(message: string): string {
  return `https://wa.me/${WHATSAPP.contactNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Try to open a URL in a new tab. Returns false when the popup is blocked
 * so callers can show a manual fallback link.
 */
export function openExternal(url: string): boolean {
  const win = window.open(url, "_blank", "noopener,noreferrer");
  return win !== null;
}

export interface ContactFormData {
  fullName: string;
  phone: string;
  email?: string | undefined;
  category: string;
  subject: string;
  message: string;
}

/** Compose a readable WhatsApp message from validated contact-form values. */
export function buildContactMessage(data: ContactFormData): string {
  const lines = [
    "New inquiry for ORIGIN POINT",
    "",
    `Name: ${data.fullName}`,
    `Contact number: ${data.phone}`,
  ];
  if (data.email) lines.push(`Email: ${data.email}`);
  lines.push(`Inquiry category: ${data.category}`);
  lines.push(`Subject: ${data.subject}`);
  lines.push("", "Message:", data.message);
  return lines.join("\n");
}
