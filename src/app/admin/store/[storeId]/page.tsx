"use client"
import { useEffect, useState } from "react";
import { getStoreDetail, logoFileUpload, saveStore } from "./model/storeDetailApi";
import { useParams } from "next/navigation";

export default function StoreDetail() {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<{
    id: number | null;
    name: string;
    businessNumber: string;
    ceo: string;
    phone: string;
    email: string;
    address: string;
    image: string;
  }>({
    id:  null,
    name: "",
    businessNumber: "",
    ceo: "",
    phone: "",
    email: "",
    address: "",
    image: "",
  });

  const [saving, setSaving] = useState(false);
  
  const params = useParams(); // 👈 params는 객체로 리턴됨
  
  const storeId =Number(params.storeId);

  const init = async () => {
    console.log("storeIdsdfsdf", storeId);
    setLoading(true);
    try{
      const response = await getStoreDetail(storeId);
      if (response.result === "SUCCESS") {
          setData(response.data ?? null);
          setFormData({
            id: storeId,
            name: response.data?.name || "",
            businessNumber: response.data?.businessNumber || "",
            ceo: response.data?.ceo || "",
            phone: response.data?.phone || "",
            email: response.data?.email || "",
            address: response.data?.address || "",
            image: response.data?.image || "",
          });      
      } else {
        alert(response.message);
      }
    } catch (err: any) {
      alert(err.message || "데이터 로드 실패");
    }finally {
      setLoading(false);
    }
  }

useEffect(() => {
  init();
}, []);

 const handleSubmit = async  () => {
    setSaving(true);
    try {
      const response = await saveStore(storeId, formData); 
      if (response.result === "SUCCESS") {
        alert("저장되었습니다!");
        setFormData({
            id: storeId,
            name: response.data?.name || "",
            businessNumber: response.data?.businessNumber || "",
            ceo: response.data?.ceo || "",
            phone: response.data?.phone || "",
            email: response.data?.email || "",
            address: response.data?.address || "",
            image: response.data?.image || "",
          });
      } else {
        alert(response.message);
      }
    } catch (err: any) {
      alert(err.message || "저장 실패");
    } finally {
      setSaving(false);
    }
  };

 const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await logoFileUpload("1", file);
      if (response.result === "SUCCESS") {
        const imagePath = response.data?.imagePath; // ← 괄호() 추가
        alert("파일 업로드 성공!");

        setFormData((prev) => ({ ...prev, image: imagePath || "" }));

      } else {
        alert(response.message || "업로드 실패");
      }
    } catch (error) {
      console.error("업로드 에러:", error);
      alert("파일 업로드 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

return (
    <div className="flex flex-row h-screen select-none">

    {data ? (
    <div className="flex-1 p-4 overflow-auto">
      <h2 className="text-lg font-bold mb-6 text-center">매장 정보 등록</h2>
      <form className="space-y-4"  onSubmit={handleSubmit} >
        <div>
          <label className="block mb-1 font-medium">이름<span className="text-red-500">*</span></label>
           <input
            name="name"
            value={formData.name}
            onChange={handleChange}
             readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">사업자번호<span className="text-red-500">*</span></label>
         <input
            name="businessNumber"
            value={formData.businessNumber}
            onChange={handleChange}
            type="text"
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">대표자</label>
           <input
            name="ceo"
            value={formData.ceo}
            onChange={handleChange}
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">전화번호<span className="text-red-500">*</span></label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="text"
            placeholder="010-1234-5678"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">이메일</label>
             <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="example@store.com"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">주소</label>
           <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
       
       <div>
              <label className="block mb-1 font-medium">매장 로고</label>
              <div className="flex items-center gap-4">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="매장 로고"
                    className="w-24 h-24 object-cover border rounded"
                  />
                ) : (
                  <div className="w-24 h-24 border rounded flex items-center justify-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                  {uploading && (
                    <p className="text-sm text-gray-500 mt-1">업로드 중...</p>
                  )}
                </div>
              </div>
            </div>

       
       <button
          type="submit"
          disabled={saving}
          className={`w-full text-white py-2 rounded transition-colors ${
            saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {saving ? "저장 중..." : "저장"}
        </button>
      </form>
    </div>
    ) : (
      <div>로딩중...</div>
    )}
        
    </div>
  );
}