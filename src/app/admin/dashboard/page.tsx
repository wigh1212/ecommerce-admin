export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Dashboard</h1>
      <p>이곳은 관리자 대시보드입니다.</p>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-100 rounded-lg shadow">
          <h3 className="font-semibold text-blue-700">오늘 주문</h3>
          <p className="text-3xl font-bold mt-2">124건</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow">
          <h3 className="font-semibold text-green-700">신규 가입자</h3>
          <p className="text-3xl font-bold mt-2">37명</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg shadow">
          <h3 className="font-semibold text-yellow-700">재고 부족</h3>
          <p className="text-3xl font-bold mt-2">5개</p>
        </div>
      </div>
    </div>
  );
}
