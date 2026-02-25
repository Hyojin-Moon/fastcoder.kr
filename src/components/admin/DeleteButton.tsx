"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  postId: string;
  postTitle: string;
}

export default function DeleteButton({ postId, postTitle }: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`"${postTitle}" 글을 삭제하시겠습니까?`)) return;

    setDeleting(true);
    const res = await fetch(`/api/posts/${postId}`, { method: "DELETE" });

    if (!res.ok) {
      alert("삭제에 실패했습니다.");
      setDeleting(false);
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="text-sm text-red-500 hover:text-red-700 disabled:opacity-50"
    >
      {deleting ? "삭제 중..." : "삭제"}
    </button>
  );
}
