export interface Enquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface EnquiryFilters {
  read?: boolean;
  search?: string;
  sortBy?: "createdAt" | "name" | "email";
  sortOrder?: "asc" | "desc";
}

export interface PaginatedEnquiries {
  data: Enquiry[];
  total: number;
  page: number;
  pageSize: number;
}
