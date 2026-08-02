import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Users, Tag, ZoomIn, ZoomOut, RotateCcw, Image as ImageIcon } from "lucide-react";
import type { ProjetoPublico } from "../api/projetosPublicos";
import { getBannerUrl } from "../api/banner";
import { BannerFlip } from "./BannerFlip";

interface ProjetoModalProps {
  projeto: ProjetoPublico;
  onClose: () => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;

type Aba = "banner" | "video";

export function ProjetoModal({ projeto, onClose }: ProjetoModalProps) {
  const [bannerExpandido, setBannerExpandido] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState<Aba>("banner");

  const bannerUrl = projeto.hasBanner ? getBannerUrl(projeto.id) : undefined;

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

        {/* DESKTOP (md+) */}
        <div className="hidden md:grid p-6 pt-10 grid-cols-2 gap-8">
          <div className="flex flex-col gap-5 order-1">
            <div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sectec-50 text-sectec-700 text-xs font-semibold mb-2">
                <Tag size={12} />
                {projeto.tema.nome}
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
                {projeto.equipe.map((membro) => (
                  <span
                    key={membro.id}
                    className={`px-3 py-1 rounded-full text-xs ${
                      membro.role === "autor"
                        ? "bg-sectec-100 text-sectec-800 font-semibold"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {membro.nome}
                    {membro.role === "autor" && " ★"}
                  </span>
                ))}
              </div>
            </div>

          </div>

          <div className="order-2">
            <VisualizadorMidia
              bannerUrl={bannerUrl}
              titulo={projeto.titulo}
              videoUrl={projeto.video}
              abaAtiva={abaAtiva}
              onAbaChange={setAbaAtiva}
              onExpandir={() => setBannerExpandido(true)}
            />
          </div>
        </div>

        {/* MOBILE (abaixo de md) */}
        <div className="md:hidden p-5 pt-10 flex flex-col gap-6">
          <div>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sectec-50 text-sectec-700 text-xs font-semibold mb-2">
              <Tag size={12} />
              {projeto.tema.nome}
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
              {projeto.equipe.map((membro) => (
                <span
                  key={membro.id}
                  className={`px-3 py-1 rounded-full text-xs ${
                    membro.role === "autor"
                      ? "bg-sectec-100 text-sectec-800 font-semibold"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {membro.nome}
                  {membro.role === "autor" && " ★"}
                </span>
              ))}
            </div>
          </div>

          <VisualizadorMidia
            bannerUrl={bannerUrl}
            titulo={projeto.titulo}
            videoUrl={projeto.video}
            abaAtiva={abaAtiva}
            onAbaChange={setAbaAtiva}
            onExpandir={() => setBannerExpandido(true)}
          />
        </div>
      </motion.div>

      <AnimatePresence>
        {bannerExpandido && bannerUrl && (
          <ZoomableLightbox
            bannerUrl={bannerUrl}
            titulo={projeto.titulo}
            onClose={() => setBannerExpandido(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface VisualizadorMidiaProps {
  bannerUrl?: string;
  titulo: string;
  videoUrl: string | false | null;
  abaAtiva: Aba;
  onAbaChange: (aba: Aba) => void;
  onExpandir: () => void;
}

function VisualizadorMidia({
  bannerUrl,
  titulo,
  videoUrl,
  abaAtiva,
  onAbaChange,
  onExpandir,
}: VisualizadorMidiaProps) {
  return (
    <div>
      <div
        className="flex items-center justify-center gap-1 border-b border-slate-200 mb-4"
        role="tablist"
        aria-label="Mídia do projeto"
      >
        <TabButton
          active={abaAtiva === "banner"}
          onClick={() => onAbaChange("banner")}
          icon={<ImageIcon size={15} />}
          label="Banner"
        />
        <TabButton
          active={abaAtiva === "video"}
          onClick={() => onAbaChange("video")}
          icon={<Play size={15} />}
          label="Vídeo"
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
              bannerUrl={bannerUrl}
              titulo={titulo}
              onExpandir={onExpandir}
            />
          </motion.div>
        ) : (
          <motion.div
            key="video"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
          >
            <VideoProjeto videoUrl={videoUrl} titulo={titulo} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function VideoProjeto({
  videoUrl,
  titulo,
}: {
  videoUrl: string | false | null;
  titulo: string;
}) {
  const url = typeof videoUrl === "string" ? videoUrl.trim() : "";
  const youtubeEmbedUrl = getYoutubeEmbedUrl(url);

  return (
    <div
      className={`w-full max-w-[440px] mx-auto rounded-xl overflow-hidden border-2 border-sectec-900 shadow-lg ${
        url ? "bg-slate-950" : "bg-sectec-50"
      }`}
      style={{ aspectRatio: "16 / 9" }}
    >
      {!url ? (
        <div className="w-full h-full bg-sectec-50 flex flex-col items-center justify-center gap-3 text-sectec-400 px-6 text-center">
          <span className="w-12 h-12 rounded-full bg-white border border-sectec-200 text-sectec-500 shadow-sm flex items-center justify-center">
            <Play size={24} />
          </span>
          <span className="text-xs font-medium">Sem vídeo cadastrado</span>
        </div>
      ) : youtubeEmbedUrl ? (
        <iframe
          src={youtubeEmbedUrl}
          title={`Vídeo do projeto ${titulo}`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <video
          src={url}
          title={`Vídeo do projeto ${titulo}`}
          className="w-full h-full object-contain"
          controls
          preload="metadata"
        />
      )}
    </div>
  );
}

function getYoutubeEmbedUrl(url: string) {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace(/^www\./, "");
    let videoId = "";

    if (hostname === "youtu.be") {
      videoId = parsedUrl.pathname.split("/").filter(Boolean)[0] ?? "";
    } else if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      videoId =
        parsedUrl.searchParams.get("v") ??
        parsedUrl.pathname.match(/^\/(?:embed|shorts)\/([^/?]+)/)?.[1] ??
        "";
    }

    return videoId
      ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`
      : null;
  } catch {
    return null;
  }
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
      type="button"
      role="tab"
      aria-selected={active}
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
    const maxOffset = (s - 1) * 220;
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
