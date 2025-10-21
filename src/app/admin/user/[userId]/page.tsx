"use client"
import { useEffect, useState } from "react";
import { getUserDetail, saveStore } from "./model/userDetailApi";
import { useParams } from "next/navigation";

export default function StoreDetail() {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<{
    id: number|null;
    userName:string;
    name: string;
    phone: string;
    address: string ;
    zipCode: string;
    email: string;
    addressDetail: string ;
  }>({
    id:  null,
    userName:"",
    name: "",
    phone: "",
    address: "",
    zipCode: "",
    email: "",
    addressDetail:""
  });

  const [saving, setSaving] = useState(false);
  
  const params = useParams(); // 👈 params는 객체로 리턴됨
  
  const userId =Number(params.userId);

  const init = async () => {
    setLoading(true);
    try{
      const response = await getUserDetail(userId);
      if (response.result === "SUCCESS") {
          setData(response.data ?? null);
          setFormData({
            id: userId,
            userName : response.data?.userName || "",
            name: response.data?.name || "",
            phone: response.data?.phone || "",
            email: response.data?.email || "",
            address: response.data?.address || "",
            zipCode: response.data?.zipCode || "",
            addressDetail: response.data?.addressDetail || "",
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

useEffect(() => {
  init();
}, []);

//  const handleSubmit = async  () => {
//     setSaving(true);
//     try {
//       const response = await saveStore(storeId, formData); 
//       if (response.result === "SUCCESS") {
//         alert("저장되었습니다!");
//         setFormData({
//              id: userId,
//             name: response.data?.name || "",
//             phone: response.data?.phone || "",
//             email: response.data?.email || "",
//             address: response.data?.address || "",
//             zipCode: response.data?.zipCode || "",
//             addressDetail: response.data?.addressDetail || "",
//           });
//       } else {
//         alert(response.message);
//       }
//     } catch (err: any) {
//       alert(err.message || "저장 실패");
//     } finally {
//       setSaving(false);
//     }
//   };

 const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

return (
    <div className="flex flex-row h-screen select-none">

    {data ? (
    <div className="flex-1 p-4 overflow-auto">
      <h2 className="text-lg font-bold mb-6 text-center">유저 정보</h2>
      {/* <form className="space-y-4"  onSubmit={handleSubmit} > */}
      <form className="space-y-4" >
        
        <div>
          <label className="block mb-1 font-medium">로그인아이디<span className="text-red-500"></span></label>
           <input
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">이름<span className="text-red-500"></span></label>
           <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">휴대폰번호<span className="text-red-500"></span></label>
         <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">이메일</label>
           <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">주소<span className="text-red-500">*</span></label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            type="text"
            placeholder="010-1234-5678"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">상세주소</label>
             <input
            name="addressDetail"
            value={formData.addressDetail}
            onChange={handleChange}
            type="text"
            placeholder="example@store.com"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">주소</label>
           <input
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
       
{/*        
       <button
          type="submit"
          disabled={saving}
          className={`w-full text-white py-2 rounded transition-colors ${
            saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {saving ? "저장 중..." : "저장"}
        </button> */}
      </form>
    </div>
    ) : (
      <div>로딩중...</div>
    )}
        
    </div>
  );
}