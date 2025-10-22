"use client"

import { apiFetch } from "../../../../../../shared/api/base";
import { Response } from "../../../../../../shared/commonResponse/commonType";
import { Banner } from "./bannerTypes";


export async function getBannerList(): Promise<Response<Banner[]>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch("/api/v1/banner", {
    method: "GET",
  });

  return res as Response<Banner[]>;
}

