"use client";

import { useRouter } from "next/navigation";
import { clearToken, isLoggedIn } from "../../utils/auth";
import { getAdmin } from "../../utils/jwtParser";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    clearToken();
    router.push("/login");
  };

   const admin=getAdmin();  

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="font-bold text-xl cursor-pointer" onClick={() => router.push("/admin")}>
        관리자 로고
      </div>
      <div>
        {isLoggedIn() && (
          <>
            <span className="mr-4">{admin?.displayName}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              로그아웃
            </button>
          </>
        )}
      </div>
    </header>
  );
}