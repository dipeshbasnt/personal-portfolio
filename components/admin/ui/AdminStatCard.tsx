"use client";

type StatVariant = "default" | "new" | "read";

interface AdminStatCardProps {
  label: string;
  value: number | string;
  icon: React.ElementType;
  variant?: StatVariant;
}

const variantColors: Record<StatVariant, string> = {
  default: "bg-stone-100 text-stone-900 border border-stone-200",
  new: "bg-red-50 text-red-900 border border-red-100",
  read: "bg-emerald-50 text-emerald-900 border border-emerald-100",
};

export default function AdminStatCard({
  label,
  value,
  icon: Icon,
  variant = "default",
}: AdminStatCardProps) {
  const bgColor = variant === "default" ? "bg-stone-200" : variant === "new" ? "bg-red-100" : "bg-emerald-100";
  const textColor = variant === "default" ? "text-stone-900" : variant === "new" ? "text-red-700" : "text-emerald-700";
  const labelColor = variant === "default" ? "text-stone-500" : variant === "new" ? "text-red-600" : "text-emerald-600";

  return (
    <div
      className={`
        p-5 rounded-2xl border shadow-sm transition-all duration-200
        hover:shadow-md hover:-translate-y-1
        ${variantColors[variant]}
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bgColor}`}>
          <Icon size={18} strokeWidth={2} />
        </div>
      </div>
      <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${labelColor}`}>
        {label}
      </p>
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-bold tracking-tight ${textColor}`}>
          {value}
        </span>
      </div>
    </div>
  );
}

