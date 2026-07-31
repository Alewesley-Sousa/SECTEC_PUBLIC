import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  idleDelay?: number;
}

export function TiltCard({ children, className, idleDelay = 0 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      rotateY: x * 16,
      rotateX: -y * 16,
    });
  }

  function handleMouseLeave() {
    setHovering(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  }

  return (
    <div style={{ perspective: 800 }}>
      <motion.div
        ref={ref}
        onMouseEnter={() => setHovering(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={
          hovering
            ? { rotateX: tilt.rotateX, rotateY: tilt.rotateY }
            : { rotateX: [0, 6, 0, -6, 0], rotateY: [0, -8, 0, 8, 0] }
        }
        transition={
          hovering
            ? { type: "spring", stiffness: 150, damping: 15 }
            : {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: idleDelay,
              }
        }
        className={className}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}