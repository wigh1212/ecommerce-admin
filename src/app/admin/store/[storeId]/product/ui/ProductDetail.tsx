import { useEffect, useState } from "react";
import { Product } from "../model/productTypes";
import Button from "@/app/login/ui/Button";
import ProductAddModal from "./ProductAddModal";
import { getProduct, updateStoreProduct } from "../model/productApi";
import { logoFileUpload } from "../../model/storeDetailApi";

declare global {
  interface Window {
    refreshData?: () => void;
  }
}

export default function ProductDetail({ storeId ,  storeProductId ,refresh }: { storeId : number ; storeProductId:number | null; refresh : () => void;} ) {
  
  const [data, setData] = useState<any>();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState<{
    id: number | null;
    storeId: number;
    name: string;
    amount: number;
    image: string;
    info: string;
    status: boolean;
  }>({
    id:  null,
    storeId: storeId,
    name: "",
    amount: 0,
    image: "",
    info: "",
    status : true,
  });

  const init = async ( id : any) => {
      setLoading(true);
      try{
        const response = await getProduct(storeId,Number(id));
        if (response.result === "SUCCESS") {
            setData(response.data ?? null);
            setFormData({
              id: response.data?.id || null,
              storeId: storeId,
              name: response.data?.name || "",
              amount: response.data?.amount || 0,
              image: response.data?.image || "",
              info: response.data?.info || "",
              status : response.data?.status || true,
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
      if(storeProductId){
        init(storeProductId);
      }
    }, [storeProductId]);

 const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async  () => {
    setSaving(true);
    try {
      const response = await updateStoreProduct(storeId,storeProductId, formData); 
      if (response.result === "SUCCESS") {
        alert("저장되었습니다!");
        setFormData({
            id: storeId,
            storeId: storeId,
            name: response.data?.name || "",
            amount: response.data?.amount || 0,
            image: response.data?.image || "",
            info: response.data?.info || "",
            status : response.data?.status || true,
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


  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const response = await logoFileUpload("3", file);
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

  const handlePopupOpen = () => {
    window.open(`/admin/store/${storeId}/product/${storeProductId}/option`, '옵션그룹매칭', 'width=500,height=600');
  }
  useEffect(()=>{
       window.refreshData = refreshData;
  },[])

  const refreshData = () => {
    refresh();
  }

  return (
    <div className="flex flex-row h-screen select-none">

    {data ? (
    <div className="flex-1 p-4 overflow-auto">
      <h2 className="text-lg font-bold mb-6 text-center">매장 상품 등록</h2>
      <form className="space-y-4"  onSubmit={handleSubmit} >
        <div>
          <label className="block mb-1 font-medium">이름<span className="text-red-500">*</span></label>
           <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">금액<span className="text-red-500">*</span></label>
         <input
            name="amount"
            type="number"
            value={formData.amount || 0}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">상품정보</label>
           <input
            name="info"
            value={formData.info}
            onChange={handleChange}
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
              <label className="block mb-1 font-medium">상품 사진</label>
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
          type="button"
          onClick={handlePopupOpen}
          className="w-full text-white py-2 rounded transition-colors bg-blue-600 hover:bg-blue-700"
        >
          옵션그룹매칭
        </button>

       
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
      <div> 상품이 선택되지 않았습니다.</div>
    )}
        
    </div>
  );
}