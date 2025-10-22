export interface Banner {
  id: number;               // 배너 고유 ID
  image: string;            // 이미지 경로 또는 URL
  link: string;             // 클릭 시 이동할 링크
  type: string;             // 배너 구분 (예: MAIN, EVENT 등)
  activate: boolean;        // 활성 여부
  applyAt: string;          // 적용 일시 (YYYY-MM-DD HH:mm:ss)
  applyBy: string;          // 등록자 / 수정자 ID 또는 이름
}

export interface bannerTableProps {
  items: Banner[];
  onRefresh: () => void;
  loading: boolean;
  selectedId?: number | null;
  onSelect?: (id: number) => void;
}