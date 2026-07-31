import { Maximize2 } from "lucide-react";
import { TiltCard } from "./TiltCard";

interface BannerFlipProps {
  bannerUrl: string;
  titulo: string;
  onExpandir: () => void;
}

export function BannerFlip({ bannerUrl, titulo, onExpandir }: BannerFlipProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="w-full max-w-[220px] sm:max-w-[260px] mx-auto" style={{ aspectRatio: "3 / 4" }}>
        <TiltCard
          idleDelay={0}
          className="w-full h-full rounded-xl border-2 border-sectec-900 overflow-hidden bg-sectec-50 shadow-lg cursor-pointer"
        >
          <img
            src={bannerUrl}
            alt={`Banner do projeto ${titulo}`}
            className="w-full h-full object-cover"
            onClick={onExpandir}
          />
        </TiltCard>
      </div>

      <div className="max-w-[220px] sm:max-w-[260px] mx-auto w-full">
        <button
          onClick={onExpandir}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-sectec-600 text-white text-xs font-medium hover:bg-sectec-700 active:bg-sectec-800 transition-colors"
        >
          <Maximize2 size={14} />
          Ver banner completo
        </button>
      </div>
    </div>
  );
}