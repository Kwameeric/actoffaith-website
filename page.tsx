import Link from "next/link";
import { db } from "@/db";
import { galleryImages, books, orphanageImages, siteContent, projectUpdates, bibleSchoolImages } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

async function getContent(key: string, fallback: string) {
  try {
    const rows = await db.select().from(siteContent).where(eq(siteContent.key, key)).limit(1);
    return rows[0]?.value ?? fallback;
  } catch {
    return fallback;
  }
}

async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try { return await fn(); } catch { return fallback; }
}

export default async function HomePage() {
  const heroTitle = await getContent("hero_title", "Welcome to Grace Community Church");
  const heroSubtitle = await getContent("hero_subtitle", "A place of worship, love, and community. Join us as we grow in faith together.");
  const heroImage = await getContent("hero_image", "/images/hero-church.jpg");
  const founderName = await getContent("founder_name", "Pastor John Doe");
  const founderBio = await getContent("founder_bio", "Our founder and senior pastor has dedicated over 25 years to ministry, building communities of faith across the globe. His vision for Grace Community Church is to create a welcoming space where everyone can experience God's love and grow in their spiritual journey.");
  const founderImage = await getContent("founder_image", "/images/founder.jpg");
  const projectTitle = await getContent("project_title", "Church Building Project");
  const projectDesc = await getContent("project_description", "Help us build a new sanctuary to accommodate our growing congregation. Your generous contributions will help make this vision a reality.");
  const projectProgress = await getContent("project_progress", "35");
  const projectGoal = await getContent("project_goal", "$500,000");
  const projectImage = await getContent("project_image", "/images/church-project.jpg");
  const orphanageImage = await getContent("orphanage_image", "/images/orphanage.jpg");

  const bsTitle = await getContent("bible_school_title", "Grace Bible School");
  const bsDesc = await getContent("bible_school_description", "Deepen your understanding of God's Word. Enroll in our Bible School and grow in faith, knowledge, and ministry.");
  const bsImage = await getContent("bible_school_image", "/images/bible-school.jpg");

  // Gallery images from DB or from admin content
  const galleryImg1 = await getContent("gallery_image_1", "/images/gallery1.jpg");
  const galleryImg2 = await getContent("gallery_image_2", "/images/gallery2.jpg");
  const galleryImg3 = await getContent("gallery_image_3", "/images/gallery3.jpg");
  const galleryImg4 = await getContent("gallery_image_4", "/images/gallery4.jpg");
  const defaultGallery = [
    { src: galleryImg1, title: "Worship Service" },
    { src: galleryImg2, title: "Church Choir" },
    { src: galleryImg3, title: "Community Outreach" },
    { src: galleryImg4, title: "Baptism Service" },
  ];

  // Book images/details from admin
  const bookDefaults = [];
  for (let i = 1; i <= 4; i++) {
    const img = await getContent(`book_image_${i}`, i === 1 ? "/images/book1.jpg" : `https://images.pexels.com/photos/${i === 2 ? "4567489" : i === 3 ? "15542994" : "32233843"}/pexels-photo-${i === 2 ? "4567489" : i === 3 ? "15542994" : "32233843"}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=400`);
    const title = await getContent(`book_title_${i}`, ["Walking in Faith","Power of Prayer","Kingdom Living","The Grace Message"][i-1]);
    const author = await getContent(`book_author_${i}`, "Pastor Grace");
    const price = await getContent(`book_price_${i}`, ["$12.99","$14.99","$11.99","$9.99"][i-1]);
    bookDefaults.push({ img, title, author, price });
  }

  const gallery = await safeQuery(() => db.select().from(galleryImages).orderBy(galleryImages.sortOrder).limit(8), []);
  const booksList = await safeQuery(() => db.select().from(books).limit(4), []);
  const orphanage = await safeQuery(() => db.select().from(orphanageImages).orderBy(desc(orphanageImages.createdAt)).limit(4), []);
  const project = await safeQuery(() => db.select().from(projectUpdates).orderBy(desc(projectUpdates.createdAt)).limit(1), []);
  const truckTitle = await getContent("truck_title", "Outreach & Evangelism Truck");
  const truckDesc = await getContent("truck_description", "Help us acquire a dedicated truck for open-air crusades, outreach programs, and evangelism across communities.");
  const truckProgress = await getContent("truck_progress", "15");
  const truckGoal = await getContent("truck_goal", "$75,000");
  const truckImage = await getContent("truck_image", "");

  const bsImages = await safeQuery(() => db.select().from(bibleSchoolImages).orderBy(bibleSchoolImages.sortOrder).limit(4), []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in-up">
          <span className="text-accent text-5xl mb-4 block">✝</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{heroTitle}</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">{heroSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/livestream"
              className="gold-gradient text-primary-dark font-bold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              🔴 Watch Live Stream
            </Link>
            <Link
              href="/giving"
              className="border-2 border-accent text-accent font-bold px-8 py-4 rounded-full text-lg hover:bg-accent hover:text-primary-dark transition-all"
            >
              ❤️ Give Now
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Welcome Home</h2>
          <div className="section-divider max-w-xs mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Whether you are a long-time member or visiting for the first time, we are glad you are here.
            Grace Community Church is a family united by faith, serving our community with love and compassion.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { icon: "🙏", title: "Worship", desc: "Experience powerful worship services every Sunday" },
              { icon: "📖", title: "Bible Study", desc: "Grow deeper in God's word through our study groups" },
              { icon: "🤝", title: "Community", desc: "Connect with others and build lasting relationships" },
            ].map((item) => (
              <div key={item.title} className="p-8 rounded-xl bg-gray-50 card-hover">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">Our Founder</h2>
          <div className="section-divider max-w-xs mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-xl">
                <img src={founderImage} alt={founderName} className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary mb-2">{founderName}</h3>
              <p className="text-accent font-semibold mb-4">Founder & Senior Pastor</p>
              <p className="text-gray-600 leading-relaxed text-lg">{founderBio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">Gallery</h2>
          <div className="section-divider max-w-xs mx-auto mb-12"></div>
          {gallery.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.map((img) => (
                <div key={img.id} className="aspect-square rounded-xl overflow-hidden card-hover shadow-md">
                  <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {defaultGallery.map((img) => (
                <div key={img.title} className="group relative aspect-square rounded-xl overflow-hidden card-hover shadow-md">
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white font-semibold">{img.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Link href="/media" className="text-primary font-semibold hover:text-accent transition-colors text-lg">
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* Church Building Project — Building God's Kingdom */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          {/* Title first — above everything */}
          <div className="text-center mb-12">
            <span className="text-accent text-lg font-semibold uppercase tracking-widest block mb-3">Building God&apos;s Kingdom</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{projectTitle}</h2>
            <div className="h-1 w-24 bg-accent mx-auto mb-6"></div>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed">{projectDesc}</p>
          </div>

          {/* Progress + Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">Progress</span>
                  <span>{projectProgress}% of {projectGoal}</span>
                </div>
                <div className="w-full bg-primary-light rounded-full h-4">
                  <div className="gold-gradient h-4 rounded-full transition-all duration-1000" style={{ width: `${projectProgress}%` }}></div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/giving?purpose=building" className="inline-block gold-gradient text-primary-dark font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-center">
                  💛 Contribute Now
                </Link>
                <Link href="/church-project" className="inline-block border-2 border-accent text-accent font-bold px-8 py-3 rounded-full hover:bg-accent hover:text-primary-dark transition-all text-center">
                  View Full Project
                </Link>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src={project[0]?.imageUrl || projectImage} alt="Church Building Project" className="w-full h-80 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Orphanage Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">Orphanage Home</h2>
          <div className="section-divider max-w-xs mx-auto mb-4"></div>
          <p className="text-gray-600 text-center text-lg max-w-2xl mx-auto mb-12">
            Our orphanage provides love, care, and education to children in need. Your support changes lives.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {orphanage.length > 0 ? (
              orphanage.map((img) => (
                <div key={img.id} className="aspect-square rounded-xl overflow-hidden card-hover shadow-md">
                  <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <div className="rounded-xl overflow-hidden shadow-md max-w-lg mx-auto">
                  <img src={orphanageImage} alt="Orphanage" className="w-full h-64 object-cover" />
                </div>
              </div>
            )}
          </div>
          <div className="text-center space-x-4">
            <Link
              href="/orphanage"
              className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-primary-light transition-colors"
            >
              Learn More
            </Link>
            <Link
              href="/giving?purpose=orphanage"
              className="inline-block gold-gradient text-primary-dark font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Support the Children
            </Link>
          </div>
        </div>
      </section>

      {/* Bible School Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">{bsTitle}</h2>
          <div className="section-divider max-w-xs mx-auto mb-4"></div>
          <p className="text-gray-600 text-center text-lg max-w-2xl mx-auto mb-12">{bsDesc}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-10">
            <div className="grid grid-cols-2 gap-3">
              {bsImages.length > 0 ? (
                bsImages.slice(0, 4).map((img) => (
                  <div key={img.id} className="aspect-square rounded-xl overflow-hidden shadow-md card-hover">
                    <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
                  </div>
                ))
              ) : (
                <>
                  {[1,2,3,4].map(i => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden shadow-md">
                      <img src={bsImage} alt="Bible School" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </>
              )}
            </div>
            <div>
              <div className="space-y-4">
                {[
                  { icon: "📖", title: "In-Depth Biblical Studies", desc: "Study the Scriptures with qualified teachers" },
                  { icon: "🎓", title: "Certificate Programs", desc: "Earn certificates in theology and ministry" },
                  { icon: "🌍", title: "Mission Focused", desc: "Be equipped for evangelism and church planting" },
                  { icon: "👥", title: "Community Learning", desc: "Learn alongside fellow believers" },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-4">
                    <span className="text-2xl mt-1 shrink-0">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-primary">{item.title}</h4>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/bible-school" className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-primary-light transition-colors text-center">
                  Learn More
                </Link>
                <Link href="/bible-school#enroll" className="inline-block gold-gradient text-primary-dark font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-center">
                  📝 Enroll Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bookstore Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">Bookstore</h2>
          <div className="section-divider max-w-xs mx-auto mb-12"></div>
          {booksList.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {booksList.map((book) => (
                <Link key={book.id} href="/bookstore" className="bg-white rounded-xl overflow-hidden card-hover shadow-md block">
                  {book.imageUrl && (
                    <img src={book.imageUrl} alt={book.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-primary mb-1">{book.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">by {book.author}</p>
                    <p className="text-accent font-bold">{book.currency} {(book.price / 100).toFixed(2)}</p>
                    <span className="mt-2 inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">Add to Cart →</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {bookDefaults.map((book) => (
                <Link key={book.title} href="/bookstore" className="bg-white rounded-xl overflow-hidden card-hover shadow-md block">
                  <img src={book.img} alt={book.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-primary mb-1">{book.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">by {book.author}</p>
                    <p className="text-accent font-bold">{book.price}</p>
                    <span className="mt-2 inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">Add to Cart →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Link
              href="/bookstore"
              className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-primary-light transition-colors"
            >
              Visit Bookstore
            </Link>
          </div>
        </div>
      </section>

      {/* Outreach & Evangelism Truck */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-5xl block mb-3">🚛</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{truckTitle}</h2>
            <div className="h-1 w-24 bg-accent mx-auto mb-6"></div>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto">{truckDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-primary-light">
              {truckImage ? (
                <img src={truckImage} alt="Outreach Truck" className="w-full h-80 object-cover" />
              ) : (
                <div className="w-full h-80 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-8xl block mb-3">🚛</span>
                    <p className="text-gray-300 font-semibold">Outreach & Evangelism Truck</p>
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className="space-y-3 mb-6">
                {[
                  { icon: "🔊", text: "Transport sound systems & equipment for crusades" },
                  { icon: "⛪", text: "Carry materials for open-air outreach events" },
                  { icon: "🌍", text: "Reach remote communities with the Gospel" },
                  { icon: "📦", text: "Deliver supplies to orphanages & missions" },
                ].map(item => (
                  <div key={item.text} className="flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                    <p className="text-gray-200">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">Truck Fund Progress</span>
                  <span>{truckProgress}% of {truckGoal}</span>
                </div>
                <div className="w-full bg-primary-light rounded-full h-4">
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

      {/* Call to Action */}
      <section className="py-16 gold-gradient text-primary-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Us This Sunday</h2>
          <p className="text-lg mb-8 opacity-80">Experience the power of worship and fellowship. Everyone is welcome!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/livestream"
              className="bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-primary-light transition-colors"
            >
              🔴 Watch Live
            </Link>
            <Link
              href="/events"
              className="border-2 border-primary text-primary font-bold px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all"
            >
              View Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
