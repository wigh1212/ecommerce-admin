"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  deleteProductCategoryRel,
  getCategoryProductList,
  saveProductCategoryRel,
} from "./model/productOptionApi";

export default function ProductPopupPage() {
  const params = useParams();
  const storeId = Number(params.storeId);
  const [searchText, setSearchText] = useState(""); // ✅ 검색어 상태 추가
  const storeProductCategoryId = Number(params.storeProductCategoryId);

  const [data, setData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    storeId,
    storeProductCategoryId,
    storeProductId: null,
  });

  const init = async () => {
    try {
      const response = await getCategoryProductList(storeId, storeProductCategoryId);
      if (response.result === "SUCCESS") {
        setData(response.data ?? []);
      } else {
        alert(response.message);
      }
    } catch (err: any) {
      alert(err.message || "데이터 로드 실패");
    }
  };

  const handleAddItem = async () => {
    try {
      const response = await saveProductCategoryRel(storeId, formData);
      if (response.result !== "SUCCESS") alert(response.message);
    } catch (err: any) {
      alert(err.message || "저장 실패");
    } finally {
      init();
      window.opener?.refreshData?.();
    }
  };

  const handleDeleteItem = async (id: any) => {
    try {
      const response = await deleteProductCategoryRel(storeId, storeProductCategoryId, Number(id));
      if (response.result !== "SUCCESS") alert(response.message);
    } catch (err: any) {
      alert(err.message || "삭제 실패");
    } finally {
      init();
      window.opener?.refreshData?.();
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (formData.storeProductId) handleAddItem();
  }, [formData.storeProductId]);


  const filteredData = data.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.info?.toLowerCase().includes(searchText.toLowerCase())
  );


  return (
    <div className="p-6 bg-gray-50 min-h-screen whitespace-nowrap">



      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">상품 매칭</h1>

        <input
          type="text"
          placeholder="상품명 또는 정보 검색"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-64 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-3 text-center w-12"></th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">상품사진</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">상품명</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">금액</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">정보</th>
              <th className="p-3 text-center text-sm font-semibold text-gray-700">상태</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition text-gray-700"
                >
                  {/* 체크박스 */}
                  <td className="p-3 text-center align-middle">
                    <input
                      type="checkbox"
                      defaultChecked={item.existCategory}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData((prev) => ({
                            ...prev,
                            storeProductId: item.id,
                          }));
                        } else {
                          handleDeleteItem(item.id);
                        }
                      }}
                      className="w-4 h-4 accent-blue-500 cursor-pointer"
                    />
                  </td>

                  {/* 상품 이미지 */}
                  <td className="p-3 align-middle">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md border shadow-sm"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">이미지 없음</span>
                    )}
                  </td>

                  {/* 상품명 */}
                  <td className="p-3 font-medium text-gray-800 align-middle">
                    {item.name}
                  </td>

                  {/* 금액 */}
                  <td className="p-3 text-gray-700 align-middle">
                    {item.amount?.toLocaleString()}원
                  </td>

                  {/* 정보 (길면 말줄임 처리) */}
                  <td
                    className="p-3 max-w-[200px] truncate text-gray-600 align-middle"
                    title={item.info}
                  >
                    {item.info || "-"}
                  </td>

                  {/* 상태 */}
                  <td className="p-3 text-center align-middle">
                    <span
                      className={`px-3 py-1 text-xs rounded-lg font-medium ${
                        item.status
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-gray-200 text-gray-600 border border-gray-300"
                      }`}
                    >
                      {item.status ? "활성" : "비활성"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-6 border-b">
                  등록된 상품이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 하단 버튼 */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => window.close()}
          className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg border hover:bg-gray-200 transition"
        >
          닫기
        </button>
      </div>
    </div>
  );
}