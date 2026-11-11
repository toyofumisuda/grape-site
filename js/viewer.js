/* Vine Pro page — interactive 3D viewer with colour picker */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createPhone, setupEnvironment, COLORS } from './phone-model.js';

async function init() {
  const box = document.getElementById('viewer');
  if (!box) return;
  try { await document.fonts.ready; } catch (_) { /* ignore */ }

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  box.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  setupEnvironment(renderer, scene);
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50);
  camera.position.set(0, 0.2, 4.6);

  const key = new THREE.DirectionalLight(0xffffff, 1.5);
  key.position.set(3, 4, 5);
  const rim = new THREE.DirectionalLight(0xa070ff, 5);
  rim.position.set(-4, 2, -3);
  const rim2 = new THREE.DirectionalLight(0xff70d0, 3);
  rim2.position.set(4, -1, -3);
  scene.add(key, rim, rim2);

  const phone = createPhone({ color: COLORS.grape.hex });
  phone.group.rotation.set(0.08, -0.5, 0.03);
  scene.add(phone.group);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.6;
  controls.minPolarAngle = Math.PI * 0.32;
  controls.maxPolarAngle = Math.PI * 0.68;

  function resize() {
    const w = box.clientWidth, h = box.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = camera.aspect < 0.8 ? 5.6 : 4.6;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(box);
  renderer.setAnimationLoop(() => {
    if (!visible) return;
    controls.update();
    renderer.render(scene, camera);
  });

  if (window.gsap) {
    window.gsap.from(phone.group.scale, { x: 0.6, y: 0.6, z: 0.6, duration: 2, ease: 'expo.out' });
    window.gsap.from(phone.group.rotation, { y: -Math.PI * 1.5, duration: 2.4, ease: 'expo.out' });
  }

  const label = document.getElementById('swatch-name');
  document.querySelectorAll('.swatch').forEach((b) => {
    b.addEventListener('click', () => {
      const c = COLORS[b.dataset.color];
      document.querySelectorAll('.swatch').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      phone.setColor(c.hex, window.gsap);
      if (label) label.textContent = c.name;
    });
  });
}

init().catch((err) => {
  console.warn('3D viewer disabled:', err);
  const fb = document.getElementById('viewer-fallback');
  if (fb) fb.hidden = false;
});
