"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteStoreProductOptionItem, getOptionItemList, saveStoreProductOptionItem } from "./model/optionItemApi";
import { storeProductOptionItem } from "./model/optionItemTypes";


export default function OptionItemPage() {
  const params = useParams();
  const storeId =Number(params.storeId);
  const storeProductOptionId =Number(params.storeProductOptionId);
  const [data, setData] = useState<any[]>([]);
   const [formData, setFormData] = useState<{
    id: number | null;
    storeId: number ;
    storeProductOptionId: number;
    name: string;
    amount: number;
  }>({
    id: null,
    storeId: storeId ,
    storeProductOptionId: storeProductOptionId,
    name: "",
    amount:0
  });

  const init = async () => {
    try{
      const response = await getOptionItemList(storeId, storeProductOptionId );
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
        const response = await saveStoreProductOptionItem(storeId , storeProductOptionId , formData); 
        if (response.result === "SUCCESS") {
            alert("저장되었습니다!");
            setIsModalOpen(false);
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
    if(window.confirm("삭제하시겠습니까?")) {	
        try {
            const response = await deleteStoreProductOptionItem(storeId , storeProductOptionId ,Number(id));
            if (response.result === "SUCCESS") {
                alert("삭제되었습니다.");
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
 }

  const [isModalOpen, setIsModalOpen] = useState(false);


   useEffect(() => {
    init();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
  <h1 className="text-2xl font-bold mb-6 text-gray-800">옵션 아이템 리스트</h1>

  <div className="overflow-x-auto">
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-blue-100">
        <tr>
          <th className="p-3 text-left text-sm font-semibold text-gray-700">ID</th>
          <th className="p-3 text-left text-sm font-semibold text-gray-700">이름</th>
          <th className="p-3 text-left text-sm font-semibold text-gray-700">금액</th>
          <th className="p-3 text-center text-sm font-semibold text-gray-700"></th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50 transition">
              <td className="p-3 text-gray-700">{item.id}</td>
              <td className="p-3 text-gray-700">{item.name}</td>
              <td className="p-3 text-gray-700">{item.amount.toLocaleString()}원</td>
              <td className="p-3 text-center">
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="p-3 text-center text-gray-500" colSpan={4}>
              등록된 옵션 아이템이 없습니다.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* 등록 버튼 */}
  <div className="mt-6 flex justify-end">
    <button
      onClick={() => setIsModalOpen(true)}
      className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      옵션 아이템 등록
    </button>
  </div>

  {/* 등록 모달 */}
  {isModalOpen && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[400px] animate-slide-down">
        <h2 className="text-xl font-bold mb-4 text-gray-800">옵션 아이템 등록</h2>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 font-medium">이름</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 font-medium">금액</label>
          <input
            type="number"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value || 0)  })}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            취소
          </button>
          <button
            onClick={handleAddItem}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  )}
</div>
  );
}