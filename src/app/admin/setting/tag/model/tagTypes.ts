export interface Tag {
  id: number;
  name: string;
}


export interface tagTableProps {
  items: Tag[];
  onRefresh: () => void;
  loading: boolean;
  selectedId?: number | null;
  onSelect?: (id: number) => void;
}