import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Landing point for the link in the confirmation email.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}/course`);
    }
  }

  return NextResponse.redirect(
    `${origin}/login?error=${encodeURIComponent("That confirmation link did not work. Try logging in, or sign up again.")}`,
  );
}
