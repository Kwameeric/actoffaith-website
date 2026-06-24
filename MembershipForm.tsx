"use client";
import { useState } from "react";

export function MembershipForm() {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", country: "", prayerRequest: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
      else alert("Something went wrong. Please try again.");
    } catch { alert("Network error. Please try again."); }
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="bg-primary-light rounded-2xl p-8 text-center max-w-lg mx-auto">
        <span className="text-5xl block mb-4">🎉</span>
        <h3 className="text-2xl font-bold mb-2">Welcome to the Family!</h3>
        <p className="text-gray-200">You are now an online member of Grace Community Church. We&apos;ll be in touch soon!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-primary-light rounded-2xl p-8 max-w-lg mx-auto space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-1">Full Name *</label>
        <input type="text" required value={form.fullName}
          onChange={e => setForm({ ...form, fullName: e.target.value })}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-accent outline-none"
          placeholder="Your full name" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Email *</label>
          <input type="email" required value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-accent outline-none"
            placeholder="email@example.com" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Phone</label>
          <input type="tel" value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-accent outline-none"
            placeholder="+1 000-000-0000" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Country</label>
        <input type="text" value={form.country}
          onChange={e => setForm({ ...form, country: e.target.value })}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-accent outline-none"
          placeholder="Your country" />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Prayer Request (optional)</label>
        <textarea rows={3} value={form.prayerRequest}
          onChange={e => setForm({ ...form, prayerRequest: e.target.value })}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-accent outline-none"
          placeholder="Share a prayer request..." />
      </div>
      <button type="submit" disabled={loading}
        className="w-full gold-gradient text-primary-dark font-bold py-4 rounded-full text-lg hover:opacity-90 transition-opacity disabled:opacity-60">
        {loading ? "Submitting..." : "🤝 Become a Member"}
      </button>
    </form>
  );
}
