
import { apiFetch } from "../../../../../../../../../shared/api/base";
import { Response } from "../../../../../../../../../shared/commonResponse/commonType";
import {ProductOption} from "./productOptionTypes";


export async function getProductOptionList(storeId : number,storeProductId:number ): Promise<Response<ProductOption[]>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch(`/api/v1/store/${storeId}/product/option?storeProductId=${storeProductId}`, {
    method: "GET",
  });

  return res as Response<ProductOption[]>;
}


export async function saveProductOptionRel(storeId : number ,formData : any ): Promise<Response<ProductOption[]>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch(`/api/v1/store/${storeId}/product/option/rel`, {
    method: "POST",
    body:JSON.stringify(formData)
  });

  return res as Response<ProductOption[]>;
}


export async function deleteProductOptionRel(storeId : number , storeProductId:number, storeProductOptionId:number  ): Promise<Response<ProductOption[]>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch(`/api/v1/store/${storeId}/product/option/rel?storeProductId=${storeProductId}&storeProductOptionId=${storeProductOptionId} `, {
    method: "DELETE",
  });

  return res as Response<ProductOption[]>;
}
