export async function apiFetch<Response>(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${baseUrl}${endpoint}`;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

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



export async function apiFetchFormData<Response>(
  endpoint: string,
  formData: FormData,
  options: RequestInit = {}
): Promise<Response> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${baseUrl}${endpoint}`;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ⚠️ form-data 전송 시엔 Content-Type을 직접 지정하지 않습니다.
  // 브라우저가 boundary를 자동으로 생성하므로 오히려 지정하면 오류 발생 가능.
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...options,
    method: options.method || "POST",
    body: formData,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error: ${res.status} ${text}`);
  }

  return res.json();
}