// app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Heva – Herbalife Platform",
  description: "Piattaforma Heva per clienti e distributori Herbalife",
};

const tabs = [
  { href: "/percorso", label: "Percorso" },
  { href: "/operativita", label: "Operatività" },
  { href: "/assistente", label: "Assistente AI" },
  { href: "/menu", label: "Menu" }, // placeholder per funzioni extra/futuro
];


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="bg-slate-50 min-h-screen">
        <div className="relative min-h-screen flex flex-col max-w-md mx-auto border-x bg-white">
          {/* Contenuto principale scrollabile, con spazio in basso per la bottom bar */}
          <main className="flex-1 pb-14 overflow-y-auto">{children}</main>

          {/* Bottom bar fissa con le 5 tab */}
          <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md h-14 border-t flex items-center justify-between px-2 bg-white z-10">
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
