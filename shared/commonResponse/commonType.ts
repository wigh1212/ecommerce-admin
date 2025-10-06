
// 로그인 응답 구조
export interface Response {
  result: "SUCCESS" | "FAILURE";
  data: string | null;
  message: string;
  errorCode: string | null;
}

export interface AdminTokenPayload {
  adminId: string;
  username: string;
  displayName: string;
  name: string;
  type: string;
  storeId: string;
}
