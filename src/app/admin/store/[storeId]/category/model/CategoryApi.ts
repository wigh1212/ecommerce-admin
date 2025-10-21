
import { apiFetch } from "../../../../../../../shared/api/base";
import { Response } from "../../../../../../../shared/commonResponse/commonType";
import { Category } from "./CategoryTypes";


export async function getStoreProductCategoryList(storeId : number ): Promise<Response<Category[]>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch(`/api/v1/store/${storeId}/product/category`, {
    method: "GET",
  });

  return res as Response<Category[]>;
}

export async function getStoreProductCategory(storeId : number , storeProductCategoryId:number | null): Promise<Response<Category>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch(`/api/v1/store/${storeId}/product/category/${storeProductCategoryId}` , {
    method: "GET",
  });

  return res as Response<Category>;
}



export async function deleteStoreProductCategory( storeId : number , storeProductCategoryId:number ): Promise<Response<string>> {
  const res = await apiFetch(`/api/v1/store/${storeId}/product/category/${storeProductCategoryId}`, {
    method: "DELETE",
  });

  return res as Response<string>;
}


export async function updateStoreProductCategory( storeId : number , storeProductCategoryId:number | null , formData : any ): Promise<Response<Category>> {
  const res = await apiFetch(`/api/v1/store/${storeId}/product/category/${storeProductCategoryId}`, {
    method: "PUT",
    body: JSON.stringify(formData),
  });

  return res as Response<Category>;
}


export async function saveStoreProductCategory( storeId : number , formData : any ): Promise<Response<Category>> {
  const res = await apiFetch(`/api/v1/store/${storeId}/product/category`, {
    method: "POST",
    body: JSON.stringify(formData),
  });
  return res as Response<Category>;
}