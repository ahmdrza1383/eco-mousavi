"use client";

import { useState } from "react";
import RichTextEditor from "../../../../components/RichTextEditor";

export default function NewArticlePage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
      <h1 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">نوشتن مقاله جدید</h1>
      
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">عنوان مقاله</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">لینک (Slug)</label>
          <input 
            type="text" 
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 text-left"
            dir="ltr"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">محتوای مقاله</label>
          <RichTextEditor value={content} onChange={setContent} />
        </div>
        
        <button 
          type="button" 
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors font-medium w-full md:w-auto mt-12"
        >
          ذخیره مقاله
        </button>
      </form>
    </div>
  );
}