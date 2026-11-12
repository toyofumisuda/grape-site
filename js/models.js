/* Grape — procedural 3D models for GrapeBook Air, Grape Buds Pro, Grape Band, Vine */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { roundedRect, shapePlane, canvasTex, makeLogoTexture, createPhone } from './phone-model.js';

const glassBlack = () => new THREE.MeshPhysicalMaterial({ color: 0x030304, roughness: 0.05, clearcoat: 1 });
const glareMat = () => new THREE.MeshPhysicalMaterial({
  color: 0x000000, roughness: 0.05, clearcoat: 1, envMapIntensity: 0.7,
  transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
});
const logoMat = () => new THREE.MeshPhysicalMaterial({
  map: makeLogoTexture(), transparent: true, alphaTest: 0.4, metalness: 1, roughness: 0.12, color: 0xffffff,
});

/* =========================================================
   GrapeBook Air
   ========================================================= */
function desktopWallpaper() {
  const c = document.createElement('canvas');
  c.width = 1600; c.height = 1000;
  const g = c.getContext('2d');
  const bg = g.createLinearGradient(0, 0, 1600, 1000);
  bg.addColorStop(0, '#12062e'); bg.addColorStop(0.55, '#2a0d5c'); bg.addColorStop(1, '#090312');
  g.fillStyle = bg; g.fillRect(0, 0, 1600, 1000);
  g.globalCompositeOperation = 'lighter';
  [[60, 0.12, 3.4], [16, 0.12, 1.3], [0, 0.22, 0.25]].forEach(([blur, a, wm]) => {
    g.filter = blur ? `blur(${blur}px)` : 'none';
    for (let i = 0; i < 26; i++) {
      const t = i / 25;
      const gr = g.createLinearGradient(0, 1000, 1600, 0);
      gr.addColorStop(0, `hsla(${258 + t * 30},95%,${45 + t * 15}%,${a})`);
      gr.addColorStop(0.5, `hsla(${300 + t * 20},95%,62%,${a})`);
      gr.addColorStop(1, `hsla(${330 + t * 20},95%,65%,${a})`);
      g.strokeStyle = gr; g.lineWidth = (5 + t * 22) * wm;
      const o = (t - 0.5) * 240;
      g.beginPath();
      g.moveTo(-100, 900 + o);
      g.bezierCurveTo(500, 700 + o, 700, 1100 - o, 1050, 600 + o * 0.5);
      g.bezierCurveTo(1300, 250 - o, 1500, 300 + o, 1750, 80 + o);
      g.stroke();
    }
  });
  g.filter = 'none'; g.globalCompositeOperation = 'source-over';
  // menubar
  g.fillStyle = 'rgba(10,6,20,.45)'; g.fillRect(0, 0, 1600, 34);
  g.fillStyle = '#fff'; g.font = '600 18px Inter, "Noto Sans JP", sans-serif';
  g.fillText('Grape', 22, 24);
  g.font = '400 17px Inter, "Noto Sans JP", sans-serif';
  ['ファイル', '編集', '表示', 'ウインドウ', 'ヘルプ'].forEach((w, i) => g.fillText(w, 100 + i * 92, 24));
  g.textAlign = 'right'; g.fillText('11月12日(木)  10:08', 1578, 24); g.textAlign = 'left';
  // windows
  const win = (x, y, w, h, fill) => {
    g.save();
    g.shadowColor = 'rgba(0,0,0,.45)'; g.shadowBlur = 40; g.shadowOffsetY = 18;
    g.fillStyle = fill; g.beginPath(); g.roundRect(x, y, w, h, 16); g.fill();
    g.restore();
    ['#ff5f57', '#febc2e', '#28c840'].forEach((col, i) => { g.fillStyle = col; g.beginPath(); g.arc(x + 22 + i * 22, y + 22, 7, 0, 7); g.fill(); });
  };
  win(150, 120, 640, 470, 'rgba(250,248,255,.94)');
  g.fillStyle = '#1d1d1f'; g.font = '700 30px "Noto Sans JP", sans-serif'; g.fillText('卒業制作アイデア', 190, 200);
  g.fillStyle = '#7b3fe4'; g.font = '600 18px "Noto Sans JP", sans-serif'; g.fillText('メモ ・ 今日 10:02', 190, 236);
  g.fillStyle = '#d6d2e0';
  [280, 320, 360, 400, 440, 480, 520].forEach((y, i) => { g.beginPath(); g.roundRect(190, y, [520, 470, 540, 380, 500, 300, 440][i], 14, 7); g.fill(); });
  win(860, 220, 560, 400, '#1a1424');
  const ph = g.createLinearGradient(880, 260, 1400, 600);
  ph.addColorStop(0, '#ff9ad8'); ph.addColorStop(0.5, '#9a6bff'); ph.addColorStop(1, '#3d7bff');
  g.fillStyle = ph; g.beginPath(); g.roundRect(880, 260, 520, 340, 10); g.fill();
  g.fillStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.arc(1040, 400, 70, 0, 7); g.fill();
  g.fillStyle = 'rgba(40,10,90,.35)'; g.beginPath(); g.moveTo(880, 600); g.lineTo(1080, 430); g.lineTo(1220, 540); g.lineTo(1300, 480); g.lineTo(1400, 600); g.fill();
  // dock
  g.fillStyle = 'rgba(255,255,255,.18)'; g.beginPath(); g.roundRect(470, 890, 660, 92, 26); g.fill();
  const icons = ['#7b3fe4', '#ff5f8f', '#28c840', '#3d7bff', '#febc2e', '#d24dff', '#4fd8ff', '#ff8a3d'];
  icons.forEach((col, i) => {
    const x = 492 + i * 80;
    const ig = g.createLinearGradient(x, 904, x + 64, 968);
    ig.addColorStop(0, '#ffffff55'); ig.addColorStop(0.15, col); ig.addColorStop(1, col);
    g.fillStyle = ig; g.beginPath(); g.roundRect(x, 904, 64, 64, 16); g.fill();
  });
  return canvasTex(c);
}

function keyboardTexture() {
  const c = document.createElement('canvas');
  c.width = 1400; c.height = 560;
  const g = c.getContext('2d');
  g.fillStyle = '#16141c'; g.beginPath(); g.roundRect(0, 0, 1400, 560, 24); g.fill();
  const rows = [
    { h: 56, keys: Array(14).fill(1) },
    { h: 84, keys: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5] },
    { h: 84, keys: [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
    { h: 84, keys: [1.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.7] },
    { h: 84, keys: [2.3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.2] },
    { h: 84, keys: [1, 1, 1, 1.25, 5.2, 1.25, 1, 1, 1] },
  ];
  const pad = 14, gap = 10;
  let y = pad;
  rows.forEach((r) => {
    const total = r.keys.reduce((a, b) => a + b, 0);
    const unit = (1400 - pad * 2 - gap * (r.keys.length - 1)) / total;
    let x = pad;
    r.keys.forEach((k) => {
      const w = unit * k;
      const kg = g.createLinearGradient(0, y, 0, y + r.h);
      kg.addColorStop(0, '#2a2731'); kg.addColorStop(1, '#0d0c11');
      g.fillStyle = kg; g.beginPath(); g.roundRect(x, y, w, r.h, 10); g.fill();
      g.strokeStyle = 'rgba(255,255,255,.06)'; g.lineWidth = 2; g.stroke();
      x += w + gap;
    });
    y += r.h + gap;
  });
  return canvasTex(c);
}

export function createLaptop({ color = 0xd0ccdc } = {}) {
  const W = 2.4, D = 1.62, TB = 0.05, H = 1.52, TL = 0.026;
  const group = new THREE.Group();
  const alu = new THREE.MeshPhysicalMaterial({ color, metalness: 1, roughness: 0.34, clearcoat: 0.25, clearcoatRoughness: 0.5, envMapIntensity: 1.25 });
  const aluSoft = alu.clone(); aluSoft.roughness = 0.2;

  const bGeo = new THREE.ExtrudeGeometry(roundedRect(W, D, 0.1), {
    depth: TB - 0.024, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 5, curveSegments: 32,
  });
  bGeo.rotateX(-Math.PI / 2);
  bGeo.translate(0, 0.012, 0);
  group.add(new THREE.Mesh(bGeo, alu));

  const kb = new THREE.Mesh(new THREE.PlaneGeometry(2.08, 0.83), new THREE.MeshStandardMaterial({ map: keyboardTexture(), roughness: 0.65, metalness: 0.1 }));
  kb.rotation.x = -Math.PI / 2;
  kb.position.set(0, TB + 0.0015, -0.27);
  group.add(kb);
  const pad = new THREE.Mesh(shapePlane(roundedRect(0.98, 0.56, 0.04)), aluSoft);
  pad.rotation.x = -Math.PI / 2;
  pad.position.set(0, TB + 0.0012, 0.43);
  group.add(pad);
  const notch = new THREE.Mesh(new RoundedBoxGeometry(0.36, 0.02, 0.06, 2, 0.008), new THREE.MeshStandardMaterial({ color: 0x8c879a, metalness: 1, roughness: 0.4 }));
  notch.position.set(0, TB - 0.004, D / 2 + 0.006);
  group.add(notch);

  /* lid — built upright: screen faces +z, hinge on the x axis at y = 0 */
  const lid = new THREE.Group();
  lid.position.set(0, TB, -D / 2 + 0.03);
  group.add(lid);
  const lGeo = new THREE.ExtrudeGeometry(roundedRect(W, H, 0.1), {
    depth: TL - 0.012, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.006, bevelSegments: 3, curveSegments: 32,
  });
  lGeo.translate(0, H / 2 + 0.006, -(TL - 0.006));
  lid.add(new THREE.Mesh(lGeo, alu));
  const bezel = new THREE.Mesh(shapePlane(roundedRect(W - 0.01, H - 0.01, 0.095)), glassBlack());
  bezel.position.set(0, H / 2 + 0.006, 0.0006);
  lid.add(bezel);
  const disp = new THREE.Mesh(
    shapePlane(roundedRect(W - 0.13, H - 0.17, 0.025)),
    new THREE.MeshBasicMaterial({ map: desktopWallpaper(), toneMapped: false, color: 0xe8e8e8 })
  );
  disp.position.set(0, H / 2 + 0.04, 0.0012);
  lid.add(disp);
  const cam = new THREE.Mesh(shapePlane(roundedRect(0.2, 0.05, 0.02)), new THREE.MeshBasicMaterial({ color: 0x000000 }));
  cam.position.set(0, H - 0.035, 0.0016);
  lid.add(cam);
  const glare = new THREE.Mesh(shapePlane(roundedRect(W - 0.01, H - 0.01, 0.095)), glareMat());
  glare.position.set(0, H / 2 + 0.006, 0.002);
  lid.add(glare);
  const logo = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.34), logoMat());
  logo.position.set(0, H / 2, -TL - 0.0008);
  logo.rotation.y = Math.PI;
  lid.add(logo);
  const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, W - 0.5, 24), new THREE.MeshStandardMaterial({ color: 0x2b2833, metalness: 0.8, roughness: 0.4 }));
  hinge.rotation.z = Math.PI / 2;
  hinge.position.set(0, TB + 0.006, -D / 2 + 0.03);
  group.add(hinge);

  const OPEN = -0.3, CLOSED = Math.PI / 2 - 0.01;
  return {
    group,
    elev: 0.32, yaw: -0.42, fit: 1.0,
    setFinal() { lid.rotation.x = OPEN; },
    setStart() { lid.rotation.x = CLOSED; },
    intro(gsap) {
      gsap.to(lid.rotation, { x: OPEN, duration: 2.2, ease: 'power3.inOut', delay: 0.15 });
    },
  };
}

/* =========================================================
   Grape Buds Pro
   ========================================================= */
function makeBud(side) {
  const white = new THREE.MeshPhysicalMaterial({ color: 0xfbfaff, roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.06 });
  const silicone = new THREE.MeshPhysicalMaterial({ color: 0xc9c2dc, roughness: 0.85, sheen: 1, sheenColor: 0xffffff });
  const mesh = new THREE.MeshStandardMaterial({ color: 0x1b1922, metalness: 0.6, roughness: 0.5 });
  const b = new THREE.Group();
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 48, 32), white);
  head.scale.set(1, 1.08, 0.92);
  b.add(head);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.095, 40, 24), silicone);
  tip.scale.set(1, 1, 0.85);
  tip.position.set(-side * 0.09, 0.02, 0.07);
  b.add(tip);
  const grille = new THREE.Mesh(new THREE.CircleGeometry(0.038, 32), mesh);
  grille.position.set(side * 0.06, 0.07, 0.115);
  grille.lookAt(grille.position.clone().multiplyScalar(3));
  b.add(grille);
  const stem = new THREE.Mesh(new THREE.CapsuleGeometry(0.048, 0.34, 10, 28), white);
  stem.position.set(side * 0.03, -0.25, -0.01);
  stem.rotation.z = side * 0.1;
  b.add(stem);
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.03, 32), new THREE.MeshStandardMaterial({ color: 0xb9b5c6, metalness: 1, roughness: 0.25 }));
  cap.position.set(side * 0.05, -0.44, -0.01);
  cap.rotation.z = side * 0.1;
  b.add(cap);
  return b;
}

export function createBuds() {
  const group = new THREE.Group();
  const SEAM = 0.15;
  const bodyPlaneL = new THREE.Plane(new THREE.Vector3(0, -1, 0), SEAM);
  const lidPlaneL = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const bodyPlane = bodyPlaneL.clone();
  const lidPlane = lidPlaneL.clone();
  const caseMat = (plane) => new THREE.MeshPhysicalMaterial({
    color: 0xf3f0fa, roughness: 0.24, clearcoat: 1, clearcoatRoughness: 0.08,
    side: THREE.DoubleSide, clippingPlanes: [plane], envMapIntensity: 1,
  });
  const caseGeo = new THREE.ExtrudeGeometry(roundedRect(1.0, 0.78, 0.33), {
    depth: 0.28, bevelEnabled: true, bevelThickness: 0.085, bevelSize: 0.07, bevelSegments: 12, curveSegments: 56,
  });
  caseGeo.translate(0, 0, -0.14);
  const body = new THREE.Mesh(caseGeo, caseMat(bodyPlane));
  group.add(body);

  const inner = new THREE.MeshStandardMaterial({ color: 0xcfc5e6, roughness: 0.7 });
  const deck = new THREE.Mesh(shapePlane(roundedRect(1.06, 0.4, 0.18)), inner);
  deck.rotation.x = -Math.PI / 2;
  deck.position.y = SEAM - 0.004;
  group.add(deck);
  const holeMat = new THREE.MeshStandardMaterial({ color: 0x7d7494, roughness: 0.6 });
  [-0.24, 0.24].forEach((x) => {
    const h = new THREE.Mesh(new THREE.CircleGeometry(0.11, 40), holeMat);
    h.rotation.x = -Math.PI / 2;
    h.position.set(x, SEAM - 0.002, 0);
    group.add(h);
  });
  const led = new THREE.Mesh(new THREE.CircleGeometry(0.014, 24), new THREE.MeshBasicMaterial({ color: 0x7dff9a }));
  led.position.set(0, -0.02, 0.226);
  group.add(led);

  const hinge = new THREE.Group();
  hinge.position.set(0, SEAM, -0.2);
  group.add(hinge);
  const lidGeo = caseGeo.clone();
  lidGeo.translate(0, -SEAM, 0.2);
  const lid = new THREE.Mesh(lidGeo, caseMat(lidPlane));
  hinge.add(lid);
  const lidDeck = new THREE.Mesh(shapePlane(roundedRect(1.06, 0.4, 0.18)), inner);
  lidDeck.rotation.x = Math.PI / 2;
  lidDeck.position.set(0, 0.004, 0.2);
  hinge.add(lidDeck);

  const L = makeBud(-1), R = makeBud(1);
  group.add(L, R);
  const finalL = { p: [-0.3, 0.86, 0.12], r: [0.15, 0.55, 0.12] };
  const finalR = { p: [0.32, 0.92, 0.1], r: [0.1, -0.6, -0.1] };
  const place = (b, f) => { b.position.set(...f.p); b.rotation.set(...f.r); b.scale.setScalar(1); };

  const OPEN = -1.75;
  return {
    group,
    elev: 0.3, yaw: -0.35, fit: 0.95,
    setFinal() { hinge.rotation.x = OPEN; place(L, finalL); place(R, finalR); },
    setStart() {
      hinge.rotation.x = 0;
      [L, R].forEach((b, i) => { b.position.set(i ? 0.24 : -0.24, 0.05, 0); b.rotation.set(0, 0, 0); b.scale.setScalar(0.9); });
    },
    intro(gsap) {
      gsap.to(hinge.rotation, { x: OPEN, duration: 1.4, ease: 'power3.inOut', delay: 0.1 });
      [[L, finalL], [R, finalR]].forEach(([b, f], i) => {
        gsap.to(b.position, { x: f.p[0], y: f.p[1], z: f.p[2], duration: 1.8, ease: 'power3.out', delay: 0.8 + i * 0.12 });
        gsap.to(b.rotation, { x: f.r[0], y: f.r[1], z: f.r[2], duration: 1.8, ease: 'power3.out', delay: 0.8 + i * 0.12 });
        gsap.to(b.scale, { x: 1, y: 1, z: 1, duration: 1.2, delay: 0.8 });
      });
    },
    update(t) {
      L.position.y += Math.sin(t * 1.3) * 0.0006;
      R.position.y += Math.sin(t * 1.3 + 1.4) * 0.0006;
      bodyPlane.copy(bodyPlaneL).applyMatrix4(group.matrixWorld);
      lidPlane.copy(lidPlaneL).applyMatrix4(hinge.matrixWorld);
    },
    clipping: true,
  };
}

/* =========================================================
   Grape Band
   ========================================================= */
function makeStrap(points, w, th) {
  const prof = [];
  const r = th / 2, seg = 8;
  for (let i = 0; i <= seg; i++) { const a = Math.PI / 2 + (i / seg) * Math.PI; prof.push([-w / 2 + r + Math.cos(a) * r, Math.sin(a) * r]); }
  for (let i = 0; i <= seg; i++) { const a = -Math.PI / 2 + (i / seg) * Math.PI; prof.push([w / 2 - r + Math.cos(a) * r, Math.sin(a) * r]); }
  const P = prof.length, n = points.length;
  const pos = [], idx = [];
  const X = new THREE.Vector3(1, 0, 0);
  for (let i = 0; i < n; i++) {
    const a = points[Math.max(0, i - 1)], b = points[Math.min(n - 1, i + 1)];
    const T = b.clone().sub(a).normalize();
    const N = new THREE.Vector3(0, -T.z, T.y);
    prof.forEach(([u, v]) => {
      const p = points[i].clone().addScaledVector(X, u).addScaledVector(N, v);
      pos.push(p.x, p.y, p.z);
    });
  }
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < P; j++) {
      const a = i * P + j, b = i * P + ((j + 1) % P), c = (i + 1) * P + j, d = (i + 1) * P + ((j + 1) % P);
      idx.push(a, c, b, b, c, d);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

function watchFace() {
  const c = document.createElement('canvas');
  c.width = 520; c.height = 640;
  const g = c.getContext('2d');
  const tex = canvasTex(c);
  const rings = [
    { r: 175, col: ['#ff2d7a', '#ff7ac6'], v: 0.82 },
    { r: 132, col: ['#7dff3a', '#c6ff6b'], v: 0.64 },
    { r: 89, col: ['#22d3ff', '#7ae8ff'], v: 0.9 },
  ];
  const state = { p: 0 };
  function draw(t) {
    g.fillStyle = '#000'; g.fillRect(0, 0, 520, 640);
    const cx = 260, cy = 360;
    rings.forEach((ring) => {
      g.lineWidth = 36; g.lineCap = 'round';
      g.strokeStyle = ring.col[0] + '33';
      g.beginPath(); g.arc(cx, cy, ring.r, 0, Math.PI * 2); g.stroke();
      const gr = g.createLinearGradient(cx - ring.r, cy - ring.r, cx + ring.r, cy + ring.r);
      gr.addColorStop(0, ring.col[0]); gr.addColorStop(1, ring.col[1]);
      g.strokeStyle = gr;
      const end = -Math.PI / 2 + Math.max(0.001, ring.v * state.p) * Math.PI * 2;
      g.beginPath(); g.arc(cx, cy, ring.r, -Math.PI / 2, end); g.stroke();
    });
    g.fillStyle = '#fff'; g.textAlign = 'right';
    g.font = '600 46px Inter, sans-serif'; g.fillText('10:08', 486, 78);
    const s = Math.floor(t) % 60;
    g.fillStyle = '#c9a8ff'; g.font = '600 26px Inter, sans-serif'; g.fillText(':' + String(s).padStart(2, '0'), 486, 112);
    g.textAlign = 'left'; g.fillStyle = '#ff7ac6'; g.font = '700 26px Inter, "Noto Sans JP", sans-serif';
    g.fillText(Math.round(486 * state.p) + ' kcal', 34, 78);
    g.fillStyle = '#9b97a8'; g.font = '500 22px "Noto Sans JP", sans-serif'; g.fillText('アクティビティ', 34, 110);
    tex.needsUpdate = true;
  }
  draw(0);
  return { tex, state, draw };
}

export function createWatch({ color = 0x3b2a5c, band = 0x5a2fc0 } = {}) {
  const group = new THREE.Group();
  const alu = new THREE.MeshPhysicalMaterial({ color, metalness: 1, roughness: 0.27, clearcoat: 0.7, clearcoatRoughness: 0.15, envMapIntensity: 1.3 });
  const BW = 0.74, BH = 0.9, BD = 0.14, BV = 0.05;
  const FRONT = BD / 2 + BV;
  const bGeo = new THREE.ExtrudeGeometry(roundedRect(BW, BH, 0.19), {
    depth: BD, bevelEnabled: true, bevelThickness: BV, bevelSize: 0.045, bevelSegments: 10, curveSegments: 48,
  });
  bGeo.translate(0, 0, -BD / 2);
  group.add(new THREE.Mesh(bGeo, [glassBlack(), alu]));

  const face = watchFace();
  const glass = new THREE.Mesh(shapePlane(roundedRect(BW + 0.03, BH + 0.03, 0.2)), glassBlack());
  glass.position.z = FRONT + 0.0006;
  group.add(glass);
  const disp = new THREE.Mesh(shapePlane(roundedRect(BW - 0.05, BH - 0.05, 0.15)), new THREE.MeshBasicMaterial({ map: face.tex, toneMapped: false }));
  disp.position.z = FRONT + 0.0012;
  group.add(disp);
  const glare = new THREE.Mesh(shapePlane(roundedRect(BW + 0.03, BH + 0.03, 0.2)), glareMat());
  glare.position.z = FRONT + 0.0018;
  group.add(glare);

  const crownGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.08, 64, 1);
  crownGeo.rotateZ(Math.PI / 2);
  const crown = new THREE.Mesh(crownGeo, alu);
  crown.position.set(BW / 2 + 0.045 + 0.035, 0.17, 0);
  group.add(crown);
  const crownRing = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.008, 12, 48), new THREE.MeshStandardMaterial({ color: 0xb28cff, emissive: 0x3a1890, metalness: 0.5, roughness: 0.3 }));
  crownRing.rotation.y = Math.PI / 2;
  crownRing.position.set(BW / 2 + 0.045 + 0.077, 0.17, 0);
  group.add(crownRing);
  const btn = new THREE.Mesh(new RoundedBoxGeometry(0.035, 0.22, 0.08, 3, 0.014), alu);
  btn.position.set(BW / 2 + 0.045 + 0.012, -0.13, 0);
  group.add(btn);
  const sensor = new THREE.Mesh(new THREE.SphereGeometry(0.26, 48, 24), new THREE.MeshPhysicalMaterial({ color: 0x0b0a10, roughness: 0.1, clearcoat: 1 }));
  sensor.scale.set(1, 1, 0.22);
  sensor.position.z = -BD / 2 - 0.02;
  group.add(sensor);

  /* strap loop around an imaginary wrist */
  const ry = 0.86, rz = 0.62, cz = -0.62;
  const phi0 = Math.asin(0.4 / ry);
  const pts = [];
  for (let i = 0; i <= 120; i++) {
    const phi = phi0 + (i / 120) * (Math.PI * 2 - 2 * phi0);
    pts.push(new THREE.Vector3(0, ry * Math.sin(phi), cz + rz * Math.cos(phi)));
  }
  const strapMat = new THREE.MeshPhysicalMaterial({ color: band, roughness: 0.55, sheen: 0.6, sheenColor: 0xffffff, clearcoat: 0.2, side: THREE.DoubleSide });
  group.add(new THREE.Mesh(makeStrap(pts, 0.58, 0.07), strapMat));
  const pinMat = new THREE.MeshStandardMaterial({ color: 0x2a1a50, roughness: 0.6 });
  for (let i = 0; i < 6; i++) {
    const phi = Math.PI * 0.72 + i * 0.09;
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.075, 16), pinMat);
    pin.position.set(0, ry * Math.sin(phi), cz + rz * Math.cos(phi));
    pin.lookAt(new THREE.Vector3(0, 0, cz));
    pin.rotateX(Math.PI / 2);
    group.add(pin);
  }

  return {
    group,
    elev: 0.12, yaw: -0.55, fit: 0.92,
    setFinal() { face.state.p = 1; },
    setStart() { face.state.p = 0; },
    intro(gsap) { gsap.to(face.state, { p: 1, duration: 2.4, ease: 'power3.out', delay: 0.3 }); },
    update(t) { face.draw(t); },
  };
}

/* =========================================================
   Vine (three colours, fanned)
   ========================================================= */
export function createVineTrio() {
  const group = new THREE.Group();
  const specs = [
    { color: 0xb8e2d6, hue: -60, x: -0.62, ry: 0.5, rz: 0.1, z: -0.25 },
    { color: 0xf1dc9a, hue: 70, x: 0.62, ry: -0.5, rz: -0.1, z: -0.25 },
    { color: 0xcdb8f2, hue: 20, x: 0, ry: Math.PI - 0.3, rz: 0, z: 0.15 },
  ];
  const phones = specs.map((s) => {
    const p = createPhone({ color: s.color, variant: 'vine', wallHue: s.hue });
    group.add(p.group);
    return { g: p.group, s };
  });
  const finalPose = () => phones.forEach(({ g, s }) => { g.position.set(s.x, 0, s.z); g.rotation.set(0, s.ry, s.rz); });
  return {
    group,
    elev: 0.08, yaw: 0, fit: 0.95, sway: 0.12,
    setFinal: finalPose,
    setStart() { phones.forEach(({ g, s }) => { g.position.set(0, 0, s.z); g.rotation.set(0, s.ry * 0.3, 0); }); },
    intro(gsap) {
      phones.forEach(({ g, s }, i) => {
        gsap.to(g.position, { x: s.x, duration: 1.8, ease: 'expo.out', delay: 0.15 + i * 0.05 });
        gsap.to(g.rotation, { y: s.ry, z: s.rz, duration: 2, ease: 'expo.out', delay: 0.15 + i * 0.05 });
      });
    },
  };
}
