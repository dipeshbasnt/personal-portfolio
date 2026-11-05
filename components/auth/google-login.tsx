'use client';

import { createClient } from "@/lib/supabase/client";

interface GoogleLoginProps {
  className?: string;
}

export default function GoogleLogin({
  className = "",
}: GoogleLoginProps) {
  const handleGoogleSignIn = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("Google OAuth error:", error.message);
      }
    } catch (err) {
      console.error("Google OAuth failed:", err);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-body border border-border-subtle bg-surface-card rounded-md focus:border-primary focus:outline-none transition-colors hover:bg-stone-50 ${className}`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66v-2.77h-3.57c-.26.51-.86.92-1.57 1.14-2.1.63-4.49.64-6.71.25v2.04h-3.58c2.64-1.98 4.26-5.52 4.26-9 0-3.47-1.62-6.49-4.06-8.44v-2.06h-3.58c2.64-1.98 4.26-5.52 4.26-9 0-3.47-1.62-6.49-4.06-8.44v-2.06h-3.58c2.64-1.98 4.26-5.52 4.26-9 0-3.47-1.62-6.49-4.06-8.44zM3 14c0 3.31 1.63 6.2 4.06 8.04v2.11h3.66c-.65.84-1 1.77-1 2.77 0 2.53 1.64 4.69 3.94 5.34v2.07h3.57C17.66 22.48 20.02 21.35 22 19.32z"
        />
        <path
          fill="#FBBC05"
          d="M7.41 13.09c.03-.16.05-.32.05-.49s-.02-.33-.05-.49l1.62-.63c-.13.35-.36.67-.65.88-.95.71-2.1 1.1-3.31 1.1-.62 0-1.21-.07-1.77-.2zM12 4.54c-2.24 0-4.27.6-5.92 1.63v2.05h3.57c.26-.5.85-.88 1.57-1.07 2.2-.67 4.63-.66 6.82-.01v1.98h-3.66c-.23.26-.44.57-.61.9-.61 1.17-1.43 2.18-2.38 2.78v2.13h3.55c1.77-1.34 2.94-3.56 2.94-6.04 0-2.49-1.18-4.69-3.01-6.12l-1.59.59c-.49.66-.79 1.46-.79 2.28zm0-2.83c1.16 0 2.19.38 2.98 1.03l1.48-1.18C15.8 2.17 13.92 1 12 1c-3.06 0-5.71 1.22-7.65 3.15l1.54 1.12c1.07-.88 2.39-1.38 3.81-1.38z"
        />
        <path
          fill="#EA4335"
          d="M12 23c1.64 0 3.13-.51 4.41-1.38l1.42 1.42c-2.04 1.6-4.65 2.58-7.46 2.58-3.06 0-5.71-1.22-7.65-3.15l1.54-1.12c1.07-.88 2.39-1.38 3.81-1.38zM5.87 10.66c.03-.36.06-.72.06-1.09s-.02-.73-.05-1.09l-1.62.63c.13-.34.36-.66.65-.87 2.2-1.56 4.87-1.55 7.04-.01l1.19 1.7c-.61.91-1.44 1.66-2.38 1.99v1.91c-2.24-.01-4.04-.6-5.48-1.73zM12 6.21c-1.62 0-3.06.5-4.25 1.34l-1.42-1.42c1.32-.9 2.87-1.39 4.52-1.39 1.43 0 2.75.39 3.85 1.07l-1.5 1.13c-.8-.52-1.72-.84-2.7-.84zm0 17.62c-1.16 0-2.19-.38-2.98-1.03l-1.48 1.18c-1.07.88-2.39 1.38-3.81 1.38-3.06 0-5.71-1.22-7.65-3.15l1.54-1.12c1.07.88 2.39 1.38 3.81 1.38z"
        />
      </svg>
      Continue with Google
    </button>
  );
}
