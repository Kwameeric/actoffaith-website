"use client";

import dynamic from "next/dynamic";

// Dynamically import the entire admin dashboard with no SSR at all
// This prevents any server-side rendering or hydration mismatch issues
const AdminDashboard = dynamic(() => import("./AdminClient"), { ssr: false, loading: () => (
  <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#1e3a5f" }}>
    <p style={{ color: "white", fontSize: "18px" }}>Loading Admin...</p>
  </div>
)});

export default function AdminPage() {
  return <AdminDashboard />;
}
