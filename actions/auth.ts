'use server';

import { type LoginInput, type AuthResult } from "@/types/auth";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { isAdminUser } from "@/lib/auth/permissions";
import { sendOtpEmail } from "@/lib/email";
import { cookies } from "next/headers";

const OTP_COOKIE_NAME = "portfolio_otp";
const OTP_VERIFIED_COOKIE = "portfolio_otp_verified";
const OTP_EXPIRY_MINUTES = 5;
const OTP_VERIFIED_DAYS = 7;

/**
 * Generates a 6-digit numeric OTP.
 */
function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Server Action: Sign in with email and password.
 * After successful password validation, generates and sends a 6-digit OTP to the user's email.
 */
export async function signInWithEmail(
  input: LoginInput
): Promise<AuthResult & { otpRequired?: boolean }> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });

  if (error) {
    return {
      success: false,
      error: "Invalid email or password.",
    };
  }

  if (!data.user) {
    return {
      success: false,
      error: "Unable to sign in. Please try again.",
    };
  }

  // Authorize: only the designated administrator can access the admin panel
  if (!isAdminUser(data.user)) {
    await supabase.auth.signOut();
    return {
      success: false,
      error: "Access denied. Administrator account required.",
    };
  }

  // Generate and send OTP via email
  const otp = generateOtp();
  const expiresAt = Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000;

  // Store OTP in a secure cookie
  const cookieStore = await cookies();
  cookieStore.set(OTP_COOKIE_NAME, JSON.stringify({ otp, email: data.user.email, expiresAt }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: OTP_EXPIRY_MINUTES * 60,
    path: "/",
  });

  // Mark OTP as not yet verified (short-lived — matches OTP expiry)
  cookieStore.set(OTP_VERIFIED_COOKIE, "false", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: OTP_EXPIRY_MINUTES * 60,
    path: "/",
  });

  // Send OTP email
  try {
    await sendOtpEmail(data.user.email ?? input.email, otp);
  } catch {
    return {
      success: false,
      error: "Failed to send verification email. Please try again.",
    };
  }

  return {
    success: true,
    otpRequired: true,
    user: {
      id: data.user.id,
      email: data.user.email ?? "",
      role: "admin",
      aal: "aal1",
      app_metadata: data.user.app_metadata ?? {},
      user_metadata: data.user.user_metadata ?? {},
    },
  };
}

/**
 * Server Action: Sign out the current user.
 */
export async function signOut(): Promise<{ success: boolean }> {
  const supabase = await createClient();
  const cookieStore = await cookies();
  cookieStore.delete(OTP_COOKIE_NAME);
  cookieStore.delete(OTP_VERIFIED_COOKIE);
  await supabase.auth.signOut();
  redirect("/login");
}

/**
 * Server Action: Request a password reset email.
 */
export async function resetPassword(email: string): Promise<AuthResult> {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
  });

  if (error) {
    // Don't reveal whether the email exists — return generic success
    return { success: true };
  }

  return { success: true };
}

/**
 * Server Action: Resend OTP email.
 * Regenerates a new OTP and sends it to the stored email address.
 */
export async function resendOtp(): Promise<{ success: boolean; error?: string }> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(OTP_COOKIE_NAME);

  let email: string;

  if (existing) {
    let parsed: { otp: string; email: string; expiresAt: number };
    try {
      parsed = JSON.parse(existing.value);
    } catch {
      return { success: false, error: "Invalid OTP data. Please log in again." };
    }
    email = parsed.email;
  } else {
    // Fall back to Supabase session for the email if cookie is missing
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "No pending OTP found. Please log in again." };
    }
    email = user.email ?? "";
    if (!email) {
      return { success: false, error: "No email found. Please log in again." };
    }
  }

  const otp = generateOtp();
  const expiresAt = Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000;

  cookieStore.set(OTP_COOKIE_NAME, JSON.stringify({ otp, email, expiresAt }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: OTP_EXPIRY_MINUTES * 60,
    path: "/",
  });

  cookieStore.set(OTP_VERIFIED_COOKIE, "false", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: OTP_EXPIRY_MINUTES * 60,
    path: "/",
  });

  try {
    await sendOtpEmail(email, otp);
  } catch {
    return { success: false, error: "Failed to resend verification email. Please try again." };
  }

  return { success: true };
}

/**
 * Server Action: Verify OTP code.
 * If valid, marks OTP as verified in a cookie so the user can access the dashboard.
 */
export async function verifyOtp(code: string): Promise<{ success: boolean; error?: string }> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(OTP_COOKIE_NAME);

  if (!existing) {
    return { success: false, error: "No pending OTP found. Please log in again." };
  }

  let parsed: { otp: string; email: string; expiresAt: number };
  try {
    parsed = JSON.parse(existing.value);
  } catch {
    cookieStore.delete(OTP_COOKIE_NAME);
    cookieStore.delete(OTP_VERIFIED_COOKIE);
    return { success: false, error: "Invalid OTP data. Please log in again." };
  }

  // Check expiry
  if (Date.now() > parsed.expiresAt) {
    cookieStore.delete(OTP_COOKIE_NAME);
    cookieStore.delete(OTP_VERIFIED_COOKIE);
    return { success: false, error: "OTP has expired. Please request a new one." };
  }

  // Verify code
  if (parsed.otp !== code) {
    return { success: false, error: "Invalid verification code." };
  }

  // OTP is valid — mark as verified (7-day cookie so reloads don't break)
  cookieStore.set(OTP_VERIFIED_COOKIE, "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: OTP_VERIFIED_DAYS * 24 * 60 * 60,
    path: "/",
  });

  return { success: true };
}
