import { useState } from "react";
import Button from "@/app/login/ui/Button";
import { useParams } from "next/navigation";
import { Option } from "../model/optionTypes";
import { saveStoreProductOption } from "../model/optionApi";

export default function OptionAddModal({
  refresh,
  setIsModalOpen,
}: {
  refresh: () => void;
  setIsModalOpen: (open: boolean) => void;
}) {
  const params = useParams(); // 👈 params는 객체로 리턴
  const storeId =Number(params.storeId);
  const [form, setForm] = useState<Partial<Option>>({
    storeId : storeId,
    name: "",
    required: false,
    minSelectCount: 0,
    maxSelectCount: 0,
    status : true,
  });

  const handleSubmit = async () => {
    try {
    const response = await saveStoreProductOption(storeId, form); 
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
    <div className="fixed inset-0 flex items-center justify-center z-[1000]">
      {/* 배경 클릭 시 닫기 */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setIsModalOpen(false)}
      />

      {/* 모달 본체 */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-[420px] animate-fadeIn z-[1001]">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-lg font-semibold text-gray-800">옵션 아이템 등록</h3>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* 폼 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              아이템명
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="예: 매운맛, 치즈 추가"
            />
          </div>
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
  );
}