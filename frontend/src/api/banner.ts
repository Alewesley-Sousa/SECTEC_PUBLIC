// src/api/banner.ts
import { API_BASE_URL } from "../lib/api";

// Troca aqui assim que o endpoint real do banner for confirmado.
export function getBannerUrl(projetoId: number): string {
  return `${API_BASE_URL}/projetos/${projetoId}/pdf`;
}