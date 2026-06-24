"use client";
import { useState } from "react";

export function MessageForm({ source }: { source: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source }),
      });
      if (res.ok) setSubmitted(true);
      else alert("Something went wrong. Please try again.");
    } catch { alert("Network error. Please try again."); }
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <span className="text-5xl block mb-4">✅</span>
        <h3 className="text-2xl font-bold text-primary mb-2">Message Sent!</h3>
        <p className="text-gray-600">Thank you for reaching out. We&apos;ll get back to you soon.</p>
        <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
          className="mt-4 text-primary font-semibold underline hover:text-accent">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-100 rounded-2xl p-8 space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name *</label>
        <input type="text" required value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input type="email" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
          <input type="tel" value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
        <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none">
          <option value="">Select a subject...</option>
          <option value="Prayer Request">Prayer Request</option>
          <option value="Testimony">Testimony</option>
          <option value="Question">Question</option>
          <option value="Feedback">Feedback</option>
          <option value="Partnership">Partnership</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Message *</label>
        <textarea rows={4} required value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          placeholder="Write your message here..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none" />
      </div>
      <button type="submit" disabled={loading}
        className="w-full bg-primary text-white font-bold py-4 rounded-full text-lg hover:bg-primary-light transition-colors disabled:opacity-60">
        {loading ? "Sending..." : "✉️ Send Message"}
      </button>
    </form>
  );
}
