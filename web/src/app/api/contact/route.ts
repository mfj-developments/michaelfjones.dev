import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "mfjdevelopments@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Michael F. Jones <onboarding@resend.dev>";

const resend = resendApiKey ? new Resend(resendApiKey) : null;

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, hp } = await req.json();

    // Basic validation
    if (hp) return NextResponse.json({ ok: true }); // honeypot: silently accept
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    if (!resend) {
      return NextResponse.json({ ok: false, error: "Email service not configured" }, { status: 500 });
    }

    const subject = `Portfolio contact from ${name}`;
    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
        <h2 style="margin:0 0 8px 0;">New message from your website</h2>
        <p style="margin:0 0 4px 0; color:#555;">Name: <strong>${escapeHtml(name)}</strong></p>
        <p style="margin:0 0 12px 0; color:#555;">Email: <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p style="white-space:pre-wrap; line-height:1.6;">${escapeHtml(message)}</p>
      </div>`;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject,
      html,
      replyTo: email,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
