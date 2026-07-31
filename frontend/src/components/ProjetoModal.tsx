import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Users, Tag, ZoomIn, ZoomOut, RotateCcw, Image as ImageIcon } from "lucide-react";
import type { Projeto } from "../types/projeto";
import { BannerFlip } from "./BannerFlip";

interface ProjetoModalProps {
  projeto: Projeto;
  onClose: () => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;

type Aba = "banner" | "video";

export function ProjetoModal({ projeto, onClose }: ProjetoModalProps) {
  const [bannerExpandido, setBannerExpandido] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState<Aba>("banner");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 rounded-full bg-white shadow-md hover:bg-slate-100 text-slate-500 transition-colors"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>

        {/* DESKTOP (md+): layout lado a lado, como era antes */}
        <div className="hidden md:grid p-6 pt-10 grid-cols-2 gap-8">
          <div className="flex flex-col gap-5 order-1">
            <div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sectec-50 text-sectec-700 text-xs font-semibold mb-2">
                <Tag size={12} />
                {projeto.eixoTematico}
              </span>
              <h2 className="text-xl font-bold text-slate-900">{projeto.titulo}</h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">{projeto.descricao}</p>

            <div>
              <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
                <Users size={14} />
                EQUIPE
              </p>
              <div className="flex flex-wrap gap-2">
                {projeto.equipe.map((nome) => (
                  <span
                    key={nome}
                    className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs"
                  >
                    {nome}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 mb-2">VÍDEO DA EQUIPE</p>
              <div className="h-40 rounded-xl bg-slate-100 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400">
                <Play size={26} />
                <span className="text-xs font-medium">
                  {projeto.videoUrl ? "Vídeo disponível" : "Sem vídeo cadastrado"}
                </span>
              </div>
            </div>
          </div>

          <div className="order-2">
            <BannerFlip
              bannerUrl={projeto.bannerUrl}
              titulo={projeto.titulo}
              onExpandir={() => setBannerExpandido(true)}
            />
          </div>
        </div>

        {/* MOBILE (abaixo de md): infos em cima, banner/vídeo em abas embaixo */}
        <div className="md:hidden p-5 pt-10 flex flex-col gap-6">
          <div>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sectec-50 text-sectec-700 text-xs font-semibold mb-2">
              <Tag size={12} />
              {projeto.eixoTematico}
            </span>
            <h2 className="text-lg font-bold text-slate-900">{projeto.titulo}</h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              {projeto.descricao}
            </p>
          </div>

          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
              <Users size={14} />
              EQUIPE
            </p>
            <div className="flex flex-wrap gap-2">
              {projeto.equipe.map((nome) => (
                <span
                  key={nome}
                  className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs"
                >
                  {nome}
                </span>
              ))}
            </div>
          </div>

          {/* Abas: Banner / Vídeo */}
          <div>
            <div className="flex items-center gap-1 border-b border-slate-200 mb-4">
              <TabButton
                active={abaAtiva === "banner"}
                onClick={() => setAbaAtiva("banner")}
                icon={<ImageIcon size={15} />}
                label="Banner"
              />
              <TabButton
                active={abaAtiva === "video"}
                onClick={() => setAbaAtiva("video")}
                icon={<Play size={15} />}
                label="Vídeo da equipe"
              />
            </div>

            <AnimatePresence mode="wait">
              {abaAtiva === "banner" ? (
                <motion.div
                  key="banner"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                >
                  <BannerFlip
                    bannerUrl={projeto.bannerUrl}
                    titulo={projeto.titulo}
                    onExpandir={() => setBannerExpandido(true)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="video"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="h-64 sm:h-72 rounded-xl bg-slate-100 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400"
                >
                  <Play size={32} />
                  <span className="text-xs font-medium">
                    {projeto.videoUrl ? "Vídeo disponível" : "Sem vídeo cadastrado"}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {bannerExpandido && (
          <ZoomableLightbox
            bannerUrl={projeto.bannerUrl}
            titulo={projeto.titulo}
            onClose={() => setBannerExpandido(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------- Botão de aba ---------- */

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors ${
        active ? "text-sectec-700" : "text-slate-400 hover:text-slate-600"
      }`}
    >
      {icon}
      {label}
      {active && (
        <motion.span
          layoutId="aba-ativa-underline"
          className="absolute left-0 right-0 -bottom-px h-0.5 bg-sectec-600 rounded-full"
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />
      )}
    </button>
  );
}

/* ---------- Lightbox com zoom e pan ---------- */

interface ZoomableLightboxProps {
  bannerUrl: string;
  titulo: string;
  onClose: () => void;
}

function ZoomableLightbox({ bannerUrl, titulo, onClose }: ZoomableLightboxProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);
  const lastTap = useRef(0);

  const clampScale = (s: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));

  const clampPosition = useCallback((x: number, y: number, s: number) => {
    // Limita o pan pra não deixar a imagem "sumir" da tela
    const maxOffset = (s - 1) * 220; // aproximação segura baseada no tamanho do container
    return {
      x: Math.min(maxOffset, Math.max(-maxOffset, x)),
      y: Math.min(maxOffset, Math.max(-maxOffset, y)),
    };
  }, []);

  const zoomTo = (newScale: number) => {
    const s = clampScale(newScale);
    setScale(s);
    if (s === 1) setPosition({ x: 0, y: 0 });
    else setPosition((p) => clampPosition(p.x, p.y, s));
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.0025;
    zoomTo(scale + delta * scale);
  };

  const handleDoubleClick = () => {
    zoomTo(scale > 1 ? 1 : 2.5);
  };

  // --- Mouse drag (desktop) ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale === 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    posStart.current = { ...position };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    const next = clampPosition(posStart.current.x + dx, posStart.current.y + dy, scale);
    setPosition(next);
  };

  const handleMouseUp = () => setIsDragging(false);

  // --- Touch (celular): pan com 1 dedo, pinça com 2, duplo toque ---
  const getTouchDist = (touches: React.TouchList) => {
    const [t1, t2] = [touches[0], touches[1]];
    return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      pinchStart.current = { dist: getTouchDist(e.touches), scale };
    } else if (e.touches.length === 1) {
      const now = Date.now();
      if (now - lastTap.current < 300) {
        handleDoubleClick();
      }
      lastTap.current = now;

      if (scale > 1) {
        setIsDragging(true);
        dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        posStart.current = { ...position };
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchStart.current) {
      e.preventDefault();
      const newDist = getTouchDist(e.touches);
      const ratio = newDist / pinchStart.current.dist;
      zoomTo(pinchStart.current.scale * ratio);
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      e.preventDefault();
      const dx = e.touches[0].clientX - dragStart.current.x;
      const dy = e.touches[0].clientY - dragStart.current.y;
      const next = clampPosition(posStart.current.x + dx, posStart.current.y + dy, scale);
      setPosition(next);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) pinchStart.current = null;
    if (e.touches.length === 0) setIsDragging(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        e.stopPropagation();
        if (scale === 1) onClose();
      }}
      className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 overflow-hidden"
    >
      {/* Imagem com zoom/pan */}
      <div
        className="w-full h-full flex items-center justify-center touch-none"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/*
          IMPORTANTE: este é um <img> normal, não <motion.img>.
          O framer-motion assume o controle da propriedade CSS "transform"
          em qualquer elemento motion.* que tenha a prop `animate`. Como
          aqui o transform (translate + scale) é controlado manualmente
          via `style`, o framer-motion ficava sobrescrevendo esse valor a
          cada frame e forçando a imagem de volta pra escala 1 — por isso
          o zoom "não fazia nada" mesmo com o estado mudando certinho.
        */}
        <img
          src={bannerUrl}
          alt={`Banner completo do projeto ${titulo}`}
          onClick={(e) => e.stopPropagation()}
          onDoubleClick={handleDoubleClick}
          draggable={false}
          className="max-w-full max-h-full rounded-lg object-contain select-none"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? "none" : "transform 0.15s ease-out",
            cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
          }}
        />
      </div>

      {/* Controles de zoom — paleta verde/branco do site */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white rounded-full px-2 py-2 shadow-lg border border-emerald-100"
      >
        <button
          onClick={() => zoomTo(scale - 0.5)}
          disabled={scale <= MIN_SCALE}
          className="p-2 rounded-full text-emerald-700 hover:bg-emerald-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          aria-label="Diminuir zoom"
        >
          <ZoomOut size={18} />
        </button>
        <button
          onClick={() => zoomTo(1)}
          disabled={scale === 1}
          className="p-2 rounded-full text-emerald-700 hover:bg-emerald-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          aria-label="Resetar zoom"
        >
          <RotateCcw size={16} />
        </button>
        <button
          onClick={() => zoomTo(scale + 0.5)}
          disabled={scale >= MAX_SCALE}
          className="p-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-30 disabled:hover:bg-emerald-600 transition-colors"
          aria-label="Aumentar zoom"
        >
          <ZoomIn size={18} />
        </button>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-6 right-6 p-2 rounded-full bg-white hover:bg-emerald-50 text-emerald-700 shadow-lg transition-colors"
        aria-label="Fechar visualização"
      >
        <X size={22} />
      </button>
    </motion.div>
  );
}