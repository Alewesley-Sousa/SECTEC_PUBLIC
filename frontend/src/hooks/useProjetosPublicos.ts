// src/hooks/useProjetosPublicos.ts
import { useCallback, useEffect, useRef, useState } from "react";
import {
  getProjetosPublicos,
  type ProjetoPublico,
  type ProjetosPublicosFiltros,
  type ProjetosPublicosMeta,
} from "../api/projetosPublicos";
import { ApiError } from "../lib/api"; // ajusta o caminho

interface UseProjetosPublicosResult {
  projetos: ProjetoPublico[];
  meta: ProjetosPublicosMeta | null;
  loading: boolean;
  error: string | null;
  filtros: ProjetosPublicosFiltros;
  setFiltros: (novos: Partial<ProjetosPublicosFiltros>) => void;
  setPage: (page: number) => void;
}

export function useProjetosPublicos(
  inicial: ProjetosPublicosFiltros = {}
): UseProjetosPublicosResult {
  const [filtros, setFiltrosState] = useState<ProjetosPublicosFiltros>({
    page: 1,
    limit: 8,
    ...inicial,
  });
  const [projetos, setProjetos] = useState<ProjetoPublico[]>([]);
  const [meta, setMeta] = useState<ProjetosPublicosMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // evita que uma resposta antiga (de uma busca anterior) sobrescreva uma mais nova
  const requestId = useRef(0);

  useEffect(() => {
    const currentRequest = ++requestId.current;
    setLoading(true);
    setError(null);

    getProjetosPublicos(filtros)
      .then((res) => {
        if (currentRequest !== requestId.current) return;
        setProjetos(res.data);
        setMeta(res.meta);
      })
      .catch((err) => {
        if (currentRequest !== requestId.current) return;
        setError(
          err instanceof ApiError && err.status === 500 && filtros.curso
            ? "O servidor não conseguiu filtrar por curso."
            : err instanceof ApiError
            ? err.message
            : "Não foi possível carregar os projetos."
        );
        setProjetos([]);
        setMeta(null);
      })
      .finally(() => {
        if (currentRequest === requestId.current) setLoading(false);
      });
  }, [filtros]);

  const setFiltros = useCallback((novos: Partial<ProjetosPublicosFiltros>) => {
    setFiltrosState((prev) => ({
      ...prev,
      ...novos,
      // qualquer mudança de filtro reseta a página, exceto quando é a própria page mudando
      page: novos.page ?? 1,
    }));
  }, []);

  const setPage = useCallback((page: number) => {
    setFiltrosState((prev) => ({ ...prev, page }));
  }, []);

  return { projetos, meta, loading, error, filtros, setFiltros, setPage };
}
