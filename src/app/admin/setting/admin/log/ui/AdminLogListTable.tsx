
import TableLayout from "../../../../../../../shared/components/ui/TableLayout";
import { AdminLog, AdminLogTableProps } from "../model/adminLogTypes";
export default function AdminLogListTable({
  items,
  loading,
  selectedId,
  onSelect,
  onRefresh,
}: AdminLogTableProps) {

  const columns = [
    { key: "id", label: "ID" },
    { key: "ip", label: "ip주소" },
    { key: "path", label: "경로" },
    { key: "description", label: "정보" },
    { key: "param", label: "파라메터", render: (row: AdminLog) => (
        <span className="truncate max-w-xs inline-block">{row.param}</span>
      )
    },
  ];

  return (
    <TableLayout
      title="관리자로그 목록"
      columns={columns}
      data={items}
      loading={loading}
      onRefresh={onRefresh}
      onRowClick={(row) => onSelect?.(row.id)}
      selectedRowId={selectedId}
      minWidth="800px"
    />
  );
}