import Link from "next/link";
import { db } from "@/db";
import { orphanageImages, siteContent } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

async function getContent(key: string, fallback: string) {
  try {
    const rows = await db.select().from(siteContent).where(eq(siteContent.key, key)).limit(1);
    return rows[0]?.value ?? fallback;
  } catch { return fallback; }
}

export default async function OrphanagePage() {
  const title = await getContent("orphanage_title", "Grace Orphanage Home");
  const description = await getContent("orphanage_description", "Our orphanage provides a loving home, quality education, nutritious meals, and spiritual guidance to children who have lost their parents. Every child deserves love, care, and an opportunity to thrive. Your support makes a direct impact on these precious lives.");
  const momoNumber = await getContent("momo_number", "");
  const bankDetails = await getContent("bank_details", "");

  let images: (typeof orphanageImages.$inferSelect)[] = [];
  try { images = await db.select().from(orphanageImages).orderBy(desc(orphanageImages.createdAt)); } catch {}

  return (
    <div>
      <section className="relative py-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/orphanage.jpg')" }} />
        <div className="hero-gradient absolute inset-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <span className="text-accent text-4xl mb-4 block">🏠</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">{description}</p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "50+", label: "Children Housed" },
              { num: "100%", label: "Fed Daily" },
              { num: "3", label: "Schools Supported" },
              { num: "24/7", label: "Care Provided" },
            ].map((s) => (
              <div key={s.label} className="p-6">
                <p className="text-3xl md:text-4xl font-bold text-accent">{s.num}</p>
                <p className="text-gray-600 mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Our Children</h2>
          {images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img) => (
                <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden shadow-md card-hover">
                  <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div>
                      <p className="text-white font-semibold">{img.title}</p>
                      {img.description && <p className="text-gray-300 text-sm">{img.description}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-lg mx-auto rounded-xl overflow-hidden shadow-md">
                <img src="/images/orphanage.jpg" alt="Orphanage" className="w-full h-64 object-cover" />
              </div>
              <p className="text-gray-500 mt-4">More photos coming soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Donate */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Support the Children</h2>
          <p className="text-gray-200 mb-8 text-lg">Every contribution makes a difference. Help us provide love and care to orphans in need.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/giving?purpose=orphanage" className="gold-gradient text-primary-dark font-bold px-8 py-4 rounded-full text-lg hover:opacity-90">
              💛 Donate Now
            </Link>
          </div>
          {momoNumber && (
            <div className="mt-8 bg-primary-light rounded-xl p-6 max-w-md mx-auto">
              <p className="font-semibold mb-2">📱 MoMo Number</p>
              <p className="text-accent text-xl font-bold">{momoNumber}</p>
            </div>
          )}
          {bankDetails && (
            <div className="mt-4 bg-primary-light rounded-xl p-6 max-w-md mx-auto text-left">
              <p className="font-semibold mb-2 text-center">🏦 Bank Details</p>
              <p className="text-gray-200 whitespace-pre-line">{bankDetails}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
