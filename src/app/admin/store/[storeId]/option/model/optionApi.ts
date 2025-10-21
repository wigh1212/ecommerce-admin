
import { apiFetch } from "../../../../../../../shared/api/base";
import { Response } from "../../../../../../../shared/commonResponse/commonType";
import { Option} from "./optionTypes";


export async function getOptionList(storeId : number ): Promise<Response<Option[]>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch(`/api/v1/store/${storeId}/product/option`, {
    method: "GET",
  });

  return res as Response<Option[]>;
}

export async function getOption(storeId : number , storeProductOptionId:number | null): Promise<Response<Option>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch(`/api/v1/store/${storeId}/product/option/${storeProductOptionId}` , {
    method: "GET",
  });

  return res as Response<Option>;
}

export async function deleteStoreProductOption( storeId : number , storeProductOptionId:number): Promise<Response<string>> {
  const res = await apiFetch(`/api/v1/store/${storeId}/product/option/${storeProductOptionId}`, {
    method: "DELETE",
  });

  return res as Response<string>;
}


export async function updateStoreProductOption( storeId : number , storeProductOptionId:number | null , formData : any ): Promise<Response<Option>> {
  const res = await apiFetch(`/api/v1/store/${storeId}/product/option/${storeProductOptionId}`, {
    method: "PUT",
    body: JSON.stringify(formData),
  });

  return res as Response<Option>;
}


export async function saveStoreProductOption( storeId : number , formData : any ): Promise<Response<Option>> {
  const res = await apiFetch(`/api/v1/store/${storeId}/product/option`, {
    method: "POST",
    body: JSON.stringify(formData),
  });
  return res as Response<Option>;
}