import { Enquiry, EnquiryFilters } from "@/types/enquiry";

const API_BASE = "/api/admin/enquiries";

export const enquiriesClientRepository = {
  async getAll(filters?: EnquiryFilters): Promise<Enquiry[]> {
    const params = new URLSearchParams();
    if (filters?.read !== undefined) params.set("read", String(filters.read));
    if (filters?.search) params.set("search", filters.search);
    if (filters?.sortBy) params.set("sortBy", filters.sortBy);
    if (filters?.sortOrder) params.set("sortOrder", filters.sortOrder);

    const res = await fetch(`${API_BASE}?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch enquiries");
    return res.json();
  },

  async getById(id: string): Promise<Enquiry | null> {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) return null;
    return res.json();
  },

  async create(data: Omit<Enquiry, "id" | "createdAt" | "read">) {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create enquiry");
    return res.json();
  },

  async markRead(id: string): Promise<Enquiry | null> {
    const res = await fetch("/api/admin/enquiries/mark-read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error("Failed to mark as read");
    return res.json();
  },

  async getStats(): Promise<{
    total: number;
    new: number;
    read: number;
  }> {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error("Failed to fetch stats");
    return res.json();
  },
};
