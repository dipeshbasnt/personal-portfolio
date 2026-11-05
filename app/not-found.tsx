import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-6">
          <Image src="/logo.png" width={32} height={32} alt="" className="object-contain" />
        </div>
        <h1 className="text-3xl font-bold text-ink mb-2">Page not found</h1>
        <p className="text-body text-muted mb-8">
          The page you’re looking for doesn’t exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent-strong transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
