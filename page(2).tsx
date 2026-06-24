import { db } from "@/db";
import { livestreamSettings, siteContent } from "@/db/schema";
import { eq } from "drizzle-orm";
import { MembershipForm } from "./MembershipForm";
import { MessageForm } from "./MessageForm";
import { SubscribeForm } from "./SubscribeForm";
import { ScrollButton } from "./ScrollButton";

export const dynamic = "force-dynamic";

async function getContent(key: string, fallback: string) {
  try {
    const rows = await db.select().from(siteContent).where(eq(siteContent.key, key)).limit(1);
    return rows[0]?.value ?? fallback;
  } catch { return fallback; }
}

async function getStreams() {
  try { return await db.select().from(livestreamSettings); } catch { return []; }
}

const platformMeta: Record<string, { icon: string; color: string; headerBg: string }> = {
  youtube: { icon: "▶️", color: "border-red-100", headerBg: "bg-red-600" },
  facebook: { icon: "📘", color: "border-blue-100", headerBg: "bg-blue-600" },
  instagram: { icon: "📷", color: "border-pink-100", headerBg: "bg-gradient-to-r from-purple-500 to-pink-500" },
  tiktok: { icon: "🎵", color: "border-gray-200", headerBg: "bg-gray-900" },
  twitter: { icon: "🐦", color: "border-sky-100", headerBg: "bg-sky-500" },
};

function getMeta(key: string) {
  return platformMeta[key] || { icon: "📺", color: "border-gray-200", headerBg: "bg-primary" };
}

export default async function LivestreamPage() {
  const title = await getContent("livestream_title", "Live Stream");
  const description = await getContent("livestream_description", "Watch our services live right here. No need to leave — all streams are embedded for your convenience.");

  const youtubeEmbed = await getContent("youtube_embed", "");
  const facebookEmbed = await getContent("facebook_embed", "");
  const instagramEmbed = await getContent("instagram_embed", "");
  const tiktokEmbed = await getContent("tiktok_embed", "");
  const twitterEmbed = await getContent("twitter_embed", "");

  const streams = await getStreams();

  // Collect all embeds that have a URL
  const allEmbeds = [
    { name: "YouTube", embed: youtubeEmbed, platform: "youtube" },
    { name: "Facebook", embed: facebookEmbed, platform: "facebook" },
    { name: "Instagram", embed: instagramEmbed, platform: "instagram" },
    { name: "TikTok", embed: tiktokEmbed, platform: "tiktok" },
    { name: "Twitter / X", embed: twitterEmbed, platform: "twitter" },
  ].filter(e => e.embed);

  const primaryEmbed = allEmbeds[0];
  const secondaryEmbeds = allEmbeds.slice(1);

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
            </span>
            <span className="text-red-400 font-semibold uppercase tracking-wider text-sm">Live Now</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">{description}</p>

          {allEmbeds.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {allEmbeds.map(e => {
                const m = getMeta(e.platform);
                return (
                  <a key={e.platform} href={`#${e.platform}-stream`}
                    className={`${m.headerBg} text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2`}>
                    {m.icon} {e.name}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Primary Stream */}
      <section className="py-10 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-white text-2xl font-bold">
              {primaryEmbed ? `${primaryEmbed.name} Live Stream` : "Main Live Stream"}
            </h2>
            <p className="text-gray-400 text-sm mt-1">Watch the service live right here</p>
          </div>
          {primaryEmbed ? (
            <div id={`${primaryEmbed.platform}-stream`} className="aspect-video rounded-2xl overflow-hidden shadow-2xl ring-2 ring-accent/30">
              <iframe
                src={primaryEmbed.embed}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />
            </div>
          ) : (
            <div className="aspect-video rounded-2xl bg-gray-800 flex items-center justify-center">
              <div className="text-center text-gray-400 max-w-md">
                <span className="text-7xl block mb-4">📺</span>
                <p className="text-2xl font-semibold">Stream Coming Soon</p>
                <p className="mt-2 text-gray-500">The live stream will appear here when active.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Secondary Streams */}
      {secondaryEmbeds.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-primary text-center mb-8">More Live Streams</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {secondaryEmbeds.map(e => {
                const m = getMeta(e.platform);
                return (
                  <div key={e.platform} id={`${e.platform}-stream`} className={`bg-white rounded-2xl overflow-hidden shadow-lg border ${m.color}`}>
                    <div className={`${m.headerBg} text-white px-6 py-3 flex items-center justify-between`}>
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{m.icon}</span>
                        <h3 className="font-bold">{e.name} Live</h3>
                      </div>
                      <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> LIVE
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="aspect-video rounded-xl overflow-hidden">
                        <iframe src={e.embed} className="w-full h-full" allowFullScreen
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Additional custom streams */}
      {streams.filter(s => s.embedUrl).length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-primary text-center mb-8">Additional Streams</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {streams.filter(s => s.embedUrl).map(s => {
                const m = getMeta(s.platform.toLowerCase());
                return (
                  <div key={s.id} className={`bg-white rounded-2xl overflow-hidden shadow-lg border ${m.color}`}>
                    <div className={`${m.headerBg} text-white px-6 py-3 flex items-center justify-between`}>
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{m.icon}</span>
                        <h3 className="font-bold capitalize">{s.platform}</h3>
                      </div>
                      {s.isLive && (
                        <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> LIVE
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="aspect-video rounded-xl overflow-hidden">
                        <iframe src={s.embedUrl!} className="w-full h-full" allowFullScreen
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Join Us Live */}
      <section className="py-16 gold-gradient text-primary-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-5xl block mb-4">🔴</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Us Live</h2>
          <p className="text-lg mb-6 opacity-80 max-w-2xl mx-auto">
            Watch our services live right here on this page. No need to go anywhere else — all streams are brought to you in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <ScrollButton />
          </div>
        </div>
      </section>

      {/* Subscribe for Notifications */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-4xl block mb-3">🔔</span>
          <h2 className="text-3xl font-bold text-primary mb-3">Subscribe for Notifications</h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Never miss a live stream! Subscribe to get notified when we go live and for upcoming events.
          </p>
          <SubscribeForm />
        </div>
      </section>

      {/* Become an Online Member */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-4xl block mb-3">🤝</span>
            <h2 className="text-3xl font-bold mb-3">Become an Online Member</h2>
            <p className="text-gray-200 max-w-xl mx-auto">
              Join our global online community! As an online member you&apos;ll receive weekly updates, prayer support, and access to exclusive content.
            </p>
          </div>
          <MembershipForm />
        </div>
      </section>

      {/* Send Us a Message */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-4xl block mb-3">✉️</span>
            <h2 className="text-3xl font-bold text-primary mb-3">Send Us a Message</h2>
            <p className="text-gray-500">
              Have a question, testimony, or prayer request? We&apos;d love to hear from you.
            </p>
          </div>
          <MessageForm source="livestream" />
        </div>
      </section>
    </div>
  );
}
