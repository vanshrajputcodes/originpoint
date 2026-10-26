import { BRAND, FOUNDERS } from "@/data/site";
import { PROGRAMS } from "@/data/programs";
import { FAQS } from "@/data/faqs";
import { EVENT_CATEGORIES, CONFIRMED_EVENTS } from "@/data/events";
import { PREP_TRACKS, SUPPORT_SERVICES } from "@/data/careers";
import { JOURNEY_STAGES } from "@/data/journey";
import { WHATSAPP } from "@/lib/whatsapp";

export interface AssistantReply {
  answer: string;
  suggestions: string[];
}

interface KnowledgeEntry {
  keywords: string[];
  reply: AssistantReply;
}

/**
 * Local knowledge base for OP AI. Responses are generated deterministically
 * from curated community content — no LLM is connected. The widget calls this
 * service behind a clean interface so a real provider can replace it later.
 */
const KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ["what is", "origin point", "about", "community", "who are you", "what do you do"],
    reply: {
      answer: `${BRAND.name} is a community and opportunity ecosystem where students, developers, designers, founders, creators and ambitious professionals learn practical skills, build real-world projects, compete in hackathons, collaborate on open source, and prepare for careers — together. ${BRAND.tagline}`,
      suggestions: ["How can I join?", "What programs exist?", "Is it only for developers?"],
    },
  },
  {
    keywords: ["join", "sign up", "member", "membership", "whatsapp", "get started", "start"],
    reply: {
      answer:
        "Joining takes one tap: the Join Community button anywhere on this site opens the WhatsApp community, where announcements, introductions and events happen. Membership of the WhatsApp community is free.",
      suggestions: ["Is membership free?", "What can I do after joining?", "How do events work?"],
    },
  },
  {
    keywords: ["program", "op learn", "op build", "op hack", "op careers", "op connect", "op launch", "ecosystem", "track"],
    reply: {
      answer: `The ecosystem organizes into six program families: ${PROGRAMS.map((p) => p.name).join(", ")}. OP Connect is live in the WhatsApp community today; the others launch as members rally around them — tell the team which one you want first.`,
      suggestions: ["Tell me about OP Build", "Tell me about OP Careers", "How can I join?"],
    },
  },
  {
    keywords: ["hackathon", "event", "workshop", "meetup", "competition", "contest", "talk"],
    reply: {
      answer: `Events run under five categories: ${EVENT_CATEGORIES.map((e) => e.name).join(", ")}. ${
        CONFIRMED_EVENTS.length === 0
          ? "No confirmed events have been announced yet — join the community for announcements."
          : `Confirmed events: ${CONFIRMED_EVENTS.map((e) => e.name).join(", ")}.`
      }`,
      suggestions: ["How can I participate in hackathons?", "How can I join?", "Can I find teammates?"],
    },
  },
  {
    keywords: ["career", "placement", "internship", "job", "resume", "interview", "ready", "placement-ready", "skill gap", "referral"],
    reply: {
      answer: `Career preparation covers ${SUPPORT_SERVICES.map((s) => s.title.toLowerCase()).join(", ")}. Role tracks span ${PREP_TRACKS.map((t) => t.title.toLowerCase()).join(", ")}. Important: ORIGIN POINT facilitates preparation and access — jobs and placements are never guaranteed.`,
      suggestions: ["How do I become placement-ready?", "Does joining guarantee a job?", "Where can I find opportunities?"],
    },
  },
  {
    keywords: ["project", "build", "production", "deploy", "open source", "contribute", "pull request", "collaborate", "team"],
    reply: {
      answer:
        "Members build production-ready projects through a real lifecycle: idea validation, planning, UI/UX, implementation, version control, testing, deployment, and maintenance. Open-source initiatives include beginner-friendly contribution paths for your first pull request. Project teams are formed inside the community.",
      suggestions: ["How do I find a team?", "What is the build lifecycle?", "Can I showcase my project?"],
    },
  },
  {
    keywords: ["mentor", "guidance", "feedback", "help me", "advice"],
    reply: {
      answer:
        "Mentorship connects members with mentors and experienced peers for honest feedback on skills, projects, and career decisions. To offer mentorship or request it, message the team on WhatsApp or use the contact form.",
      suggestions: ["How do I become a mentor?", "How can I contact the team?", "How can I join?"],
    },
  },
  {
    keywords: ["founder", "who started", "vansh", "dishank", "team", "leadership"],
    reply: {
      answer: `ORIGIN POINT was founded by ${FOUNDERS.map((f) => f.name).join(" and ")}. Both are active in the community and on LinkedIn — see the Our Team page for their profiles.`,
      suggestions: ["How can I contact the team?", "What is ORIGIN POINT?", "How can I contribute?"],
    },
  },
  {
    keywords: ["contact", "reach", "message", "phone", "number", "email"],
    reply: {
      answer: `You can reach the team through the contact form on this site — it prepares a WhatsApp message you review and send yourself — or message us directly on WhatsApp at ${WHATSAPP.displayNumber}.`,
      suggestions: ["Can an organization partner with OP?", "How can I join?"],
    },
  },
  {
    keywords: ["partner", "sponsor", "organization", "company", "college", "campus", "chapter", "ambassador"],
    reply: {
      answer:
        "Companies, colleges, and organizations can collaborate on events, challenges, hiring pipelines, and campus chapters. Ambitious members can also lead campus chapters as organizers. Contact the team to start the conversation.",
      suggestions: ["How can I start a campus chapter?", "How can I contact the team?"],
    },
  },
  {
    keywords: ["free", "cost", "price", "fee", "paid"],
    reply: {
      answer:
        "Joining the WhatsApp community is free. If any program or event ever has a cost, it will be stated explicitly in advance — never assumed.",
      suggestions: ["How can I join?", "What programs exist?"],
    },
  },
  {
    keywords: ["developer", "only for", "non-tech", "designer", "marketing", "business", "beginner", "non technical", "non-technical"],
    reply: {
      answer:
        "ORIGIN POINT is multidisciplinary by design — developers, designers, marketers, business minds, creators, and researchers all belong here, and beginners are explicitly welcome. Real projects need cross-functional teams.",
      suggestions: ["Are beginners welcome?", "What can I access?", "How can I join?"],
    },
  },
  {
    keywords: ["opportunity", "freelance", "gig", "work", "opening"],
    reply: {
      answer:
        "Opportunities — internships, roles, freelance work — are shared by members and partners inside the community, with context on who each one suits. Preparation support helps you apply well; outcomes are never guaranteed.",
      suggestions: ["How do I become placement-ready?", "How can I join?"],
    },
  },
  {
    keywords: ["faq", "question"],
    reply: {
      answer:
        "The FAQ section on the home page answers the most common questions — what ORIGIN POINT is, who can join, how events and mentorship work, and more.",
      suggestions: ["What is ORIGIN POINT?", "How can I join?"],
    },
  },
];

const DEFAULT_REPLY: AssistantReply = {
  answer:
    "I can help with questions about ORIGIN POINT — what the community is, programs, joining, events, careers, projects, mentorship, the founders, and contacting the team. Try one of the suggestions below, or ask in your own words.",
  suggestions: ["How can I join?", "How do hackathons work?", "Help me become placement-ready."],
};

export const STARTER_SUGGESTIONS = [
  "How can I join?",
  "How do hackathons work?",
  "Help me become placement-ready.",
  "How can I build production-ready projects?",
  "Where can I find opportunities?",
  "How can I collaborate on a project?",
];

/** Deterministic keyword/intent matching over the curated knowledge base. */
export function askOpAi(question: string): AssistantReply {
  const q = question.toLowerCase().trim();
  if (!q) return DEFAULT_REPLY;

  let best: { entry: KnowledgeEntry; score: number } | null = null;
  for (const entry of KNOWLEDGE) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw)) score += kw.length; // longer matches weigh more
    }
    if (score > 0 && (!best || score > best.score)) best = { entry, score };
  }
  return best ? best.entry.reply : DEFAULT_REPLY;
}
