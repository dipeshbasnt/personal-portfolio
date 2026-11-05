import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { enquiriesService } from "@/services/enquiries";

const EMAIL_TO = process.env.EMAIL_TO ?? "hello@rabbitthedesigner.com";
const EMAIL_FROM = process.env.EMAIL_FROM ?? "no-reply@rabbitthedesigner.com";
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_TIMEOUT_MS = 10000;

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

const withTimeout = <T>(
  promise: Promise<T>,
  ms: number,
): Promise<T> => {
  let timeoutId: ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(
      () => reject(new Error(`Operation timed out after ${ms}ms`)),
      ms,
    );
  });
  return Promise.race([promise, timeoutPromise]).finally(() => {
    clearTimeout(timeoutId);
  });
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

  // Send email with a hard timeout so a hung SMTP never hangs the request.
  let emailError: Error | null = null;
  try {
    await withTimeout(
      transporter.sendMail({
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: `Portfolio contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `<p>New contact form submission</p>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p>${message}</p>`,
      }),
      EMAIL_TIMEOUT_MS,
    );
  } catch (error) {
    emailError = error instanceof Error ? error : new Error(String(error));
    console.error("Contact form email send failed:", emailError);
  }

  // Record the enquiry in the database — non-fatal if it fails.
  let dbError: Error | null = null;
  try {
    await enquiriesService.create({
      name,
      email,
      message,
    });
  } catch (error) {
    dbError = error instanceof Error ? error : new Error(String(error));
    console.error("Contact form enquiry save failed:", dbError);
  }

  // If both email and database failed, return 500 with details.
  if (emailError && dbError) {
    return NextResponse.json(
      {
        success: false,
        error:
          process.env.NODE_ENV === "development"
            ? `Email: ${emailError.message}. Database: ${dbError.message}.`
            : "Failed to send your message. Please try again.",
        debug: process.env.NODE_ENV === "development"
          ? {
              email: { name: emailError.name, stack: emailError.stack },
              database: { name: dbError.name, stack: dbError.stack },
            }
          : undefined,
      },
      { status: 500 },
    );
  }

  // At least one succeeded — treat as success.
  return NextResponse.json({ success: true });
}
