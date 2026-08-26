'use client';

import {
  createElement,
  HTMLAttributes,
  RefAttributes,
  useEffect,
  useRef,
} from 'react';

type ModelViewerElement = HTMLElement & {
  jumpCameraToGoal?: () => void;
};

type ModelViewerProps = HTMLAttributes<HTMLElement> &
  RefAttributes<HTMLElement> &
  Record<string, unknown>;

export default function JinyuModel() {
  const modelRef = useRef<ModelViewerElement | null>(null);

  useEffect(() => {
    let active = true;

    const updateCamera = () => {
      const model = modelRef.current;
      if (!model) return;

      const isMobile = window.matchMedia('(max-width: 639px)').matches;
      const radius = isMobile ? '116%' : '112%';
      const minimumRadius = isMobile ? '112%' : '108%';

      model.setAttribute('camera-orbit', `90deg 80deg ${radius}`);
      model.setAttribute('min-camera-orbit', `auto auto ${minimumRadius}`);
      model.setAttribute('max-camera-orbit', 'auto auto 230%');
      requestAnimationFrame(() => model.jumpCameraToGoal?.());
    };

    void import('@google/model-viewer').then(() => {
      if (!active) return;
      updateCamera();
      modelRef.current?.addEventListener('load', updateCamera);
    });

    window.addEventListener('resize', updateCamera);

    return () => {
      active = false;
      window.removeEventListener('resize', updateCamera);
      modelRef.current?.removeEventListener('load', updateCamera);
    };
  }, []);

  const modelProps: ModelViewerProps = {
    ref: (element: HTMLElement | null) => {
      modelRef.current = element as ModelViewerElement | null;
    },
    className: 'hero-model',
    src: '/jinyu-avatar.glb',
    alt: 'Interactive matte-finish 3D avatar of Jinyu wearing a purple shirt',
    'camera-controls': true,
    'camera-orbit': '90deg 80deg 112%',
    'min-camera-orbit': 'auto auto 108%',
    'max-camera-orbit': 'auto auto 230%',
    'field-of-view': '28deg',
    'min-field-of-view': '28deg',
    'max-field-of-view': '45deg',
    'disable-pan': true,
    'disable-tap': true,
    'touch-action': 'pan-y',
    'interaction-prompt': 'none',
    'environment-image': 'neutral',
    'shadow-intensity': '0.55',
    'shadow-softness': '1',
    exposure: '0.98',
    loading: 'eager',
    reveal: 'auto',
  };

  return (
    <div className="hero-model-shell">
      {createElement('model-viewer', modelProps)}
      <span className="hero-model-hint">Drag to rotate · Scroll to zoom</span>
    </div>
  );
}
