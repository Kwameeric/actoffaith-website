"use client";
import { useState } from "react";

interface Member {
  id: number;
  fullName: string;
  email: string | null;
  phone: string | null;
  role: string | null;
  imageUrl: string | null;
}

export function MembersDirectory({ members: initialMembers }: { members: Member[] }) {
  const [members] = useState<Member[]>(initialMembers);
  const [showMessage, setShowMessage] = useState(false);
  const [msgForm, setMsgForm] = useState({ subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = members.filter(m =>
    m.fullName.toLowerCase().includes(search.toLowerCase()) ||
    (m.role && m.role.toLowerCase().includes(search.toLowerCase()))
  );

  async function handleBulkMessage(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      // Send a message record for each member with email
      const membersWithEmail = members.filter(m => m.email);
      for (const m of membersWithEmail) {
        await fetch("/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Admin (Bulk Message)",
            email: m.email,
            subject: msgForm.subject,
            message: `To: ${m.fullName} (${m.email})\n\n${msgForm.message}`,
            source: "bulk_message",
          }),
        });
      }
      setSent(true);
    } catch {
      alert("Failed to send. Please try again.");
    }
    setSending(false);
  }

  return (
    <div>
      {/* Search + Bulk Message */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Search members by name or role..."
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent outline-none" />
        <button onClick={() => { setShowMessage(!showMessage); setSent(false); }}
          className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-light transition-colors shrink-0">
          {showMessage ? "Cancel" : "📢 Message All Members"}
        </button>
      </div>

      {/* Bulk Message Form */}
      {showMessage && (
        <div className="bg-primary rounded-2xl p-6 mb-8 text-white">
          {sent ? (
            <div className="text-center py-4">
              <span className="text-4xl block mb-2">✅</span>
              <h3 className="text-xl font-bold mb-1">Messages Recorded!</h3>
              <p className="text-gray-200 text-sm">Messages have been logged for {members.filter(m => m.email).length} member(s) with email.</p>
              <button onClick={() => { setSent(false); setShowMessage(false); setMsgForm({ subject: "", message: "" }); }}
                className="mt-4 gold-gradient text-primary-dark font-bold px-6 py-2 rounded-xl">Done</button>
            </div>
          ) : (
            <form onSubmit={handleBulkMessage} className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📢</span>
                <div>
                  <h3 className="font-bold text-lg">Send Message to All Members</h3>
                  <p className="text-gray-200 text-xs">{members.filter(m => m.email).length} members with email will receive this</p>
                </div>
              </div>
              <input type="text" required value={msgForm.subject} onChange={e => setMsgForm({ ...msgForm, subject: e.target.value })}
                placeholder="Subject (e.g. Sunday Service Update)"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-accent outline-none" />
              <textarea rows={4} required value={msgForm.message} onChange={e => setMsgForm({ ...msgForm, message: e.target.value })}
                placeholder="Write your message to all members..."
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-accent outline-none" />
              <button type="submit" disabled={sending}
                className="w-full gold-gradient text-primary-dark font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50">
                {sending ? "Sending..." : `📤 Send to ${members.filter(m => m.email).length} Members`}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Members Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(m => (
            <div key={m.id} className="bg-white rounded-xl p-4 text-center shadow-md card-hover">
              {m.imageUrl ? (
                <img src={m.imageUrl} alt={m.fullName} className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-accent" />
              ) : (
                <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-primary flex items-center justify-center text-white text-2xl font-bold border-2 border-accent">
                  {m.fullName.charAt(0)}
                </div>
              )}
              <h3 className="font-bold text-primary text-sm">{m.fullName}</h3>
              {m.role && <p className="text-accent text-xs font-semibold mt-0.5">{m.role}</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <span className="text-5xl block mb-3">👥</span>
          <p className="text-gray-400">
            {search ? "No members match your search." : "Church members will appear here. Add them from the Admin Dashboard."}
          </p>
        </div>
      )}

      <p className="text-center text-xs text-gray-400 mt-6">{filtered.length} member(s) shown</p>
    </div>
  );
}
