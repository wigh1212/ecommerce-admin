"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "../../../shared/utils/auth";
import Header from "../../../shared/components/main/Header";
import SideTab from "../../../shared/components/main/SideTab";
import Dashboard from "./dashboard/page";
import Store from "./store/page";
interface Item {
  id: number;
  name: string;
  description: string;
}

export default function MainPage() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [activeTab, setActiveTab] = useState("Dashboard"); 

  // 로그인 안 되어 있으면 login으로 이동
  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, [router]);

  // 탭에 따라 중앙 컨텐츠 렌더링
  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <div className="flex-1 overflow-auto">
            <Dashboard />
          </div>
        );

      case "가맹점":
        return (
          <div className="flex-1 overflow-auto">
            <Store />
          </div>
        );

      case "유저관리":
        return (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            선택된 탭이 없습니다.
          </div>
        );

      default:
        return (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            선택된 탭이 없습니다.
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        {/* 탭 선택 시 activeTab 상태 변경 */}
        <SideTab activeTab={activeTab} onChangeTab={setActiveTab} />
        {renderContent()}
      </div>
    </div>
  );
}