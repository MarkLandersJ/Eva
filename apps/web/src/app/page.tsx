// app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/useCurrentUser";

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useCurrentUser();

  // Se l'utente è loggato, mandalo su /percorso
  useEffect(() => {
    if (!loading && user) {
      router.replace("/percorso");
    }
  }, [loading, user, router]);

  // Stato di caricamento
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Caricamento di Heva…</p>
      </main>
    );
  }

  // Utente NON loggato → pagina di benvenuto
  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="w-full max-w-md bg-white rounded-2xl shadow p-6 space-y-4 text-center">
          <h1 className="text-2xl font-semibold">Benvenuto in Heva</h1>
          <p className="text-sm text-slate-600">
            Il tuo assistente Herbalife per percorsi, operatività e AI.
          </p>
          <button
            type="button"
            onClick={() => router.push("/auth")}
            className="w-full rounded-lg py-2 text-sm font-semibold bg-black text-white"
          >
            Accedi o registrati
          </button>
        </div>
      </main>
    );
  }

  // Breve stato intermedio mentre fa il redirect
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p>Reindirizzamento al tuo Percorso…</p>
    </main>
  );
}
