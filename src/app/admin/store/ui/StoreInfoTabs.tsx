import { useState } from "react";

export default function StoreInfoTabs(props: { storeId: number | null }) {
    const [activeTab, setActiveTab] = useState("정보");
    const { storeId } = props;
    const TABS = ["정보", "상품", "옵션", "카테고리", "태그"];
    
    const renderTabContent = () => {
    if (!storeId) return <div>좌측에서 매장을 선택해주세요.</div>;
    switch (activeTab) {
      case "정보":
        return <iframe
        src={'/admin/store/' + storeId}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="Static HTML Page"
      />
      case "상품":
        return <iframe
        src={'/admin/store/' + storeId+'/product'}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="Static HTML Page"
      />
      case "옵션":
         return <iframe
        src={'/admin/store/' + storeId+'/option'}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="Static HTML Page"
      />
      case "카테고리":
        return <iframe
        src={'/admin/store/' + storeId+'/category'}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="Static HTML Page"
      />
      case "태그":
         return <iframe
        src={'/admin/store/' + storeId+'/tag'}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="Static HTML Page"
      />
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