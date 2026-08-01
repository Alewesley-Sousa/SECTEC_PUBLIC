import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, TrendingUp, FileText, Users2, Menu, X } from "lucide-react";
import SectecLogo from "../components/LogoSVG";
import imagemEstudo from "../assets/study.jpg";
import imagemPoster from "../assets/post.jpg";
import { TiltCard } from "../components/TiltCard";

interface HeroProps {
  busca: string;
  onBuscaChange: (valor: string) => void;
  curso: string;
  onCursoChange: (valor: string) => void;
}

export function Hero({ busca, onBuscaChange, curso, onCursoChange }: HeroProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <section className="bg-white">
      {/* Navbar */}
      <header
        className={`sticky top-0 z-40 px-4 sm:px-6 py-3 sm:py-4 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <SectecLogo className="h-10 w-auto sm:h-12 md:h-[52px]" />

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
            <NavLink href="#" active>
              Início
            </NavLink>
            <NavLink href="#projetos">Projetos</NavLink>
            <NavLink href="#sobre">Sobre</NavLink>
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-slate-700 p-1"
            aria-label="Abrir menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-[78%] max-w-xs bg-white z-[60] md:hidden shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100">
                <SectecLogo className="h-9 w-auto" />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-700 p-1"
                  aria-label="Fechar menu"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex flex-col px-5 py-4 text-[15px] font-medium text-slate-700">
                <a
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className="py-3.5 border-b border-slate-50 text-sectec-600"
                >
                  Início
                </a>
                <a
                  href="#projetos"
                  onClick={() => setMenuOpen(false)}
                  className="py-3.5 border-b border-slate-50"
                >
                  Projetos
                </a>
                <a href="#sobre" onClick={() => setMenuOpen(false)} className="py-3.5">
                  Sobre o SECTEC
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Hero content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-16 sm:pb-24 grid md:grid-cols-[1.05fr_0.95fr] gap-8 sm:gap-10 items-center">
        <div className="order-1 relative">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.1] md:leading-[1.05] tracking-tight"
          >
            Conheça os
            <br />
            projetos que
            <br />
            fazem a{" "}
            <span className="relative inline-block text-sectec-600">
              diferença!
              <svg
                className="absolute left-0 -bottom-1 w-full h-3"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M2 8 C 50 2, 150 2, 198 8"
                  stroke="#22c55e"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 sm:mt-6 text-sm text-slate-600 max-w-sm leading-relaxed"
          >
            Explore trabalhos acadêmicos e técnicos desenvolvidos por estudantes em
            diversas áreas do conhecimento.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 rounded-lg bg-sectec-50 overflow-hidden max-w-xl"
          >
            <StatBadge icon={<Users2 size={18} />} label="Estudantes protagonistas" />
            <StatBadge icon={<GraduationCap size={18} />} label="Inovação e pesquisa" />
            <StatBadge icon={<TrendingUp size={18} />} label="Impacto na comunidade" />
          </motion.div>
        </div>

        <div className="order-2 relative hidden md:block h-[420px]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute top-16 left-4 w-28 h-28 z-20"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                />
              </defs>
              <text fill="#16a34a" fontSize="8" fontWeight="700" letterSpacing="1.5">
                <textPath href="#circlePath">SECTEC • PROJETO ESCOLAR • FEIRA • </textPath>
              </text>
            </svg>
          </motion.div>
          <div className="absolute top-16 left-4 w-28 h-28 z-20 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-sectec-600 flex items-center justify-center">
              <FileText className="text-white" size={20} />
            </div>
          </div>

          <div className="absolute top-0 right-0 w-72 h-64">
            <TiltCard
              idleDelay={0}
              className="w-full h-full rounded-[2rem] border-4 border-sectec-900 overflow-hidden bg-sectec-50 shadow-xl"
            >
              <img
                src={imagemEstudo}
                alt="Descreva o que aparece na imagem 1"
                className="w-full h-full object-cover"
              />
            </TiltCard>
          </div>

          <div className="absolute bottom-16 left-8 w-48 h-40 z-10">
            <TiltCard
              idleDelay={1.5}
              className="w-full h-full rounded-3xl border-4 border-sectec-900 overflow-hidden bg-white shadow-xl"
            >
              <img
                src={imagemPoster}
                alt="Descreva o que aparece na imagem 2"
                className="w-full h-full object-cover"
              />
            </TiltCard>
          </div>
        </div>
      </div>

      {/* Barra de filtros flutuante */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-14 relative z-10"
      >
        <div className="bg-white rounded-xl shadow-[0_20px_45px_-15px_rgba(34,197,94,0.35)] hover:shadow-[0_25px_55px_-15px_rgba(34,197,94,0.45)] transition-shadow duration-300 border border-slate-200 p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <FiltroSelect label="Evento" placeholder="Todos os eventos" />
          <FiltroCurso value={curso} onChange={onCursoChange} />
          <FiltroSelect label="Eixo temático" placeholder="Todos os eixos temáticos" />
          <FiltroBusca value={busca} onChange={onBuscaChange} />
        </div>
      </motion.div>
    </section>
  );
}

function NavLink({
  href,
  children,
  active = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <a href={href} className="relative py-1 group">
      <span
        className={
          active
            ? "text-sectec-600"
            : "text-slate-700 group-hover:text-sectec-600 transition-colors"
        }
      >
        {children}
      </span>
      <span
        className={`absolute left-0 -bottom-0.5 h-0.5 bg-sectec-600 transition-all duration-300 ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </a>
  );
}

function StatBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <motion.div
      whileHover={{ backgroundColor: "rgba(220, 252, 231, 1)" }}
      className="flex items-center justify-center gap-2 px-3 py-3 text-sectec-700 text-xs font-medium text-center cursor-default transition-colors"
    >
      {icon}
      {label}
    </motion.div>
  );
}

function FiltroSelect({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1.5">{label}</label>
      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-sectec-600 focus:ring-2 focus:ring-sectec-100 transition-all">
        <option>{placeholder}</option>
      </select>
    </div>
  );
}
{/* nao funcional*/}
const OPCOES_CURSO = [
  { value: "", label: "Todos os cursos" },
  { value: "informatica", label: "Informática" },
  { value: "enfermagem", label: "Enfermagem" },
  { value: "contabilidade", label: "Contabilidade" },
];

function FiltroCurso({
  value,
  onChange,
}: {
  value: string;
  onChange: (valor: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1.5">Curso</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-sectec-600 focus:ring-2 focus:ring-sectec-100 transition-all"
      >
        {OPCOES_CURSO.map((opcao) => (
          <option key={opcao.value} value={opcao.value}>
            {opcao.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function FiltroBusca({
  value,
  onChange,
}: {
  value: string;
  onChange: (valor: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1.5">
        Buscar por projeto ou aluno
      </label>
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Digite o nome do projeto ou aluno..."
          className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-sectec-600 focus:ring-2 focus:ring-sectec-100 transition-all"
        />
      </div>
    </div>
  );
}