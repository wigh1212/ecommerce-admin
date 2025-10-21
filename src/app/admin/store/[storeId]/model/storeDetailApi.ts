import { apiFetch, apiFetchFormData } from "../../../../../../shared/api/base";
import { fileUploadResponse, Response } from "../../../../../../shared/commonResponse/commonType";
import { StoreDetail } from "./storeTypes";

export async function getStoreDetail( storeId : number ): Promise<Response<StoreDetail>> {
 
 const res = await apiFetch(`/api/v1/store/${storeId}`, {
    method: "GET",
 });

  return res as Response<StoreDetail>;
}


export async function saveStore( storeId : number , formData : any ): Promise<Response<StoreDetail>> {
  const res = await apiFetch(`/api/v1/store/${storeId}`, {
    method: "PUT",
    body: JSON.stringify(formData),
  });

  return res as Response<StoreDetail>;
}


export async function logoFileUpload( folderCode : string , file : any ): Promise<Response<fileUploadResponse>> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folderCode", String(folderCode));
  const res = await apiFetchFormData(`/api/v1/file/upload`,
    formData,
    // {headers: { "Content-Type": "multipart/form-data" }, }
  );
  return res as Response<fileUploadResponse>;
}