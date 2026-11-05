"use client";

import { useEffect, useState, useCallback } from "react";
import { Enquiry, EnquiryFilters } from "@/types/enquiry";

const API_BASE = "/api/admin/enquiries";

export function useEnquiries(filters?: EnquiryFilters) {
  const [data, setData] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters?.read !== undefined) params.set("read", String(filters.read));
      if (filters?.search) params.set("search", filters.search);
      if (filters?.sortBy) params.set("sortBy", filters.sortBy);
      if (filters?.sortOrder) params.set("sortOrder", filters.sortOrder);

      const res = await fetch(`${API_BASE}?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch enquiries");
      const result: Enquiry[] = await res.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    // Data fetching on mount is intentional here
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchEnquiries();
  }, [fetchEnquiries]);

  const markRead = useCallback(async (id: string) => {
    try {
      const res = await fetch("/api/admin/enquiries/mark-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to mark as read");
      setData((prev) =>
        prev.map((e) => (e.id === id ? { ...e, read: true } : e))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }, []);

  return { data, loading, error, markRead, refetch: fetchEnquiries };
}
