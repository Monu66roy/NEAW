"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin/client";
import ImagePicker from "@/components/admin/ImagePicker";

export type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "checkbox" | "image";
  options?: string[];
  required?: boolean;
};

type ResourceManagerProps = {
  title: string;
  description?: string;
  endpoint: string; // e.g. "/projects"
  fields: FieldConfig[];
  emptyItem: Record<string, any>;
  columns: string[]; // field names shown in the table
  idField?: string; // default "id"
};

export default function ResourceManager({
  title,
  description,
  endpoint,
  fields,
  emptyItem,
  columns,
  idField = "id",
}: ResourceManagerProps) {
  const [items, setItems] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, any> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    const data = await adminFetch(endpoint);
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  function startCreate() {
    setEditing({ ...emptyItem });
    setError(null);
  }

  function startEdit(item: Record<string, any>) {
    setEditing({ ...item });
    setError(null);
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    setError(null);
    try {
      const payload: Record<string, any> = {};
      for (const f of fields) {
        if (f.type === "number") payload[f.name] = Number(editing[f.name] ?? 0);
        else payload[f.name] = editing[f.name] ?? (f.type === "checkbox" ? false : "");
      }
      // Carry through image_id even though it's not in `fields` as a plain input
      if ("image_id" in emptyItem) payload.image_id = editing.image_id ?? null;

      if (editing[idField] != null) {
        await adminFetch(`${endpoint}/${editing[idField]}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await adminFetch(endpoint, { method: "POST", body: JSON.stringify(payload) });
      }
      setEditing(null);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: Record<string, any>) {
    if (!confirm(`Delete "${item.title ?? item[idField]}"? This cannot be undone.`)) return;
    await adminFetch(`${endpoint}/${item[idField]}`, { method: "DELETE" });
    await refresh();
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </div>
        <button
          onClick={startCreate}
          className="shrink-0 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Add new
        </button>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-slate-500">Loading…</p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
              <tr>
                {columns.map((c) => (
                  <th key={c} className="px-4 py-3">
                    {fields.find((f) => f.name === c)?.label ?? c}
                  </th>
                ))}
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item[idField]}>
                  {columns.map((c) => (
                    <td key={c} className="max-w-xs truncate px-4 py-3 text-slate-700">
                      {String(item[c] ?? "")}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => startEdit(item)}
                      className="mr-3 text-sm font-medium text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="text-sm font-medium text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 1} className="px-4 py-6 text-center text-slate-400">
                    Nothing here yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">
              {editing[idField] != null ? "Edit" : "Add"} {title.replace(/s$/, "")}
            </h2>
            <div className="mt-5 flex flex-col gap-4">
              {fields.map((f) => (
                <div key={f.name}>
                  <label className="text-sm font-medium text-slate-700">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea
                      value={editing[f.name] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                      rows={4}
                      className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    />
                  ) : f.type === "select" ? (
                    <select
                      value={editing[f.name] ?? f.options?.[0]}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                      className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    >
                      {f.options?.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : f.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={Boolean(editing[f.name])}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.checked })}
                      className="mt-1 h-4 w-4"
                    />
                  ) : f.type === "image" ? (
                    <div className="mt-1">
                      <ImagePicker
                        imageId={editing.image_id ?? null}
                        imageUrl={editing.image_url ?? null}
                        onChange={(id, url) =>
                          setEditing({ ...editing, image_id: id, image_url: url })
                        }
                      />
                    </div>
                  ) : (
                    <input
                      type={f.type === "number" ? "number" : "text"}
                      value={editing[f.name] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                      className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      required={f.required}
                    />
                  )}
                </div>
              ))}
              {error && <p className="text-sm text-red-600">{error}</p>}
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
