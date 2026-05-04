import { motion } from "framer-motion";

interface GlowOrbProps {
  color: string;
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
}

export function GlowOrb({ color, size, top, left, right, bottom, delay = 0 }: GlowOrbProps) {
  return (
    <motion.div
      className="glow-orb"
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
      }}
      animate={{
        transform: [
          "translate(0px, 0px) scale(1)",
          "translate(30px, -20px) scale(1.1)",
          "translate(-20px, 20px) scale(0.9)",
          "translate(0px, 0px) scale(1)",
        ],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    />
  );
}
