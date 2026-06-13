import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { PROFILE } from "@/data/profile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Sends the contact form via SMTP.
 * Configure these environment variables (e.g. in the Vercel dashboard — never in code):
 *   SMTP_HOST   smtp.gmail.com
 *   SMTP_PORT   587            (or 465 for SSL)
 *   SMTP_USER   you@example.com
 *   SMTP_PASS   app-password   (Gmail: an App Password, not your login password)
 *   SMTP_FROM   optional — defaults to SMTP_USER
 *   SMTP_TO     optional — where mail is delivered, defaults to PROFILE.email
 *
 * Until these are set the route replies 503 and the form falls back to mailto.
 */
export async function POST(req: Request) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const subject = (body.subject ?? "").trim();
  const message = (body.message ?? "").trim();
  const whatsapp = (body.whatsapp ?? "").trim();
  const need = (body.need ?? "").trim();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const port = Number(SMTP_PORT) || 587;
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transport.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to: SMTP_TO || PROFILE.email,
      replyTo: `${name} <${email}>`,
      subject: `[Portfolio] ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `WhatsApp: ${whatsapp || "—"}`,
        `Looking for: ${need || "—"}`,
        "",
        message,
      ].join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
