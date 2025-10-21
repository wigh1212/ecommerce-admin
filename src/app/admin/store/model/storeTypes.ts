export interface Store {
  id: number;
  name: string;
  businessNumber: string;
  ceo: string | null;
  phone: string;
  email: string;
  address: string;
  image: string;
  status: boolean;
}


export interface storeTableProps {
  items: Store[];
  onRefresh: () => void;
  loading: boolean;
  selectedId?: number | null;
  onSelect?: (id: number) => void;
}