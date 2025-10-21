import { useState } from "react";
import { Category, Product } from "../model/CategoryTypes";
import Button from "@/app/login/ui/Button";
import CategoryAddModal from "./CategoryAddModal";

export default function CategoryListTable({ categorys, refresh,setSelectCategoryId , deleteAction, selectStoreProductCategoryId }: { categorys:Category[];  refresh : () => void; setSelectCategoryId?: (id: number | null) => void; deleteAction: (id: number) => void; selectStoreProductCategoryId:number } ) {
  const [openProductId, setOpenProductId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const filteredCategorys = categorys.filter((p) => {
      if (filterStatus === "all") return true;
      if (filterStatus === "active") return p.status === true;
      if (filterStatus === "inactive") return p.status === false;
    });

  return (
    <div className="space-y-4">
      {/* 상단 헤더 */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800">카테고리 목록</h2>
  
  
          <div className="flex items-center gap-2">
        <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as "all" | "active" | "inactive")
            }
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="all">전체</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
          </select>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition"
          >
            + 상품 등록
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <CategoryAddModal refresh={refresh} setIsModalOpen={setIsModalOpen} />
      )}

      {/* 카테고리 리스트 */}
      <div className="max-h-[600px] overflow-y-auto space-y-4">
        {filteredCategorys.map((category) => (
          <div
            key={category.id}
            className="border rounded-lg bg-white shadow-sm"
          >
            {/* 카테고리 헤더 */}
            <div
              className="p-3 border-b bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100"
              onClick={() =>
                setSelectCategoryId?.(
                  category.id ? category.id : null
                )
              }
            >
              <div className="font-semibold text-gray-800">
                {category.name || "카테고리명 없음"}
              </div>
              
              


               <div className="flex items-center gap-3">
                {/* 토글 버튼 */}
                <div
                  onClick={() => deleteAction(Number(category.id))}
                  className={`relative w-12 h-6 rounded-full cursor-pointer transition-all duration-300 
                    ${category.status ? "bg-blue-500" : "bg-gray-300"}
                  `}
                >
                  <div
                    className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300
                      ${category.status ? "translate-x-6" : "translate-x-0"}
                    `}
                  ></div>
                </div>

                <div
                className={`text-sm px-2 py-1 rounded ${
                  category.status
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
                >
                  {category.status ? "활성" : "비활성"}
                  
                </div>
              </div>
                    
      
            </div>

            {/* 카테고리 내 상품 */}
            <div className="p-3 space-y-3">
              {category.storeProductMapCategoryList?.map((rel) => {
                const product = rel.storeProduct;
                return (
                  <div
                    key={product.id}
                    className="border rounded-lg p-3 bg-white shadow-sm"
                  >
                    {/* 상품 카드 */}
                    <button
                      onClick={() =>
                        setOpenProductId(
                          openProductId === product.id ? null : product.id
                        )
                      }
                      className="w-full flex justify-between items-center text-left"
                    >
                      <div>
                        <div className="font-semibold">{product.name}</div>
                        <div className="text-sm text-gray-500">
                          {product.amount.toLocaleString()}원
                        </div>
                      </div>
                      <div className="text-gray-400">
                        {openProductId === product.id ? "▲" : "▼"}
                      </div>
                    </button>

                    {/* 옵션 상세 */}
                    {openProductId === product.id && (
                      <div className="mt-3 space-y-2 border-t pt-3">
                        {product.storeProductOptionRelList?.length ? (
                          product.storeProductOptionRelList.map((rel) => (
                            <div
                              key={rel.id}
                              className="border rounded p-3 bg-gray-50"
                            >
                              {rel.storeProductOption && (
                                <div className="mb-2">
                                  <div className="font-semibold text-gray-800">
                                    옵션 그룹: {rel.storeProductOption.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    (필수:{" "}
                                    {rel.storeProductOption.required
                                      ? "O"
                                      : "X"}
                                    ) / 최소{" "}
                                    {rel.storeProductOption.minSelectCount}개 ~
                                    최대{" "}
                                    {rel.storeProductOption.maxSelectCount}개
                                  </div>
                                </div>
                              )}

                              {/* 옵션 아이템 */}
                              <div className="ml-4 space-y-1">
                                {rel.storeProductOption?.storeProductOptionItemList
                                  ?.length ? (
                                  rel.storeProductOption.storeProductOptionItemList.map(
                                    (item) => (
                                      <div
                                        key={item.id}
                                        className="flex justify-between text-sm text-gray-600"
                                      >
                                        <span>{item.name}</span>
                                        <span>
                                          {item.amount.toLocaleString()}원
                                        </span>
                                      </div>
                                    )
                                  )
                                ) : (
                                  <div className="text-gray-400 text-sm ml-2">
                                    옵션 아이템이 없습니다.
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-gray-400 text-sm ml-2">
                            옵션 그룹이 없습니다.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
