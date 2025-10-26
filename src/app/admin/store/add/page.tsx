"use client"
import { useState } from "react";
import { Store } from "./model/storeTypes";
import { saveStore } from "./model/storeApi";
import { logoFileUpload } from "../[storeId]/model/storeDetailApi";

export default function StoreAddPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<Partial<Store>>({
    id:null,
    name: "",
    businessNumber: "",
    ceo: "",
    phone: "",
    email: "",
    address: "",
    image: "",
    status: true 
  });
  // 태그 등록 요청
  const handleSubmit = async () => {
   
    if (form.businessNumber==="") {
      alert("사업자번호를 입력해주세요");
      return;
    }
    if (form.ceo==="") {
      alert("대표자명을 입력해주세요");
      return;
    }
    if (form.phone==="") {
      alert("전화번호를 입력해주세요");
      return;
    }
    if (form.email==="") {
      alert("이메일을 입력해주세요");
      return;
    }
    if (form.address==="") {
      alert("주소를 입력해주세요");
      return;
    }

   try {
      const response = await saveStore(form);
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
    <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
      <h1 className="text-xl font-bold mb-6 text-gray-800 text-center">
        매장 등록
      </h1>

      {/* 매장 이미지 업로드 */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          매장 이미지 <span className="text-red-500">*</span>
        </label>

        <div className="flex flex-col items-center gap-3">
          {form.image ? (
            <img
              src={form.image}
              alt="매장 미리보기"
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

      {/* 매장명 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          매장명 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.name ?? ""}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="예: 인제카페 본점"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* 사업자번호 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          사업자번호 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.businessNumber ?? ""}
          onChange={(e) => setForm((prev) => ({ ...prev, businessNumber: e.target.value }))}
          placeholder="예: 123-45-67890"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* 대표자명 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          대표자명 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.ceo ?? ""}
          onChange={(e) => setForm((prev) => ({ ...prev, ceo: e.target.value }))}
          placeholder="대표자명을 입력하세요"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* 전화번호 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          전화번호 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.phone ?? ""}
          onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
          placeholder="예: 010-1234-5678"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* 이메일 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          이메일 <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={form.email ?? ""}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          placeholder="예: store@example.com"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* 주소 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          주소 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.address ?? ""}
          onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
          placeholder="예: 서울특별시 강남구 테헤란로 123"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
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