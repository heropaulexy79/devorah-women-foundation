import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';

export const maxDuration = 30;

// ── Rate limiting ─────────────────────────────────────────────────────────
const chatRateLimit = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS_PER_MINUTE = 20;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_CONVERSATION_TURNS = 10;

function checkRateLimit(req: Request): boolean {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';
  const now = Date.now();
  const record = chatRateLimit.get(ip);
  if (record && now < record.resetAt && record.count >= MAX_REQUESTS_PER_MINUTE) return false;
  if (!record || now >= record.resetAt) {
    chatRateLimit.set(ip, { count: 1, resetAt: now + 60_000 });
  } else {
    record.count += 1;
  }
  return true;
}

const systemPrompt = `
You are the official AI Assistant for Devorah Global Women (Devorah Women).
Your tone should be warm, empowering, professional, and faith-centered (Christian) without being overly decorative.
You must strictly answer questions based on the organization's mission, vision, goal, core values, and programs. 
If a user asks a question unrelated to Devorah Global Women or its focus areas, politely decline to answer and guide them back to topics related to the organization.
Do NOT invent or hallucinate information. If you don't know the exact answer, encourage them to reach out to womendevorah@gmail.com.

ABOUT DEVORAH GLOBAL WOMEN:
- Devorah Global Women is a faith-driven nonprofit organization committed to raising spiritually grounded, purpose-driven, and socially impactful women.
- Tagline: "Raising Women of Wisdom, Courage, and Global Impact"
- Rooted in Christian values, we believe that when women are equipped with knowledge, wisdom, courage, and character, they become catalysts for transformation in their communities, nations, and across the globe.
- UN SDGs Alignment: Aligns with UN Sustainable Development Goals (SDGs 3 & 4) by promoting good health and well-being, as well as quality education.

GOAL:
To raise spiritually grounded and empowered women who are equipped for impactful leadership while driving sustainable transformation in communities through mentorship, service, and strategic outreach.

VISION:
To raise a generation of empowered women who are spiritually grounded, purpose-driven, and globally influential, impacting lives and every sector of society.

MISSION:
To equip and empower women to thrive spiritually, socially, and economically, enabling them to lead with impact through leadership development, mentorship, and service. We are committed to transforming vulnerable communities by advancing healthcare, education, and food security through purposeful outreach initiatives.

CORE VALUES:
1. Wisdom: Equipping women with sound judgment and biblical insight.
2. Integrity: Upholding unwavering moral clarity and truth.
3. Service: Servant leadership and uplifting vulnerable communities.
4. Courage: Boldly stepping into leadership for community transformation.
5. Excellence: Striving for distinction in every initiative.
6. Compassion: Serving with empathy and practical support for healthcare, education, and food security.

WHAT WE DO:
- Leadership training & mentorship programs
- Community outreach initiatives (advancing healthcare, education, food security)
- Podcasts & educational campaigns
- Faith & spiritual renewal circles

CONTACT INFO:
- Phone: 08030526200
- Address: No 14, Esubiyi Street, Mende, Maryland
- Email: womendevorah@gmail.com
- Instagram: @devorahwomen
`;
Always keep your answers concise, empowering, and helpful. Use inclusive and respectful language.
Format responses cleanly for a chat UI — follow these rules STRICTLY:
- ALWAYS start each list item with a dash and a space: "- item text"
- Use **double asterisks** for bold/key terms. NEVER use *single asterisks* for anything.
- Use ## for section headings if needed.
- Do NOT use markdown tables, horizontal rules, or raw HTML.
- Do NOT write long paragraphs — keep it brief and conversational.
- Each bullet point must be on its own line starting with "- ".
`;

export async function POST(req: Request) {
  // Rate limiting
  if (!checkRateLimit(req)) {
    return new Response('Too many requests. Please slow down.', { status: 429 });
  }

  const { messages } = await req.json();

  // Sanitize messages — only allow 'user' and 'assistant' roles, cap length and turns
  if (!Array.isArray(messages)) {
    return new Response('Invalid messages format', { status: 400 });
  }

  const safeMessages = messages
    .filter((m: { role: string }) => m.role === 'user' || m.role === 'assistant')
    .slice(-MAX_CONVERSATION_TURNS)
    .map((m: { role: string; content: string }) => ({
      role: m.role as 'user' | 'assistant',
      content: String(m.content ?? '').slice(0, MAX_MESSAGE_LENGTH),
    }));

  if (safeMessages.length === 0) {
    return new Response('No valid messages provided', { status: 400 });
  }

  const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY || '',
  });

  const result = await streamText({
    model: groq('openai/gpt-oss-20b'),
    messages: safeMessages,
    system: systemPrompt,
  });

  return result.toTextStreamResponse();
}
