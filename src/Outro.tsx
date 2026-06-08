import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SolDeMayo } from "./SolDeMayo";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200 } });
  const handleScale = spring({
    frame: frame - 14,
    fps,
    config: { damping: 12, mass: 0.7 },
  });
  const ctaOpacity = interpolate(frame, [30, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #2e1d12 0%, #1a2a3a 100%)",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", opacity: 0.1 }}
      >
        <SolDeMayo size={1500} color="#F6B40E" />
      </AbsoluteFill>

      <div
        style={{
          fontSize: 64,
          color: "#d9c7a3",
          opacity: enter,
          marginBottom: 24,
          fontStyle: "italic",
        }}
      >
        Seguinos en
      </div>

      <div
        style={{
          fontSize: 92,
          fontWeight: 700,
          color: "#fffaf0",
          transform: `scale(${handleScale})`,
          textShadow: "0 6px 24px rgba(0,0,0,0.5)",
        }}
      >
        @culturacriollarg
      </div>

      <div
        style={{
          marginTop: 70,
          padding: "26px 60px",
          border: "4px solid #F6B40E",
          borderRadius: 60,
          fontSize: 50,
          color: "#F6B40E",
          fontWeight: 700,
          opacity: ctaOpacity,
          transform: `translateY(${interpolate(ctaOpacity, [0, 1], [20, 0])}px)`,
        }}
      >
        ¡Viva la tradición! 🇦🇷
      </div>
    </AbsoluteFill>
  );
};
