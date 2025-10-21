import { useState } from "react";
import { Category, Product } from "../model/CategoryTypes";
import Button from "@/app/login/ui/Button";
import { saveStoreProductCategory } from "../model/CategoryApi";
import { useParams } from "next/navigation";

export default function CategoryAddModal({
  refresh,
  setIsModalOpen,
}: {
  refresh: () => void;
  setIsModalOpen: (open: boolean) => void;
}) {
  const params = useParams(); // 👈 params는 객체로 리턴
  const storeId =Number(params.storeId);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<Partial<Category>>({
    storeId : storeId,
    name: "",
    description: "",
  });

  const handleSubmit = async () => {
    try {
    const response = await saveStoreProductCategory(storeId, form); 
    if (response.result === "SUCCESS") {
            alert("저장되었습니다!");
            setIsModalOpen(false);
        } else {
            alert(response.message);
        }
    } catch (err: any) {
        alert(err.message || "저장 실패");
    } finally {
        refresh();
    }
}


 return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white rounded-2xl shadow-xl p-6 w-[420px]">
          <h3 className="text-lg font-semibold mb-4">카테고리 등록</h3>

          <div className="space-y-3">
          <div>
                <label className="block text-sm font-medium text-gray-700">
                  카테고리명
                </label>
                <input
                  type="text"
                  value={form.name || ""}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border rounded px-3 py-2 mt-1 text-sm"
                  placeholder="상품명을 입력하세요"
                />
          </div>
           <div>
                <label className="block text-sm font-medium text-gray-700">
                  설명
                </label>
                <input
                  type="text"
                  value={form.description || ""}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border rounded px-3 py-2 mt-1 text-sm"
                  placeholder="상품명을 입력하세요"
                />
          </div>
            {/* 하단 버튼 */}
          <div className="flex justify-end mt-6 space-x-3">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
              >
                취소
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                등록
              </Button>
          </div>
        </div>
      </div>
    </div>
  )
}