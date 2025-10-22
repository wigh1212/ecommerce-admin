"use client"
import { apiFetch } from "../../../../../../../shared/api/base";
import { Response } from "../../../../../../../shared/commonResponse/commonType";
import { Banner } from "./bannerTypes";


export async function saveBanner(formData:any): Promise<Response<Banner>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch("/api/v1/banner", {
    method: "POST",
    body:JSON.stringify(formData)
  });

  return res as Response<Banner>;
}

