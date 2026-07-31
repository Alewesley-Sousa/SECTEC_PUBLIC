import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjetoCard } from "./ProjetoCard";
import { ProjetoModal } from "./ProjetoModal";
import { projetosMock } from "../lib/mockData";
import type { Projeto } from "../types/projeto";

const ITENS_POR_PAGINA = 8;

export function ProjetosGrid() {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [projetoSelecionado, setProjetoSelecionado] = useState<Projeto | null>(null);

  const totalPaginas = Math.ceil(projetosMock.length / ITENS_POR_PAGINA);

  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const projetosDaPagina = projetosMock.slice(inicio, inicio + ITENS_POR_PAGINA);

  function irParaPagina(pagina: number) {
    setPaginaAtual(pagina);
    document
      .getElementById("projetos")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="projetos" className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 scroll-mt-24">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Projetos apresentados
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {projetosMock.length} projetos encontrados
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={paginaAtual}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5"
        >
          {projetosDaPagina.map((projeto) => (
            <ProjetoCard
              key={projeto.id}
              projeto={projeto}
              onClick={() => setProjetoSelecionado(projeto)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {totalPaginas > 1 && (
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-10 sm:mt-12 flex-wrap px-2">
          <button
            onClick={() => irParaPagina(paginaAtual - 1)}
            disabled={paginaAtual === 1}
            className="p-1.5 sm:p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-sectec-50 hover:text-sectec-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500 transition-colors"
            aria-label="Página anterior"
          >
            <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>

          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
            <button
              key={pagina}
              onClick={() => irParaPagina(pagina)}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                pagina === paginaAtual
                  ? "bg-sectec-600 text-white"
                  : "text-slate-600 hover:bg-sectec-50 hover:text-sectec-600"
              }`}
            >
              {pagina}
            </button>
          ))}

          <button
            onClick={() => irParaPagina(paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas}
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