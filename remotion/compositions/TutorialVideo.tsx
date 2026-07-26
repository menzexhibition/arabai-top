import React from 'react';
import {Composition, Sequence} from 'remotion';
import {TutorialCard} from '../components/TutorialCard';
import {tutorialVideos, type TutorialVideoConfig} from '../data/tutorials';

const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;
const SCENE_FRAMES = 160;

export const TutorialVideoComposition: React.FC<{video: TutorialVideoConfig}> = ({video}) => {
  return (
    <>
      {video.scenes.map((scene, index) => (
        <Sequence key={`${video.id}-${index}`} from={index * SCENE_FRAMES} durationInFrames={SCENE_FRAMES}>
          <TutorialCard
            scene={scene}
            index={index}
            total={video.scenes.length}
            videoTitle={video.title}
            subtitle={video.subtitle}
            cta={video.cta}
          />
        </Sequence>
      ))}
    </>
  );
};

export const TutorialCompositions: React.FC = () => {
  return (
    <>
      {tutorialVideos.map((video) => (
        <Composition
          key={video.id}
          id={video.id}
          component={TutorialVideoComposition}
          durationInFrames={video.scenes.length * SCENE_FRAMES}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
          defaultProps={{video}}
        />
      ))}
    </>
  );
};
