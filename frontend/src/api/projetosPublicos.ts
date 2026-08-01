// src/api/projetosPublicos.ts
import { apiRequest } from "../lib/api"; // ajusta o caminho pro seu arquivo de client existente

export type PapelEquipe = "autor" | "integrante";

export interface MembroEquipe {
  id: number;
  nome: string;
  role: PapelEquipe;
}

export interface TemaResumo {
  id: number;
  nome: string;
}

export interface ProjetoPublico {
  id: number;
  titulo: string;
  descricao: string;
  tema: TemaResumo;
  equipe: MembroEquipe[];
  video: string | null;
  hasBanner: boolean;
}

export interface ProjetosPublicosMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProjetosPublicosResponse {
  data: ProjetoPublico[];
  meta: ProjetosPublicosMeta;
}

export interface ProjetosPublicosFiltros {
  search?: string;
  curso?: string;
  eixo?: string;
  evento?: string | number;
  page?: number;
  limit?: number;
}

const DEFAULT_LIMIT = 8;

function buildQuery(filtros: ProjetosPublicosFiltros): string {
  const params = new URLSearchParams();

  if (filtros.search?.trim()) params.set("search", filtros.search.trim());
  if (filtros.curso) params.set("curso", filtros.curso);
  if (filtros.eixo) params.set("eixo", filtros.eixo);
  if (filtros.evento !== undefined && filtros.evento !== "") {
    params.set("evento", String(filtros.evento));
  }

  params.set("page", String(filtros.page ?? 1));
  params.set("limit", String(filtros.limit ?? DEFAULT_LIMIT));

  return params.toString();
}

export async function getProjetosPublicos(
  filtros: ProjetosPublicosFiltros = {}
): Promise<ProjetosPublicosResponse> {
  const query = buildQuery(filtros);
  return apiRequest<ProjetosPublicosResponse>(`/projetos/public?${query}`, {
  });
}