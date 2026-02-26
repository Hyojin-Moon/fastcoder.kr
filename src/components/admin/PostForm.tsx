"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MarkdownEditor from "./MarkdownEditor";

interface PostData {
  id?: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  published: boolean;
}

interface Props {
  initialData?: PostData;
}

export default function PostForm({ initialData }: Props) {
  const router = useRouter();
  const isEditing = !!initialData?.id;

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [slugManual, setSlugManual] = useState(!!initialData?.slug);
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );
  const [content, setContent] = useState(initialData?.content ?? "");
  const [published, setPublished] = useState(initialData?.published ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function generateSlug(text: string) {
    return text
      .trim()
      .toLowerCase()
      .replace(/[가-힣]+/g, (match) =>
        Array.from(match)
          .map((ch) => ch.charCodeAt(0).toString(36))
          .join("")
      )
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/[\s]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugManual) {
      setSlug(generateSlug(value));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const body = { slug, title, description, content, published };

    const url = isEditing ? `/api/posts/${initialData!.id}` : "/api/posts";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "저장에 실패했습니다.");
      setSaving(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  const inputClass =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">
          제목
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <label htmlFor="slug" className="text-sm font-medium">
            슬러그 (URL)
          </label>
          {slugManual && (
            <button
              type="button"
              onClick={() => {
                setSlugManual(false);
                setSlug(generateSlug(title));
              }}
              className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              자동 생성으로 전환
            </button>
          )}
        </div>
        <input
          id="slug"
          type="text"
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugManual(true);
          }}
          required
          placeholder="제목 입력 시 자동 생성"
          pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
          title="영문 소문자와 하이픈만 사용 가능합니다"
          className={`${inputClass} text-gray-500`}
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-medium"
        >
          설명
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">내용</label>
        <MarkdownEditor value={content} onChange={setContent} />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="published"
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="h-4 w-4"
        />
        <label htmlFor="published" className="text-sm">
          공개
        </label>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          {saving ? "저장 중..." : isEditing ? "수정" : "작성"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm dark:border-gray-700"
        >
          취소
        </button>
      </div>
    </form>
  );
}
