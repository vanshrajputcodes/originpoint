import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, ExternalLink, CheckCircle2, MessageCircle } from "lucide-react";
import { buildContactMessage, openExternal, waMeLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  "General inquiry",
  "Hackathon or event collaboration",
  "Internship or career opportunity",
  "Mentorship",
  "Partnership or sponsorship",
  "Campus chapter",
  "Project collaboration",
  "Other",
] as const;

const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  phone: z
    .string()
    .trim()
    .min(8, "Please enter a valid contact number.")
    .max(20, "That number looks too long.")
    .regex(/^[+\d][\d\s-]+$/, "Use digits, spaces, or dashes only."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .optional()
    .or(z.literal("")),
  category: z.string().min(1, "Please choose a category."),
  subject: z.string().trim().min(3, "Please add a short subject."),
  message: z.string().trim().min(20, "Please describe your inquiry in at least 20 characters."),
  consent: z
    .boolean()
    .refine((v) => v === true, {
      message: "Please confirm the WhatsApp handoff to continue.",
    }),
});

type ContactValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const [popupBlocked, setPopupBlocked] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      category: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: ContactValues) => {
    const message = buildContactMessage({
      fullName: values.fullName,
      phone: values.phone,
      email: values.email || undefined,
      category: values.category,
      subject: values.subject,
      message: values.message,
    });
    const url = waMeLink(message);
    setWaUrl(url);
    const opened = openExternal(url);
    setPopupBlocked(!opened);
    if (opened) reset();
  };

  const fieldError = (name: keyof ContactValues) => errors[name]?.message as string | undefined;

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-op sm:p-8">
      {waUrl ? (
        <div className="rounded-2xl border border-border bg-accent p-5" role="status">
          <p className="flex items-center gap-2 font-semibold text-accent-foreground">
            <CheckCircle2 aria-hidden className="size-5" />
            Your message is prepared in WhatsApp
          </p>
          <p className="mt-2 text-sm leading-relaxed text-accent-foreground/90">
            Your details were turned into a WhatsApp message — it has not been sent yet.
            Review it in WhatsApp and press send there. Nothing was stored or shared elsewhere.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild>
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden className="size-4" />
                Open WhatsApp again
              </a>
            </Button>
            <Button variant="outline" onClick={() => setWaUrl(null)}>
              Write another message
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full name *</Label>
              <Input id="fullName" {...register("fullName")} aria-invalid={!!errors.fullName} autoComplete="name" />
              {fieldError("fullName") ? <p className="text-xs text-destructive">{fieldError("fullName")}</p> : null}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">WhatsApp / contact number *</Label>
              <Input id="phone" type="tel" {...register("phone")} aria-invalid={!!errors.phone} autoComplete="tel" />
              {fieldError("phone") ? <p className="text-xs text-destructive">{fieldError("phone")}</p> : null}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email (optional)</Label>
              <Input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} autoComplete="email" />
              {fieldError("email") ? <p className="text-xs text-destructive">{fieldError("email")}</p> : null}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="category">Inquiry category *</Label>
              <select
                id="category"
                {...register("category")}
                className={cn(
                  "h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-ring",
                  errors.category && "border-destructive",
                )}
              >
                <option value="">Select a category…</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {fieldError("category") ? <p className="text-xs text-destructive">{fieldError("category")}</p> : null}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="subject">Subject *</Label>
            <Input id="subject" {...register("subject")} aria-invalid={!!errors.subject} />
            {fieldError("subject") ? <p className="text-xs text-destructive">{fieldError("subject")}</p> : null}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message">Message *</Label>
            <Textarea id="message" rows={5} {...register("message")} aria-invalid={!!errors.message} />
            {fieldError("message") ? <p className="text-xs text-destructive">{fieldError("message")}</p> : null}
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2.5">
              <Checkbox
                id="consent"
                {...register("consent", {
                  setValueAs: (v) => v === true || v === "true" || v === "on",
                })}
                aria-invalid={!!errors.consent}
                className="mt-0.5"
              />
              <Label htmlFor="consent" className="text-sm font-normal leading-relaxed text-muted-foreground">
                Your details will be included in a WhatsApp message that you can review and send to ORIGIN POINT.
              </Label>
            </div>
            {fieldError("consent") ? <p className="text-xs text-destructive">{fieldError("consent")}</p> : null}
          </div>

          {popupBlocked ? (
            <div className="rounded-xl border border-border bg-secondary p-4 text-sm" role="alert">
              <p className="font-medium text-foreground">Your browser blocked the WhatsApp window.</p>
              <p className="mt-1 text-muted-foreground">
                Use the button below to open WhatsApp manually — your message will be pre-filled.
              </p>
            </div>
          ) : null}

          <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
            <Send aria-hidden className="size-4" />
            Continue to WhatsApp
          </Button>

          <p className="flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground">
            <ExternalLink aria-hidden className="mt-0.5 size-3 shrink-0" />
            This form sends nothing by itself — it opens WhatsApp with your message pre-filled so you can review and send it.
            Your details are never stored.
          </p>
        </form>
      )}
    </div>
  );
}
