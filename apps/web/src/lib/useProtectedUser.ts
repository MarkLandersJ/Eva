"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { useCurrentUser } from "@/lib/useCurrentUser";

interface UseProtectedUserResult {
  user: User | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook per pagine protette:
 * - usa useCurrentUser
 * - se non sei loggato ti manda su /auth
 */
export function useProtectedUser(): UseProtectedUserResult {
  const router = useRouter();
  const { user, loading, error } = useCurrentUser();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [loading, user, router]);

  return { user, loading, error };
}
