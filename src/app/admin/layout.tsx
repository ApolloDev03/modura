import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "@/lib/auth";
import AdminShell from "../../components/admin/AdminShell";

import "./admin.css";

export const metadata: Metadata = {
  title: "MVNL Admin",
  description: "MVNL Engineering - Admin Panel",
  icons: {
    icon: "/logo-icon.png",
  },
};

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AdminShell>
            {children}
          </AdminShell>
        </AuthProvider>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              fontSize: 14,
            },
          }}
        />
      </body>
    </html>
  );
}