import { useState } from "react";
import { Option } from "../model/optionTypes";
import Button from "@/app/login/ui/Button";
import OptionAddModal from "./OptionAddModal";

export default function OptionListTable({ options, refresh,setSelectOptionId ,deleteAction ,selectOptionId }: { options:Option[];  refresh : () => void; setSelectOptionId?: (id: number | null) => void; deleteAction:(id:number) => void; selectOptionId:number} ) {
  const [openProductOptionId, setOpenProductOptionId] = useState<number | null>(null);
  const [isModal,setIsModalOpen] = useState(false);
  
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const filterOptions = options.filter((p) => {
      if (filterStatus === "all") return true;
      if (filterStatus === "active") return p.status === true;
      if (filterStatus === "inactive") return p.status === false;
    });

  return (
    <div className="space-y-4">

       {/* 상단 헤더 */}
        <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-800">옵션 목록</h2>
      
      
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
                  + 옵션 등록
                </Button>
              </div>
            </div>

      {isModal && <OptionAddModal refresh={refresh} setIsModalOpen={setIsModalOpen} />}

 <div className="max-h-[500px] overflow-y-auto space-y-2">
      {filterOptions.map((option) => (
        <div key={option.id}   className={`border rounded-lg p-3 shadow-sm hover:shadow-md transition cursor-pointer 
            ${selectOptionId === option.id ? "bg-blue-50 border-blue-400" : "bg-white"}
           `}>
          <button
            onClick={() =>{
              setSelectOptionId?.(openProductOptionId === option.id ? null : option.id)
            }
          }
            className="w-full flex justify-between items-center text-left"
          >
            <div>
              <div className="font-semibold">옵션 그룹: {option.name}</div>
              <div className="text-sm text-gray-500">(필수: {option.required ? "O" : "X"}) / 최소 {option.minSelectCount}개 ~ 최대 {option.maxSelectCount}개</div>
            </div>


            {/* 오른쪽: 토글 버튼 + 화살표 */}
              <div className="flex items-center gap-3">
                {/* 토글 버튼 */}
                <div
                  onClick={() => deleteAction(option.id)}
                  className={`relative w-12 h-6 rounded-full cursor-pointer transition-all duration-300 
                    ${option.status ? "bg-blue-500" : "bg-gray-300"}
                  `}
                >
                  <div
                    className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300
                      ${option.status ? "translate-x-6" : "translate-x-0"}
                    `}
                  ></div>
                </div>

                {/* ▼ 펼치기 버튼 */}
                <div
                  onClick={() =>
                    setOpenProductOptionId(openProductOptionId === option.id ? null : option.id)
                  }
                  className="text-gray-400 cursor-pointer select-none"
                >
                  {openProductOptionId === option.id ? "▲" : "▼"}
                </div>
              </div>

            {/* <div onClick={() =>{setOpenProductOptionId(openProductOptionId === option.id ? null : option.id)} }  className="text-gray-400">{openProductOptionId === option.id ? "▲" : "▼"}</div> */}
        </button>

          {openProductOptionId === option.id && (
            <div className="mt-3 space-y-2 border-t pt-3">
              {option.storeProductOptionItemList?.map((optionItem) => (
                <div key={optionItem.id} className="border rounded p-3 my-2">
                  {/* 옵션 그룹 */}
                  {optionItem && (
                    <div className="mb-2">
                      <div className="font-semibold text-gray-800">
                        옵션아이템명:{optionItem.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {optionItem.amount.toLocaleString()}원
                      </div>
                    </div>
                  )}
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