// /app/auth/login/ui/LoginForm.tsx
"use client";

import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { login} from "../model/authApi";
import { validateLoginForm } from "../lib/validation";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);


    const validationErrors = validateLoginForm(userName, password);
    if (validationErrors) {
      setError(validationErrors);
      return;
    }

    try {
      const response = await login({ userName, password });
      if (response.result === "SUCCESS") {
          if (typeof window !== "undefined") {
             localStorage.setItem("token",response.data as string);
          }
          router.push("/admin"); // ✅ redirect 대신 push 사용
      
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      setError(err.message || "로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
      <InputField
        label="아이디"
        type="text"
        placeholder="ID"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <InputField
        label="비밀번호"
        type="password"
        placeholder="******"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <Button type="submit" className="w-full mt-4" disabled={loading}>
        {loading ? "로그인 중..." : "로그인"}
      </Button>
    </form>
  );
}

