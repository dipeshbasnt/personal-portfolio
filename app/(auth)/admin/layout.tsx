import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {children}
    </div>
  );
}
