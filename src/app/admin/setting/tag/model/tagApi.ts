"use client"

import { apiFetch } from "../../../../../../shared/api/base";
import { Response } from "../../../../../../shared/commonResponse/commonType";
import { Tag } from "./tagTypes";


export async function getTagList(): Promise<Response<Tag[]>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch("/api/v1/tag", {
    method: "GET",
  });

  return res as Response<Tag[]>;
}

