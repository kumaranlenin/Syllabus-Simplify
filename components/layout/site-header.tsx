import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/navbar";

// Server Component: checks auth once per request, hands boolean to the client navbar
export async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <Navbar isAuthed={!!user} />;
}
