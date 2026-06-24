"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface BSImage { id: number; title: string; imageUrl: string; description: string | null }

export default function BibleSchoolPage() {
  const [images, setImages] = useState<BSImage[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", age: "", address: "",
    course: "", experience: "", message: ""
  });

  useEffect(() => {
    fetch("/api/bible-school/images").then(r => r.json()).then(d => setImages(d.images || [])).catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/bible-school/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
      else alert("Something went wrong. Please try again.");
    } catch { alert("Network error. Please try again."); }
  }

  const courses = [
    "Foundations of Faith",
    "Old Testament Studies",
    "New Testament Studies",
    "Christian Leadership",
    "Pastoral Ministry",
    "Worship & Arts Ministry",
    "Youth & Children Ministry",
    "Missions & Evangelism",
    "Marriage & Family",
    "Prayer & Intercession",
    "Other",
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/bible-school.jpg')" }} />
        <div className="hero-gradient absolute inset-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <span className="text-accent text-4xl mb-4 block">📖</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Grace Bible School</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            Deepen your understanding of God&apos;s Word. Enroll in our Bible School and grow in faith, knowledge, and ministry.
          </p>
          <a href="#enroll" className="inline-block mt-8 gold-gradient text-primary-dark font-bold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg">
            📝 Enroll Now
          </a>
        </div>
      </section>

      {/* Why Bible School */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">Why Bible School?</h2>
          <div className="section-divider max-w-xs mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "📖", title: "Deep Biblical Knowledge", desc: "Study the Scriptures in depth with qualified teachers and a structured curriculum." },
              { icon: "🎓", title: "Certificate Programs", desc: "Earn certificates in theology, pastoral ministry, leadership, and more." },
              { icon: "🙏", title: "Spiritual Growth", desc: "Grow closer to God through prayer, mentorship, and community discipleship." },
              { icon: "👥", title: "Community & Fellowship", desc: "Learn alongside fellow believers and build lifelong ministry connections." },
              { icon: "🌍", title: "Mission Ready", desc: "Be equipped for missions, evangelism, and church planting worldwide." },
              { icon: "💼", title: "Ministry Skills", desc: "Develop practical skills for worship, counseling, youth ministry, and leadership." },
            ].map(item => (
              <div key={item.title} className="bg-gray-50 p-8 rounded-xl card-hover text-center">
                <span className="text-4xl block mb-4">{item.icon}</span>
                <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Available Courses</h2>
          <div className="h-1 w-20 bg-accent mx-auto mb-10"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {courses.filter(c => c !== "Other").map(course => (
              <div key={course} className="bg-primary-light rounded-xl p-5 flex items-center gap-3 card-hover">
                <span className="text-accent text-xl">✦</span>
                <span className="font-semibold">{course}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-4">Bible School Gallery</h2>
          <div className="section-divider max-w-xs mx-auto mb-12"></div>
          {images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map(img => (
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
                <img src="/images/bible-school.jpg" alt="Bible School" className="w-full h-64 object-cover" />
              </div>
              <p className="text-gray-500 mt-4">More photos coming soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Enrollment Form */}
      <section id="enroll" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          {submitted ? (
            <div className="text-center py-16">
              <span className="text-6xl block mb-4">🎉</span>
              <h2 className="text-3xl font-bold text-primary mb-4">Enrollment Submitted!</h2>
              <p className="text-gray-600 text-lg mb-6">
                Thank you for enrolling in Grace Bible School. We will contact you shortly with more details.
              </p>
              <Link href="/" className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-primary-light transition-colors">
                Back to Home
              </Link>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <span className="text-4xl block mb-2">📝</span>
                <h2 className="text-3xl font-bold text-primary">Enroll Now</h2>
                <p className="text-gray-500 mt-2">Fill out the form below to register for Bible School</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input type="text" required value={form.fullName}
                    onChange={e => setForm({ ...form, fullName: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                    <input type="email" required value={form.email}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Age</label>
                    <input type="text" value={form.age}
                      onChange={e => setForm({ ...form, age: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Previous Bible Study Experience</label>
                    <select value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none">
                      <option value="">Select...</option>
                      <option value="none">No previous experience</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                  <input type="text" value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Course</label>
                  <select value={form.course} onChange={e => setForm({ ...form, course: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none">
                    <option value="">Select a course...</option>
                    {courses.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Additional Message</label>
                  <textarea rows={3} value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about yourself or any questions you have..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none" />
                </div>
                <button type="submit" className="w-full gold-gradient text-primary-dark font-bold py-4 rounded-full text-lg hover:opacity-90 transition-opacity">
                  Submit Enrollment
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
