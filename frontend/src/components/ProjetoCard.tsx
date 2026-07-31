import { useState } from "react";
import { motion } from "framer-motion";
import type { Projeto } from "../types/projeto";

interface ProjetoCardProps {
  projeto: Projeto;
  onClick: () => void;
}

const LIMITE_DESCRICAO = 90;

export function ProjetoCard({ projeto, onClick }: ProjetoCardProps) {
  const [expandido, setExpandido] = useState(false);

  const descricaoLonga = projeto.descricao.length > LIMITE_DESCRICAO;
  const descricaoExibida =
    expandido || !descricaoLonga
      ? projeto.descricao
      : projeto.descricao.slice(0, LIMITE_DESCRICAO).trimEnd() + "...";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col cursor-pointer active:scale-[0.98] sm:active:scale-100"
    >
      {/* Banner — menor no mobile, cresce em telas maiores */}
      <div className="h-20 sm:h-24 bg-sectec-50 overflow-hidden">
        <img
          src={projeto.bannerUrl}
          alt={`Banner do projeto ${projeto.titulo}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-3 sm:p-4 flex flex-col gap-1.5 sm:gap-2 flex-1">
        <span className="self-start px-2 sm:px-2.5 py-0.5 rounded-full bg-sectec-50 text-sectec-700 text-[10px] sm:text-[11px] font-semibold">
          {projeto.eixoTematico}
        </span>

        <h3 className="text-[13px] sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2">
          {projeto.titulo}
        </h3>

        <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
          {descricaoExibida}
          {descricaoLonga && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpandido((v) => !v);
              }}
              className="ml-1 text-sectec-600 font-medium hover:underline"
            >
              {expandido ? "ver menos" : "ver mais"}
            </button>
          )}
        </p>

        <p className="mt-auto pt-2 text-[10px] sm:text-[11px] text-slate-500 border-t border-slate-100 line-clamp-1">
          <span className="font-medium text-slate-700">Equipe: </span>
          {projeto.equipe.join(", ")}
        </p>
      </div>
    </motion.div>
  );
}