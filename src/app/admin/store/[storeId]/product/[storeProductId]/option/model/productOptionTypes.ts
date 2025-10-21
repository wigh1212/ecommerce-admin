export interface ProductOption {
  id: number;
  storeId: number;
  name: string;
  required: boolean;
  minSelectCount: number;
  maxSelectCount: number;
  status: boolean;
  existProduct: boolean;
  storeProductOptionItemList : storeProductOptionItem[];
}


export interface storeProductOptionItem {
  id: number;
  storeId: number;
  storeProductOptionId: number;
  name: string;
  amount: number;
}