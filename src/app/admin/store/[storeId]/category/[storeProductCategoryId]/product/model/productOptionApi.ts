
import { apiFetch } from "../../../../../../../../../shared/api/base";
import { Response } from "../../../../../../../../../shared/commonResponse/commonType";
import { Product } from "../../../model/CategoryTypes";


export async function getCategoryProductList(storeId : number,storeProductCategoryId:number ): Promise<Response<Product[]>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch(`/api/v1/store/${storeId}/product?storeProductCategoryId=${storeProductCategoryId}`, {
    method: "GET",
  });

  return res as Response<Product[]>;
}


export async function saveProductCategoryRel(storeId : number ,formData : any ): Promise<Response<string>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch(`/api/v1/store/${storeId}/product/category/rel`, {
    method: "POST",
    body:JSON.stringify(formData)
  });

  return res as Response<string>;
}


export async function deleteProductCategoryRel(storeId : number , storeProductCategoryId:number, storeProductId:number  ): Promise<Response<string>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch(`/api/v1/store/${storeId}/product/category/rel?storeProductCategoryId=${storeProductCategoryId}&storeProductId=${storeProductId} `, {
    method: "DELETE",
  });

  return res as Response<string>;
}
