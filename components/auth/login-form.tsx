'use client';

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { signInWithEmail } from "@/actions/auth";

interface LoginFormProps {
  onSuccess?: () => void;
  className?: string;
}

export default function LoginForm({
  onSuccess,
  className = "",
}: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    setError("");
    setIsSubmitting(true);

    try {
      const result = await signInWithEmail({ email, password });

      if (!result.success) {
        setError(result.error ?? "Invalid email or password.");
        setIsSubmitting(false);
        return;
      }

      // After password login, send user to email OTP verification step
      if (result.otpRequired) {
        router.replace("/auth/verify-otp");
      } else {
        router.replace("/admin");
      }
      onSuccess?.();
    } catch {
      setError("Unable to sign in. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-4 ${className}`}
    >
      <Input
        type="email"
        placeholder="Email"
        value={email}
        required
        autoComplete="username"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-md border border-border-subtle bg-surface-card px-4 py-3 text-body focus:border-primary focus:outline-none"
      />

      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          required
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-border-subtle bg-surface-card px-4 py-3 pr-12 text-body focus:border-primary focus:outline-none"
        />

        <button
          type="button"
          onClick={() => setShowPassword((visible) => !visible)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
          className="absolute inset-y-0 right-0 flex items-center justify-center px-4 text-caption transition-colors hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-border-primary"
        >
          {showPassword ? (
            <EyeOff size={18} aria-hidden="true" />
          ) : (
            <Eye size={18} aria-hidden="true" />
          )}
        </button>
      </div>

      {error && (
        <p role="alert" className="text-sm font-secondary text-error">
          {error}
        </p>
      )}

      <Button
        type="submit"
        variant="dark"
        fullWidth
        disabled={isSubmitting}
        className="mt-2"
      >
        {isSubmitting ? "Signing in..." : "Log In"}
      </Button>
    </form>
  );
}
