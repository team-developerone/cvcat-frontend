const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://cvcat-api-dev-phhm2.ondigitalocean.app/api/v1";

const TOKEN_KEY = "cvcat_token";
const USER_KEY = "cvcat_user";

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): BackendUser | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function storeAuth(token: string, user: BackendUser) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export interface BackendUser {
  _id: string;
  uid: string;
  email: string;
  name: {
    first: string;
    last: string;
  };
}

export interface ApiResponse<T> {
  error: boolean;
  message?: string;
  reason?: string;
  data: T;
}

export interface PaginatedResponse<T> {
  error: boolean;
  message: string;
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface LoginResponse {
  error: boolean;
  token: string;
  user: BackendUser;
  isFirstTime: boolean;
}

export interface BackendCV {
  _id: string;
  title: string;
  description?: string;
  isParsedByAi?: boolean;
  isDraft: boolean;
  cvType: "base" | "tailored";
  cvSource?: string;
  versionNumber?: string | null;
  _parent?: string | null;
  generatedSummary?: string;
  _user: string;
  createdAt: string;
  updatedAt: string;
  originalFile?: {
    name: string;
    url?: string;
    metadata?: {
      size?: number;
      mimetype?: string;
      uploadedAt?: string;
      fileExtension?: string;
    };
  };
  data: {
    basics?: {
      name?: string;
      label?: string;
      image?: string;
      email?: string;
      phone?: string;
      url?: string;
      summary?: string;
      location?: {
        address?: string;
        postalCode?: string;
        city?: string;
        countryCode?: string;
        region?: string;
      };
      profiles?: Array<{
        network?: string;
        username?: string;
        url?: string;
      }>;
    };
    summary?: string;
    work?: Array<{
      name?: string;
      position?: string;
      url?: string;
      startDate?: string;
      endDate?: string;
      summary?: string;
      highlights?: string[];
      location?: string;
    }>;
    volunteer?: Array<{
      organization?: string;
      position?: string;
      url?: string;
      startDate?: string;
      endDate?: string;
      summary?: string;
      highlights?: string[];
    }>;
    education?: Array<{
      institution?: string;
      url?: string;
      area?: string;
      studyType?: string;
      startDate?: string;
      endDate?: string;
      score?: string;
      courses?: string[];
    }>;
    awards?: Array<{
      title?: string;
      date?: string;
      awarder?: string;
      summary?: string;
    }>;
    certificates?: Array<{
      name?: string;
      date?: string;
      issuer?: string;
      url?: string;
    }>;
    publications?: Array<{
      name?: string;
      publisher?: string;
      releaseDate?: string;
      url?: string;
      summary?: string;
    }>;
    skills?: Array<{
      name?: string;
      level?: string;
      keywords?: string[];
    }>;
    languages?: Array<{
      language?: string;
      fluency?: string;
    }>;
    interests?: Array<{
      name?: string;
      keywords?: string[];
    }>;
    references?: Array<{
      name?: string;
      reference?: string;
    }>;
    projects?: Array<{
      name?: string;
      description?: string;
      highlights?: string[];
      keywords?: string[];
      startDate?: string;
      endDate?: string;
      url?: string;
      roles?: string[];
      entity?: string;
      type?: string;
    }>;
    custom?: Array<{
      sectionTitle?: string;
      items?: Array<{
        title?: string;
        subtitle?: string;
        date?: string;
        description?: string;
      }>;
    }>;
  };
  _versions?: string[];
  _exportHistory?: string[];
}

async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Don't set Content-Type for FormData (browser sets it with boundary)
  if (!(options.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    clearAuth();
    window.location.href = "/auth";
    throw new Error("Unauthorized");
  }

  const json = await res.json();

  if (json.error) {
    throw new Error(json.reason || json.message || "API error");
  }

  return json;
}

// --- Auth ---

export async function loginWithFirebaseToken(
  firebaseToken: string
): Promise<LoginResponse> {
  return apiClient<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ token: firebaseToken }),
  });
}

// --- CV CRUD ---

export async function fetchAllCVs(params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  cvType?: "base" | "tailored";
  isDraft?: string;
}): Promise<PaginatedResponse<BackendCV>> {
  const query = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) query.set(key, String(value));
    });
  }
  const qs = query.toString();
  return apiClient<PaginatedResponse<BackendCV>>(
    `/cv/fetchAll${qs ? `?${qs}` : ""}`
  );
}

export async function fetchLatestCV(): Promise<BackendCV | null> {
  try {
    const res = await fetchAllCVs({ 
      limit: 1, 
      sortBy: 'updatedAt', 
      sortOrder: 'desc' 
    });
    return res.data.length > 0 ? res.data[0] : null;
  } catch {
    return null;
  }
}

export async function getCVDetails(
  id: string
): Promise<ApiResponse<BackendCV>> {
  return apiClient<ApiResponse<BackendCV>>(`/cv/getDetails/${id}`);
}

export async function importCV(
  file: File
): Promise<ApiResponse<BackendCV>> {
  const formData = new FormData();
  formData.append("file", file);
  return apiClient<ApiResponse<BackendCV>>("/cv/import", {
    method: "POST",
    body: formData,
  });
}

export async function createCV(
  data: Partial<BackendCV>
): Promise<ApiResponse<BackendCV>> {
  return apiClient<ApiResponse<BackendCV>>("/cv/add", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function updateCV(
  id: string,
  data: Partial<BackendCV>
): Promise<ApiResponse<BackendCV>> {
  return apiClient<ApiResponse<BackendCV>>(`/cv/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteCV(
  id: string
): Promise<{ error: boolean; message: string }> {
  return apiClient<{ error: boolean; message: string }>(`/cv/delete/${id}`, {
    method: "DELETE",
  });
}
