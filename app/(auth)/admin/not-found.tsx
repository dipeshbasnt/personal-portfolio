import Link from "next/link";
import Image from "next/image";

export default function AdminNotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-6">
          <Image src="/logo.svg" width={32} height={32} alt="" className="object-contain" />
        </div>
        <h1 className="text-2xl font-bold text-stone-900 mb-2">Page not found</h1>
        <p className="text-sm text-stone-500 mb-8">
          The admin page you’re looking for doesn’t exist.
        </p>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors text-sm font-medium"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
