
import TableLayout from "../../../../../shared/components/ui/Table";
import { Store, storeTableProps } from "../model/storeTypes";
export default function StoreListTable({
  items,
  loading,
  selectedId,
  onSelect,
  onRefresh,
}: storeTableProps) {
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "매장명" },
    { key: "ceo", label: "담당자" },
    { key: "phone", label: "휴대폰번호" },
    { key: "address", label: "주소", render: (row: Store) => (
        <span className="truncate max-w-xs inline-block">{row.address}</span>
      )
    },
  ];

  return (
    <TableLayout
      title="매장 목록"
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