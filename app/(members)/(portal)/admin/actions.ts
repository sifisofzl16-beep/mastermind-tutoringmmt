"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";

async function requireAdmin() {
  const { supabase, user, profile } = await getSession();
  if (!user || !profile?.is_admin) throw new Error("Not allowed");
  return supabase;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function refresh() {
  revalidatePath("/admin");
  revalidatePath("/course", "layout");
}

export async function enrol(formData: FormData) {
  const supabase = await requireAdmin();
  const user_id = String(formData.get("user_id") ?? "");
  const module_id = String(formData.get("module_id") ?? "");
  const paid_until = String(formData.get("paid_until") ?? "");
  if (!user_id || !module_id || !/^\d{4}-\d{2}-\d{2}$/.test(paid_until)) return;

  await supabase
    .from("enrolments")
    .upsert({ user_id, module_id, paid_until }, { onConflict: "user_id,module_id" });
  refresh();
}

export async function unenrol(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await supabase.from("enrolments").delete().eq("id", id);
  refresh();
}

export async function addTopic(formData: FormData) {
  const supabase = await requireAdmin();
  const module_id = String(formData.get("module_id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const sort_order = Number(formData.get("sort_order") ?? 0) || 0;
  const slug = slugify(title);
  if (!module_id || !title || !slug) return;

  await supabase.from("topics").insert({ module_id, title, slug, sort_order });
  refresh();
}

export async function deleteResource(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const storage_path = String(formData.get("storage_path") ?? "");
  if (!id) return;

  if (storage_path) {
    await supabase.storage.from("course-files").remove([storage_path]);
  }
  await supabase.from("resources").delete().eq("id", id);
  refresh();
}

export async function saveLiveClass(formData: FormData) {
  const supabase = await requireAdmin();
  const module_id = String(formData.get("module_id") ?? "");
  const info = String(formData.get("live_class_info") ?? "").trim();
  if (!module_id) return;

  await supabase
    .from("modules")
    .update({ live_class_info: info || null })
    .eq("id", module_id);
  refresh();
}
