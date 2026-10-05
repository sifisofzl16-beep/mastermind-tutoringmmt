import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export type Profile = {
  full_name: string | null;
  email: string;
  is_admin: boolean;
};

// One lookup per request, shared by the layout and the page.
export const getSession = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { supabase, user: null, profile: null as Profile | null };

  const { data } = await supabase
    .from("profiles")
    .select("full_name,email,is_admin")
    .eq("id", user.id)
    .single();

  return { supabase, user, profile: (data as Profile | null) ?? null };
});

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
