
import TableLayout from "../../../../../shared/components/ui/TableLayout";
import {  User, userTableProps } from "../model/userTypes";
export default function UserListTable({
  items,
  loading,
  selectedId,
  onSelect,
  onRefresh,
}: userTableProps) {
  const columns = [
    { key: "id", label: "ID" },
    { key: "userName", label: "로그인아이디" },
    { key: "name", label: "이름" },
    { key: "phone", label: "휴대폰번호" },
    { key: "zipCode", label: "우편번호" },
    { key: "address", label: "주소" },
    { key: "addressDetail", label: "상세주소", render: (row: User) => (
        <span className="truncate max-w-xs inline-block">{row.addressDetail}</span>
      )
    },
  ];

  return (
    <TableLayout
      title="유저 목록"
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