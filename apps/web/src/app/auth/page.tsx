// app/auth/page.tsx
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (mode === "signup") {
        // SOLO SIGNUP, NIENTE LOGIN DOPO
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        // se tutto ok → vai alla home
        router.push("/");
        return;
      }

      // MODE = "login"
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      router.push("/");
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Errore sconosciuto");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-center">
          Eva – {mode === "signup" ? "Crea il tuo account" : "Entra"}
        </h1>

        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`px-3 py-1 rounded-full text-sm border ${
              mode === "signup"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            Registrati
          </button>
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`px-3 py-1 rounded-full text-sm border ${
              mode === "login"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            Login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg py-2 text-sm font-semibold bg-black text-white disabled:opacity-60"
          >
            {isLoading
              ? "Attendere..."
              : mode === "signup"
              ? "Crea account"
              : "Entra"}
          </button>
        </form>
      </div>
    </main>
  );
}
