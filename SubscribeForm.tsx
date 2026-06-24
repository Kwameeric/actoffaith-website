"use client";
import { useState } from "react";

export function SubscribeForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
      else alert("Something went wrong.");
    } catch { alert("Network error."); }
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center max-w-md mx-auto">
        <span className="text-4xl block mb-3">🔔</span>
        <h3 className="text-xl font-bold text-green-800 mb-2">Subscribed!</h3>
        <p className="text-green-700 text-sm">You&apos;ll receive notifications for upcoming live streams and events.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
      <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
        placeholder="Your name" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent outline-none" />
      <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
        placeholder="Email address" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent outline-none" />
      <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
        placeholder="Phone (optional)" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent outline-none" />
      <button type="submit" disabled={loading}
        className="w-full gold-gradient text-primary-dark font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50">
        {loading ? "Subscribing..." : "🔔 Subscribe for Notifications"}
      </button>
    </form>
  );
}
