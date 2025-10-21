
import { apiFetch } from "../../../../../../../shared/api/base";
import { Response } from "../../../../../../../shared/commonResponse/commonType";
import { Product } from "./productTypes";


export async function getProductList(storeId : number ): Promise<Response<Product[]>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch(`/api/v1/store/${storeId}/product`, {
    method: "GET",
  });

  return res as Response<Product[]>;
}


export async function getProduct(storeId : number , productId:number | null): Promise<Response<Product>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch(`/api/v1/store/${storeId}/product/${productId}` , {
    method: "GET",
  });

  return res as Response<Product>;
}

export async function updateStoreProduct( storeId : number , storeProductId:number | null , formData : any ): Promise<Response<Product>> {
  const res = await apiFetch(`/api/v1/store/${storeId}/product/${storeProductId}`, {
    method: "PUT",
    body: JSON.stringify(formData),
  });

  return res as Response<Product>;
}


export async function saveStoreProduct( storeId : number , formData : any ): Promise<Response<Product>> {
  const res = await apiFetch(`/api/v1/store/${storeId}/product`, {
    method: "POST",
    body: JSON.stringify(formData),
  });
  return res as Response<Product>;
}

export async function deleteStoreProduct(storeId : number , productId : number ): Promise<Response<string>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch(`/api/v1/store/${storeId}/product/${productId}`, {
    method: "DELETE",
  });

  return res as Response<string>;
}