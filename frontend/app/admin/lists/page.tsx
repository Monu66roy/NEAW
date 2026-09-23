"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin/client";

const KNOWN_LISTS = [
  { key: "focus_areas", label: "Focus Areas (Home / What We Do)" },
  { key: "core_values", label: "Core Values (About)" },
  { key: "partnership_types", label: "Partnership Types (Partnerships)" },
  { key: "career_reasons", label: "Career Reasons (Careers)" },
  { key: "privacy_sections", label: "Privacy Policy Sections" },
];

type Item = { id: number; title: string; description: string; sort_order: number };

export default function AdminListsPage() {
  const [listKey, setListKey] = useState(KNOWN_LISTS[0].key);
  const [customKey, setCustomKey] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Item> | null>(null);
  const [saving, setSaving] = useState(false);

  const activeKey = customKey.trim() || listKey;

  async function refresh() {
    setLoading(true);
    const data = await adminFetch(`/lists/${activeKey}`);
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey]);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const payload = {
      title: editing.title ?? "",
      description: editing.description ?? "",
      sort_order: editing.sort_order ?? items.length,
    };
    if (editing.id != null) {
      await adminFetch(`/lists/items/${editing.id}`, { method: "PUT", body: JSON.stringify(payload) });
    } else {
      await adminFetch(`/lists/${activeKey}`, { method: "POST", body: JSON.stringify(payload) });
    }
    setEditing(null);
    setSaving(false);
    refresh();
  }

  async function handleDelete(item: Item) {
    if (!confirm(`Delete "${item.title}"?`)) return;
    await adminFetch(`/lists/items/${item.id}`, { method: "DELETE" });
    refresh();
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Content Lists</h1>
      <p className="mt-1 max-w-2xl text-sm text-slate-500">
        Each list is a set of (title, description) cards used on a page. Pick a known list below, or type a
        new list key to start a brand-new list — no backend changes needed, but a page will only display it
        once a developer adds one line calling <code className="rounded bg-slate-100 px-1">getContentList(&quot;your_key&quot;)</code>.
      </p>

      <div className="mt-6 flex flex-wrap items-end gap-4">
        <div>
          <label className="text-sm font-medium text-slate-700">Known list</label>
          <select
            value={listKey}
            onChange={(e) => {
              setListKey(e.target.value);
              setCustomKey("");
            }}
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            {KNOWN_LISTS.map((l) => (
              <option key={l.key} value={l.key}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">…or a custom list key</label>
          <input
            value={customKey}
            onChange={(e) => setCustomKey(e.target.value)}
            placeholder="e.g. timeline_milestones"
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <button
          onClick={() => setEditing({ title: "", description: "", sort_order: items.length })}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Add item to &quot;{activeKey}&quot;
        </button>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-slate-500">Loading…</p>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4"
            >
              <div>
                <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{item.description}</p>
              </div>
              <div className="flex shrink-0 gap-3">
                <button
                  onClick={() => setEditing(item)}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="text-sm font-medium text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-400">
              No items in &quot;{activeKey}&quot; yet.
            </p>
          )}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">
              {editing.id != null ? "Edit" : "Add"} item
            </h2>
            <div className="mt-5 flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Title</label>
                <input
                  value={editing.title ?? ""}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Description</label>
                <textarea
                  value={editing.description ?? ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  rows={5}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Sort order</label>
                <input
                  type="number"
                  value={editing.sort_order ?? 0}
                  onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
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
