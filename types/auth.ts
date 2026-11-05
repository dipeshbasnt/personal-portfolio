export interface AuthUser {
  id: string;
  email: string;
  role: "admin" | "user";
  aal: "aal1" | "aal2";
  app_metadata: Record<string, unknown>;
  user_metadata: Record<string, unknown>;
}

export interface AuthSession {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
}

export type LoginInput = {
  email: string;
  password: string;
};

export type AuthResult = {
  success: boolean;
  error?: string;
  user?: AuthUser;
};
