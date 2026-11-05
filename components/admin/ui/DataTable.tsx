"use client";

import type { ElementType, ReactNode } from "react";

type Column<T> = {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
  align?: "left" | "center" | "right";
  hideBelow?: "sm" | "md" | "lg";
  className?: string;
};

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  title?: string;
  subtitle?: string;
  headerAction?: ReactNode;
  footer?: ReactNode;
  loading?: boolean;
  loadingMessage?: string;
  emptyIcon?: ElementType;
  emptyTitle?: string;
  emptyDescription?: string;
  onRowClick?: (row: T) => void;
}

export default function DataTable<T>({
  columns,
  data,
  rowKey,
  title,
  subtitle,
  headerAction,
  footer,
  loading = false,
  loadingMessage = "Loading...",
  emptyIcon,
  emptyTitle,
  emptyDescription,
  onRowClick,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden min-w-0 flex flex-col items-center justify-center py-16 text-center">
        <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center mb-4 animate-pulse" />
        <p className="text-stone-500 text-sm">{loadingMessage}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden min-w-0 flex flex-col items-center justify-center py-16 text-center">
        {emptyIcon && (
          <EmptyIcon element={emptyIcon} />
        )}
        {emptyTitle && (
          <h3 className="text-lg font-medium text-stone-900">{emptyTitle}</h3>
        )}
        {emptyDescription && (
          <p className="text-stone-500 text-sm">{emptyDescription}</p>
        )}
      </div>
    );
  }

  const alignClasses: Record<string, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const hideClasses: Record<string, string> = {
    sm: "hidden sm:table-cell",
    md: "hidden md:table-cell",
    lg: "hidden lg:table-cell",
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden min-w-0">
      {title || subtitle || headerAction && (
        <div className="px-6 py-5 flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="flex flex-col">
            {title && (
              <h2 className="text-xl font-bold text-stone-900">{title}</h2>
            )}
            {subtitle && (
              <p className="text-sm text-stone-500 mt-1">{subtitle}</p>
            )}
          </div>
          {headerAction && (
            <div className="flex items-center gap-2">{headerAction}</div>
          )}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left border-collapse">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`
                    px-6 py-3 text-xs font-semibold uppercase tracking-wide text-stone-500 bg-stone-50
                    ${alignClasses[col.align ?? "left"]}
                    ${col.hideBelow ? hideClasses[col.hideBelow] : ""}
                    ${col.className ?? ""}
                  `}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={rowKey(row)}
                className={`border-t border-stone-100 ${
                  onRowClick ? "hover:bg-stone-50 transition-colors cursor-pointer" : ""
                }`}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <td
                    key={`${rowKey(row)}-${col.key}`}
                    className={`
                      px-6 py-4 text-sm
                      ${alignClasses[col.align ?? "left"]}
                      ${col.hideBelow ? hideClasses[col.hideBelow] : ""}
                      ${col.className ?? ""}
                    `}
                  >
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footer && (
        <div className="px-6 py-4 border-t border-stone-100">{footer}</div>
      )}
    </div>
  );
}

function EmptyIcon({ element }: { element: ElementType }) {
  const Icon = element;
  return <Icon size={32} strokeWidth={2} className="text-stone-400 mb-4" />;
}
