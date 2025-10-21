import { useEffect, useState } from "react";
import { logoFileUpload } from "../../model/storeDetailApi";
import { getOption, updateStoreProductOption } from "../model/optionApi";
import { storeProductOption } from "../../product/model/productTypes";
import { storeProductOptionItem } from "../model/optionTypes";
import OptionItemAdd from "./OptionItemAddModal";


declare global {
  interface Window {
    refreshData?: () => void;
  }
}

export default function OptionDetail({ storeId ,  storeProductOptionId , refresh  }: { storeId : number ; storeProductOptionId:number | null;  refresh : () => void;} ) {
  
  const [data, setData] = useState<any>();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const [formData, setFormData] = useState<{
    id: number | null;
    storeId: number;
    name: string;
    required: boolean;
    minSelectCount: number;
    maxSelectCount: number;
    status: boolean;
    storeProductOptionItemList : storeProductOptionItem[];
  }>({
    id:  storeProductOptionId,
    storeId: storeId,
    name: "",
    required: false,
    minSelectCount: 0,
    maxSelectCount: 0,
    status : true,
    storeProductOptionItemList : [],
  });

  const init = async () => {
      if(storeProductOptionId){
      setLoading(true);
      try{
        const response = await getOption(storeId,storeProductOptionId);
        if (response.result === "SUCCESS") {
            setData(response.data ?? null);
            setFormData({
              id: response.data?.id || null,
              storeId: storeId,
              name: response.data?.name || "",
              required: response.data?.required || false,
              minSelectCount: response.data?.minSelectCount || 0,
              maxSelectCount: response.data?.maxSelectCount || 0,
              status : response.data?.status || true,
              storeProductOptionItemList : response.data?.storeProductOptionItemList || [],
              
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
    }
  
    useEffect(() => {
      if(storeProductOptionId){
        init();
      }
  
    }, [storeProductOptionId]);
  
    useEffect(()=>{

       window.refreshData = refreshData;
    },[])

  const refreshData = () => {
    init();
    refresh();
  }
 const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value,type } = e.target;
      setFormData((prev) => {
      if (type === "radio" && (value === "true" || value === "false")) {
        return { ...prev, [name]: value === "true" };
      }
      return { ...prev, [name]: value };
  });
  };

  const handlePopupOpen = () => {
    setPopupOpen(true);
    window.open(`/admin/store/${storeId}/option/${storeProductOptionId}/item`, '옵션아이템 등록', 'width=500,height=600');
  }

  const handleSubmit = async  () => {

    setSaving(true);
    try {
      const response = await updateStoreProductOption(storeId,storeProductOptionId, formData); 
      if (response.result === "SUCCESS") {
        alert("수정되었습니다.");
        refresh();
        setFormData({
            id: storeProductOptionId,
            storeId: storeId,
            name: response.data?.name || "",
            required: response.data?.required || false,
            minSelectCount: response.data?.minSelectCount || 0,
            maxSelectCount: response.data?.maxSelectCount || 0,
            status : response.data?.status || true,
            storeProductOptionItemList : response.data?.storeProductOptionItemList || [],
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

  


  return (
    <div className="flex flex-row h-screen select-none">

    {data ? (
    <div className="flex-1 p-4 overflow-auto">
      <h2 className="text-lg font-bold mb-6 text-center">매장 옵션 등록</h2>
      <form className="space-y-4">
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
            <label className="block text-sm font-medium mb-1">필수 여부</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="required"
                  value="true"
                  checked={formData.required === true}
                  onChange={handleChange}
                  className="mr-2"
                />
                예
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="required"
                  value="false"
                  checked={formData.required === false}
                  onChange={handleChange}
                  className="mr-2"
                />
                아니오
              </label>
            </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">최소선택갯수</label>
           <input
            name="minSelectCount"
            value={formData.minSelectCount || 0}
            type="number"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">최대선택갯수</label>
           <input
            name="maxSelectCount"
            value={formData.maxSelectCount || 0}
            type="number"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="button"
          onClick={handlePopupOpen}
          className="w-full text-white py-2 rounded transition-colors bg-blue-600 hover:bg-blue-700"
        >
          옵션아이템 등록
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
      <div> 옵션이 선택되지 않았습니다.</div>
    )}
        
    </div>
  );
}