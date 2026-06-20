"use client";

import { useState } from "react";
import Link from "next/link";
import { signup } from "@/lib/graphql";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await signup(email, password);
      setMessage("가입 완료! 로그인해주세요.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "오류가 발생했습니다";
      setError(msg.includes("이미 존재하는 이메일") ? "이미 존재하는 이메일입니다" : msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">회원가입</h1>
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
            {loading ? "처리 중..." : "회원가입"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          이미 계정이 있나요?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">로그인</Link>
        </p>
      </div>
    </div>
  );
}
