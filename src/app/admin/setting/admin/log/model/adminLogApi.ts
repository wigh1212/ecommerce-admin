"use client"
import { apiFetch } from "../../../../../../../shared/api/base";
import { Response } from "../../../../../../../shared/commonResponse/commonType";
import { AdminLog} from "./adminLogTypes";


export async function getAdminLogList(): Promise<Response<AdminLog[]>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch("/api/v1/admin/log", {
    method: "GET",
  });

  return res as Response<AdminLog[]>;
}

