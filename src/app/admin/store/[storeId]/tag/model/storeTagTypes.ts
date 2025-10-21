export interface StoreTag {
  id: number;
  name: string;
  exists: boolean;
}

export interface StoreTagProps {
  items: StoreTag[];
  createAction?: (formData:any) => void;
  deleteAction?: (id: number) => void;
}