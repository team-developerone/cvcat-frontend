import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import {
  loginWithFirebaseToken,
  fetchLatestCV,
  getStoredToken,
  getStoredUser,
  storeAuth,
  clearAuth,
  BackendUser,
} from "@/services/api";

interface AuthContextType {
  user: BackendUser | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  signInWithGoogle: () => Promise<{ user: BackendUser; isFirstTime: boolean }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<BackendUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!token && !!user;

  // On mount, check for stored session and validate it
  useEffect(() => {
    const storedToken = getStoredToken();
    const storedUser = getStoredUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);

      // Validate token by making a lightweight API call
      fetchLatestCV()
        .then(() => {
          // Token is valid
        })
        .catch(() => {
          // Token expired or invalid
          clearAuth();
          setToken(null);
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const signInWithGoogleFn = useCallback(async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseIdToken = await result.user.getIdToken();

    const loginRes = await loginWithFirebaseToken(firebaseIdToken);

    storeAuth(loginRes.token, loginRes.user);
    setToken(loginRes.token);
    setUser(loginRes.user);

    return { user: loginRes.user, isFirstTime: loginRes.isFirstTime };
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch {
      // Firebase sign out may fail if not signed in
    }
    clearAuth();
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        signInWithGoogle: signInWithGoogleFn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
