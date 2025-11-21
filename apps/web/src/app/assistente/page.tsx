"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCurrentUser } from "@/lib/useCurrentUser";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, error } = useCurrentUser();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Caricamento…</p>
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
    // breve stato intermedio mentre fa redirect
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Reindirizzamento alla pagina di accesso…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Ciao, {user.email}</h1>
      <p className="text-sm text-slate-600">
        Questa è la tua Dashboard base di Eva.
      </p>
    </main>
  );
}
