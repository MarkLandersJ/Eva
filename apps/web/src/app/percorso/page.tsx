// app/percorso/page.tsx
"use client";

import { useState } from "react";
import { useProtectedUser } from "@/lib/useProtectedUser";

type PercorsoTab = "alimentazione" | "allenamento";

export default function PercorsoPage() {
  const { user, loading, error } = useProtectedUser();
  const [tab, setTab] = useState<PercorsoTab>("alimentazione");

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Caricamento del tuo percorso…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Errore: {error}</p>
      </main>
    );
  }

  if (!user) {
    // Stato intermedio mentre il router ti porta su /auth
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Reindirizzamento alla pagina di accesso…</p>
      </main>
    );
  }

  // Da qui in poi siamo sicuri che l'utente è loggato
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header con saluto e info base */}
      <header className="px-4 pt-4 pb-3 border-b">
        <p className="text-xs text-slate-500">Percorso di</p>
        <h1 className="text-xl font-semibold truncate">{user.email}</h1>
      </header>

      {/* Tabs Alimentazione / Allenamento */}
      <div className="px-4 pt-3 pb-2 flex gap-2">
        <button
          type="button"
          onClick={() => setTab("alimentazione")}
          className={`px-3 py-1 rounded-full text-xs border ${
            tab === "alimentazione"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          Alimentazione
        </button>
        <button
          type="button"
          onClick={() => setTab("allenamento")}
          className={`px-3 py-1 rounded-full text-xs border ${
            tab === "allenamento"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          Allenamento
        </button>
      </div>

      {/* Contenuto scrollabile */}
      <section className="flex-1 overflow-y-auto px-4 pb-16 space-y-4">
        {tab === "alimentazione" ? (
          <AlimentazioneView />
        ) : (
          <AllenamentoView />
        )}
      </section>
    </main>
  );
}

// ----- Viste placeholder -----

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold mb-2">{title}</h2>
      <div className="text-xs text-slate-600 space-y-1">{children}</div>
    </div>
  );
}

function AlimentazioneView() {
  return (
    <>
      <Card title="Oggi – Alimentazione">
        <p>Pasti del giorno, integratori e note. (placeholder)</p>
      </Card>

      <Card title="Calendario settimanale">
        <p>Settimana con pasti + alternative. (placeholder)</p>
      </Card>

      <Card title="Progressi fisici">
        <p>Grafici, peso, misure, analisi corpo. (placeholder)</p>
      </Card>

      <Card title="Prodotti consigliati">
        <p>Lista prodotti Herbalife collegati al percorso. (placeholder)</p>
      </Card>
    </>
  );
}

function AllenamentoView() {
  return (
    <>
      <Card title="Oggi – Allenamento">
        <p>Workout del giorno, cardio, stretching. (placeholder)</p>
      </Card>

      <Card title="Programma settimanale">
        <p>Allenamenti della settimana con alternative. (placeholder)</p>
      </Card>

      <Card title="Check rapido recupero">
        <p>Domande rapide su energia, dolori, sonno. (placeholder)</p>
      </Card>
    </>
  );
}
