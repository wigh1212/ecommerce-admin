// /app/page.tsx
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/login"); // 로그인 페이지로 강제 이동
  return null; // redirect() 호출하면 이 코드는 실제로 렌더링되지 않음
}