// app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eva – Herbalife Platform",
  description: "Piattaforma Eva per clienti e distributori Herbalife",
};

const tabs = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/piano", label: "Piano" },
  { href: "/moduli", label: "Moduli" },
  { href: "/chat", label: "Chat" },
  { href: "/profilo", label: "Profilo" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-slate-50">
        <div className="min-h-screen flex flex-col max-w-md mx-auto border-x bg-white">
          <div className="flex-1 overflow-y-auto">{children}</div>

          {/* Bottom bar mobile-style */}
          <nav className="h-14 border-t flex items-center justify-between px-2 bg-white">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex-1 text-xs text-center"
              >
                <span className="inline-block px-2 py-1 rounded-full hover:bg-slate-100">
                  {tab.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </body>
    </html>
  );
}
