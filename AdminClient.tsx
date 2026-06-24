"use client";
import { useState, useEffect } from "react";

const PIN_CODE = "7717";

export default function AdminClient() {
  const [unlocked, setUnlocked] = useState(false);
  const [digits, setDigits] = useState("");
  const [error, setError] = useState(false);

  function press(d: string) {
    if (digits.length >= 4) return;
    const next = digits + d;
    setDigits(next);
    setError(false);
    if (next.length === 4) {
      if (next === PIN_CODE) {
        setUnlocked(true);
      } else {
        setError(true);
        setTimeout(() => { setDigits(""); setError(false); }, 700);
      }
    }
  }

  if (!unlocked) {
    return (
      <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #152a45, #1e3a5f, #2c5282)", padding: "16px" }}>
        <div style={{ background: "white", borderRadius: "24px", padding: "32px", maxWidth: "360px", width: "100%", boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#1e3a5f", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "28px" }}>🔒</div>
            <h1 style={{ fontSize: "22px", fontWeight: "bold", color: "#1e3a5f", margin: 0 }}>Admin Dashboard</h1>
            <p style={{ color: "#888", fontSize: "13px", marginTop: "4px" }}>Enter your 4-digit PIN</p>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "28px" }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ width: "18px", height: "18px", borderRadius: "50%", background: error ? "#ef4444" : i < digits.length ? "#d4a853" : "#e5e7eb", transition: "all 0.2s", transform: i < digits.length ? "scale(1.3)" : "scale(1)" }} />
            ))}
          </div>
          {error && <p style={{ color: "#ef4444", textAlign: "center", fontSize: "13px", fontWeight: "bold", marginBottom: "12px" }}>Wrong PIN</p>}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", maxWidth: "240px", margin: "0 auto" }}>
            {["1","2","3","4","5","6","7","8","9","","0","⌫"].map(d => (
              <button key={d || "x"} type="button"
                disabled={d === ""}
                onClick={() => { if (d === "⌫") { setDigits(p => p.slice(0,-1)); setError(false); } else if (d) press(d); }}
                style={{ height: "52px", borderRadius: "16px", fontSize: "20px", fontWeight: "bold", border: "none", cursor: d ? "pointer" : "default", visibility: d === "" ? "hidden" : "visible", background: d === "⌫" ? "#f3f4f6" : "#f9fafb", color: d === "⌫" ? "#888" : "#1e3a5f", transition: "all 0.15s" }}
                onMouseOver={e => { if (d && d !== "⌫") { (e.target as HTMLElement).style.background = "#1e3a5f"; (e.target as HTMLElement).style.color = "white"; }}}
                onMouseOut={e => { if (d && d !== "⌫") { (e.target as HTMLElement).style.background = "#f9fafb"; (e.target as HTMLElement).style.color = "#1e3a5f"; }}}
              >{d}</button>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: "11px", color: "#aaa", marginTop: "20px" }}>Building God&apos;s Kingdom</p>
        </div>
      </div>
    );
  }

  return <DashboardPanel onLogout={() => { setUnlocked(false); setDigits(""); }} />;
}

/* ========== DASHBOARD ========== */

const TABS = [
  { id: "content", name: "Site Content", icon: "📝" },
  { id: "logo", name: "Logo", icon: "🎨" },
  { id: "gallery", name: "Gallery", icon: "🖼️" },
  { id: "books", name: "Books", icon: "📚" },
  { id: "events", name: "Events", icon: "📅" },
  { id: "bible_school", name: "Bible School", icon: "📖" },
  { id: "enrollments", name: "Enrollments", icon: "🎓" },
  { id: "orphanage", name: "Orphanage", icon: "🏠" },
  { id: "media", name: "Media", icon: "📷" },
  { id: "projects", name: "Projects", icon: "🏗️" },
  { id: "livestream", name: "Livestream", icon: "🔴" },
  { id: "church_members", name: "Church Members", icon: "👥" },
  { id: "videos", name: "Videos", icon: "🎬" },
  { id: "members", name: "Online Members", icon: "🤝" },
  { id: "subscribers", name: "Subscribers", icon: "🔔" },
  { id: "messages", name: "Messages", icon: "✉️" },
  { id: "donations", name: "Donations", icon: "💰" },
];

type FieldType = "text" | "textarea" | "image";
interface ContentField { key: string; label: string; type: FieldType }

const CONTENT_FIELDS: ContentField[] = [
  { key: "site_name", label: "Church Name (navbar full)", type: "text" },
  { key: "site_short_name", label: "Church Short Name (navbar mobile)", type: "text" },
  { key: "hero_title", label: "Hero Title", type: "text" },
  { key: "hero_subtitle", label: "Hero Subtitle", type: "textarea" },
  { key: "hero_image", label: "Hero Background Image", type: "image" },
  { key: "founder_name", label: "Founder Name", type: "text" },
  { key: "founder_bio", label: "Founder Bio", type: "textarea" },
  { key: "founder_image", label: "Founder Image", type: "image" },
  { key: "gallery_image_1", label: "Homepage Gallery Image 1", type: "image" },
  { key: "gallery_image_2", label: "Homepage Gallery Image 2", type: "image" },
  { key: "gallery_image_3", label: "Homepage Gallery Image 3", type: "image" },
  { key: "gallery_image_4", label: "Homepage Gallery Image 4", type: "image" },
  { key: "project_title", label: "Project Title", type: "text" },
  { key: "project_description", label: "Project Description", type: "textarea" },
  { key: "project_progress", label: "Project Progress (%)", type: "text" },
  { key: "project_goal", label: "Project Goal", type: "text" },
  { key: "project_image", label: "Church Building Project Image", type: "image" },
  { key: "orphanage_title", label: "Orphanage Title", type: "text" },
  { key: "orphanage_description", label: "Orphanage Description", type: "textarea" },
  { key: "orphanage_image", label: "Orphanage Image", type: "image" },
  { key: "bible_school_title", label: "Bible School Title", type: "text" },
  { key: "bible_school_description", label: "Bible School Description", type: "textarea" },
  { key: "bible_school_image", label: "Bible School Image", type: "image" },
  { key: "book_image_1", label: "Book 1 Image", type: "image" },
  { key: "book_title_1", label: "Book 1 Title", type: "text" },
  { key: "book_author_1", label: "Book 1 Author", type: "text" },
  { key: "book_price_1", label: "Book 1 Price", type: "text" },
  { key: "book_image_2", label: "Book 2 Image", type: "image" },
  { key: "book_title_2", label: "Book 2 Title", type: "text" },
  { key: "book_author_2", label: "Book 2 Author", type: "text" },
  { key: "book_price_2", label: "Book 2 Price", type: "text" },
  { key: "book_image_3", label: "Book 3 Image", type: "image" },
  { key: "book_title_3", label: "Book 3 Title", type: "text" },
  { key: "book_author_3", label: "Book 3 Author", type: "text" },
  { key: "book_price_3", label: "Book 3 Price", type: "text" },
  { key: "book_image_4", label: "Book 4 Image", type: "image" },
  { key: "book_title_4", label: "Book 4 Title", type: "text" },
  { key: "book_author_4", label: "Book 4 Author", type: "text" },
  { key: "book_price_4", label: "Book 4 Price", type: "text" },
  { key: "youtube_embed", label: "YouTube Embed URL", type: "text" },
  { key: "facebook_url", label: "Facebook URL", type: "text" },
  { key: "youtube_url", label: "YouTube Channel URL", type: "text" },
  { key: "instagram_url", label: "Instagram URL", type: "text" },
  { key: "twitter_url", label: "Twitter/X URL", type: "text" },
  { key: "tiktok_url", label: "TikTok URL", type: "text" },
  { key: "facebook_embed", label: "Facebook Embed URL", type: "text" },
  { key: "instagram_embed", label: "Instagram Embed URL", type: "text" },
  { key: "tiktok_embed", label: "TikTok Embed URL", type: "text" },
  { key: "twitter_embed", label: "Twitter/X Embed URL", type: "text" },
  { key: "momo_number", label: "MoMo Number", type: "text" },
  { key: "bank_details", label: "Bank Details", type: "textarea" },
  { key: "paypal_email", label: "PayPal Email", type: "text" },
  { key: "livestream_title", label: "Livestream Title", type: "text" },
  { key: "livestream_description", label: "Livestream Description", type: "textarea" },
  { key: "truck_title", label: "Truck Title", type: "text" },
  { key: "truck_description", label: "Truck Description", type: "textarea" },
  { key: "truck_goal", label: "Truck Goal", type: "text" },
  { key: "truck_progress", label: "Truck Progress (%)", type: "text" },
  { key: "truck_image", label: "Truck Image", type: "image" },
];

/* Helper: detect if a field name is for an image or video */
const IMAGE_FIELDS = ["imageUrl","image_url","imageurl","thumbnail","founder_image","truck_image"];
const VIDEO_FIELDS = ["videoData","video_data","videodata"];
const LINK_FIELDS = ["embedUrl","embed_url","channelUrl","channel_url"];

function isImageField(name: string) { return IMAGE_FIELDS.some(f => name.toLowerCase() === f.toLowerCase()) || name.toLowerCase().includes("image"); }
function isVideoField(name: string) { return VIDEO_FIELDS.some(f => name.toLowerCase() === f.toLowerCase()); }
function isLinkField(name: string) { return LINK_FIELDS.some(f => name.toLowerCase() === f.toLowerCase()) || name.toLowerCase().includes("embed") || name.toLowerCase().includes("channel"); }

/* Helper: file to data URL */
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function DashboardPanel({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("content");
  const [mobileMenu, setMobileMenu] = useState(false);

  const currentTab = TABS.find(t => t.id === activeTab) || TABS[0];

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
      {/* Desktop sidebar */}
      <div style={{ width: "220px", background: "#1e3a5f", color: "white", display: "flex", flexDirection: "column", flexShrink: 0 }} className="hidden lg:flex">
        <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)", fontWeight: "bold", fontSize: "14px" }}>⚙️ Admin Panel</div>
        <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
          {TABS.map(t => (
            <button key={t.id} type="button" onClick={() => setActiveTab(t.id)}
              style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", textAlign: "left", padding: "10px 12px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", marginBottom: "2px", background: activeTab === t.id ? "#d4a853" : "transparent", color: activeTab === t.id ? "#152a45" : "white", fontWeight: activeTab === t.id ? "bold" : "normal" }}
            >{t.icon} {t.name}</button>
          ))}
        </div>
        <div style={{ padding: "12px" }}>
          <button type="button" onClick={onLogout} style={{ width: "100%", padding: "8px", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "8px", background: "transparent", color: "white", cursor: "pointer", fontSize: "12px" }}>🔒 Logout</button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex" }} className="lg:hidden">
          <div style={{ width: "260px", background: "#1e3a5f", color: "white", display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: "bold", fontSize: "14px" }}>⚙️ Admin Panel</span>
              <button type="button" onClick={() => setMobileMenu(false)} style={{ background: "none", border: "none", color: "white", fontSize: "20px", cursor: "pointer" }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
              {TABS.map(t => (
                <button key={t.id} type="button" onClick={() => { setActiveTab(t.id); setMobileMenu(false); }}
                  style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", textAlign: "left", padding: "10px 12px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", marginBottom: "2px", background: activeTab === t.id ? "#d4a853" : "transparent", color: activeTab === t.id ? "#152a45" : "white", fontWeight: activeTab === t.id ? "bold" : "normal" }}
                >{t.icon} {t.name}</button>
              ))}
            </div>
            <div style={{ padding: "12px" }}>
              <button type="button" onClick={onLogout} style={{ width: "100%", padding: "8px", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "8px", background: "transparent", color: "white", cursor: "pointer", fontSize: "12px" }}>🔒 Logout</button>
            </div>
          </div>
          <div style={{ flex: 1, background: "rgba(0,0,0,0.4)" }} onClick={() => setMobileMenu(false)} />
        </div>
      )}

      {/* Main area */}
      <div style={{ flex: 1, minWidth: 0, background: "#f3f4f6" }}>
        <div style={{ position: "sticky", top: "64px", zIndex: 10, background: "white", borderBottom: "1px solid #e5e7eb", padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
          <button type="button" onClick={() => setMobileMenu(true)} className="lg:hidden" style={{ padding: "4px", background: "none", border: "none", cursor: "pointer" }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <h1 style={{ fontSize: "16px", fontWeight: "bold", color: "#1e3a5f" }}>{currentTab.icon} {currentTab.name}</h1>
        </div>
        <div style={{ padding: "20px" }}>
          <RenderTab tabId={activeTab} />
        </div>
      </div>
    </div>
  );
}

/* ========= TAB RENDERER ========= */
function RenderTab({ tabId }: { tabId: string }) {
  switch (tabId) {
    case "content": return <ContentEditor />;
    case "logo": return <LogoEditor />;
    case "gallery": return <ItemManager title="Gallery Image" endpoint="/api/gallery" listKey="images" fields={["title","imageUrl","category","sortOrder"]} />;
    case "books": return <ItemManager title="Book" endpoint="/api/books" listKey="books" fields={["title","author","description","price","currency","imageUrl"]} />;
    case "events": return <ItemManager title="Event" endpoint="/api/events" listKey="events" fields={["title","description","date","time","location","imageUrl"]} />;
    case "bible_school": return <ItemManager title="Bible School Image" endpoint="/api/bible-school/images" listKey="images" fields={["title","imageUrl","description","sortOrder"]} />;
    case "orphanage": return <ItemManager title="Orphanage Image" endpoint="/api/orphanage" listKey="images" fields={["title","imageUrl","description"]} />;
    case "media": return <ItemManager title="Media" endpoint="/api/media" listKey="media" fields={["title","type","url","description"]} />;
    case "projects": return <ItemManager title="Project" endpoint="/api/projects" listKey="projects" fields={["title","description","imageUrl","progress"]} />;
    case "livestream": return <ItemManager title="Stream" endpoint="/api/livestream" listKey="streams" fields={["platform","embedUrl","channelUrl"]} />;
    case "church_members": return <ItemManager title="Member" endpoint="/api/church-members" listKey="members" fields={["fullName","email","phone","role","imageUrl"]} />;
    case "videos": return <ItemManager title="Video" endpoint="/api/uploaded-videos" listKey="videos" fields={["title","videoData","description"]} />;
    case "enrollments": return <ReadOnlyTable endpoint="/api/bible-school/enroll" listKey="enrollments" columns={["fullName","email","phone","course","status","createdAt"]} />;
    case "members": return <ReadOnlyTable endpoint="/api/members" listKey="members" columns={["fullName","email","phone","country","createdAt"]} />;
    case "subscribers": return <ReadOnlyTable endpoint="/api/subscribers" listKey="subscribers" columns={["name","email","phone","createdAt"]} />;
    case "messages": return <ReadOnlyTable endpoint="/api/messages" listKey="messages" columns={["name","email","subject","message","source","createdAt"]} />;
    case "donations": return <ReadOnlyTable endpoint="/api/donations" listKey="donations" columns={["donorName","amount","method","purpose","reference","status","createdAt"]} />;
    default: return <p>Select a tab</p>;
  }
}

/* ========= CONTENT EDITOR ========= */
function ContentEditor() {
  const [data, setData] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState("");

  useEffect(() => {
    const keys = CONTENT_FIELDS.map(f => f.key).join(",");
    fetch(`/api/content?keys=${keys}`)
      .then(r => r.ok ? r.json() : {})
      .then(d => { setData(d || {}); setLoaded(true); })
      .catch(() => setLoaded(true));
  }, []);

  async function save(key: string) {
    setSaving(key);
    try {
      await fetch("/api/content", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key, value: data[key] || "" }) });
    } catch {}
    setTimeout(() => setSaving(""), 1500);
  }

  if (!loaded) return <p style={{ color: "#888", textAlign: "center", padding: "40px" }}>Loading content...</p>;

  async function handleFileForKey(key: string, file: File) {
    const dataUrl = await fileToDataUrl(file);
    setData({ ...data, [key]: dataUrl });
  }

  return (
    <div>
      {CONTENT_FIELDS.map(f => (
        <div key={f.key} style={{ background: "white", borderRadius: "12px", padding: "16px", marginBottom: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "#555", marginBottom: "6px" }}>{f.label}</label>

          {f.type === "image" ? (
            <div>
              {data[f.key] && <img src={data[f.key]} alt="" style={{ width: "80px", height: "80px", borderRadius: "8px", objectFit: "cover", marginBottom: "8px", border: "2px solid #d4a853" }} />}
              <label style={{ display: "block", border: "2px dashed #d4a853", borderRadius: "10px", padding: "14px", textAlign: "center", cursor: "pointer", marginBottom: "6px" }}>
                <span style={{ fontSize: "20px" }}>📷</span>
                <span style={{ display: "block", fontSize: "12px", color: "#1e3a5f", fontWeight: "bold", marginTop: "2px" }}>Tap to upload from phone</span>
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => { const file = e.target.files?.[0]; if (file) handleFileForKey(f.key, file); }} />
              </label>
              <input type="text" value={data[f.key] || ""} onChange={e => setData({ ...data, [f.key]: e.target.value })} placeholder="Or paste image URL"
                style={{ width: "100%", border: "1px solid #ddd", borderRadius: "8px", padding: "6px 10px", fontSize: "12px", boxSizing: "border-box" }} />
            </div>
          ) : f.type === "textarea" ? (
            <textarea rows={3} value={data[f.key] || ""} onChange={e => setData({ ...data, [f.key]: e.target.value })}
              style={{ width: "100%", border: "1px solid #ddd", borderRadius: "8px", padding: "8px 12px", fontSize: "14px", boxSizing: "border-box" }} />
          ) : (
            <input type="text" value={data[f.key] || ""} onChange={e => setData({ ...data, [f.key]: e.target.value })}
              style={{ width: "100%", border: "1px solid #ddd", borderRadius: "8px", padding: "8px 12px", fontSize: "14px", boxSizing: "border-box" }} />
          )}

          <button type="button" onClick={() => save(f.key)}
            style={{ marginTop: "8px", background: saving === f.key ? "#22c55e" : "#1e3a5f", color: "white", border: "none", borderRadius: "8px", padding: "6px 16px", fontSize: "12px", cursor: "pointer" }}>
            {saving === f.key ? "✅ Saved!" : "Save"}
          </button>
        </div>
      ))}
    </div>
  );
}

/* ========= LOGO EDITOR ========= */
function LogoEditor() {
  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content?keys=site_logo")
      .then(r => r.ok ? r.json() : {})
      .then((d: Record<string, string>) => { if (d.site_logo) { setUrl(d.site_logo); setPreview(d.site_logo); } })
      .catch(() => {});
  }, []);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return;
    const reader = new FileReader();
    reader.onloadend = () => { const s = reader.result as string; setUrl(s); setPreview(s); };
    reader.readAsDataURL(f);
  }

  async function save() {
    await fetch("/api/content", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "site_logo", value: url }) });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div style={{ maxWidth: "400px" }}>
      <div style={{ background: "white", borderRadius: "12px", padding: "24px", textAlign: "center", marginBottom: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        {preview ? <img src={preview} alt="Logo" style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "3px solid #d4a853" }} /> : <div style={{ width: "100px", height: "100px", borderRadius: "50%", background: "#1e3a5f", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", color: "white", fontSize: "36px" }}>✝</div>}
        <p style={{ fontSize: "12px", color: "#888", marginTop: "8px" }}>Current logo</p>
      </div>
      <div style={{ background: "white", borderRadius: "12px", padding: "16px", marginBottom: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <p style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "8px" }}>📱 Upload from phone</p>
        <label style={{ display: "block", border: "2px dashed #d4a853", borderRadius: "12px", padding: "20px", textAlign: "center", cursor: "pointer" }}>
          <span style={{ fontSize: "24px" }}>📷</span>
          <p style={{ fontSize: "13px", color: "#1e3a5f", fontWeight: "bold", marginTop: "4px" }}>Tap to select image</p>
          <input type="file" accept="image/*" onChange={onFile} style={{ display: "none" }} />
        </label>
      </div>
      <div style={{ background: "white", borderRadius: "12px", padding: "16px", marginBottom: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <p style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "8px" }}>🔗 Or paste URL</p>
        <input type="text" value={url} onChange={e => { setUrl(e.target.value); setPreview(e.target.value); }} placeholder="https://..." style={{ width: "100%", border: "1px solid #ddd", borderRadius: "8px", padding: "8px 12px", fontSize: "14px", boxSizing: "border-box" }} />
      </div>
      <button type="button" onClick={save} style={{ width: "100%", padding: "12px", background: saved ? "#22c55e" : "linear-gradient(135deg, #d4a853, #e8c56e)", color: saved ? "white" : "#152a45", fontWeight: "bold", border: "none", borderRadius: "12px", fontSize: "14px", cursor: "pointer" }}>
        {saved ? "✅ Saved!" : "💾 Save Logo"}
      </button>
    </div>
  );
}

/* ========= UPLOAD INPUT ========= */
function UploadInput({ fieldName, value, onChange, accept }: { fieldName: string; value: string; onChange: (v: string) => void; accept: string }) {
  const isImg = accept.startsWith("image");
  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    onChange(dataUrl);
  }
  return (
    <div>
      {isImg && value && value.length < 500000 && <img src={value} alt="" style={{ width: "60px", height: "60px", borderRadius: "8px", objectFit: "cover", marginBottom: "6px", border: "2px solid #d4a853" }} />}
      {!isImg && value && value.startsWith("data:video") && <video src={value} controls style={{ maxHeight: "80px", borderRadius: "8px", marginBottom: "6px" }} />}
      <label style={{ display: "block", border: "2px dashed #d4a853", borderRadius: "10px", padding: "12px", textAlign: "center", cursor: "pointer", marginBottom: "6px" }}>
        <span style={{ fontSize: "18px" }}>{isImg ? "📷" : "🎬"}</span>
        <span style={{ display: "block", fontSize: "11px", color: "#1e3a5f", fontWeight: "bold", marginTop: "2px" }}>
          {isImg ? "Upload image from phone" : "Upload video from phone"}
        </span>
        <input type="file" accept={accept} style={{ display: "none" }} onChange={handleFile} />
      </label>
      <input type="text" value={(value && value.startsWith("data:")) ? "(uploaded file)" : (value || "")}
        onChange={e => onChange(e.target.value)} placeholder={isImg ? "Or paste image URL" : "Or paste video URL"}
        style={{ width: "100%", border: "1px solid #ddd", borderRadius: "8px", padding: "6px 10px", fontSize: "11px", boxSizing: "border-box", color: value && value.startsWith("data:") ? "#888" : "#333" }}
        readOnly={!!value && value.startsWith("data:")}
        onClick={() => { if (value && value.startsWith("data:")) { /* keep uploaded */ } }}
      />
      {value && value.startsWith("data:") && (
        <button type="button" onClick={() => onChange("")} style={{ marginTop: "4px", fontSize: "11px", color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}>✕ Remove {isImg ? "image" : "video"}</button>
      )}
    </div>
  );
}

/* ========= ITEM MANAGER (CRUD) ========= */
function ItemManager({ title, endpoint, listKey, fields }: { title: string; endpoint: string; listKey: string; fields: string[] }) {
  const [items, setItems] = useState<Record<string, string | number>[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch(endpoint)
      .then(r => r.ok ? r.json() : { [listKey]: [] })
      .then(d => setItems(d[listKey] || []))
      .catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function add() {
    try {
      const body: Record<string, unknown> = {};
      fields.forEach(f => { body[f] = (f === "price" || f === "progress" || f === "sortOrder") ? parseInt(form[f] || "0") : (form[f] || ""); });
      const r = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (r.ok) {
        setForm({}); setShowAdd(false); setMsg("Added!");
        const r2 = await fetch(endpoint); const d2 = await r2.json(); setItems(d2[listKey] || []);
        setTimeout(() => setMsg(""), 2000);
      }
    } catch {}
  }

  async function remove(id: number) {
    if (!confirm("Delete this item?")) return;
    try {
      await fetch(endpoint, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      setItems(prev => prev.filter(i => i.id !== id));
    } catch {}
  }

  function renderField(f: string) {
    const img = isImageField(f) && !isLinkField(f);
    const vid = isVideoField(f) && !isLinkField(f);

    if (img) {
      return <UploadInput fieldName={f} value={form[f] || ""} onChange={v => setForm({ ...form, [f]: v })} accept="image/*" />;
    }
    if (vid) {
      return <UploadInput fieldName={f} value={form[f] || ""} onChange={v => setForm({ ...form, [f]: v })} accept="video/*" />;
    }
    return (
      <input type="text" value={form[f] || ""} onChange={e => setForm({ ...form, [f]: e.target.value })}
        style={{ width: "100%", border: "1px solid #ddd", borderRadius: "8px", padding: "8px 12px", fontSize: "14px", boxSizing: "border-box" }} />
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <span style={{ fontSize: "13px", color: "#888" }}>{items.length} item(s)</span>
        <button type="button" onClick={() => setShowAdd(!showAdd)}
          style={{ background: "#d4a853", color: "#152a45", fontWeight: "bold", border: "none", borderRadius: "8px", padding: "8px 16px", fontSize: "13px", cursor: "pointer" }}>
          {showAdd ? "Cancel" : `+ Add ${title}`}
        </button>
      </div>

      {msg && <div style={{ background: "#f0fdf4", color: "#16a34a", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "bold", marginBottom: "12px" }}>{msg}</div>}

      {showAdd && (
        <div style={{ background: "white", borderRadius: "12px", padding: "20px", marginBottom: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          {fields.map(f => (
            <div key={f} style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "#555", marginBottom: "4px" }}>
                {f} {(isImageField(f) && !isLinkField(f)) ? "📷" : (isVideoField(f) ? "🎬" : "")}
              </label>
              {renderField(f)}
            </div>
          ))}
          <button type="button" onClick={add} style={{ background: "#1e3a5f", color: "white", border: "none", borderRadius: "8px", padding: "8px 20px", fontSize: "13px", cursor: "pointer" }}>Save</button>
        </div>
      )}

      {items.map(item => (
        <div key={String(item.id)} style={{ background: "white", borderRadius: "12px", padding: "14px", marginBottom: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", display: "flex", justifyContent: "space-between", gap: "12px" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {fields.map(f => {
              const val = String(item[f] ?? "");
              const isImg = isImageField(f) && !isLinkField(f);
              const isVid = isVideoField(f);
              return (
                <div key={f} style={{ fontSize: "13px", margin: "2px 0" }}>
                  <strong style={{ color: "#888" }}>{f}: </strong>
                  {isImg && val && !val.startsWith("data:") ? (
                    <img src={val} alt="" style={{ width: "40px", height: "40px", borderRadius: "6px", objectFit: "cover", verticalAlign: "middle" }} />
                  ) : isImg && val && val.startsWith("data:") ? (
                    <span style={{ color: "#16a34a", fontSize: "11px" }}>📷 Uploaded image</span>
                  ) : isVid && val ? (
                    <span style={{ color: "#2563eb", fontSize: "11px" }}>🎬 Video uploaded</span>
                  ) : (
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "inline-block", maxWidth: "200px", verticalAlign: "bottom" }}>{val}</span>
                  )}
                </div>
              );
            })}
          </div>
          <button type="button" onClick={() => remove(Number(item.id))}
            style={{ background: "#fef2f2", color: "#ef4444", border: "none", borderRadius: "8px", padding: "4px 12px", fontSize: "12px", cursor: "pointer", alignSelf: "flex-start", flexShrink: 0 }}>Delete</button>
        </div>
      ))}
    </div>
  );
}

/* ========= READ-ONLY TABLE ========= */
function ReadOnlyTable({ endpoint, listKey, columns }: { endpoint: string; listKey: string; columns: string[] }) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    fetch(endpoint)
      .then(r => r.ok ? r.json() : { [listKey]: [] })
      .then(d => setRows(d[listKey] || []))
      .catch(() => {});
  }, []);

  return (
    <div>
      <p style={{ fontSize: "13px", color: "#888", marginBottom: "12px" }}>{rows.length} record(s)</p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", background: "white", borderRadius: "12px", borderCollapse: "collapse", fontSize: "13px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              {columns.map(c => <th key={c} style={{ padding: "10px 12px", textAlign: "left", fontWeight: "bold", color: "#888", fontSize: "11px", textTransform: "uppercase" }}>{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderTop: "1px solid #f3f4f6" }}>
                {columns.map(c => (
                  <td key={c} style={{ padding: "8px 12px", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {c === "createdAt" ? new Date(String(r[c])).toLocaleDateString() : c === "amount" ? `$${(Number(r[c]) / 100).toFixed(2)}` : String(r[c] ?? "-")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length === 0 && <p style={{ color: "#aaa", textAlign: "center", padding: "32px" }}>No data yet.</p>}
    </div>
  );
}
