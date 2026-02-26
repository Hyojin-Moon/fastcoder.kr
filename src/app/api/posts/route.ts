import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/posts — 관리자용 전체 글 목록 (published 무관)
export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, description, published, created_at, updated_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST /api/posts — 새 글 생성
export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, description, content, published } = body;

  if (!title) {
    return NextResponse.json(
      { error: "title은 필수입니다." },
      { status: 400 }
    );
  }

  // 슬러그 자동 넘버링: 가장 큰 숫자 + 1
  const { data: latest } = await supabase
    .from("posts")
    .select("slug")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  const nextNum = latest?.slug ? Number(latest.slug) + 1 || 1 : 1;
  const slug = String(nextNum);

  const { data, error } = await supabase
    .from("posts")
    .insert({ slug, title, description, content, published: published ?? false })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
