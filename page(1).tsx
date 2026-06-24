import { db } from "@/db";
import { galleryImages, mediaItems, churchMembers, uploadedVideos } from "@/db/schema";
import { desc } from "drizzle-orm";
import { VideoUploader } from "./VideoUploader";
import { MembersDirectory } from "./MembersDirectory";

export const dynamic = "force-dynamic";

async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try { return await fn(); } catch { return fallback; }
}

export default async function MediaPage() {
  const images = await safeQuery(() => db.select().from(galleryImages).orderBy(galleryImages.sortOrder), []);
  const media = await safeQuery(() => db.select().from(mediaItems).orderBy(desc(mediaItems.createdAt)), []);
  const members = await safeQuery(() => db.select().from(churchMembers), []);
  const videos = await safeQuery(() => db.select().from(uploadedVideos).orderBy(desc(uploadedVideos.createdAt)), []);

  const embeddedVideos = media.filter(m => m.type === "video");
  const photos = media.filter(m => m.type === "image");

  return (
    <div>
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-accent text-4xl mb-4 block">📷</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Media & Gallery</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            Explore photos, videos, and meet our church family.
          </p>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Photo Gallery</h2>
          {images.length > 0 || photos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img) => (
                <div key={`g-${img.id}`} className="group relative aspect-square rounded-xl overflow-hidden shadow-md card-hover">
                  <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white font-semibold">{img.title}</p>
                  </div>
                </div>
              ))}
              {photos.map((p) => (
                <div key={`m-${p.id}`} className="group relative aspect-square rounded-xl overflow-hidden shadow-md card-hover">
                  <img src={p.url} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white font-semibold">{p.title}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <span className="text-6xl block mb-4">📸</span>
              <p className="text-gray-500 text-lg">Photos coming soon. Check back later!</p>
            </div>
          )}
        </div>
      </section>

      {/* Embedded Videos */}
      {embeddedVideos.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {embeddedVideos.map((v) => (
                <div key={v.id} className="bg-white rounded-xl overflow-hidden shadow-md card-hover">
                  <div className="aspect-video">
                    <iframe src={v.url} className="w-full h-full" allowFullScreen />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-primary">{v.title}</h3>
                    {v.description && <p className="text-sm text-gray-500 mt-1">{v.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Uploaded Videos from Phone */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-2 text-center">Church Videos</h2>
          <p className="text-gray-500 text-center mb-8">Upload and watch church videos directly</p>
          <VideoUploader existingVideos={videos.map(v => ({ id: v.id, title: v.title, videoData: v.videoData, description: v.description }))} />
        </div>
      </section>

      {/* Church Members Directory */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-2 text-center">Church Members</h2>
          <p className="text-gray-500 text-center mb-8">Our church family</p>
          <MembersDirectory members={members.map(m => ({
            id: m.id, fullName: m.fullName, email: m.email, phone: m.phone, role: m.role, imageUrl: m.imageUrl
          }))} />
        </div>
      </section>
    </div>
  );
}
