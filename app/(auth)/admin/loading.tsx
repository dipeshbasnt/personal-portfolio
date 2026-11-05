export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-4 border-stone-200 border-t-stone-600 animate-spin" />
        <p className="text-sm text-stone-500">Loading…</p>
      </div>
    </div>
  );
}
