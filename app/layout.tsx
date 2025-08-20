import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Symposia",
  description: "Digital Audio/Visual Magazine Platform Prototype"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <header className="border-b">
          <div className="container py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold no-underline">The Symposia</Link>
            <nav aria-label="Primary">
              <ul className="flex gap-4">
                <li><Link className="hover:underline" href="/">Topics</Link></li>
                <li><Link className="hover:underline" href="/about">About</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <main id="main" className="container py-6">{children}</main>
        <footer className="border-t">
          <div className="container py-6 text-sm text-gray-600">
            © {new Date().getFullYear()} The Symposia — Prototype
          </div>
        </footer>
      </body>
    </html>
  );
}
