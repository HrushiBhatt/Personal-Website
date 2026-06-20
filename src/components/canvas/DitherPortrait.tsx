import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from '../../shaders/dither';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface UniformRef {
  uTexture: { value: THREE.Texture | null };
  uMouse:   { value: THREE.Vector2 };
  uHover:   { value: number };
  uTime:    { value: number };
  uResolution: { value: THREE.Vector2 };
}

function DitherMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();
  const reduced = useReducedMotion();

  const texture = useTexture('/images/profile.jpg');
  texture.colorSpace = THREE.SRGBColorSpace;

  const uniforms = useRef<UniformRef>({
    uTexture:    { value: texture },
    uMouse:      { value: new THREE.Vector2(0.5, 0.5) },
    uHover:      { value: 0 },
    uTime:       { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  });

  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const targetHover = useRef(0);

  useFrame(({ clock, pointer }) => {
    if (reduced) return;
    const u = uniforms.current;
    u.uTime.value = clock.getElapsedTime();

    /* lerp mouse */
    const mx = (pointer.x + 1) / 2;
    const my = (pointer.y + 1) / 2;
    targetMouse.current.set(mx, my);
    u.uMouse.value.lerp(targetMouse.current, 0.06);

    /* lerp hover */
    u.uHover.value += (targetHover.current - u.uHover.value) * 0.06;
    u.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh
      ref={meshRef}
      onPointerEnter={() => { targetHover.current = 1; }}
      onPointerLeave={() => { targetHover.current = 0; }}
    >
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current as unknown as { [key: string]: THREE.IUniform }}
        transparent
      />
    </mesh>
  );
}

interface DitherPortraitProps {
  className?: string;
}

export function DitherPortrait({ className }: DitherPortraitProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={`rounded-full overflow-hidden ${className ?? ''}`}>
        <img src="/images/profile.jpg" alt="Hrushi Bhatt" className="w-full h-full object-cover object-top" />
      </div>
    );
  }

  return (
    <div className={className}>
      <Canvas
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 1.2], fov: 80 }}
        style={{ background: 'transparent' }}
      >
        <DitherMesh />
      </Canvas>
    </div>
  );
}

