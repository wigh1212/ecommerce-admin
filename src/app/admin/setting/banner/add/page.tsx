"use client";

import { useState } from "react";
import { Banner } from "./model/bannerTypes";
import { saveBanner } from "./model/bannerApi";
import { logoFileUpload } from "@/app/admin/store/[storeId]/model/storeDetailApi";

export default function TagAddPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<Partial<Banner>>({
    id:null,
    image: "",
    link: "",
    type: ""
  });
  // 태그 등록 요청
  const handleSubmit = async () => {
    if (form.type==="") {
      alert("타입을 입력해주세요.");
      return;
    }

    if (form.link==="") {
      alert("링크를 입력해주세요.");
      return;
    }

    if (form.image==="") {
      alert("이미지업로드가 필요합니다.");
      return;
    }

   try {
      const response = await saveBanner(form);
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

   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
  
      try {
        const response = await logoFileUpload("1", file);
        if (response.result === "SUCCESS") {
          const imagePath = response.data?.imagePath; // ← 괄호() 추가
  
          setForm((prev) => ({ ...prev, image: imagePath || "" }));
  
        } else {
          alert(response.message || "업로드 실패");
        }
      } catch (error) {
        console.error("업로드 에러:", error);
        alert("파일 업로드 중 오류가 발생했습니다.");
      } 
    };

  
 return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
    <div className="w-full max-w-sm bg-white rounded-lg shadow p-6">
      <h1 className="text-xl font-bold mb-6 text-gray-800 text-center">
        배너 등록
      </h1>

      {/* 배너 이미지 업로드 */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          배너 이미지 <span className="text-red-500">*</span>
        </label>

        <div className="flex flex-col items-center gap-3">
          {form.image ? (
            <img
              src={form.image}
              alt="배너 미리보기"
              className="w-48 h-28 object-cover border rounded-lg"
            />
          ) : (
            <div className="w-48 h-28 border rounded-lg flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="text-sm"
          />
        </div>
      </div>

      {/* 링크 입력 */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          링크(URL) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="예: https://example.com/event"
          value={form.link ?? ""}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, link: e.target.value }))
          }
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* 타입 선택 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          배너 타입 <span className="text-red-500">*</span>
        </label>
        <select
          value={form.type ?? ""}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, type: e.target.value }))
          }
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
        >
          <option value="">선택해주세요</option>
          <option value="MAIN">MAIN</option>
          <option value="SIDE">SIDE</option>
        </select>
      </div>

      {/* 등록 버튼 */}
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