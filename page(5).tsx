"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string | null;
  price: number;
  currency: string;
  imageUrl: string | null;
  available: boolean | null;
}

export default function BookstorePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [cart, setCart] = useState<{ book: Book; qty: number }[]>([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetch("/api/books").then(r => r.json()).then(d => setBooks(d.books || [])).catch(() => {});
  }, []);

  function addToCart(book: Book) {
    setCart(prev => {
      const existing = prev.find(c => c.book.id === book.id);
      if (existing) return prev.map(c => c.book.id === book.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { book, qty: 1 }];
    });
    setShowCart(true);
  }

  function removeFromCart(bookId: number) {
    setCart(prev => prev.filter(c => c.book.id !== bookId));
  }

  const total = cart.reduce((s, c) => s + c.book.price * c.qty, 0);

  return (
    <div>
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-accent text-4xl mb-4 block">📚</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bookstore</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            Browse our collection of inspirational books, devotionals, and study guides.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Cart Toggle */}
          <div className="flex justify-end mb-8">
            <button onClick={() => setShowCart(!showCart)} className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-primary-light transition-colors">
              🛒 Cart ({cart.reduce((s, c) => s + c.qty, 0)})
            </button>
          </div>

          {/* Cart Panel */}
          {showCart && cart.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-6 mb-8 shadow-md">
              <h3 className="text-xl font-bold text-primary mb-4">Shopping Cart</h3>
              {cart.map((c) => (
                <div key={c.book.id} className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <p className="font-semibold">{c.book.title}</p>
                    <p className="text-sm text-gray-500">{c.book.currency} {(c.book.price / 100).toFixed(2)} x {c.qty}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-accent">{c.book.currency} {((c.book.price * c.qty) / 100).toFixed(2)}</span>
                    <button onClick={() => removeFromCart(c.book.id)} className="text-red-500 hover:text-red-700">✕</button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-300">
                <span className="text-xl font-bold">Total: {cart[0]?.book.currency || "USD"} {(total / 100).toFixed(2)}</span>
                <Link href={`/giving?purpose=bookstore&amount=${total / 100}`} className="gold-gradient text-primary-dark font-bold px-6 py-3 rounded-full hover:opacity-90">
                  Proceed to Payment
                </Link>
              </div>
            </div>
          )}

          {/* Books Grid */}
          {books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.filter(b => b.available !== false).map((book) => (
                <div key={book.id} className="bg-gray-50 rounded-xl overflow-hidden shadow-md card-hover">
                  {book.imageUrl ? (
                    <img src={book.imageUrl} alt={book.title} className="w-full h-56 object-cover" />
                  ) : (
                    <div className="w-full h-56 bg-primary flex items-center justify-center">
                      <span className="text-6xl">📖</span>
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-bold text-primary text-lg mb-1">{book.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">by {book.author}</p>
                    {book.description && <p className="text-sm text-gray-600 mb-3 line-clamp-2">{book.description}</p>}
                    <div className="flex items-center justify-between">
                      <span className="text-accent font-bold text-lg">{book.currency} {(book.price / 100).toFixed(2)}</span>
                      <button
                        onClick={() => addToCart(book)}
                        className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-light transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <span className="text-6xl block mb-4">📚</span>
              <p className="text-gray-500 text-lg">Books coming soon. Check back later!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
