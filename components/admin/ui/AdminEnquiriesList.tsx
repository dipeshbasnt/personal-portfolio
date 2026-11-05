"use client";

import { useEnquiries } from "@/hooks/useEnquiries";
import { Mail, CheckCircle2 } from "lucide-react";
import DataTable from "@/components/admin/ui/DataTable";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function AdminEnquiriesList() {
  const { data: enquiries = [], loading, error, markRead } = useEnquiries();

  const unreadCount = enquiries.filter((e) => !e.read).length;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <Mail size={32} strokeWidth={2} className="text-red-500" />
        </div>
        <h3 className="text-lg font-medium text-stone-900">Failed to load</h3>
        <p className="text-stone-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <DataTable<Enquiry>
      columns={[
        {
          key: "from",
          header: "From",
          cell: (row) => (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center">
                <Mail size={16} strokeWidth={2} className="text-stone-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-stone-900 group-hover:text-red-600 transition-colors">
                  {row.name}
                </p>
                <p className="text-xs text-stone-400">{row.email}</p>
              </div>
            </div>
          ),
          align: "left",
        },
        {
          key: "message",
          header: "Message",
          cell: (row) => (
            <p className={`text-sm ${!row.read ? "text-stone-900 font-medium" : "text-stone-500"}`}>
              {row.message.length > 60
                ? `${row.message.slice(0, 60)}...`
                : row.message}
            </p>
          ),
        },
        {
          key: "date",
          header: "Date",
          cell: (row) => (
            <p className="text-sm text-stone-500">
              {new Date(row.createdAt).toLocaleDateString(
                undefined,
                {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </p>
          ),
          align: "right",
        },
        {
          key: "status",
          header: "Status",
          cell: (row) => (
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                !row.read
                  ? "bg-red-100 text-red-700 border border-red-200"
                  : "bg-stone-100 text-stone-600 border border-stone-200"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                markRead(row.id);
              }}
            >
              {!row.read ? (
                <>
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                  New
                </>
              ) : (
                <>
                  <CheckCircle2 size={12} strokeWidth={2} className="text-emerald-500" />
                  Read
                </>
              )}
            </span>
          ),
          align: "right",
        },
      ]}
      data={enquiries}
      rowKey={(row) => row.id}
      title={`Enquiries (${unreadCount} new)`}
      subtitle="All contact form submissions"
      loading={loading}
      loadingMessage="Loading enquiries..."
      emptyIcon={Mail}
      emptyTitle="No enquiries yet"
      emptyDescription="Contact form submissions will appear here."
      onRowClick={(row) => {
        if (!row.read) markRead(row.id);
      }}
      headerAction={
        enquiries.length === 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 rounded-full text-xs font-medium text-stone-600">
            <Mail size={14} strokeWidth={2} />
            No enquiries yet
          </div>
        )
      }
    />
  );
}
