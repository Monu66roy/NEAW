"use client";

import { useRef, useState } from "react";
import { adminFetch, API_URL } from "@/lib/admin/client";

type ImagePickerProps = {
  imageId: number | null;
  imageUrl?: string | null;
  onChange: (imageId: number | null, imageUrl: string | null) => void;
};

export default function ImagePicker({ imageId, imageUrl, onChange }: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("alt_text", file.name);
      const image = await adminFetch("/images", { method: "POST", body: form });
      onChange(image.id, image.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const previewSrc = imageUrl ? `${API_URL}${imageUrl}` : null;

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-slate-300 bg-slate-100">
        {previewSrc ? (
          <img src={previewSrc} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-xs text-slate-400">No image</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {uploading ? "Uploading…" : imageId ? "Replace image" : "Upload image"}
          </button>
          {imageId && (
            <button
              type="button"
              onClick={() => onChange(null, null)}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-50"
            >
              Remove
            </button>
          )}
        </div>
        {error && <span className="text-xs text-red-600">{error}</span>}
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}
