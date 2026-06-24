"use client";
import { useState } from "react";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "Chat", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "chat_widget" }),
      });
      if (res.ok) setSubmitted(true);
      else alert("Something went wrong.");
    } catch { alert("Network error."); }
    setLoading(false);
  }

  function resetForm() {
    setSubmitted(false);
    setForm({ name: "", email: "", phone: "", subject: "Chat", message: "" });
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        style={{ background: "linear-gradient(135deg, #d4a853 0%, #e8c56e 50%, #d4a853 100%)" }}
        aria-label="Open chat"
      >
        {open ? (
          <svg className="w-7 h-7 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Unread badge */}
      {!open && (
        <span className="fixed bottom-[4.5rem] right-5 z-50 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full pointer-events-none animate-bounce">
          Chat
        </span>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-primary text-white px-5 py-4 flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary-dark font-bold text-lg">
              ✝
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm">Grace Community Church</h3>
              <div className="flex items-center gap-1.5 text-xs text-green-300">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                We&apos;re here to help
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 hover:bg-primary-light rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4">
            {submitted ? (
              <div className="text-center py-8">
                <span className="text-5xl block mb-3">✅</span>
                <h4 className="font-bold text-primary text-lg mb-1">Message Sent!</h4>
                <p className="text-gray-500 text-sm mb-4">We&apos;ll respond as soon as possible.</p>
                <button onClick={resetForm} className="text-primary font-semibold text-sm underline hover:text-accent">
                  Send another message
                </button>
              </div>
            ) : (
              <>
                {/* Welcome bubble */}
                <div className="flex gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">✝</div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-gray-700">Hello! 👋 Welcome to Grace Community Church. How can we help you today?</p>
                  </div>
                </div>
                <div className="flex gap-2 mb-6">
                  <div className="w-8 h-8 shrink-0"></div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-gray-700">Send us a message and we&apos;ll get back to you shortly. You can also share prayer requests.</p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input type="text" required value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name *"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent outline-none" />
                  <input type="email" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="Email (optional)"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent outline-none" />
                  <input type="tel" value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="Phone (optional)"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent outline-none" />
                  <textarea rows={3} required value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Type your message... *"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent outline-none resize-none" />
                  <button type="submit" disabled={loading}
                    className="w-full gold-gradient text-primary-dark font-bold py-3 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-60">
                    {loading ? "Sending..." : "Send Message →"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
