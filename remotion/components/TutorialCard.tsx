import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import type {TutorialScene} from '../data/tutorials';

export const TutorialCard: React.FC<{
  scene: TutorialScene;
  index: number;
  total: number;
  videoTitle: string;
  subtitle: string;
  cta: string;
}> = ({scene, index, total, videoTitle, subtitle, cta}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entrance = spring({fps, frame, config: {damping: 16, stiffness: 120}});
  const opacity = interpolate(frame, [0, 12, 130, 155], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const translateY = interpolate(entrance, [0, 1], [34, 0]);
  const accent = scene.accent ?? '#008c95';

  return (
    <AbsoluteFill
      style={{
        direction: 'rtl',
        opacity,
        transform: `translateY(${translateY}px)`,
        background: 'linear-gradient(135deg, rgba(0,140,149,0.08), rgba(214,168,79,0.05) 60%, rgba(255,255,255,0.96))',
        color: '#17201f',
        fontFamily: 'IBM Plex Sans Arabic, Outfit, system-ui, sans-serif',
        padding: '82px 76px',
      }}
    >
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24}}>
        <div style={{maxWidth: '78%'}}>
          <div style={{color: accent, fontWeight: 800, fontSize: 24, marginBottom: 18}}>ARABAI</div>
          <div style={{fontSize: 52, lineHeight: 1.2, fontWeight: 700, marginBottom: 20}}>{videoTitle}</div>
          <div style={{fontSize: 25, lineHeight: 1.7, color: '#55605d', marginBottom: 34}}>{subtitle}</div>
        </div>
        <div style={{border: `2px solid ${accent}`, color: accent, borderRadius: 999, padding: '12px 22px', fontWeight: 700, fontSize: 22}}>
          {index + 1} / {total}
        </div>
      </div>

      <div style={{marginTop: 28, borderRadius: 28, background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(23,32,31,0.08)', boxShadow: '0 18px 44px rgba(31,37,35,0.08)', padding: '34px 36px'}}>
        <div style={{fontSize: 40, lineHeight: 1.25, fontWeight: 700, marginBottom: 22}}>{scene.title}</div>
        <div style={{fontSize: 26, lineHeight: 1.8, color: '#42504d', marginBottom: 26}}>{scene.body}</div>
        {scene.bullets?.length ? (
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
            {scene.bullets.map((bullet) => (
              <div key={bullet} style={{display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderRadius: 18, background: 'rgba(0,140,149,0.06)'}}>
                <div style={{width: 12, height: 12, borderRadius: 999, background: accent, flex: '0 0 auto'}} />
                <div style={{fontSize: 22, fontWeight: 600}}>{bullet}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div style={{marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 28}}>
        <div style={{fontSize: 20, color: '#55605d'}}>تعليم مبسط للمستخدم العربي العادي</div>
        <div style={{fontSize: 22, color: accent, fontWeight: 700}}>{cta}</div>
      </div>
    </AbsoluteFill>
  );
};
