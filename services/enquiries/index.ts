import { Enquiry, EnquiryFilters } from "@/types/enquiry";
import { enquiriesServerRepository } from "./server";

export const enquiriesService = {
  async getAll(filters?: EnquiryFilters) {
    return enquiriesServerRepository.getAll(filters);
  },

  async getById(id: string) {
    return enquiriesServerRepository.getById(id);
  },

  async create(data: Omit<Enquiry, "id" | "createdAt" | "read">) {
    return enquiriesServerRepository.create(data);
  },

  async markRead(id: string) {
    return enquiriesServerRepository.markRead(id);
  },

  async getStats() {
    return enquiriesServerRepository.getStats();
  },
};

export type { Enquiry, EnquiryFilters } from "@/types/enquiry";
