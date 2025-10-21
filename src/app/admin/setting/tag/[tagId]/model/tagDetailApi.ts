
import { apiFetch } from "../../../../../../../shared/api/base";
import { Response } from "../../../../../../../shared/commonResponse/commonType";
import { TagDetail } from "./tagTypes";

export async function getTagDetail( tagId : number ): Promise<Response<TagDetail>> {
 const res = await apiFetch(`/api/v1/tag/${tagId}`, {
    method: "GET",
 });

  return res as Response<TagDetail>;
}


export async function saveTag( tagId : number , formData : any ): Promise<Response<TagDetail>> {
  const res = await apiFetch(`/api/v1/tag/${tagId}`, {
    method: "PUT",
    body: JSON.stringify(formData),
  });

  return res as Response<TagDetail>;
}