"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBannerDetail, updateBanner } from "./model/bannerDetailApi";
import { logoFileUpload } from "@/app/admin/store/[storeId]/model/storeDetailApi";

export default function StoreDetail() {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<{
    id: number|null;              
    image: string;           
    link: string;             
    type: string;            
    activate: boolean;        
    applyAt: string;           
    applyBy: string;           
  }>({
    id: null,          
    image: "",            
    link: "",            
    type: "",          
    activate: false,       
    applyAt: "",        
    applyBy: "",         
 
  });

  const [saving, setSaving] = useState(false);
  
  const params = useParams(); // 👈 params는 객체로 리턴됨
  
  const bannerId =Number(params.bannerId);

  const init = async () => {
    setLoading(true);
    try{
      const response = await getBannerDetail(bannerId);
      if (response.result === "SUCCESS") {
          setData(response.data ?? null);
          setFormData({
            id: bannerId,
            image: response.data?.image || "",
            link: response.data?.link || "",            
            type: response.data?.type || "",          
            activate: response.data?.activate || false,         
            applyAt: response.data?.applyAt || "",         
            applyBy: response.data?.applyBy || "",  
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
      const response = await updateBanner(bannerId, formData); 
      if (response.result === "SUCCESS") {
        alert("저장되었습니다!");
        setFormData({
            id: bannerId,
            image: response.data?.image || "",
            link: response.data?.link || "",            
            type: response.data?.type || "",          
            activate: response.data?.activate || false,         
            applyAt: response.data?.applyAt || "",         
            applyBy: response.data?.applyBy || "",  
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
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
    {loading ? (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        로딩중...
      </div>
    ) : data ? (
      <div className="flex-1 p-6 overflow-auto">
        <h2 className="text-lg font-bold mb-6 text-center">배너 정보 수정</h2>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          
          {/* 배너 이미지 */}
          <div>
            <label className="block mb-1 font-medium">
              배너 이미지 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="배너 이미지"
                  className="w-40 h-24 object-cover border rounded"
                />
              ) : (
                <div className="w-40 h-24 border rounded flex items-center justify-center text-gray-400 text-sm">
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

          {/* 링크 */}
          <div>
            <label className="block mb-1 font-medium">
              링크(URL) <span className="text-red-500">*</span>
            </label>
            <input
              name="link"
              value={formData.link}
              onChange={handleChange}
              type="text"
              placeholder="예: https://example.com/event"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* 타입 선택 */}
          <div>
            <label className="block mb-1 font-medium">
              배너 타입 <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">선택해주세요</option>
              <option value="MAIN">MAIN</option>
              <option value="SIDE">SIDE</option>
            </select>
          </div>

          {/* 저장 버튼 */}
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
      <div className="flex-1 flex items-center justify-center text-gray-500">
        데이터가 없습니다.
      </div>
    )}
  </div>
  );
}