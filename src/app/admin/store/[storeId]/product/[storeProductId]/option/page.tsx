"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {  deleteProductOptionRel, getProductOptionList, saveProductOptionRel } from "./model/productOptionApi";


export default function OptionPopupPage() {
  const params = useParams();
  const storeId =Number(params.storeId);
  const storeProductId =Number(params.storeProductId);
  const [data, setData] = useState<any[]>([]);
  const [formData, setFormData] = useState<{
    id: number | null;
    storeId: number ;
    storeProductId: number | null ;
    storeProductOptionId: number | null;
  }>({
    id: null,
    storeId: storeId ,
    storeProductId: storeProductId ,
    storeProductOptionId : null
  });

  const init = async () => {
    try{
      const response = await getProductOptionList(storeId, storeProductId );
      if (response.result === "SUCCESS") {
          setData(response.data ?? []);      
      } else {
        alert(response.message);
      }
    } catch (err: any) {
      alert(err.message || "데이터 로드 실패");
    }
  }


 const handleAddItem = async () => {
    try {
        const response = await saveProductOptionRel(storeId , formData); 
        if (response.result === "SUCCESS") {
       
        } else {
            alert(response.message);
        }
      } catch (err: any) {
          alert(err.message || "저장 실패");
      } finally {
          init();
          if (window.opener?.refreshData) {
            window.opener.refreshData();
          }
    }
  }
  
 const handleDeleteItem =async (id: any) =>{
        try {
            const response = await deleteProductOptionRel(storeId , storeProductId ,Number(id));
            if (response.result === "SUCCESS") {
        
            } else {
                alert(response.message);
            }
        } catch (err: any) {
            alert(err.message || "삭제 실패");
        } finally {
            init();
           if (window.opener?.refreshData) {
            window.opener.refreshData();
          }
        }
    
 }

 useEffect(() => {
    init();
  }, []);

  useEffect(() => {
  if (formData.storeProductOptionId) {
    handleAddItem();
  }
}, [formData.storeProductOptionId]);



  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">상품 옵션그룹 매칭</h1>

      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border text-center w-12"></th>
            <th className="p-3 border text-left">옵션그룹명</th>
            <th className="p-3 border text-left">필수 여부</th>
            <th className="p-3 border text-left">선택 범위</th>
            <th className="p-3 border text-center">상태</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-b hover:bg-gray-50 transition text-gray-700"
            >
              <td className="p-3 text-center">
                <input
                  type="checkbox"
                  defaultChecked={item.existProduct}
                  onChange={(e) => {
                    if (e.target.checked) {
                      // 체크 → 옵션그룹 매칭 추가
                      setFormData((prev) => ({
                            ...prev,
                            storeProductOptionId: item.id,
                      }));
                    } else {
                      // 해제 → 옵션그룹 매칭 해제
                      handleDeleteItem(item.id);
                    }
                  }}
                  className="w-4 h-4 accent-blue-500 cursor-pointer"
                />
              </td>

              <td className="p-3 font-medium">{item.name}</td>
              <td className="p-3">{item.required ? "필수" : "선택"}</td>
              <td className="p-3">
                {item.minSelectCount} ~ {item.maxSelectCount}
              </td>
              <td className="p-3 text-center">
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    item.status
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {item.status ? "활성" : "비활성"}
                </span>
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="text-center text-gray-500 py-6 border-b"
              >
                등록된 옵션 그룹이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}