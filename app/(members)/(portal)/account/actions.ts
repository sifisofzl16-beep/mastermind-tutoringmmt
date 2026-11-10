"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function back(kind: "error" | "message", text: string): never {
  redirect(`/account?${new URLSearchParams({ [kind]: text }).toString()}`);
}

export async function changePassword(formData: FormData) {
  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "");
  const again = String(formData.get("again") ?? "");

  if (next.length < 8) back("error", "Your new password needs at least 8 characters.");
  if (next !== again) back("error", "The two new passwords do not match.");
  if (next === current) back("error", "Choose a password that is different from your current one.");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) redirect("/login");

  // Confirm the current password before changing it.
  const { error: wrong } = await supabase.auth.signInWithPassword({ email: user.email, password: current });
  if (wrong) back("error", "Your current password is not right.");

  const { error } = await supabase.auth.updateUser({ password: next });
  if (error) back("error", "We could not change your password. Try a longer or less common one.");

  back("message", "Your password has been changed.");
}
