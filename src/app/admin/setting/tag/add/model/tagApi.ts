"use client"
import { apiFetch } from "../../../../../../../shared/api/base";
import { Response } from "../../../../../../../shared/commonResponse/commonType";
import { Tag } from "./tagTypes";


export async function saveTag(formData:any): Promise<Response<Tag>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch("/api/v1/tag", {
    method: "POST",
    body:JSON.stringify(formData)
  });

  return res as Response<Tag>;
}

