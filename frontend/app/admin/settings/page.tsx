"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin/client";

const LABELS: Record<string, string> = {
  name: "Company name",
  shortName: "Short name",
  tagline: "Tagline",
  email: "Email",
  phone: "Phone",
  location: "Location",
  website: "Website",
  linkedin: "LinkedIn URL",
  facebook: "Facebook URL",
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    adminFetch("/settings").then((data) => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  async function save() {
    setSaving(true);
    const payload = Object.entries(settings).map(([key, value]) => ({ key, value }));
    await adminFetch("/settings", { method: "PUT", body: JSON.stringify(payload) });
    setSaving(false);
    setSavedAt(Date.now());
  }

  if (loading) return <p className="text-sm text-slate-500">Loading…</p>;

  const keys = Array.from(new Set([...Object.keys(LABELS), ...Object.keys(settings)]));

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold text-slate-900">Settings</h1>
      <p className="mt-1 text-sm text-slate-500">
        Used in the site footer, contact page, and page metadata.
      </p>

      <div className="mt-6 flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6">
        {keys.map((key) => (
          <div key={key}>
            <label className="text-sm font-medium text-slate-700">{LABELS[key] ?? key}</label>
            <input
              value={settings[key] ?? ""}
              onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
        ))}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={save}
            disabled={saving}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          {savedAt && <span className="text-sm text-green-600">Saved</span>}
        </div>
      </div>
    </div>
  );
}
