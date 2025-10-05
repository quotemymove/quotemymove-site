import { createSupabaseServer } from "@/lib/supabase-server";

export default async function Debug() {
  const supa = createSupabaseServer();
  const { data: { user }, error } = await supa.auth.getUser();
  return <pre style={{ padding: 24 }}>{JSON.stringify({ user, error }, null, 2)}</pre>;
}
