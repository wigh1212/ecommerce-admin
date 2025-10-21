
// 로그인 응답 구조
export interface Response<T> {
  result: "SUCCESS" | "FAILURE";
  data: T | null;
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



export interface fileUploadResponse {
  contentType: string;
  imagePath: string;
  name: string;
  originalFilename: string;
  size: string;
}
