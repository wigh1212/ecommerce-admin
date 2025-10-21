"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createStoreTag, deleteStoreTag, getStoreTagList } from "./model/storeTagApi";
import StoreTagList from "./ui/StoreTagList";

export default function StoreTag() {
  const [data, setData] = useState<any[]>([]);
  const params = useParams(); // 👈 params는 객체로 리턴됨
  const storeId =Number(params.storeId);
  const init = async () => {
    try{
      const response = await getStoreTagList(storeId);
      if (response.result === "SUCCESS") {
          setData(response.data ?? []);      
      } else {
        alert(response.message);
      }
    } catch (err: any) {
      alert(err.message || "데이터 로드 실패");
    }
  }
  
  const deleteAction = async (id:number) => {
    try {
      const response = await deleteStoreTag(storeId,id);
      if (response.result === "SUCCESS") {
        init();
      } else {
        alert(response.message);
      }
    } catch (err: any) {
      alert(err.message || "데이터 로드 실패");
    }
  };

  const createAction = async (formData:any) => {
    const payload = {
    ...formData,
    storeId:storeId, // 여기 추가 ✅
    };
     try {
      const response = await createStoreTag(storeId,payload);
      if (response.result === "SUCCESS") {
        init();
      } else {
        alert(response.message);
      }
    } catch (err: any) {
      alert(err.message || "데이터 로드 실패");
    }
  };

  useEffect(() => {
    init();
  }, []);

  return   (
    <StoreTagList
      items={data}
      createAction={createAction}
      deleteAction={deleteAction}
    />
  );
  
}