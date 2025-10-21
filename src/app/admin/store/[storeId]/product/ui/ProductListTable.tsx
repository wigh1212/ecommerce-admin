import { useState } from "react";
import { Product } from "../model/productTypes";
import Button from "@/app/login/ui/Button";
import ProductAddModal from "./ProductAddModal";

export default function ProductListTable({ products, refresh,setSelectProductId ,deleteAction ,selectedProductId }: { products:Product[];  refresh : () => void; setSelectProductId?: (id: number | null) => void; deleteAction :(id:number) =>void; selectedProductId: number } ) {
  const [openProductId, setOpenProductId] = useState<number | null>(null);
  const [isModal,setIsModalOpen] = useState(false);

  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const filteredProducts = products.filter((p) => {
      if (filterStatus === "all") return true;
      if (filterStatus === "active") return p.status === true;
      if (filterStatus === "inactive") return p.status === false;
    });


  return (
    <div className="space-y-4">

       {/* 상단 헤더 */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">상품 목록</h2>


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

      {isModal && <ProductAddModal refresh={refresh} setIsModalOpen={setIsModalOpen} />}

  <div className="max-h-[500px] overflow-y-auto space-y-2">
      {filteredProducts.map((product) => (
        <div
            key={product.id}
            onClick={() =>
                  setSelectProductId?.(Number(product.id))
                }
           className={`border rounded-lg p-3 shadow-sm hover:shadow-md transition cursor-pointer 
            ${selectedProductId === product.id ? "bg-blue-50 border-blue-400" : "bg-white"}
           `}
          >
            <div className="flex justify-between items-center" >
              {/* 왼쪽: 이미지 + 상품 정보 */}
              <div className="flex items-center gap-4" >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md border shadow-sm"
                  />
                ) : (
                  <span className="text-gray-400 text-xs w-16 h-16 flex items-center justify-center border rounded-md whitespace-nowrap">
                    이미지 없음
                  </span>
                )}

                <div className="flex flex-col">
                  <div className="font-semibold text-gray-800">{product.name}</div>
                  <div className="text-sm text-gray-500">
                    {product.amount.toLocaleString()}원
                  </div>
                </div>
              </div>

              {/* 오른쪽: 토글 버튼 + 화살표 */}
              <div className="flex items-center gap-3">
                {/* 토글 버튼 */}
                <div
                  onClick={() => deleteAction(product.id)}
                  className={`relative w-12 h-6 rounded-full cursor-pointer transition-all duration-300 
                    ${product.status ? "bg-blue-500" : "bg-gray-300"}
                  `}
                >
                  <div
                    className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300
                      ${product.status ? "translate-x-6" : "translate-x-0"}
                    `}
                  ></div>
                </div>

                {/* ▼ 펼치기 버튼 */}
                <div
                  onClick={() =>
                    setOpenProductId(openProductId === product.id ? null : product.id)
                  }
                  className="text-gray-400 cursor-pointer select-none"
                >
                  {openProductId === product.id ? "▲" : "▼"}
                </div>
              </div>
            </div>

          {openProductId === product.id && (
            <div className="mt-3 space-y-2 border-t pt-3">
              {product.storeProductOptionRelList?.map((rel) => (
                <div key={rel.id} className="border rounded p-3 my-2">
                  {/* 옵션 그룹 */}
                  {rel.storeProductOption && (
                    <div className="mb-2">
                      <div className="font-semibold text-gray-800">
                        옵션 그룹: {rel.storeProductOption.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        (필수: {rel.storeProductOption.required ? "O" : "X"}) / 최소 {rel.storeProductOption.minSelectCount}개 ~ 최대 {rel.storeProductOption.maxSelectCount}개
                      </div>
                    </div>
                  )}

                  {/* 옵션 아이템 */}
                  <div className="ml-4 space-y-1">
                    {rel.storeProductOption?.storeProductOptionItemList?.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm text-gray-600">
                        <span>{item.name}</span>
                        <span>{item.amount.toLocaleString()}원</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      </div>
    </div>
  );
}