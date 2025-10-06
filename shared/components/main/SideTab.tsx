"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";


export const tabs: { name: string; path: string }[] =  [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "가맹점", path: "/admin/store" },
    { name: "유저관리", path: "/admin/users" },
    { name: "사이트관리", path: "/admin/settings" },
];


interface SideTabProps {
  /** 부모가 현재 선택된 탭을 제어할 때 전달. 없으면 내부적으로 pathname에서 유추 */
  activeTab?: string;
  /** 부모가 탭 변경을 제어하고자 할 때 전달. (탭 클릭 시 호출) */
  onChangeTab?: (tab: string) => void;
}

export default function SideTab({ activeTab, onChangeTab }: SideTabProps) {
  const router = useRouter();
  const pathname = usePathname();

  // activeTab prop이 없으면 URL(pathname)로부터 활성 탭을 유추
  const derivedActive = useMemo<string>(() => {
    if (activeTab) return activeTab;
    if (!pathname) return "Dashboard";
    const matched = tabs.find((t) => pathname.startsWith(t.path));
    return matched?.name ?? "Dashboard";
  }, [activeTab, pathname]);

  const handleClick = (tabName: string) => {
    const tab = tabs.find((t) => t.name === tabName)!;

    // 부모가 onChangeTab을 넘겼다면 먼저 호출 (부모가 상태를 바꿀 수 있게)
    if (onChangeTab) {
      onChangeTab(tabName);
      // 부모가 상태만 바꾸고 라우팅도 원하면, 부모에서 router.push 해주세요.
      // (아래의 router.push는 부모가 라우팅을 직접하지 않길 원할 때 fallback으로 동작)
      return;
    }

    router.push(tab.path);
  };

  return (
    <aside className="w-56 bg-gray-100 p-4 border-r flex flex-col">
      <h2 className="font-semibold mb-4 text-gray-700">관리 메뉴</h2>

      <ul className="flex flex-col gap-1">
        {tabs.map((tab) => {
          const isActive = derivedActive === tab.name;
          return (
            <li
              key={tab.path}
              onClick={() => handleClick(tab.name)}
              className={`p-2 rounded cursor-pointer transition-colors ${
                isActive
                  ? "bg-blue-500 text-white font-semibold"
                  : "hover:bg-gray-200 text-gray-700"
              }`}
            >
              {tab.name}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}