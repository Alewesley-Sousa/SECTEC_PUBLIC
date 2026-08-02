import { Info } from "lucide-react";
import SectecLogo from "./LogoSVG";

interface FooterProps {
  onSobreClick: () => void;
}

export function Footer({ onSobreClick }: FooterProps) {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <SectecLogo className="h-9 w-auto" />

        <button
          type="button"
          onClick={onSobreClick}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-sectec-600 transition-colors"
        >
          <Info size={16} />
          Sobre
        </button>

        <p className="text-xs text-slate-400 whitespace-nowrap">
          © {ano} SECTEC — Projeto Escolar.
        </p>
      </div>
    </footer>
  );
}
