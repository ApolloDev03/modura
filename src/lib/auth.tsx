// 'use client';

// import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
// import api, { clearToken, getToken, setToken } from './api';
// import type { Admin, ApiResponse } from '@/types';
// import loginapi from "../app/admin/login/page";

// interface LoginResult {
//   token: string;
//   admin: Admin;
// }

// interface AuthContextValue {
//   admin: Admin | null;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<ApiResponse<LoginResult>>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextValue | null>(null);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [admin, setAdmin] = useState<Admin | null>(null);
//   const [loading, setLoading] = useState(true);

//   const loadProfile = useCallback(async () => {
//     if (!getToken()) {
//       setAdmin(null);
//       setLoading(false);
//       return;
//     }
//     try {
//       const { data } = await api.get<ApiResponse<Admin>>('/admin/auth/me');
//       setAdmin(data.data);
//     } catch {
//       clearToken();
//       setAdmin(null);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => { loadProfile(); }, [loadProfile]);

//   const login = useCallback(async (email: string, password: string) => {
//     const { data } = await api.post<ApiResponse<LoginResult>>(`${loginapi}`, { email, password });
//     setToken(data.data.token);
//     setAdmin(data.data.admin);
//     return data;
//   }, []);

//   const logout = useCallback(() => {
//     clearToken();
//     setAdmin(null);
//     window.location.href = '/login';
//   }, []);

//   const value = useMemo<AuthContextValue>(() => ({ admin, loading, login, logout }), [admin, loading, login, logout]);
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export const useAuth = (): AuthContextValue => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
//   return ctx;
// };


"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import api, {
  clearToken,
  getToken,
  setToken,
} from "./api";

import type {
  Admin,
  ApiResponse,
} from "@/types";

interface LoginResult {
  token: string;
  admin: Admin;
}

interface AuthContextValue {
  admin: Admin | null;
  loading: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<ApiResponse<LoginResult>>;

  logout: () => void;
}

const AuthContext =
  createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [admin, setAdmin] =
    useState<Admin | null>(null);

  const [loading, setLoading] =
    useState(true);

  /**
   * Load logged-in admin profile
   */
  const loadProfile = useCallback(async () => {
    const token = getToken();

    if (!token) {
      setAdmin(null);
      setLoading(false);
      return;
    }

    try {
      const { data } =
        await api.get<ApiResponse<Admin>>(
          "/admin/auth/me"
        );

      setAdmin(data.data);
    } catch (error) {
      console.error(
        "Failed to load admin profile:",
        error
      );

      clearToken();
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  /**
   * Admin Login
   */
  const login = useCallback(
    async (
      email: string,
      password: string
    ) => {
      const { data } =
        await api.post<
          ApiResponse<LoginResult>
        >(
          "/admin/auth/login",
          {
            email,
            password,
          }
        );

      setToken(data.data.token);
      setAdmin(data.data.admin);

      return data;
    },
    []
  );

  /**
   * Logout
   */
  const logout = useCallback(() => {
    clearToken();
    setAdmin(null);
    setLoading(false);
    window.location.href =
      "/admin/login";
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      admin,
      loading,
      login,
      logout,
    }),
    [
      admin,
      loading,
      login,
      logout,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth =
  (): AuthContextValue => {
    const ctx =
      useContext(AuthContext);

    if (!ctx) {
      throw new Error(
        "useAuth must be used inside AuthProvider"
      );
    }

    return ctx;
  };