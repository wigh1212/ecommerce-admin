
import { apiFetch } from "../../../../../../../../../shared/api/base";
import { Response } from "../../../../../../../../../shared/commonResponse/commonType";
import { storeProductOptionItem} from "./optionItemTypes";


export async function getOptionItemList(storeId : number , storeProductOptionId:number | null ): Promise<Response<storeProductOptionItem[]>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch(`/api/v1/store/${storeId}/product/option/${storeProductOptionId}/item`, {
    method: "GET",
  });

  return res as Response<storeProductOptionItem[]>;
}

export async function getOptionItem(storeId : number , storeProductOptionId:number | null ,storeProductOptionItemId:number | null): Promise<Response<storeProductOptionItem>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch(`/api/v1/store/${storeId}/product/option/${storeProductOptionId}/item/${storeProductOptionItemId}` , {
    method: "GET",
  });

  return res as Response<storeProductOptionItem>;
}

export async function updateStoreProductOptionItem( storeId : number , storeProductOptionId:number | null ,storeProductOptionItemId:number | null , formData : any ): Promise<Response<storeProductOptionItem>> {
  const res = await apiFetch(`/api/v1/store/${storeId}/product/option/${storeProductOptionId}/item/${storeProductOptionItemId}`, {
    method: "PUT",
    body: JSON.stringify(formData),
  });

  return res as Response<storeProductOptionItem>;
}


export async function saveStoreProductOptionItem( storeId : number ,storeProductOptionId:number | null,  formData : any ): Promise<Response<storeProductOptionItem>> {
  const res = await apiFetch(`/api/v1/store/${storeId}/product/option/${storeProductOptionId}/item`, {
    method: "POST",
    body: JSON.stringify(formData),
  });
  return res as Response<storeProductOptionItem>;
}

export async function deleteStoreProductOptionItem( storeId : number ,storeProductOptionId:number | null, storeProductOptionItemId : number): Promise<Response<string>> {
  
  const res = await apiFetch(`/api/v1/store/${storeId}/product/option/${storeProductOptionId}/item/${storeProductOptionItemId}`, {
    method: "DELETE",
  });
  return res as Response<string>;
}