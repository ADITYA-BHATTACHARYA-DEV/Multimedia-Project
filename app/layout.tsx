'use client';

import Link from "next/link";
import { AuthProvider, useAuth } from "../lib/AuthContext";
import "./globals.css";
import LoginPage from "./login/page"; // Import the login page

function AppContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="border-b">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold no-underline">The Symposia</Link>
          <nav aria-label="Primary">
            <ul className="flex gap-4 items-center">
              <li><Link className="hover:underline" href="/">Topics</Link></li>
              <li><Link className="hover:underline" href="/about">About</Link></li>
              <li>
                <button
                  onClick={logout}
                  className="px-3 py-1 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Logout
                </button>
              </li>
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
    </>
  );
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AppContent>{children}</AppContent>
        </AuthProvider>
      </body>
    </html>
  );
}

