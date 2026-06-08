import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type HelloWorldProps = {
  titleText: string;
  titleColor: string;
};

export const HelloWorld: React.FC<HelloWorldProps> = ({
  titleText,
  titleColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in the text over the first 30 frames.
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // A spring animation that scales the text up on entry.
  const scale = spring({
    frame,
    fps,
    config: {
      damping: 100,
    },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontFamily: "system-ui, sans-serif",
          fontWeight: "bold",
          fontSize: 100,
          color: titleColor,
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        {titleText}
      </h1>
    </AbsoluteFill>
  );
};
