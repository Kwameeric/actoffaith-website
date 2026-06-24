import { db } from "@/db";
import { events } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  let eventsList: (typeof events.$inferSelect)[] = [];
  try { eventsList = await db.select().from(events).orderBy(desc(events.createdAt)); } catch {}

  return (
    <div>
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-accent text-4xl mb-4 block">📅</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events & Services</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            Stay updated with our upcoming events, special services, and community gatherings.
          </p>
        </div>
      </section>

      {/* Regular Services */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Weekly Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { day: "Sunday", name: "Morning Worship", time: "9:00 AM - 12:00 PM", icon: "⛪" },
              { day: "Wednesday", name: "Bible Study", time: "7:00 PM - 9:00 PM", icon: "📖" },
              { day: "Friday", name: "Prayer & Praise Night", time: "7:00 PM - 9:30 PM", icon: "🙏" },
            ].map((s) => (
              <div key={s.day} className="bg-gray-50 p-8 rounded-xl text-center card-hover shadow-md">
                <span className="text-4xl block mb-3">{s.icon}</span>
                <h3 className="text-accent font-bold text-xl mb-1">{s.day}</h3>
                <p className="text-primary font-bold text-lg">{s.name}</p>
                <p className="text-gray-500 mt-2">{s.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Upcoming Events</h2>
          {eventsList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventsList.map((evt) => (
                <div key={evt.id} className="bg-white rounded-xl overflow-hidden shadow-md card-hover">
                  {evt.imageUrl && (
                    <img src={evt.imageUrl} alt={evt.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-accent font-semibold text-sm mb-2">
                      <span>📅</span> {evt.date} {evt.time && `• ${evt.time}`}
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">{evt.title}</h3>
                    {evt.description && (
                      <p className="text-gray-600 text-sm mb-3">{evt.description}</p>
                    )}
                    {evt.location && (
                      <p className="text-gray-500 text-sm">📍 {evt.location}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <span className="text-6xl block mb-4">📅</span>
              <p className="text-gray-500 text-lg">Upcoming events will be posted here. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
