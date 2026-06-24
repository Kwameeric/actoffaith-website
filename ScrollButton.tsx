"use client";

export function ScrollButton() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-primary-light transition-colors"
    >
      ⬆️ Scroll to Stream
    </button>
  );
}
