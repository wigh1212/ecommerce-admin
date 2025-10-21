
import { apiFetch } from "../../../../../../../shared/api/base";
import { Response } from "../../../../../../../shared/commonResponse/commonType";
import { StoreTag } from "./storeTagTypes";


export async function getStoreTagList(storeId : number ): Promise<Response<StoreTag[]>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch(`/api/v1/store/${storeId}/tag`, {
    method: "GET",
  });

  return res as Response<StoreTag[]>;
}

export async function createStoreTag(storeId : number ,formData:any ): Promise<Response<StoreTag[]>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch(`/api/v1/store/${storeId}/tag`, {
    method: "POST",
    body: JSON.stringify(formData),
  });

  return res as Response<StoreTag[]>;
}

export async function deleteStoreTag(storeId : number , tegId:number ): Promise<Response<string>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch(`/api/v1/store/${storeId}/tag/${tegId}`, {
    method: "DELETE",
  });

  return res as Response<string>;
}