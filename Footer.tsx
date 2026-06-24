import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-accent font-bold text-lg mb-4">Grace Community Church</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              A place of worship, love, and community. Join us as we grow in faith together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/livestream" className="hover:text-accent transition-colors">Live Stream</Link></li>
              <li><Link href="/events" className="hover:text-accent transition-colors">Events & Services</Link></li>
              <li><Link href="/giving" className="hover:text-accent transition-colors">Give</Link></li>
              <li><Link href="/bookstore" className="hover:text-accent transition-colors">Bookstore</Link></li>
            </ul>
          </div>

          {/* Ministries */}
          <div>
            <h4 className="font-semibold mb-4">Our Work</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/bible-school" className="hover:text-accent transition-colors">Bible School</Link></li>
              <li><Link href="/orphanage" className="hover:text-accent transition-colors">Orphanage Home</Link></li>
              <li><Link href="/church-project" className="hover:text-accent transition-colors">Building Project</Link></li>
              <li><Link href="/media" className="hover:text-accent transition-colors">Media & Gallery</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="text-sm text-gray-300 space-y-2">
              <p>📍 Church Address</p>
              <p>📞 +1 (000) 000-0000</p>
              <p>✉️ info@gracechurch.org</p>
            </div>
          </div>
        </div>

        <div className="section-divider mt-8 mb-6"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Grace Community Church. All rights reserved.</p>
          <Link href="/admin" className="mt-2 md:mt-0 hover:text-accent transition-colors">
            Admin Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}
