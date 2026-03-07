import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const USERS_STORAGE_KEY = "gift-snap-shop-auth-users";
const SESSION_STORAGE_KEY = "gift-snap-shop-auth-session";

interface StoredUser {
  name: string;
  email: string;
  password: string;
}

export interface AuthUser {
  name: string;
  email: string;
}

interface AuthResult {
  ok: boolean;
  message?: string;
}

interface SignupInput {
  name: string;
  email: string;
  password: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  signup: (input: SignupInput) => AuthResult;
  login: (email: string, password: string) => AuthResult;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(
      (user) =>
        user &&
        typeof user.name === "string" &&
        typeof user.email === "string" &&
        typeof user.password === "string"
    );
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function readSession(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.name !== "string" || typeof parsed.email !== "string") {
      return null;
    }
    return { name: parsed.name, email: parsed.email };
  } catch {
    return null;
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => readSession());

  useEffect(() => {
    if (!user) {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      signup: ({ name, email, password }) => {
        const normalizedName = name.trim();
        const normalizedEmail = normalizeEmail(email);

        if (!normalizedName || !normalizedEmail || !password) {
          return { ok: false, message: "Please fill all fields." };
        }

        const users = readUsers();
        const exists = users.some((stored) => normalizeEmail(stored.email) === normalizedEmail);
        if (exists) {
          return { ok: false, message: "An account with this email already exists." };
        }

        users.push({
          name: normalizedName,
          email: normalizedEmail,
          password,
        });
        writeUsers(users);

        setUser({ name: normalizedName, email: normalizedEmail });
        return { ok: true };
      },
      login: (email, password) => {
        const normalizedEmail = normalizeEmail(email);
        if (!normalizedEmail || !password) {
          return { ok: false, message: "Please enter email and password." };
        }

        const users = readUsers();
        const existing = users.find((stored) => normalizeEmail(stored.email) === normalizedEmail);
        if (!existing || existing.password !== password) {
          return { ok: false, message: "Invalid email or password." };
        }

        setUser({ name: existing.name, email: existing.email });
        return { ok: true };
      },
      logout: () => {
        setUser(null);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }
  return context;
}
