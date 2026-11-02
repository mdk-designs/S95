import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Light in-memory throttle (per server instance). Use a shared store (e.g. Upstash) if you scale out.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

const clean = (v: unknown, max: number) => String(v ?? "").replace(/\r/g, "").trim().slice(0, max);
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success so bots learn nothing.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const company = clean(body.company, 160);
  const email = clean(body.email, 200);
  const message = clean(body.message, 5000);

  if (!name || !EMAIL_RE.test(email) || !message) {
    return NextResponse.json({ error: "Please complete the required fields." }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "S95 Website <onboarding@resend.dev>";

  if (!key || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact] (not emailed — set RESEND_API_KEY and CONTACT_TO_EMAIL)", { name, company, email, message });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "The contact service is not configured." }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `New enquiry from ${name}${company ? ` (${company})` : ""}`,
      text: `Name: ${name}\nCompany: ${company || "-"}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${esc(name)}<br><strong>Company:</strong> ${esc(company || "-")}<br><strong>Email:</strong> ${esc(email)}</p><p>${esc(message).replace(/\n/g, "<br>")}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ error: "We couldn’t send your message." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
