"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTagDetail, saveTag } from "./model/tagDetailApi";

export default function StoreDetail() {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<{
    id: number | null;
    name: string;
  }>({
    id:  null,
    name: "",
 
  });

  const [saving, setSaving] = useState(false);
  
  const params = useParams(); // 👈 params는 객체로 리턴됨
  
  const tagId =Number(params.tagId);

  const init = async () => {
    setLoading(true);
    try{
      const response = await getTagDetail(tagId);
      if (response.result === "SUCCESS") {
          setData(response.data ?? null);
          setFormData({
            id: tagId,
            name: response.data?.name || "",
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
      const response = await saveTag(tagId, formData); 
      if (response.result === "SUCCESS") {
        alert("저장되었습니다!");
        setFormData({
            id: tagId,
            name: response.data?.name || "",
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

return (
    <div className="flex flex-row h-screen select-none">

    {data ? (
    <div className="flex-1 p-4 overflow-auto">
      <h2 className="text-lg font-bold mb-6 text-center">태그 등록</h2>
      <form className="space-y-4"  onSubmit={handleSubmit} >
        <div>
          <label className="block mb-1 font-medium">태그명<span className="text-red-500">*</span></label>
           <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
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