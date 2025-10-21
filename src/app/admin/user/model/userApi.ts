import { apiFetch } from "../../../../../shared/api/base";
import { Response } from "../../../../../shared/commonResponse/commonType";
import { User } from "./userTypes";


export async function getUserList(): Promise<Response<User[]>> {
  // The shared apiFetch already parses JSON and returns typed data.
  const res = await apiFetch("/api/v1/user", {
    method: "GET",
  });

  return res as Response<User[]>;
}

