"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin/client";

type Block = { id: number; page_slug: string; block_key: string; value: string };

export default function AdminPageContentPage() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Block> | null>(null);
  const [saving, setSaving] = useState(false);

  async function refresh() {
    setLoading(true);
    const data = await adminFetch("/page-content");
    setBlocks(data);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    await adminFetch("/page-content", {
      method: "PUT",
      body: JSON.stringify({
        page_slug: editing.page_slug,
        block_key: editing.block_key,
        value: editing.value ?? "",
      }),
    });
    setEditing(null);
    setSaving(false);
    refresh();
  }

  const byPage = blocks.reduce<Record<string, Block[]>>((acc, b) => {
    (acc[b.page_slug] ??= []).push(b);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Page Content</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Freeform text blocks (hero headings, intro paragraphs) keyed by page and a block name. Add a
            new block for any page/key pair a developer has wired up with{" "}
            <code className="rounded bg-slate-100 px-1">block(content, &quot;key&quot;, fallback)</code>.
          </p>
        </div>
        <button
          onClick={() => setEditing({ page_slug: "", block_key: "", value: "" })}
          className="shrink-0 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Add block
        </button>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-slate-500">Loading…</p>
      ) : (
        <div className="mt-6 flex flex-col gap-6">
          {Object.entries(byPage).map(([page, items]) => (
            <div key={page}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">{page}</h2>
              <div className="mt-2 flex flex-col gap-2">
                {items.map((b) => (
                  <div
                    key={b.id}
                    className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-500">{b.block_key}</p>
                      <p className="mt-1 text-sm text-slate-800">{b.value}</p>
                    </div>
                    <button
                      onClick={() => setEditing(b)}
                      className="shrink-0 text-sm font-medium text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {blocks.length === 0 && (
            <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-400">
              No page content blocks yet.
            </p>
          )}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">
              {editing.id != null ? "Edit" : "Add"} content block
            </h2>
            <div className="mt-5 flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Page slug</label>
                <input
                  value={editing.page_slug ?? ""}
                  disabled={editing.id != null}
                  onChange={(e) => setEditing({ ...editing, page_slug: e.target.value })}
                  placeholder="home"
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-100"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Block key</label>
                <input
                  value={editing.block_key ?? ""}
                  disabled={editing.id != null}
                  onChange={(e) => setEditing({ ...editing, block_key: e.target.value })}
                  placeholder="hero_title"
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-100"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Value</label>
                <textarea
                  value={editing.value ?? ""}
                  onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                  rows={5}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div className="mt-2 flex justify-end gap-3">
                <button
                  onClick={() => setEditing(null)}
                  className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
