'use client';

import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/atoms/Logo";
import LoginForm from "@/components/auth/login-form";
import GoogleLogin from "@/components/auth/google-login";

export default function AdminLoginPage() {
  return (
    <div className="grid h-dvh grid-cols-1 overflow-hidden bg-surface-page lg:grid-cols-2">
      {/* Left: brand visual */}
      <div className="relative hidden h-dvh items-center justify-center overflow-hidden bg-dark-foundation-500 lg:flex">
        <div className="relative h-[85%] w-[85%]">
          <Image
            src="/login.svg"
            alt="Login illustration"
            fill
            sizes="50vw"
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* Right: login form */}
      <div className="flex min-h-0 items-center justify-center overflow-y-auto p-6 sm:p-10">
        <div className="flex w-full max-w-sm flex-col gap-8">
          <div className="lg:hidden">
            <Logo
              href="/"
              label="RabbitTheDesigner home"
              monogram={<span className="text-2xl font-extrabold text-ink">RB</span>}
            >
              RabbitTheDesigner
            </Logo>

            <div className="relative mx-auto mt-3 h-24 w-32 sm:h-32 sm:w-40">
              <Image
                src="/login.svg"
                alt="Login logo"
                fill
                sizes="160px"
                priority
                className="object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-size-h2 font-primary font-bold text-heading">
              Admin Login
            </h1>

            <p className="text-size-small font-secondary text-caption">
              Sign in to manage the site. Access is restricted to the team.
            </p>
          </div>

          <LoginForm />

          <div className="relative flex items-center gap-3">
            <div className="flex-1 border-t border-border-subtle" />
            <span className="text-xs font-secondary text-caption px-2">
              Or continue with
            </span>
            <div className="flex-1 border-t border-border-subtle" />
          </div>

          <GoogleLogin />

          <Link
            href="/auth/reset-password"
            className="text-center text-size-small font-secondary text-caption transition-colors hover:text-heading"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
