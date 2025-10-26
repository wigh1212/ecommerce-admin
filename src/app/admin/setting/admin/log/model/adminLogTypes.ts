export interface AdminLog {
  id: number;
  description: string;
  ip: string;
  path: string;
  param: string;
  
}


export interface AdminLogTableProps {
  items: AdminLog[];
  onRefresh: () => void;
  loading: boolean;
  selectedId?: number | null;
  onSelect?: (id: number) => void;
}