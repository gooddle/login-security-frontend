"use client";

import { useState } from "react";
import Link from "next/link";
import { login } from "@/lib/graphql";
import LockoutModal from "@/app/components/LockoutModal";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lockedMessage, setLockedMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    setLockedMessage("");
    try {
      const result = await login(email, password);
      setMessage(result.message);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "오류가 발생했습니다";
      if (msg.includes("잠겼습니다")) {
        setLockedMessage(msg);
      } else {
        setError(msg.includes("인증 실패") ? "인증 실패" : msg);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {lockedMessage && (
        <LockoutModal
          message={lockedMessage}
          onClose={() => setLockedMessage("")}
        />
      )}
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">로그인</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          {message && <p className="text-sm text-green-600">{message}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {loading ? "처리 중..." : "로그인"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          계정이 없나요?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">회원가입</Link>
        </p>
      </div>
    </div>
  );
}
