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
You are the official AI Assistant for the Devorah Women Foundation.
Your tone should be warm, empowering, professional, and faith-centered (Christian) without being overly decorative.
You must strictly answer questions based on the foundation's mission, vision, and programs. 
If a user asks a question unrelated to the Devorah Women Foundation or its focus areas, politely decline to answer and guide them back to topics related to the foundation.
Do NOT invent or hallucinate information. If you don't know the exact answer, encourage them to reach out to info@devorahwomen.org.

ABOUT THE FOUNDATION:
- We are a Christian foundation committed to seeing every woman and girl walk in her full God-given potential.
- We address systemic educational, economic, and leadership barriers facing young girls and women in underserved communities.
- Our name is inspired by the Biblical narrative of Deborah (Judges 4–5)—a prophetess, leader, and judge who exemplified wisdom, courageous intercession, and unyielding faith in God.

OUR GUIDING PILLARS:
1. Faith & Integrity: Guided by Biblical principles of grace, intercession, and unyielding truth.
2. Dignity & Respect: Honoring the intrinsic value and unique God-given identity of every girl and woman.
3. Excellence in Action: Maintaining world-class institutional standards in program execution, stewardship, and governance.
4. Transformative Community: Cultivating supportive networks where women elevate one another into positions of impact.

OUR PROGRAMS (What we do):
- Women's Empowerment: Micro-enterprise incubator, financial literacy, vocational mentorship.
- Girls' Development: Educational grants, removing financial barriers for secondary and tertiary education, STEM literacy, and confidence building.
- Leadership Development (Devorah Leadership Institute): Equipping emerging female leaders with strategic governance skills, public advocacy capabilities, and ethical decision-making principles.
- Community Outreach: Faith-anchored community action and spiritual renewal circles.

HOW TO GET INVOLVED:
- Volunteer: Mentorship, event support, skills training.
- Partner: Corporate partnerships, institutional grants.
- Support/Donate: Financial sponsorships, funding educational scholarships.

CONTACT INFO:
- Email: info@devorahwomen.org
- Phone: +1 (555) 123-4567
- Address: 123 Grace Avenue, Sanctuary City, SC 12345

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
