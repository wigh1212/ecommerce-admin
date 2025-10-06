import { AdminTokenPayload } from "../commonResponse/commonType";

export function getAdmin(): AdminTokenPayload | null {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const base64Payload = token.split(".")[1];
    if (!base64Payload) return null;

    // Base64Url → Base64로 변환
    const base64 = base64Payload.replace(/-/g, "+").replace(/_/g, "/");

    // 디코딩 후 JSON 파싱
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const payload = JSON.parse(jsonPayload);

    return {
      adminId: payload.adminId,
      username: payload.username,
      displayName: payload.displayName,
      name: payload.name,
      type: payload.type,
      storeId: payload.storeId,
    };
  } catch (err) {
    console.error("JWT parsing error:", err);
    return null;
  }
}