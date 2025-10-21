"use client";

import { useState } from "react";
import { Tag } from "./model/tagTypes";
import { saveTag } from "./model/tagApi";

export default function TagAddPage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<Partial<Tag>>({
    id:null,
    name: ""
  });
  // 태그 등록 요청
  const handleSubmit = async () => {
    if (form.name==="") {
      alert("태그명을 입력해주세요.");
      return;
    }

   try {
      const response = await saveTag(form);
      if (response.result === "SUCCESS") {
        
      } else {
        alert(response.message);
      }
      } catch (err: any) {
        alert(err.message || "데이터 로드 실패");
      }
      finally {
        if (window.opener?.refreshData) {
          window.opener.refreshData();
        }
      }
  };


  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-sm bg-white rounded-lg shadow p-6">
        <h1 className="text-xl font-bold mb-6 text-gray-800 text-center">
          태그 등록
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            태그명
          </label>
          <input
            type="text"
            placeholder="예: 배달가능"
            value={form.name ?? ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "등록 중..." : "등록하기"}
        </button>
      </div>
    </div>
  );
}