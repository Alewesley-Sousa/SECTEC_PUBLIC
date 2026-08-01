const LOCAL_API_BASE = "https://sectec-ja.up.railway.app/api";

function normalizeApiBaseUrl(rawUrl?: string) {
  const configuredUrl = rawUrl?.trim();

  if (!configuredUrl && import.meta.env.PROD) {
    throw new Error("VITE_API_URL não configurada no frontend.");
  }

  const baseUrl = (configuredUrl || LOCAL_API_BASE).replace(/\/+$/, "");
  return baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`;
}

export const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_URL);

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function readError(response: Response) {
  try {
    const data = await response.json();
    if (typeof data?.message === "string") return data.message;
    if (Array.isArray(data?.message)) return data.message.join(" ");
  } catch {
    // Alguns erros do backend podem não vir em JSON.
  }

  return "Não foi possível concluir a solicitação.";
}

type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function apiRequest<T>(
  path: string,
  { body, headers, ...options }: ApiRequestOptions = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new ApiError(await readError(response), response.status);
  }

  if (response.status === 204) return undefined as T;
  if (!response.headers.get("content-type")?.includes("application/json")) {
    throw new ApiError(
      "Este endpoint não retornou JSON. Verifique se a rota existe no backend publicado.",
      response.status
    );
  }

  return response.json() as Promise<T>;
}