"use client";

import dynamic from "next/dynamic";
import type { MDEditorProps } from "@uiw/react-md-editor";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({ value, onChange }: Props) {
  const handleChange: MDEditorProps["onChange"] = (val) => {
    onChange(val ?? "");
  };

  return (
    <div data-color-mode="auto">
      <MDEditor value={value} onChange={handleChange} height={500} />
    </div>
  );
}
