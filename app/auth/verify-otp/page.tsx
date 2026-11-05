"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Mail, AlertCircle } from "lucide-react";
import Button from "@/components/atoms/Button";
import { verifyOtp, resendOtp } from "@/actions/auth";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const digitRefs = useRef<Array<HTMLInputElement | null>>([
    null, null, null, null, null, null,
  ]);

  // Start timer on mount
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isExpired = timeLeft <= 0;

  // Auto-focus first input on mount
  useEffect(() => {
    digitRefs.current[0]?.focus();
  }, []);

  // Auto-focus next input when a digit is entered
  const handleInputChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const value = e.target.value.replace(/\D/g, "");
      if (!value) return;

      setCode((prev) => {
        const next = prev.split("");
        next[index] = value;
        return next.join("");
      });

      setActiveIndex(index);

      // Auto-move to next input after DOM commit
      if (index < 5 && digitRefs.current[index + 1]) {
        requestAnimationFrame(() => {
          digitRefs.current[index + 1]?.focus();
        });
      }

      // Auto-verify when the last (6th) digit is entered
      if (index === 5) {
        const nextCode = code.split("");
        nextCode[index] = value;
        const finalCode = nextCode.join("");

        if (/^\d{6}$/.test(finalCode)) {
          setIsLoading(true);
          setError(null);

          try {
            const result = await verifyOtp(finalCode);
            if (!result.success) {
              setError(result.error ?? "Invalid verification code.");
              setIsLoading(false);
              return;
            }

            router.replace("/admin");
          } catch {
            setError("Verification failed. Please try again.");
            setIsLoading(false);
          }
        }
      }
    },
    [code, router]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace") {
        setCode((prev) => {
          const next = prev.split("");
          next[index] = "";
          return next.join("");
        });
        setActiveIndex(index);
        if (index > 0 && digitRefs.current[index - 1]) {
          requestAnimationFrame(() => {
            digitRefs.current[index - 1]?.focus();
          });
        }
      }
    },
    []
  );

  const handleFocus = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const paddedOtp = (val: string) => {
    const arr = val.split("");
    while (arr.length < 6) arr.push("");
    return arr.join("");
  };

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
      if (!pasted) return;

      setCode(paddedOtp(pasted));
      pasted.split("").forEach((_, i) => {
        if (index + i < 6 && digitRefs.current[index + i]) {
          requestAnimationFrame(() => {
            digitRefs.current[index + i]?.focus();
          });
        }
      });
      setActiveIndex(Math.min(index + pasted.length - 1, 5));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await verifyOtp(code);
      if (!result.success) {
        setError(result.error ?? "Invalid verification code.");
        setIsLoading(false);
        return;
      }

      router.replace("/admin");
    } catch {
      setError("Verification failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    setError(null);
    setCode("");
    setActiveIndex(0);

    // Clear any existing timer before starting a new one
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    try {
      const result = await resendOtp();
      if (!result.success) {
        setError(result.error ?? "Failed to resend code.");
        setIsLoading(false);
        return;
      }

      setTimeLeft(300);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            timerRef.current = null;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      requestAnimationFrame(() => {
        digitRefs.current[0]?.focus();
      });
      setIsLoading(false);
    } catch {
      setError("Failed to resend code. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="max-w-md w-full p-6">
        <div className="flex flex-col items-center gap-6 mb-8">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
            <Mail size={32} strokeWidth={2.5} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-stone-900">Email Verification</h3>
          <p className="text-stone-500 text-sm text-center">
            We sent a 6-digit code to your email. Enter it below to continue.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100 flex items-center gap-3"
          >
            <AlertCircle size={18} className="text-red-600" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className={`w-12 h-12 rounded-lg border flex items-center justify-center text-2xl font-mono transition-all duration-200 ${
                  code[index]
                    ? "bg-blue-50 border-blue-500 scale-110"
                    : activeIndex === index
                      ? "border-blue-500 ring-1 ring-blue-500 scale-105"
                      : "border-stone-200"
                }`}
              >
                <input
                  type="text"
                  maxLength={1}
                  value={code[index] || ""}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={(e) => handlePaste(e, index)}
                  onFocus={() => handleFocus(index)}
                  autoFocus={index === 0}
                  autoComplete="off"
                  ref={(el) => {
                    digitRefs.current[index] = el as HTMLInputElement | null;
                  }}
                  className="w-full h-full text-center bg-transparent outline-none text-stone-900"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-stone-500">
            <span>
              Code expires in {minutes.toString().padStart(2, "0")}:{seconds
                .toString()
                .padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={handleResend}
              disabled={isLoading}
              className={`text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50 transition-colors ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Sending..." : "Resend code"}
            </button>
          </div>

          <Button
            type="submit"
            variant="dark"
            fullWidth
            disabled={code.length !== 6 || isLoading || isExpired}
            className="mt-2"
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-stone-400">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={isLoading}
            className="ml-1 text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50 transition-colors"
          >
            Resend
          </button>
        </p>
        <p className="mt-3 text-center text-xs text-stone-400">
          Need to start over?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="ml-1 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Back to Login
          </button>
        </p>
      </div>
    </div>
  );
}
