"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "متن مقاله خود را اینجا بنویسید...",
      direction: "rtl" as const,
      language: "fa",
      height: 500,
      theme: theme === "dark" ? "dark" : "default",
      buttons: [
        "source", "|",
        "bold", "strikethrough", "underline", "italic", "|",
        "ul", "ol", "|",
        "outdent", "indent", "|",
        "font", "fontsize", "brush", "paragraph", "|",
        "image", "video", "table", "link", "|",
        "align", "undo", "redo", "|",
        "hr", "eraser", "copyformat", "fullsize"
      ],
      uploader: {
        insertImageAsBase64URI: true
      }
    }),
    [theme]
  );

  if (!isMounted) {
    return (
      <div className="h-[500px] flex items-center justify-center bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg text-gray-400">
        در حال راه‌اندازی ویرایشگر پیشرفته...
      </div>
    );
  }

  return (
    <div className="w-full text-slate-900 dark:text-gray-100 mb-12">
      <JoditEditor
        ref={editorRef}
        value={value}
        config={config}
        onBlur={(newContent) => onChange(newContent)}
      />
    </div>
  );
}