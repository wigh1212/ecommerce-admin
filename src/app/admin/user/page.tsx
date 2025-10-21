"use client"
import { useEffect, useRef, useState } from "react";
import { getUserList } from "./model/userApi";
import UserListTable from "./ui/UserListTable";
import UserInfoTabs from "./ui/UserInfoTabs";

export default function User() {
  const [leftWidth, setLeftWidth] = useState(50); // 초기값 50%
  const isResizing = useRef(false);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setId] = useState(null);
  const onSelectId=(id:any) => {
    setId(id);
  }
  
  const refresh = async () => {
    setLoading(true);
    try {
      const response = await getUserList();
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
      const response = await getUserList();
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
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;

      const containerWidth = window.innerWidth;
      const newLeftWidth = (e.clientX / containerWidth) * 100;

      // 최소/최대 제한
      if (newLeftWidth > 10 && newLeftWidth < 90) {
        setLeftWidth(newLeftWidth);
      }
    };
    const handleMouseUp = () => {
      isResizing.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = () => {
    isResizing.current = true;
  };



  useEffect(() => {
    console.log("Selected ID changed:", selectedId);
  }, [selectedId]);



  return (
    <div className="flex flex-row h-screen select-none">
      {/* 왼쪽 리스트 영역 */}
      <div
        className="bg-gray-100 p-6 whitespace-nowrap overflow-auto"
        style={{ width: `${leftWidth}%` }}
      >
        <h1 className="text-2xl font-bold mb-4">유저 리스트</h1>
        <UserListTable items={data ? data : []} onRefresh={refresh} loading={loading} selectedId={selectedId} onSelect={onSelectId} />
      </div>

      {/* 가운데 '|' 구분선 */}
      <div
        className="w-1 bg-gray-400 hover:bg-gray-600 cursor-col-resize flex items-center justify-center"
        onMouseDown={handleMouseDown}
      >
        <div className="text-gray-700 text-sm select-none">|</div>
      </div>

      {/* 오른쪽 상세페이지 영역 */}
      <div
        className="bg-white p-6 whitespace-nowrap overflow-x-auto flex-1"
        style={{ width: `${100 - leftWidth}%` }}
      >
          <UserInfoTabs userId={Number(selectedId)} />
      </div>
    </div>
  );
}