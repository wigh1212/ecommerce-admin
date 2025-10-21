"use client";

import { useState } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  // ✅ 일별 데이터
  const dailyData = [
    { date: "10/01", sales: 240000, orders: 121 },
    { date: "10/02", sales: 320000, orders: 150 },
    { date: "10/03", sales: 180000, orders: 90 },
    { date: "10/04", sales: 410000, orders: 200 },
    { date: "10/05", sales: 290000, orders: 130 },
    { date: "10/06", sales: 360000, orders: 175 },
    { date: "10/07", sales: 440000, orders: 220 },
  ];

  // ✅ 월별 데이터
  const monthlyData = [
    { month: "2025-01", sales: 3200000, orders: 1420 },
    { month: "2025-02", sales: 2800000, orders: 1300 },
    { month: "2025-03", sales: 3500000, orders: 1520 },
    { month: "2025-04", sales: 4200000, orders: 1700 },
    { month: "2025-05", sales: 4600000, orders: 1820 },
    { month: "2025-06", sales: 5000000, orders: 2000 },
    { month: "2025-07", sales: 4800000, orders: 1950 },
    { month: "2025-08", sales: 5200000, orders: 2100 },
    { month: "2025-09", sales: 5400000, orders: 2230 },
    { month: "2025-10", sales: 5800000, orders: 2400 },
  ];

  const [viewMode, setViewMode] = useState<"daily" | "monthly">("daily");

  const data = viewMode === "daily" ? dailyData : monthlyData;

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">📊 대시보드</h1>
        <span className="text-sm text-gray-500">
          {viewMode === "daily" ? "최근 7일 기준" : "2025년 월별 집계"}
        </span>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard title="총 매출액" value="2,320,000원" color="blue" />
        <SummaryCard title="주문 건수" value="1,085건" color="green" />
        <SummaryCard title="평균 주문금액" value="21,380원" color="purple" />
      </div>

      {/* 그래프 */}
      <div className="bg-white rounded-2xl shadow p-6">
        {/* 상단 타이틀 + 버튼 */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {viewMode === "daily" ? "일별 매출 & 주문 추이" : "월별 매출 & 주문 집계"}
          </h2>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("daily")}
              className={`px-3 py-1 rounded-md text-sm font-medium border transition ${
                viewMode === "daily"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
              }`}
            >
              일별
            </button>
            <button
              onClick={() => setViewMode("monthly")}
              className={`px-3 py-1 rounded-md text-sm font-medium border transition ${
                viewMode === "monthly"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
              }`}
            >
              월별
            </button>
          </div>
        </div>

        {/* 차트 */}
        <ResponsiveContainer width="100%" height={380}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={viewMode === "daily" ? "date" : "month"} />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickFormatter={(v) => `${v / 1000}k`}
            />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip
              formatter={(value: any) =>
                typeof value === "number" ? value.toLocaleString() : value
              }
            />
            <Legend />
            <Bar
              yAxisId="right"
              dataKey="orders"
              barSize={35}
              fill="#34d399"
              name="주문건수"
              radius={[8, 8, 0, 0]}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              strokeWidth={3}
              name="매출액"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: "blue" | "green" | "purple";
}) {
  const colors: Record<string, string> = {
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    green: "bg-green-100 text-green-700 border-green-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
  };

  return (
    <div
      className={`p-5 border rounded-xl shadow-sm hover:shadow-md transition ${colors[color]}`}
    >
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}