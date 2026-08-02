import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Code2, ExternalLink, GitBranch, Mail, X } from "lucide-react";

export interface Desenvolvedor {
  id: string;
  nome: string;
  cargo: string;
  bio: string;
  contribuicoes?: string[];
  github?: string;
  linkedin?: string;
  email?: string;
}

// Adicione novos desenvolvedores copiando um objeto com os campos acima.
const DESENVOLVEDORES: Desenvolvedor[] = [];

interface SobreProps {
  aberto: boolean;
  onClose: () => void;
  devs?: Desenvolvedor[];
}

export function Sobre({
  aberto,
  onClose,
  devs = DESENVOLVEDORES,
}: SobreProps) {
  useEffect(() => {
    if (!aberto) return;

    const overflowAnterior = document.body.style.overflow;
    const fecharComEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", fecharComEscape);

    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", fecharComEscape);
    };
  }, [aberto, onClose]);

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/65 backdrop-blur-sm p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="sobre-titulo"
            initial={{ opacity: 0, y: 48, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 48, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            onClick={(event) => event.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            <header className="relative shrink-0 border-b border-sectec-100 bg-gradient-to-br from-sectec-50 to-white px-6 py-6 pr-16 sm:px-9 sm:py-8 sm:pr-20">
              <span className="inline-flex items-center gap-2 rounded-full bg-sectec-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sectec-700">
                <Code2 size={14} />
                Quem fez acontecer
              </span>
              <h2
                id="sobre-titulo"
                className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
              >
                A equipe por trás do SECTEC
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
                Conheça quem participou da criação e evolução desta plataforma.
              </p>

              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar sobre"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-md transition-colors hover:bg-sectec-50 hover:text-sectec-700 sm:right-6 sm:top-6"
              >
                <X size={20} />
              </button>
            </header>

            <div className="sobre-scroll overflow-y-auto px-5 py-6 sm:px-9 sm:py-8">
              {devs.length === 0 ? (
                <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-sectec-100 bg-sectec-50/60 px-6 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sectec-600 shadow-sm">
                    <Code2 size={24} />
                  </span>
                  <p className="mt-4 text-sm font-semibold text-slate-700">
                    Os desenvolvedores serão adicionados aqui.
                  </p>
                  <p className="mt-1 max-w-sm text-xs leading-relaxed text-slate-500">
                    A estrutura já está pronta para nome, cargo, biografia,
                    contribuições e contatos.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {devs.map((dev, index) => (
                    <DesenvolvedorItem key={dev.id} dev={dev} index={index} />
                  ))}
                </div>
              )}
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DesenvolvedorItem({
  dev,
  index,
}: {
  dev: Desenvolvedor;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.2) }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sectec-100 text-sm font-extrabold text-sectec-700">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-slate-900">{dev.nome}</h3>
          <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-sectec-600">
            {dev.cargo}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600">{dev.bio}</p>

      {dev.contribuicoes && dev.contribuicoes.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Contribuições
          </p>
          <ul className="mt-2 space-y-1.5">
            {dev.contribuicoes.map((contribuicao) => (
              <li
                key={contribuicao}
                className="flex gap-2 text-sm leading-relaxed text-slate-600"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sectec-500" />
                {contribuicao}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
        {dev.github && (
          <Contato href={dev.github} label="GitHub" icon={<GitBranch size={15} />} />
        )}
        {dev.linkedin && (
          <Contato
            href={dev.linkedin}
            label="LinkedIn"
            icon={<ExternalLink size={15} />}
          />
        )}
        {dev.email && (
          <Contato
            href={`mailto:${dev.email}`}
            label={dev.email}
            icon={<Mail size={15} />}
          />
        )}
      </div>
    </motion.article>
  );
}

function Contato({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  const linkExterno = !href.startsWith("mailto:");

  return (
    <a
      href={href}
      target={linkExterno ? "_blank" : undefined}
      rel={linkExterno ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-1.5 rounded-lg bg-sectec-50 px-3 py-2 text-xs font-medium text-sectec-700 transition-colors hover:bg-sectec-100"
    >
      {icon}
      {label}
    </a>
  );
}
