import { apiFetch } from "../../../../shared/api/base";
import { Response } from "../../../../shared/commonResponse/commonType";
import { LoginPayload } from "./authTypes";


export async function login(payload: LoginPayload): Promise<Response<string>> {
  const res = await apiFetch("/api/v1/admin/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res as Response<string>;
}