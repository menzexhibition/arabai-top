import React from 'react';
import {AbsoluteFill, Composition} from 'remotion';
import {TutorialCompositions} from './compositions/TutorialVideo';

const Cover: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #f6f4ef 0%, #fffefa 45%, #eef7f6 100%)',
        color: '#17201f',
        direction: 'rtl',
        fontFamily: 'IBM Plex Sans Arabic, Outfit, system-ui, sans-serif',
        padding: '120px 100px',
      }}
    >
      <div style={{color: '#008c95', fontWeight: 800, fontSize: 30, marginBottom: 26}}>ARABAI</div>
      <div style={{fontSize: 92, lineHeight: 1.08, fontWeight: 700, maxWidth: 1200}}>فيديوهات تعليمية بسيطة للمستخدم العربي</div>
      <div style={{fontSize: 34, lineHeight: 1.7, color: '#55605d', marginTop: 30, maxWidth: 1200}}>
        هذه مجموعة فيديوهات قابلة للتوسيع داخل المشروع، لتلخيص المقالات، شرح Prompt، وشرح التسجيل والرصيد وتجربة AI داخل ARABAI.
      </div>
      <div style={{marginTop: 'auto', fontSize: 30, color: '#d6a84f', fontWeight: 700}}>arabai.top</div>
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="arabai-cover-ar" component={Cover} durationInFrames={180} fps={30} width={1920} height={1080} />
      <TutorialCompositions />
    </>
  );
};
