'use client';

import { useEnquiries } from "@/hooks/useEnquiries";
import { Mail, CheckCircle2 } from "lucide-react";

export default function AdminEnquiriesList() {
  const { data: enquiries = [], loading, error, markRead } = useEnquiries();

  const unreadCount = enquiries.filter((e) => !e.read).length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center mb-4 animate-pulse" />
        <p className="text-stone-500 text-sm">Loading enquiries...</p>
      </div>
    );
  }

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-stone-900">
            Enquiries ({unreadCount} new)
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            All contact form submissions
          </p>
        </div>
        {enquiries.length === 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 rounded-full text-xs font-medium text-stone-600">
            <Mail size={14} strokeWidth={2} />
            No enquiries yet
          </div>
        )}
      </div>

      <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200">
              <th className="px-5 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                From
              </th>
              <th className="px-5 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Message
              </th>
              <th className="px-5 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-4 text-right text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr
                key={enquiry.id}
                className={`border-b border-stone-100 hover:bg-stone-50 transition-colors group cursor-pointer ${
                  !enquiry.read ? "bg-red-50/50" : ""
                }`}
                onClick={() => {
                  if (!enquiry.read) markRead(enquiry.id);
                }}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center">
                      <Mail size={16} strokeWidth={2} className="text-stone-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-stone-900 group-hover:text-red-600 transition-colors">
                        {enquiry.name}
                      </p>
                      <p className="text-xs text-stone-400">{enquiry.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <p className={`text-sm ${!enquiry.read ? "text-stone-900 font-medium" : "text-stone-500"}`}>
                    {enquiry.message.length > 60
                      ? `${enquiry.message.slice(0, 60)}...`
                      : enquiry.message}
                  </p>
                </td>
                <td className="px-5 py-4 text-sm text-stone-500">
                  {new Date(enquiry.createdAt).toLocaleDateString(
                    undefined,
                    {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </td>
                <td className="px-5 py-4 text-right">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                      !enquiry.read
                        ? "bg-red-100 text-red-700 border border-red-200"
                        : "bg-stone-100 text-stone-600 border border-stone-200"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      markRead(enquiry.id);
                    }}
                  >
                    {!enquiry.read ? (
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {enquiries.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4">
            <Mail size={32} strokeWidth={2} className="text-stone-400" />
          </div>
          <h3 className="text-lg font-medium text-stone-900">No enquiries yet</h3>
          <p className="text-stone-500 text-sm">
            Contact form submissions will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
