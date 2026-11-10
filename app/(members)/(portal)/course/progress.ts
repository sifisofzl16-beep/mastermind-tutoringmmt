"use server";

import { createClient } from "@/lib/supabase/server";

/** Remembers that the signed-in student opened a video or file. Fails quietly: progress is a nicety. */
export async function markOpened(resourceId: string): Promise<void> {
  if (typeof resourceId !== "string" || !/^[0-9a-f-]{36}$/i.test(resourceId)) return;
  try {
    const supabase = await createClient();
    await supabase.rpc("mark_opened", { p_resource: resourceId });
  } catch {
    // Ignore: the student can still watch or open the file.
  }
}
