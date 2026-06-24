import type { ReactNode } from "react";

export const metadata = { title: "Admin Dashboard - Grace Community Church" };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
