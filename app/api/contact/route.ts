import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { enquiriesService } from "@/services/enquiries";

const EMAIL_TO = process.env.EMAIL_TO ?? "hello@rabbitthedesigner.com";
const EMAIL_FROM = process.env.EMAIL_FROM ?? "no-reply@rabbitthedesigner.com";
const MAX_MESSAGE_LENGTH = 5000;

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
};

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const isRateLimited = (key: string) => {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
};

export async function POST(request: Request) {
  let body: ContactPayload | null = null;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    body = null;
  }

  if (!body) {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (body.company) {
    return NextResponse.json({ success: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > 120) {
    return NextResponse.json(
      { success: false, error: "Please provide your name." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return NextResponse.json(
      { success: false, error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  if (message.length < 10 || message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { success: false, error: "Please provide a message (min. 10 characters)." },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.example.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 465) === 465,
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
  });

  try {
    await transporter.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p>New contact form submission</p>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p>${message}</p>`,
    });

    await enquiriesService.create({
      name,
      email,
      message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form email send failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send your message. Please try again." },
      { status: 500 },
    );
  }
}
