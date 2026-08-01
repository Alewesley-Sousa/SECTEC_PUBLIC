import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ProjetoCard } from "./ProjetoCard";
import { ProjetoModal } from "./ProjetoModal";
import type {
  ProjetoPublico,
  ProjetosPublicosMeta,
} from "../api/projetosPublicos";

interface ProjetosGridProps {
  projetos: ProjetoPublico[];
  meta: ProjetosPublicosMeta | null;
  loading: boolean;
  error: string | null;
  page: number;
  onPageChange: (pagina: number) => void;
}

export function ProjetosGrid({
  projetos,
  meta,
  loading,
  error,
  page,
  onPageChange,
}: ProjetosGridProps) {
  const [projetoSelecionado, setProjetoSelecionado] =
    useState<ProjetoPublico | null>(null);

  const totalPaginas = meta?.totalPages ?? 1;
  const totalProjetos = meta?.total ?? 0;

  function irParaPagina(pagina: number) {
    onPageChange(pagina);
    document
      .getElementById("projetos")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      id="projetos"
      className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 scroll-mt-24"
    >
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Projetos apresentados
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {loading ? "Carregando..." : `${totalProjetos} projetos encontrados`}
        </p>
      </div>

      {error && (
        <p className="text-center text-red-600 py-10 text-sm">{error}</p>
      )}

      {!error && loading && (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="h-52 rounded-2xl bg-slate-100 animate-pulse"
            />
          ))}
        </div>
      )}

      {!error && !loading && projetos.length === 0 && (
        <p className="text-center text-slate-500 py-10 text-sm">
          Nenhum projeto encontrado.
        </p>
      )}

      {!error && !loading && projetos.length > 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5"
          >
            {projetos.map((projeto) => (
              <ProjetoCard
                key={projeto.id}
                projeto={projeto}
                onClick={() => setProjetoSelecionado(projeto)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {!error && !loading && totalPaginas > 1 && (
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-10 sm:mt-12 flex-wrap px-2">
          <button
            onClick={() => irParaPagina(page - 1)}
            disabled={page === 1}
            className="p-1.5 sm:p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-sectec-50 hover:text-sectec-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500 transition-colors"
            aria-label="Página anterior"
          >
            <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>

          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
            (pagina) => (
              <button
                key={pagina}
                onClick={() => irParaPagina(pagina)}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  pagina === page
                    ? "bg-sectec-600 text-white"
                    : "text-slate-600 hover:bg-sectec-50 hover:text-sectec-600"
                }`}
              >
                {pagina}
              </button>
            )
          )}

          <button
            onClick={() => irParaPagina(page + 1)}
            disabled={page === totalPaginas}
            className="p-1.5 sm:p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-sectec-50 hover:text-sectec-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500 transition-colors"
            aria-label="Próxima página"
          >
            <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
        </div>
      )}

      <AnimatePresence>
        {projetoSelecionado && (
          <ProjetoModal
            projeto={projetoSelecionado}
            onClose={() => setProjetoSelecionado(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}