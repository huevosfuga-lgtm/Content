import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SolDeMayo } from "./SolDeMayo";

export const Scene: React.FC<{
  emoji: string;
  title: string;
  subtitle: string;
  accent: string;
  bg: string;
}> = ({ emoji, title, subtitle, accent, bg }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200 } });
  const emojiPop = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  const subtitleOpacity = interpolate(frame, [18, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out al final de cada escena para una transición limpia.
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  const titleY = interpolate(enter, [0, 1], [40, 0]);

  return (
    <AbsoluteFill
      style={{
        background: bg,
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", opacity: 0.12 }}
      >
        <SolDeMayo size={1400} color={accent} />
      </AbsoluteFill>

      <div
        style={{
          fontSize: 220,
          transform: `scale(${emojiPop})`,
          marginBottom: 40,
        }}
      >
        {emoji}
      </div>

      <div
        style={{
          fontSize: 130,
          fontWeight: 700,
          color: "#fffaf0",
          transform: `translateY(${titleY}px)`,
          opacity: enter,
          textAlign: "center",
          letterSpacing: 2,
          textShadow: "0 6px 24px rgba(0,0,0,0.45)",
        }}
      >
        {title}
      </div>

      <div
        style={{
          width: 160,
          height: 6,
          background: accent,
          borderRadius: 3,
          margin: "34px 0",
          opacity: subtitleOpacity,
          transform: `scaleX(${subtitleOpacity})`,
        }}
      />

      <div
        style={{
          fontSize: 56,
          color: "#f3e9d2",
          opacity: subtitleOpacity,
          textAlign: "center",
          maxWidth: 820,
          lineHeight: 1.35,
          fontStyle: "italic",
        }}
      >
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};
