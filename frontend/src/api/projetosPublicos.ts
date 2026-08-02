import { apiRequest } from "../lib/api";

export interface TemaResumo {
  id: number;
  nome: string;
}

export interface MembroEquipe {
  id: number;
  nome: string;
  role: string;
}

export interface ProjetoPublico {
  id: number;
  titulo: string;
  descricao: string;
  tema: TemaResumo;
  equipe: MembroEquipe[];
  video: string | false | null;
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
  evento?: string;
  page?: number;
  limit?: number;
}

function montarQueryString(filtros: ProjetosPublicosFiltros) {
  const params = new URLSearchParams();

  if (filtros.search?.trim()) params.set("search", filtros.search.trim());
  if (filtros.curso) params.set("curso", filtros.curso);
  if (filtros.eixo) params.set("eixo", filtros.eixo);
  if (filtros.evento) params.set("evento", filtros.evento);
  if (filtros.page) params.set("page", String(filtros.page));
  if (filtros.limit) params.set("limit", String(filtros.limit));

  const query = params.toString();
  return query ? `?${query}` : "";
}

export function getProjetosPublicos(filtros: ProjetosPublicosFiltros = {}) {
  return apiRequest<ProjetosPublicosResponse>(
    `/projetos/public${montarQueryString(filtros)}`
  );
}

export async function getEixosTematicosPublicos() {
  const response = await getProjetosPublicos({ page: 1, limit: 100 });
  const temasPorId = new Map(
    response.data.map((projeto) => [projeto.tema.id, projeto.tema])
  );

  return Array.from(temasPorId.values()).sort((a, b) =>
    a.nome.localeCompare(b.nome, "pt-BR")
  );
}
