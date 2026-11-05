import { Enquiry, EnquiryFilters } from "@/types/enquiry";
import { createClient } from "@/lib/supabase/server";

export const enquiriesServerRepository = {
  async getAll(filters?: EnquiryFilters): Promise<Enquiry[]> {
    const supabase = await createClient();

    let query = supabase.from("enquiries").select("*");

    if (filters?.read !== undefined) {
      query = query.eq("read", filters.read);
    }

    if (filters?.search) {
      const term = filters.search.toLowerCase();
      query = query.or(
        `name.ilike.%${term}%,email.ilike.%${term}%,message.ilike.%${term}%`
      );
    }

    if (filters?.sortBy) {
      const ascending = filters.sortOrder === "asc";
      query = query.order(filters.sortBy, { ascending });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
      if (process.env.NODE_ENV === "development") console.error("Failed to fetch enquiries:", error);
      return [];
    }

    return (data ?? []).map((d) => ({
      id: d.id,
      name: d.name,
      email: d.email,
      message: d.message,
      createdAt: d.created_at,
      read: d.read,
    }));
  },

  async getById(id: string): Promise<Enquiry | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      message: data.message,
      createdAt: data.created_at,
      read: data.read,
    };
  },

  async create(enquiry: Omit<Enquiry, "id" | "createdAt" | "read">) {
    const supabase = await createClient();

    const newEnquiry = {
      name: enquiry.name,
      email: enquiry.email,
      message: enquiry.message,
      read: false,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("enquiries")
      .insert(newEnquiry)
      .select()
      .single();

    if (error || !data) {
      throw new Error(error?.message ?? "Failed to create enquiry");
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      message: data.message,
      createdAt: data.created_at,
      read: data.read,
    };
  },

  async markRead(id: string): Promise<Enquiry | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("enquiries")
      .update({ read: true })
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      message: data.message,
      createdAt: data.created_at,
      read: data.read,
    };
  },

  async getStats(): Promise<{
    total: number;
    new: number;
    read: number;
  }> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("enquiries")
      .select("read");

    if (error) {
      if (process.env.NODE_ENV === "development") console.error("Failed to fetch enquiry stats:", error);
      return { total: 0, new: 0, read: 0 };
    }

    const enquiries = data ?? [];
    return {
      total: enquiries.length,
      new: enquiries.filter((e) => !e.read).length,
      read: enquiries.filter((e) => e.read).length,
    };
  },
};
