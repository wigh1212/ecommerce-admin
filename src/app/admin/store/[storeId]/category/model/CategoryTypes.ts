export interface Category {
    id: number | null;
    storeId: number;
    name:string;
    description: string;
    status: boolean;
    storeProductMapCategoryList : CategoryProductRel[];
}

export interface CategoryProductRel {
    id: number;
    storeId: number;
    storeProductId : number;
    storeProductCategoryId : number;
    storeProduct : Product;
}

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