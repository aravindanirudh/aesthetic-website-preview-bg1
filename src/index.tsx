import React from "react";
import { Composition, registerRoot } from "remotion";
import { CinematicShowcase } from "./CinematicShowcase";
import {
  VIDEO_WIDTH,
  VIDEO_HEIGHT,
  VIDEO_FPS,
  DURATION_IN_FRAMES,
} from "./config";

const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CinematicShowcase"
        component={CinematicShowcase}
        durationInFrames={DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
    </>
  );
};

registerRoot(RemotionRoot);

