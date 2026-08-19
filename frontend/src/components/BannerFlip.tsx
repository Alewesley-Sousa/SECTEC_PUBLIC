import { ImageOff, Maximize2 } from "lucide-react";

interface BannerFlipProps {
  bannerUrl?: string;
  titulo: string;
  onExpandir?: () => void; // pode ser ignorado
}

export function BannerFlip({ bannerUrl, titulo }: BannerFlipProps) {
  const temBanner = Boolean(bannerUrl);

  return (
    <div className="flex flex-col gap-3 w-full">
      <div
        className="w-full max-w-[260px] sm:max-w-[300px] mx-auto"
        style={{ aspectRatio: "3 / 4" }}
      >
        <div className="w-full h-full rounded-xl border-2 border-sectec-900 overflow-hidden bg-sectec-50 shadow-lg">
          {temBanner ? (
            <embed
              src={bannerUrl}
              type="application/pdf"
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-sectec-300">
              <ImageOff size={28} />
              <span className="text-[11px] font-medium text-sectec-400 px-4 text-center">
                Banner ainda não disponível
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-[260px] sm:max-w-[300px] mx-auto w-full">
        <button
          onClick={() => {
            if (temBanner && bannerUrl) {
              window.open(bannerUrl, "_blank", "noopener,noreferrer");
            }
          }}
          disabled={!temBanner}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-sectec-600 text-white text-xs font-medium hover:bg-sectec-700 active:bg-sectec-800 disabled:opacity-40 disabled:hover:bg-sectec-600 disabled:cursor-not-allowed transition-colors"
        >
          <Maximize2 size={14} />
          Ver banner completo
        </button>
      </div>
    </div>
  );
}