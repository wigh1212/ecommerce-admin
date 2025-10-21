"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { getAdmin } from "../../utils/jwtParser";



export const tabs: { name: string; path: string; down: { name: string; path: string }[] | null }[] = getAdmin()?.type==="ADMIN"? [
  { name: "Dashboard", path: "/admin/dashboard", down: null },
  { name: "가맹점", path: "/admin/store", down: null },
  { name: "유저관리", path: "/admin/user", down: null },
  {
    name: "사이트관리",
    path: "",
    down: [
      { name: "태그관리", path: "/admin/setting/tag" },
      { name: "배너관리", path: "/admin/setting/banner" },
      { name: "관리자로그", path: "/admin/setting/admin/log" },
    ],
  },
] : [
  { name: "Dashboard", path: "/admin/dashboard", down: null },
  { name: "가맹점", path: "/admin/store", down: null }  
];

interface SideTabProps {
  activeTab?: string;
  onChangeTab?: (tab: string) => void;
}

export default function SideTab({ activeTab, onChangeTab }: SideTabProps) {
  const router = useRouter();
  const pathname = usePathname();

  // 열려 있는 하위 메뉴 상태 (예: "사이트관리")
  const [openTab, setOpenTab] = useState<string | null>(null);

  // 활성화된 탭 감지
  const derivedActive = useMemo<string>(() => {
    if (activeTab) return activeTab;
    if (!pathname) return "Dashboard";

    // 하위 메뉴 경로와도 매칭 가능하게
    for (const tab of tabs) {
      if (tab.path && pathname.startsWith(tab.path)) return tab.name;
      if (tab.down) {
        const match = tab.down.find((d) => pathname.startsWith(d.path));
        if (match) return match.name;
      }
    }

    return "Dashboard";
  }, [activeTab, pathname]);

  // 클릭 처리
  const handleClick = (tabName: string, path: string) => {
    const tab = tabs.find((t) => t.name === tabName || t.down?.find(t => t.name==tabName));
    if (!tab) return;

    // path가 비어있으면 열기/닫기 토글
    if (path === "") {
      setOpenTab((prev) => (prev === tabName ? null : tabName));
      return;
    }

    // path가 존재하면 이동
    if (onChangeTab) onChangeTab(tabName);
    // router.push(path);
  };

  return (
    <aside className="w-56 bg-gray-100 p-4 border-r flex flex-col">
      <h2 className="font-semibold mb-4 text-gray-700">관리 메뉴</h2>

      <ul className="flex flex-col gap-1">
        {tabs.map((tab) => {
          const isActive = derivedActive === tab.name;
          const isOpen = openTab === tab.name;

          return (
            <li key={tab.name} className="flex flex-col">
              {/* 상위 메뉴 */}
              <div
                onClick={() => handleClick(tab.name, tab.path)}
                className={`p-2 rounded cursor-pointer transition-colors flex justify-between items-center ${
                  isActive
                    ? "bg-blue-500 text-white font-semibold"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                <span>{tab.name}</span>
                {tab.down && (
                  <span className="text-xs">
                    {isOpen ? "▲" : "▼"}
                  </span>
                )}
              </div>

              {/* 하위 메뉴 렌더링 */}
              {tab.down && isOpen && (
                <ul className="ml-3 mt-1 flex flex-col gap-1">
                  {tab.down.map((child) => {
                    const isChildActive = derivedActive === child.name;
                    return (
                      <li
                        key={child.path}
                        onClick={() => handleClick(child.name, child.path)}
                        className={`p-2 rounded cursor-pointer text-sm transition-colors ${
                          isChildActive
                            ? "bg-blue-400 text-white font-semibold"
                            : "hover:bg-gray-200 text-gray-700"
                        }`}
                      >
                        └ {child.name}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}