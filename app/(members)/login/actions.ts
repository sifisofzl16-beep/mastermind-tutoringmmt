"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function back(kind: "error" | "message", text: string, mode?: string): never {
  const params = new URLSearchParams({ [kind]: text });
  if (mode) params.set("mode", mode);
  redirect(`/login?${params.toString()}`);
}

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) back("error", "Enter your email and password.");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    back("error", "Wrong email or password, or your email is not confirmed yet.");
  }
  redirect("/course");
}

export async function signup(formData: FormData) {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!fullName || !email) back("error", "Enter your name and email.", "signup");
  if (password.length < 8) {
    back("error", "Your password needs at least 8 characters.", "signup");
  }

  const origin =
    (await headers()).get("origin") ?? "https://www.mastermindtutoring.co.za";

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    back("error", "We could not create that account. Try again in a minute.", "signup");
  }

  back("message", "Check your email and tap the confirmation link, then log in.");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
