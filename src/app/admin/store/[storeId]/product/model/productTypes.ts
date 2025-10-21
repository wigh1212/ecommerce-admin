export interface Product {
  id: number;
  storeId: number;
  name: string;
  amount: number;
  image: string;
  info: string;
  status: boolean;
  existCategory: boolean;
  storeProductOptionRelList : storeProductOptionRel[];
}


export interface storeProductOptionRel {
  id: number;
  storeId: number;
  storeProductId: number;
  storeProductOptionId: number;

  storeProductOption : storeProductOption;

}


export interface storeProductOption {
  id: number;
  storeId: number;
  name: string;
  required: boolean;
  minSelectCount: number;
  maxSelectCount: number;
  exitsProduct: boolean;
  storeProductOptionItemList : storeProductOptionItem[];
}


export interface storeProductOptionItem {
  id: number;
  storeId: number;
  storeProductOptionId: number;
  name: string;
  amount: number;
}


export interface storeProductOptionRel {
  id: number;
  storeId: number;
  storeProductId: number;
  storeProductOptionId: number;

}






export interface ProductTableProps {
  items: Product[];
  onRefresh: () => void;
  loading: boolean;
  selectedId?: number | null;
  onSelect?: (id: number) => void;
}