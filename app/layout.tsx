'use client';

import DynamicCursor from "@/components/ui/DynamicCursor";
import Link from "next/link";
import { AuthProvider, useAuth } from "../lib/AuthContext";
import "./globals.css";
import LoginPage from "./login/page";

function AppContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth();

  // If user isn't logged in → show login page
  if (!isAuthenticated) {
    return (
      <>
        <DynamicCursor />
        <LoginPage />
      </>
    );
  }

  return (
    <>
      {/* ✅ Custom cursor */}
      <DynamicCursor />

      {/* Accessibility skip link */}
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {/* Header */}
      <header className="border-b border-gray-800 bg-black/60 backdrop-blur-md sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-semibold no-underline text-white hover:text-cyan-400 transition"
          >
            The Symposia
          </Link>

          <nav aria-label="Primary">
            <ul className="flex gap-4 items-center">
              <li>
                <Link
                  className="hover:text-cyan-400 transition"
                  href="/"
                >
                  Topics
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-cyan-400 transition"
                  href="/about"
                >
                  About
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="px-3 py-1 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main id="main" className="container py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black/70 backdrop-blur-md mt-10">
        <div className="container py-6 text-sm text-gray-500 text-center">
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
