import { useState } from "react";

export default function UserInfoTabs(props: { userId: number | null }) {
    const [activeTab, setActiveTab] = useState("정보");
    const { userId } = props;
    const TABS = ["정보"];
    
    const renderTabContent = () => {
    if (!userId) return <div>좌측에서 유저를 선택해주세요.</div>;
    switch (activeTab) {
      case "정보":
        return <iframe
        src={'/admin/user/' + userId}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="Static HTML Page"
      />
      // case "상품":
      //   return <iframe
      //   src={'/admin/store/' + storeId+'/product'}
      //   width="100%"
      //   height="100%"
      //   style={{ border: 'none' }}
      //   title="Static HTML Page"
      // />
      // case "옵션":
      //    return <iframe
      //   src={'/admin/store/' + storeId+'/option'}
      //   width="100%"
      //   height="100%"
      //   style={{ border: 'none' }}
      //   title="Static HTML Page"
      // />
      // case "카테고리":
      //   return <iframe
      //   src={'/admin/store/' + storeId+'/category'}
      //   width="100%"
      //   height="100%"
      //   style={{ border: 'none' }}
      //   title="Static HTML Page"
      // />
      // case "이벤트":
      //   return <div>매장 ID {storeId}의 이벤트 정보 표시</div>;
      default:
        return null;
    }
  };


    return (<>
        <div className="flex border-b mb-4">
        {TABS.map((tab) => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"}`}
            >
                {tab}
            </button>
        ))}
        </div><div className="mt-4 h-screen">{renderTabContent()}</div>
    </>
    )
}