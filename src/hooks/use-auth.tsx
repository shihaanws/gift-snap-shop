import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export interface AuthUser {
  id: string;
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
  signup: (input: SignupInput) => Promise<AuthResult>;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function mapUser(user: User | null): AuthUser | null {
  if (!user || !user.email) {
    return null;
  }
  return {
    id: user.id,
    name: (typeof user.user_metadata?.name === "string" && user.user_metadata.name) || user.email.split("@")[0] || "User",
    email: user.email,
  };
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) {
        return;
      }
      setUser(mapUser(data.session?.user ?? null));
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(mapUser(session?.user ?? null));
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      signup: async ({ name, email, password }) => {
        const normalizedEmail = normalizeEmail(email);
        const normalizedName = name.trim();

        if (!normalizedName || !normalizedEmail || !password) {
          return { ok: false, message: "Please fill all fields." };
        }
        const { data, error } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            data: { name: normalizedName },
          },
        });
        if (error) {
          return { ok: false, message: error.message };
        }
        if (!data.session) {
          return { ok: true, message: "Signup successful. Please verify your email, then login." };
        }
        return { ok: true, message: "Account created successfully." };
      },
      login: async (email, password) => {
        const normalizedEmail = normalizeEmail(email);
        if (!normalizedEmail || !password) {
          return { ok: false, message: "Please enter email and password." };
        }
        const { error } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });
        if (error) {
          return { ok: false, message: error.message };
        }
        return { ok: true };
      },
      logout: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
          throw error;
        }
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
