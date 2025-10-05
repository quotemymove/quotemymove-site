import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/** Server Components / Server Actions */
export function createSupabaseServer() {
  const store = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (n: string) => store.get(n)?.value,
        set: (n: string, v: string, opts: any) => { try { store.set({ name: n, value: v, ...opts }); } catch {} },
        remove: (n: string, opts: any) => { try { store.set({ name: n, value: "", ...opts }); } catch {} },
      },
    }
  );
}

/** Route Handlers / Middleware (need request+response cookies) */
export function createSupabaseRouteClient(req: Request, res: { cookies: any }) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (n: string) => (req as any).cookies?.get?.(n)?.value,
        set: (n: string, v: string, opts: any) => res.cookies.set({ name: n, value: v, ...opts }),
        remove: (n: string, opts: any) => res.cookies.set({ name: n, value: "", ...opts }),
      },
    }
  );
}
