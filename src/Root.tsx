import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { CulturaCriolla } from "./CulturaCriolla";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CulturaCriolla"
        component={CulturaCriolla}
        durationInFrames={540}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ title: "Hola Remotion" }}
      />
    </>
  );
};
