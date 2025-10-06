export async function apiFetch<CommonResponse>(
  endpoint: string,
  options: RequestInit = {}
): Promise<CommonResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${baseUrl}${endpoint}`;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ✅ 타입 안전한 headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error: ${res.status} ${text}`);
  }

  return res.json();
}