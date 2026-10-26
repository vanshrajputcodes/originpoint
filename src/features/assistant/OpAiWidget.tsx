import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, Send, Minus, Bot, ExternalLink } from "lucide-react";
import { askOpAi, STARTER_SUGGESTIONS, type AssistantReply } from "@/data/assistant";
import { WHATSAPP } from "@/lib/whatsapp";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  suggestions?: string[];
}

const HONESTY_NOTE = "OP AI answers from published community information only — it is not connected to a live AI model.";

export function OpAiWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hi! I'm OP AI. Ask me anything about ORIGIN POINT — the community, programs, events, careers, or how to join.",
      suggestions: STARTER_SUGGESTIONS.slice(0, 3),
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  function ask(question: string) {
    const q = question.trim();
    if (!q) return;
    const reply: AssistantReply = askOpAi(q);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: q },
      { role: "assistant", text: reply.answer, suggestions: reply.suggestions },
    ]);
    setInput("");
  }

  return (
    <>
      {/* Floating trigger — bottom right, small and unobtrusive */}
      <AnimatePresence>
        {!open ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6"
          >
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group flex items-center gap-2 rounded-full border border-border bg-card py-2.5 pr-4 pl-3 shadow-op transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              aria-haspopup="dialog"
              aria-label="Open OP AI, the community assistant"
            >
              <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
                <Sparkles aria-hidden className="size-4" />
              </span>
              <span className="text-sm font-semibold text-foreground">OP AI</span>
            </button>
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 right-full mr-2 hidden -translate-y-1/2 rounded-md bg-foreground px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 sm:block"
            >
              Ask about ORIGIN POINT
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-label="OP AI assistant"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 bottom-3 z-50 flex max-h-[min(36rem,calc(100dvh-1.5rem))] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-op sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[24rem]"
          >
            <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
              <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
                <Bot aria-hidden className="size-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">OP AI</p>
                <p className="truncate text-xs text-muted-foreground">Community knowledge assistant</p>
              </div>
              <button
                type="button"
                onClick={() => setMinimized((v) => !v)}
                aria-label={minimized ? "Expand OP AI panel" : "Minimize OP AI panel"}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <Minus aria-hidden className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close OP AI panel"
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X aria-hidden className="size-4" />
              </button>
            </div>

            {!minimized ? (
              <>
                <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4" aria-live="polite">
                  {messages.map((m, i) => (
                    <div key={i} className={m.role === "user" ? "flex justify-end" : "flex flex-col gap-2"}>
                      {m.role === "user" ? (
                        <p className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm text-primary-foreground">
                          {m.text}
                        </p>
                      ) : (
                        <>
                          <p className="max-w-[92%] rounded-2xl rounded-bl-md bg-secondary px-3.5 py-2.5 text-sm leading-relaxed text-foreground">
                            {m.text}
                          </p>
                          {i === 0 ? (
                            <p className="text-xs text-muted-foreground">{HONESTY_NOTE}</p>
                          ) : null}
                          {m.suggestions?.length ? (
                            <div className="flex flex-wrap gap-1.5">
                              {m.suggestions.map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => ask(s)}
                                  className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <form
                  className="border-t border-border p-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    ask(input);
                  }}
                >
                  <div className="flex gap-2">
                    <label htmlFor="op-ai-input" className="sr-only">
                      Ask OP AI a question
                    </label>
                    <input
                      id="op-ai-input"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about ORIGIN POINT…"
                      className="h-10 min-w-0 flex-1 rounded-xl border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-2 focus:outline-ring"
                    />
                    <button
                      type="submit"
                      aria-label="Send question"
                      className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <Send aria-hidden className="size-4" />
                    </button>
                  </div>
                  <p className="mt-2 flex flex-wrap items-center gap-x-3 text-[11px] text-muted-foreground">
                    <span>Based on published community information only.</span>
                    <Link to="/op-ai" className="inline-flex items-center gap-1 font-medium text-accent-foreground hover:underline">
                      About OP AI <ExternalLink aria-hidden className="size-3" />
                    </Link>
                  </p>
                </form>
              </>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Keep the WhatsApp fallback available while the panel is open on mobile */}
      {open ? null : (
        <a
          href={WHATSAPP.communityUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="sr-only"
        >
          Join the ORIGIN POINT WhatsApp community
        </a>
      )}
    </>
  );
}
