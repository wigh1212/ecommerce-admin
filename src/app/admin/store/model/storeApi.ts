import { apiFetch } from "../../../../../shared/api/base";
import { Response } from "../../../../../shared/commonResponse/commonType";
import { Store } from "./storeTypes";


export async function getStoreList(): Promise<Response<Store[]>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch("/api/v1/store", {
    method: "GET",
  });

  return res as Response<Store[]>;
}

