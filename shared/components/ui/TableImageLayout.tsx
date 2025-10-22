import React, { useEffect } from "react";

interface TableImageLayoutProps<T> {
  title?: string;
  columns: {
    key: keyof T | string;
    label: string;
    render?: (row: T) => React.ReactNode;
    type?: "text" | "image";
    width?: string;
  }[];
  data: T[];
  loading?: boolean;
  onRefresh?: () => void;
  onRowClick?: (row: T) => void;
  selectedRowId?: string | number | null;
  minWidth?: string;
  popupUrl?: string;
}

export default function TableImageLayout<T>({
  title,
  columns,
  data,
  loading = false,
  onRefresh,
  onRowClick,
  selectedRowId,
  minWidth = "800px",
  popupUrl,
}: TableImageLayoutProps<T>) {
  useEffect(() => {
    window.refreshData = refreshData;
  }, [onRefresh]);

  const refreshData = () => {
    if (onRefresh) onRefresh();
  };

  const handleOpenPopup = () => {
    if (!popupUrl) return;
    window.open(popupUrl, "등록", "width=600,height=700,scrollbars=yes");
  };

  return (
    <div className="flex flex-col h-full">
      {(title || onRefresh) && (
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-600 font-medium">{title}</div>
          <div className="flex items-center gap-2">
            {popupUrl && (
              <button
                onClick={handleOpenPopup}
                className="px-3 py-1 border rounded text-sm bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                + 추가
              </button>
            )}
            {onRefresh && (
              <button
                className="px-3 py-1 border rounded text-sm bg-white hover:bg-gray-50 transition"
                onClick={onRefresh}
                disabled={loading}
              >
                {loading ? "로딩중..." : "새로고침"}
              </button>
            )}
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table
          className={`min-w-[${minWidth}] w-full bg-white rounded-lg shadow divide-y divide-gray-200 whitespace-nowrap`}
        >
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-600"
                  style={{ width: col.width }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-gray-400"
                >
                  데이터가 없습니다.
                </td>
              </tr>
            ) : (
              data.map((row: any) => (
                <tr
                  key={row.id ?? JSON.stringify(row)}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={`cursor-pointer transition duration-150 ease-in-out
                    hover:bg-blue-50 hover:shadow-sm
                    ${selectedRowId === row.id ? "bg-blue-100 font-semibold" : ""}`}
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3 text-gray-700">
                      {col.render
                        ? col.render(row)
                        : col.type === "image" && row[col.key] ? (
                            <img
                              src={row[col.key]}
                              alt="thumbnail"
                              className="w-16 h-16 object-cover rounded border"
                            />
                          ) : (
                            row[col.key] ?? "-"
                          )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}