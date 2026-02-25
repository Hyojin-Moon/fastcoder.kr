import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// 빌드 타임(generateStaticParams 등)에서 사용하는 클라이언트
// 쿠키 없이 anon key로만 동작 → RLS에 의해 published=true만 조회 가능
export function createStaticClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || !url.startsWith("http")) {
    return null;
  }

  return createSupabaseClient(url, key);
}
