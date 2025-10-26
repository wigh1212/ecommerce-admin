"use client"
import { useEffect, useRef, useState } from "react";
import { getAdminLogList } from "./model/adminLogApi";
import AdminLogListTable from "./ui/AdminLogListTable";

export default function AdminLog() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setId] = useState(null);
  const onSelectId=(id:any) => {
    setId(id);
  }
  
  const refresh = async () => {
    setLoading(true);
    try {
      const response = await getAdminLogList();
      if (response.result === "SUCCESS") {
        setData(response.data ?? []);
      } else {
        alert(response.message);
      }
    } catch (err: any) {
      alert(err.message || "데이터 로드 실패");
    }
    finally {
      setLoading(false);
    }
  };

  const init = async () => {
    setLoading(true);
    try{
      const response = await getAdminLogList();
      if (response.result === "SUCCESS") {
          setData(response.data ?? []);      
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



  useEffect(() => {
    console.log("Selected ID changed:", selectedId);
  }, [selectedId]);



  return (
    // <div className="flex flex-row h-screen select-none">

      <div
        className="bg-gray-100 p-6 whitespace-nowrap overflow-auto"
      >
        <h1 className="text-2xl font-bold mb-4">관리자로그 리스트</h1>
        <AdminLogListTable items={data ? data : []} onRefresh={refresh} loading={loading} selectedId={selectedId} onSelect={onSelectId} />
      </div>
    // </div>
  );
}