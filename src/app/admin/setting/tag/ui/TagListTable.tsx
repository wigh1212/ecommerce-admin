
import TableLayout from "../../../../../../shared/components/ui/TableLayout";
import { Tag, tagTableProps } from "../model/tagTypes";
export default function TagListTable({
  items,
  loading,
  selectedId,
  onSelect,
  onRefresh,
}: tagTableProps) {
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "태그명", render: (row: Tag) => (
        <span className="truncate max-w-xs inline-block">{row.name}</span>
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
      popupUrl="/admin/setting/tag/add"
    />
  );
}