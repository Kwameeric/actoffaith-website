"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useCallback } from "react";

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
        copied
          ? "bg-green-100 text-green-700 border border-green-300"
          : "bg-white/20 hover:bg-white/30 text-white border border-white/30"
      }`}
    >
      {copied ? (
        <>✅ Copied!</>
      ) : (
        <>📋 Copy {label}</>
      )}
    </button>
  );
}

function GivingContent() {
  const searchParams = useSearchParams();
  const purposeParam = searchParams.get("purpose") || "general";
  const amountParam = searchParams.get("amount") || "";

  const [form, setForm] = useState({
    donorName: "", email: "", phone: "", amount: amountParam,
    currency: "USD", method: "momo", purpose: purposeParam, reference: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [momoNumber, setMomoNumber] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [copiedField, setCopiedField] = useState("");

  useEffect(() => {
    fetch("/api/content?keys=momo_number,bank_details,paypal_email")
      .then(r => r.json())
      .then(d => {
        setMomoNumber(d.momo_number || "");
        setBankDetails(d.bank_details || "");
        setPaypalEmail(d.paypal_email || "");
      }).catch(() => {});
  }, []);

  async function copyToClipboard(text: string, field: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, amount: Math.round(parseFloat(form.amount) * 100) })
      });
      setSubmitted(true);
    } catch { alert("Something went wrong. Please try again."); }
  }

  if (submitted) {
    return (
      <div>
        <section className="bg-primary text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="text-accent text-6xl mb-6 block">✅</span>
            <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
            <p className="text-gray-200 text-lg mb-8">Your donation has been recorded. God bless you for your generosity!</p>

            {form.method === "momo" && momoNumber && (
              <div className="mt-6 bg-primary-light rounded-2xl p-8 max-w-md mx-auto">
                <p className="font-semibold mb-2 text-lg">📱 Send MoMo payment to:</p>
                <p className="text-accent text-3xl font-bold mb-4">{momoNumber}</p>
                <CopyButton text={momoNumber} label="Number" />
                <p className="text-sm text-gray-300 mt-3">Use your name as reference</p>
              </div>
            )}
            {form.method === "bank" && bankDetails && (
              <div className="mt-6 bg-primary-light rounded-2xl p-8 max-w-md mx-auto">
                <p className="font-semibold mb-3 text-lg">🏦 Bank Transfer Details:</p>
                <p className="text-gray-200 whitespace-pre-line text-left mb-4">{bankDetails}</p>
                <CopyButton text={bankDetails} label="Details" />
              </div>
            )}
            {form.method === "paypal" && paypalEmail && (
              <div className="mt-6 bg-primary-light rounded-2xl p-8 max-w-md mx-auto">
                <p className="font-semibold mb-2 text-lg">💳 Send via PayPal to:</p>
                <p className="text-accent text-xl font-bold mb-4">{paypalEmail}</p>
                <CopyButton text={paypalEmail} label="Email" />
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  const purposes = [
    { value: "general", label: "General Offering" },
    { value: "tithe", label: "Tithe" },
    { value: "building", label: "Church Building Project" },
    { value: "truck", label: "Crusade Truck Fund" },
    { value: "orphanage", label: "Orphanage Support" },
    { value: "bookstore", label: "Book Purchase" },
    { value: "missions", label: "Missions" },
    { value: "bible_school", label: "Bible School" },
    { value: "other", label: "Other" },
  ];

  return (
    <div>
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-accent text-4xl mb-4 block">❤️</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Give Generously</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.&rdquo; — 2 Corinthians 9:7
          </p>
        </div>
      </section>

      {/* Quick Payment Info - Click to Copy Cards */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-white text-2xl font-bold text-center mb-2">Quick Payment Details</h2>
          <p className="text-gray-400 text-center mb-8 text-sm">Click to copy, then use the form below to record your donation</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* MoMo */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">📱</span>
                <div>
                  <h3 className="font-bold text-lg">MoMo Pay</h3>
                  <p className="text-green-200 text-xs">Mobile Money</p>
                </div>
              </div>
              {momoNumber ? (
                <>
                  <p className="text-2xl font-bold mb-4 tracking-wider">{momoNumber}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(momoNumber, "momo")}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        copiedField === "momo"
                          ? "bg-white text-green-700"
                          : "bg-white/20 hover:bg-white/30"
                      }`}
                    >
                      {copiedField === "momo" ? "✅ Copied!" : "📋 Copy Number"}
                    </button>
                    <a href="#donation-form" className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-white text-green-700 text-center hover:bg-green-50 transition-colors">
                      📝 Fill Form
                    </a>
                  </div>
                </>
              ) : (
                <p className="text-green-200 text-sm">Not configured yet</p>
              )}
            </div>

            {/* Bank */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">🏦</span>
                <div>
                  <h3 className="font-bold text-lg">Bank Transfer</h3>
                  <p className="text-blue-200 text-xs">Direct Bank Deposit</p>
                </div>
              </div>
              {bankDetails ? (
                <>
                  <p className="text-sm whitespace-pre-line mb-4 leading-relaxed line-clamp-3">{bankDetails}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(bankDetails, "bank")}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        copiedField === "bank"
                          ? "bg-white text-blue-700"
                          : "bg-white/20 hover:bg-white/30"
                      }`}
                    >
                      {copiedField === "bank" ? "✅ Copied!" : "📋 Copy Details"}
                    </button>
                    <a href="#donation-form" className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-white text-blue-700 text-center hover:bg-blue-50 transition-colors">
                      📝 Fill Form
                    </a>
                  </div>
                </>
              ) : (
                <p className="text-blue-200 text-sm">Not configured yet</p>
              )}
            </div>

            {/* PayPal */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">💳</span>
                <div>
                  <h3 className="font-bold text-lg">PayPal</h3>
                  <p className="text-indigo-200 text-xs">Online Payment</p>
                </div>
              </div>
              {paypalEmail ? (
                <>
                  <p className="text-lg font-bold mb-4 break-all">{paypalEmail}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(paypalEmail, "paypal")}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        copiedField === "paypal"
                          ? "bg-white text-indigo-700"
                          : "bg-white/20 hover:bg-white/30"
                      }`}
                    >
                      {copiedField === "paypal" ? "✅ Copied!" : "📋 Copy Email"}
                    </button>
                    <a href="#donation-form" className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-white text-indigo-700 text-center hover:bg-indigo-50 transition-colors">
                      📝 Fill Form
                    </a>
                  </div>
                </>
              ) : (
                <p className="text-indigo-200 text-sm">Not configured yet</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section id="donation-form" className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-primary mb-2 text-center">Donation Form</h2>
            <p className="text-gray-500 text-center text-sm mb-6">Fill in your details after making payment</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                <input type="text" required value={form.donorName}
                  onChange={e => setForm({ ...form, donorName: e.target.value })}
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Amount *</label>
                  <input type="number" required min="1" step="0.01" value={form.amount}
                    onChange={e => setForm({ ...form, amount: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Currency</label>
                  <select value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none">
                    <option value="USD">USD</option>
                    <option value="GHS">GHS (Cedis)</option>
                    <option value="NGN">NGN (Naira)</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Purpose</label>
                <select value={form.purpose} onChange={e => setForm({ ...form, purpose: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none">
                  {purposes.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Payment Method *</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "momo", icon: "📱", label: "MoMo Pay", desc: "Mobile Money" },
                    { value: "bank", icon: "🏦", label: "Bank", desc: "Bank Transfer" },
                    { value: "paypal", icon: "💳", label: "PayPal", desc: "PayPal" },
                  ].map(m => (
                    <button type="button" key={m.value}
                      onClick={() => setForm({ ...form, method: m.value })}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${form.method === m.value ? "border-accent bg-accent/10 shadow-md" : "border-gray-200 hover:border-gray-300"}`}>
                      <span className="text-2xl block">{m.icon}</span>
                      <span className="text-xs text-gray-700 font-bold block mt-1">{m.label}</span>
                      <span className="text-[10px] text-gray-500 block">{m.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment details with click-to-copy */}
              {form.method === "momo" && momoNumber && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <p className="font-semibold text-green-800 mb-1">📱 MoMo Number:</p>
                  <p className="text-green-900 text-xl font-bold mb-3">{momoNumber}</p>
                  <button type="button" onClick={() => copyToClipboard(momoNumber, "momo_form")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      copiedField === "momo_form"
                        ? "bg-green-600 text-white"
                        : "bg-green-200 text-green-800 hover:bg-green-300"
                    }`}>
                    {copiedField === "momo_form" ? "✅ Copied!" : "📋 Click to Copy Number"}
                  </button>
                  <p className="text-sm text-green-700 mt-2">Send to this number, then enter your reference below</p>
                </div>
              )}
              {form.method === "bank" && bankDetails && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                  <p className="font-semibold text-blue-800 mb-1">🏦 Bank Details:</p>
                  <p className="text-blue-900 whitespace-pre-line text-sm mb-3">{bankDetails}</p>
                  <button type="button" onClick={() => copyToClipboard(bankDetails, "bank_form")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      copiedField === "bank_form"
                        ? "bg-blue-600 text-white"
                        : "bg-blue-200 text-blue-800 hover:bg-blue-300"
                    }`}>
                    {copiedField === "bank_form" ? "✅ Copied!" : "📋 Click to Copy Details"}
                  </button>
                  <p className="text-sm text-blue-700 mt-2">Transfer to this account, then enter your reference below</p>
                </div>
              )}
              {form.method === "paypal" && paypalEmail && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
                  <p className="font-semibold text-indigo-800 mb-1">💳 PayPal Email:</p>
                  <p className="text-indigo-900 font-bold text-lg mb-3">{paypalEmail}</p>
                  <button type="button" onClick={() => copyToClipboard(paypalEmail, "paypal_form")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      copiedField === "paypal_form"
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-200 text-indigo-800 hover:bg-indigo-300"
                    }`}>
                    {copiedField === "paypal_form" ? "✅ Copied!" : "📋 Click to Copy Email"}
                  </button>
                  <p className="text-sm text-indigo-700 mt-2">Send via PayPal, then enter your reference below</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Transaction Reference</label>
                <input type="text" value={form.reference}
                  onChange={e => setForm({ ...form, reference: e.target.value })}
                  placeholder="Enter your transaction reference or ID"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none" />
              </div>

              <button type="submit" className="w-full gold-gradient text-primary-dark font-bold py-4 rounded-full text-lg hover:opacity-90 transition-opacity">
                Submit Donation
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function GivingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="text-2xl">Loading...</span></div>}>
      <GivingContent />
    </Suspense>
  );
}
