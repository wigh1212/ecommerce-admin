import { useEffect, useState } from "react";
import { getStoreProductCategory, updateStoreProductCategory } from "../model/CategoryApi";

declare global {
  interface Window {
    refreshData?: () => void;
  }
}

export default function CategoryDetail({ storeId ,  storeProductCategoryId ,refresh }: { storeId : number ; storeProductCategoryId:number | null; refresh : () => void;} ) {
  
  const [data, setData] = useState<any>();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState<{
    id: number | null;
    storeId: number;
    name: string;
    description: string;
    status: boolean;
  }>({
    id:  null,
    storeId: storeId,
    name : "",
    description: "",
    status : true,
  });

  const init = async ( id : any) => {
      setLoading(true);
      try{
        const response = await getStoreProductCategory(storeId,Number(id));
        if (response.result === "SUCCESS") {
            setData(response.data ?? null);
            setFormData({
              id: response.data?.id || null,
              storeId: storeId,
              name: response.data?.name || "",
              description : response.data?.description || "",
              status : response.data?.status || false,
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
      if(storeProductCategoryId){
        init(storeProductCategoryId);
      }
    }, [storeProductCategoryId]);

 const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async  () => {
    setSaving(true);
    try {
      const response = await updateStoreProductCategory(storeId,storeProductCategoryId, formData); 
      if (response.result === "SUCCESS") {
        alert("저장되었습니다!");
        setFormData({
            id: response.data?.id || null,
            storeId: storeId,
            name: response.data?.name || "",
            description : response.data?.description || "",
            status : response.data?.status || false,
          });
      } else {
        alert(response.message);
      }
    } catch (err: any) {
      alert(err.message || "저장 실패");
    } finally {
      setSaving(false);
      refreshData();
    }
  };


  const handlePopupOpen = () => {
    window.open(`/admin/store/${storeId}/category/${storeProductCategoryId}/product`, '상품매칭', 'width=700,height=600');
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
      <h2 className="text-lg font-bold mb-6 text-center">매장 카테고리 등록</h2>
      <form className="space-y-4"   >
        <div>
          <label className="block mb-1 font-medium">이름<span className="text-red-500">*</span></label>
           <input
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">설명<span className="text-red-500">*</span></label>
         <input
            name="description"
            type="text"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="button"
          onClick={handlePopupOpen}
          className="w-full text-white py-2 rounded transition-colors bg-blue-600 hover:bg-blue-700"
        >
         상품매칭
        </button>

       
       <button
          type="button"
          onClick={handleSubmit}
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