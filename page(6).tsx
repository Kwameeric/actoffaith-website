import Link from "next/link";
import { db } from "@/db";
import { siteContent, projectUpdates } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

async function getContent(key: string, fallback: string) {
  try {
    const rows = await db.select().from(siteContent).where(eq(siteContent.key, key)).limit(1);
    return rows[0]?.value ?? fallback;
  } catch { return fallback; }
}

export default async function ChurchProjectPage() {
  const title = await getContent("project_title", "New Sanctuary Building Project");
  const desc2 = await getContent("project_description", "Help us build a new sanctuary to accommodate our growing congregation. Your generous contributions will help make this vision a reality. Together we can create a space that glorifies God and serves our community for generations to come.");
  const progress = await getContent("project_progress", "35");
  const goal = await getContent("project_goal", "$500,000");

  const truckTitle = await getContent("truck_title", "Buy a Church Truck for Crusade");
  const truckDesc = await getContent("truck_description", "We need a dedicated truck to carry our equipment, sound systems, chairs, and materials for open-air crusades and outreach programs. Help us reach more communities with the Gospel by contributing to this essential vehicle fund.");
  const truckGoal = await getContent("truck_goal", "$75,000");
  const truckProgress = await getContent("truck_progress", "15");
  const truckImage = await getContent("truck_image", "");

  let updates: (typeof projectUpdates.$inferSelect)[] = [];
  try { updates = await db.select().from(projectUpdates).orderBy(desc(projectUpdates.createdAt)); } catch {}

  return (
    <div>
      {/* Hero — Building Project */}
      <section className="relative py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Title on top */}
          <div className="text-center mb-12">
            <span className="text-accent text-lg font-semibold uppercase tracking-widest block mb-3">Building God&apos;s Kingdom</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <div className="h-1 w-24 bg-accent mx-auto mb-6"></div>
            <p className="text-gray-200 text-lg leading-relaxed max-w-3xl mx-auto">{desc2}</p>
          </div>

          {/* Progress bar + image below */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">Progress</span>
                  <span>{progress}% of {goal}</span>
                </div>
                <div className="w-full bg-primary-light rounded-full h-5">
                  <div className="gold-gradient h-5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
              <Link href="/giving?purpose=building" className="inline-block gold-gradient text-primary-dark font-bold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity">
                💛 Contribute to This Project
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src="/images/church-project.jpg" alt="Church Project" className="w-full h-96 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Crusade Truck Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-4xl block mb-3">🚛</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">{truckTitle}</h2>
            <div className="section-divider max-w-xs mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">{truckDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Truck Image */}
            <div className="rounded-2xl overflow-hidden shadow-xl bg-gray-100">
              {truckImage ? (
                <img src={truckImage} alt="Crusade Truck" className="w-full h-80 object-cover" />
              ) : (
                <div className="w-full h-80 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="text-center">
                    <span className="text-7xl block mb-3">🚛</span>
                    <p className="text-gray-400 font-semibold">Church Crusade Truck</p>
                  </div>
                </div>
              )}
            </div>

            {/* Truck Details */}
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">Why We Need a Crusade Truck</h3>
              <div className="space-y-3 mb-6">
                {[
                  { icon: "🔊", text: "Transport sound systems & equipment for open-air crusades" },
                  { icon: "⛪", text: "Carry chairs, tents, and materials for outreach events" },
                  { icon: "🌍", text: "Reach remote communities with the Gospel" },
                  { icon: "📦", text: "Deliver supplies to orphanages and mission fields" },
                  { icon: "🤝", text: "Support community service and disaster relief efforts" },
                ].map(item => (
                  <div key={item.text} className="flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                    <p className="text-gray-600">{item.text}</p>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-primary">Truck Fund Progress</span>
                  <span className="text-accent font-bold">{truckProgress}% of {truckGoal}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="gold-gradient h-4 rounded-full" style={{ width: `${truckProgress}%` }}></div>
                </div>
              </div>

              <Link href="/giving?purpose=truck" className="inline-block gold-gradient text-primary-dark font-bold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg">
                🚛 Contribute to Truck Fund
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Updates */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Project Updates</h2>
          {updates.length > 0 ? (
            <div className="space-y-8">
              {updates.map((u) => (
                <div key={u.id} className="bg-white rounded-xl overflow-hidden shadow-md md:flex">
                  {u.imageUrl && (
                    <img src={u.imageUrl} alt={u.title} className="w-full md:w-72 h-48 object-cover" />
                  )}
                  <div className="p-6 flex-1">
                    <h3 className="text-xl font-bold text-primary mb-2">{u.title}</h3>
                    {u.description && <p className="text-gray-600">{u.description}</p>}
                    {u.progress !== null && (
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="gold-gradient h-3 rounded-full" style={{ width: `${u.progress}%` }}></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{u.progress}% complete</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Project updates will be posted here. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gold-gradient text-primary-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Every Contribution Matters</h2>
          <p className="text-lg mb-8 opacity-80">Whether it&apos;s for the new sanctuary or the crusade truck, your giving builds God&apos;s Kingdom.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/giving?purpose=building" className="bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-primary-light transition-colors">
              🏗️ Building Fund
            </Link>
            <Link href="/giving?purpose=truck" className="border-2 border-primary text-primary font-bold px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all">
              🚛 Truck Fund
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
