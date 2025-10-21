import { apiFetch, apiFetchFormData } from "../../../../../../shared/api/base";
import { fileUploadResponse, Response } from "../../../../../../shared/commonResponse/commonType";
import { UserDetail } from "./userTypes";

export async function getUserDetail( userId : number ): Promise<Response<UserDetail>> {
 
 const res = await apiFetch(`/api/v1/user/${userId}`, {
    method: "GET",
 });

  return res as Response<UserDetail>;
}


export async function saveStore( userId : number , formData : any ): Promise<Response<UserDetail>> {
  const res = await apiFetch(`/api/v1/user/${userId}`, {
    method: "PUT",
    body: JSON.stringify(formData),
  });

  return res as Response<UserDetail>;
}