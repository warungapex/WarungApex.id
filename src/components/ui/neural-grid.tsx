"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const NODE_COUNT = 110;
const LINK_DIST = 4.8;

export default function NeuralGrid() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = host.clientWidth;
    let height = host.clientHeight;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width, height);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.z = 26;

    const group = new THREE.Group();
    scene.add(group);

    const cyan = new THREE.Color("#00f0ff");
    const red = new THREE.Color("#ff2a44");

    // Nodes scattered in a flattened sphere
    const positions = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      const r = 8 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (r * Math.sin(phi) * Math.sin(theta)) * 0.62;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.7;
    }

    // Node points
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    const pointsMat = new THREE.PointsMaterial({
      size: 0.14,
      color: cyan,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    group.add(new THREE.Points(pointsGeo, pointsMat));

    // Connective lines between nearby nodes, tinted cyan→red
    const linePos: number[] = [];
    const lineCol: number[] = [];
    const tmp = new THREE.Color();
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz > LINK_DIST * LINK_DIST) continue;
        linePos.push(
          positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
          positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2],
        );
        tmp.copy(Math.random() > 0.86 ? red : cyan).multiplyScalar(0.5 + Math.random() * 0.5);
        lineCol.push(tmp.r, tmp.g, tmp.b, tmp.r, tmp.g, tmp.b);
      }
    }
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3));
    linesGeo.setAttribute("color", new THREE.Float32BufferAttribute(lineCol, 3));
    const linesMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.34,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    group.add(new THREE.LineSegments(linesGeo, linesMat));

    // Pointer parallax
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove);

    const onResize = () => {
      width = host.clientWidth;
      height = host.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(host);

    let raf = 0;
    let running = true;
    const render = () => {
      group.rotation.y += 0.0009;
      group.rotation.x = Math.sin(performance.now() * 0.00012) * 0.12 + pointer.y * 0.08;
      camera.position.x += (pointer.x * 1.6 - camera.position.x) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    const loop = () => {
      if (!running) return;
      render();
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      running = document.visibilityState === "visible" && !reducedMotion;
      if (running) loop();
      else cancelAnimationFrame(raf);
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (reducedMotion) {
      render(); // single static frame
    } else {
      loop();
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      pointsGeo.dispose();
      pointsMat.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />;
}
