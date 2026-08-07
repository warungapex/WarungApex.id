"use client";

import { useState } from "react";
import { loginAction } from "@/lib/actions/auth";

export function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await loginAction(new FormData(e.currentTarget));
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.03] space-y-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Email</label>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder:text-gray-600 focus:border-brand-cyan/50 focus:outline-none transition"
            placeholder="admin@warungapex.id"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Password</label>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder:text-gray-600 focus:border-brand-cyan/50 focus:outline-none transition"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-brand-red text-white font-semibold text-sm hover:bg-brand-red/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Masuk..." : "Masuk"}
        </button>
      </div>
    </form>
  );
}
