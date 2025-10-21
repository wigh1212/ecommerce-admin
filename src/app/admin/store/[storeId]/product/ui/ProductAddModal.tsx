import { useState } from "react";
import { Product } from "../model/productTypes";
import Button from "@/app/login/ui/Button";
import { saveStoreProduct } from "../model/productApi";
import { useParams } from "next/navigation";
import { logoFileUpload } from "../../model/storeDetailApi";

export default function ProductAddModal({
  refresh,
  setIsModalOpen,
}: {
  refresh: () => void;
  setIsModalOpen: (open: boolean) => void;
}) {
  const params = useParams(); // 👈 params는 객체로 리턴
  const storeId =Number(params.storeId);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<Partial<Product>>({
    storeId : storeId,
    name: "",
    amount: 0,
    image: "",
    info: "",
  });

  const handleSubmit = async () => {
    try {
    const response = await saveStoreProduct(storeId, form); 
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await logoFileUpload("3", file);
      if (response.result === "SUCCESS") {
        const imagePath = response.data?.imagePath; // ← 괄호() 추가
        alert("파일 업로드 성공!");

        setForm((prev) => ({ ...prev, image: imagePath || "" }));

      } else {
        alert(response.message || "업로드 실패");
      }
    } catch (error) {
      console.error("업로드 에러:", error);
      alert("파일 업로드 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };



 return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[420px]">
            <h3 className="text-lg font-semibold mb-4">상품 등록</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  상품명
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
                  가격
                </label>
                <input
                  type="number"
                  value={form.amount || 0}
                  onChange={(e) =>
                    setForm({ ...form, amount: Number(e.target.value) })
                  }
                  className="w-full border rounded px-3 py-2 mt-1 text-sm"
                  placeholder="가격을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  이미지 URL
                </label>
                
                <div className="flex items-center gap-4">
                {form.image ? (
                  <img
                    src={form.image}
                    alt="매장 로고"
                    className="w-24 h-24 object-cover border rounded"
                  />
                ) : (
                  <div className="w-24 h-24 border rounded flex items-center justify-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                  {uploading && (
                    <p className="text-sm text-gray-500 mt-1">업로드 중...</p>
                  )}
                </div>
              </div>



              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  설명
                </label>
                <textarea
                  value={form.info || ""}
                  onChange={(e) => setForm({ ...form, info: e.target.value })}
                  className="w-full border rounded px-3 py-2 mt-1 text-sm"
                  placeholder="상품 설명 입력"
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
      )
    }