export interface User {
  id: number;
  userName: string;
  name: string;
  phone: string;
  address: string | null;
  zipCode: string;
  email: string;
  addressDetail: string ;
}


export interface userTableProps {
  items: User[];
  onRefresh: () => void;
  loading: boolean;
  selectedId?: number | null;
  onSelect?: (id: number) => void;
}