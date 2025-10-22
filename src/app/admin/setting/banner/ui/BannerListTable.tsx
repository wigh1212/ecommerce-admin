import TableImageLayout from "../../../../../../shared/components/ui/TableImageLayout";
import { Banner, bannerTableProps } from "../model/bannerTypes";


// export interface Banner {
//   id: number;               // 배너 고유 ID
//   image: string;            // 이미지 경로 또는 URL
//   link: string;             // 클릭 시 이동할 링크
//   type: string;             // 배너 구분 (예: MAIN, EVENT 등)
//   activate: boolean;        // 활성 여부
//   applyAt: string;          // 적용 일시 (YYYY-MM-DD HH:mm:ss)
//   applyBy: string;          // 등록자 / 수정자 ID 또는 이름
// }

export default function BannerListTable({
  items,
  loading,
  selectedId,
  onSelect,
  onRefresh,
}: bannerTableProps) {
  const columns: {
    key: keyof Banner | string;
    label: string;
    render?: (row: Banner) => React.ReactNode;
    type?: "text" | "image";
    width?: string;
}[] = [
  { key: "id", label: "ID" },
  { key: "image", label: "배너 이미지", type: "image", width: "100px" },
  { key: "type", label: "타입" },
  { key: "link", label: "링크", render: (row: Banner) => (
      <a href={row.link} target="_blank" className="text-blue-500 hover:underline">
        {row.link}
      </a>
    ),
  },
];

  return (
    <TableImageLayout
      title="배너 목록"
      columns={columns}
      data={items}
      loading={loading}
      onRefresh={onRefresh}
      onRowClick={(row) => onSelect?.(row.id)}
      selectedRowId={selectedId}
      minWidth="900px"
      popupUrl="/admin/setting/banner/add"
    />
  );
}