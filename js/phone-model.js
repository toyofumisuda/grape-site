/* Grape Vine Pro — procedural 3D model (all geometry & textures generated in code) */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export const COLORS = {
  grape:    { hex: 0x3b2a5c, name: 'ディープグレープ' },
  midnight: { hex: 0x26262b, name: 'ミッドナイト' },
  silver:   { hex: 0xd4d4da, name: 'シルバーミスト' },
  rose:     { hex: 0xd9b2b6, name: 'ロゼ' },
};

/* ---------- helpers ---------- */
function roundedRect(w, h, r) {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - r);
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + h);
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r);
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
}

function shapePlane(shape, seg = 32) {
  const g = new THREE.ShapeGeometry(shape, seg);
  g.computeBoundingBox();
  const { min, max } = g.boundingBox;
  const pos = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    uv.setXY(i, (pos.getX(i) - min.x) / (max.x - min.x), (pos.getY(i) - min.y) / (max.y - min.y));
  }
  uv.needsUpdate = true;
  return g;
}

function canvasTex(c) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/* Lock-screen wallpaper: flowing S-shaped ribbons of light */
export function makeWallpaper() {
  const c = document.createElement('canvas');
  c.width = 1000; c.height = 2160;
  const g = c.getContext('2d');
  g.fillStyle = '#05030a';
  g.fillRect(0, 0, c.width, c.height);
  g.globalCompositeOperation = 'lighter';
  const ribbons = (blur, alpha, wMul) => {
    g.filter = blur ? `blur(${blur}px)` : 'none';
    for (let i = 0; i < 28; i++) {
      const t = i / 27;
      const grad = g.createLinearGradient(0, 2160, 1000, 0);
      grad.addColorStop(0, `hsla(${255 + t * 30}, 95%, ${42 + t * 18}%, ${alpha})`);
      grad.addColorStop(0.5, `hsla(${292 + t * 22}, 95%, 62%, ${alpha})`);
      grad.addColorStop(1, `hsla(${215 + t * 25}, 95%, 60%, ${alpha})`);
      g.strokeStyle = grad;
      g.lineWidth = (5 + t * 26) * wMul;
      const o = (t - 0.5) * 300;
      g.beginPath();
      g.moveTo(-250, 2000 + o);
      g.bezierCurveTo(950 + o, 1800, 1300, 1260 + o, 520, 1080 + o * 0.5);
      g.bezierCurveTo(-280, 900 - o, 60, 420 + o, 1260, 240 + o);
      g.stroke();
    }
  };
  ribbons(46, 0.11, 3.2);
  ribbons(12, 0.11, 1.2);
  ribbons(0, 0.2, 0.22);
  g.filter = 'none';
  g.globalCompositeOperation = 'source-over';
  const v = g.createRadialGradient(500, 1080, 250, 500, 1080, 1350);
  v.addColorStop(0, 'rgba(0,0,0,0)');
  v.addColorStop(1, 'rgba(0,0,0,.8)');
  g.fillStyle = v;
  g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = 'rgba(255,255,255,.9)';
  g.textAlign = 'center';
  g.font = '600 42px Inter, "Noto Sans JP", sans-serif';
  g.fillText('11月12日 木曜日', 500, 330);
  g.font = '300 250px Inter, sans-serif';
  g.fillText('10:08', 500, 580);
  return canvasTex(c);
}

function makeLensTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const r = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  r.addColorStop(0, '#05050a');
  r.addColorStop(0.28, '#0b0a1a');
  r.addColorStop(0.45, '#2b1f5a');
  r.addColorStop(0.55, '#0a0814');
  r.addColorStop(0.82, '#15141c');
  r.addColorStop(0.9, '#3a3a44');
  r.addColorStop(1, '#0c0c10');
  g.fillStyle = r;
  g.fillRect(0, 0, 256, 256);
  g.fillStyle = 'rgba(255,255,255,.35)';
  g.beginPath(); g.ellipse(100, 92, 16, 10, -0.6, 0, Math.PI * 2); g.fill();
  g.fillStyle = 'rgba(150,120,255,.35)';
  g.beginPath(); g.arc(150, 152, 7, 0, Math.PI * 2); g.fill();
  return canvasTex(c);
}

function makeLogoTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#fff';
  const dots = [[82, 110], [128, 110], [174, 110], [105, 152], [151, 152], [128, 194]];
  dots.forEach(([x, y]) => { g.beginPath(); g.arc(x, y, 21, 0, Math.PI * 2); g.fill(); });
  g.lineWidth = 9; g.lineCap = 'round'; g.strokeStyle = '#fff';
  g.beginPath(); g.moveTo(128, 86); g.lineTo(128, 52); g.stroke();
  g.beginPath(); g.moveTo(132, 56); g.bezierCurveTo(150, 30, 184, 30, 198, 44); g.bezierCurveTo(176, 64, 150, 66, 132, 56); g.fill();
  return canvasTex(c);
}

export function makeGlowTexture(inner = 'rgba(140,80,255,0.9)') {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d');
  const r = g.createRadialGradient(256, 256, 0, 256, 256, 256);
  r.addColorStop(0, inner);
  r.addColorStop(0.4, 'rgba(110,40,220,0.25)');
  r.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = r;
  g.fillRect(0, 0, 512, 512);
  return canvasTex(c);
}

export function setupEnvironment(renderer, scene) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;
  pmrem.dispose();
}

/* ---------- the phone ---------- */
export function createPhone({ color = COLORS.grape.hex } = {}) {
  const W0 = 0.7, H0 = 1.47, R = 0.105, B = 0.012, D = 0.05;
  const FRONT = D / 2 + B;            // 0.037
  const W = W0 + 2 * B;
  const group = new THREE.Group();

  const frameMat = new THREE.MeshPhysicalMaterial({
    color, metalness: 1, roughness: 0.26, clearcoat: 0.6, clearcoatRoughness: 0.18, envMapIntensity: 1.3,
  });
  const backMat = new THREE.MeshPhysicalMaterial({
    color, metalness: 0.35, roughness: 0.5, clearcoat: 0.4, clearcoatRoughness: 0.4, envMapIntensity: 1.0,
  });
  const plateauMat = new THREE.MeshPhysicalMaterial({
    color, metalness: 0.6, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 1.2,
  });
  const blackGlass = new THREE.MeshPhysicalMaterial({ color: 0x020203, metalness: 0, roughness: 0.06, clearcoat: 1 });

  /* body */
  const bodyGeo = new THREE.ExtrudeGeometry(roundedRect(W0, H0, R), {
    depth: D, bevelEnabled: true, bevelThickness: B, bevelSize: B, bevelSegments: 6, curveSegments: 40,
  });
  bodyGeo.translate(0, 0, -D / 2);
  group.add(new THREE.Mesh(bodyGeo, [blackGlass, frameMat]));

  /* front: glass, display, island, glare */
  const glass = new THREE.Mesh(shapePlane(roundedRect(W0, H0, R)), blackGlass);
  glass.position.z = FRONT + 0.0004;
  group.add(glass);

  const display = new THREE.Mesh(
    shapePlane(roundedRect(W0 - 0.045, H0 - 0.045, R - 0.022)),
    new THREE.MeshBasicMaterial({ map: makeWallpaper(), toneMapped: false, color: 0xe6e6e6 })
  );
  display.position.z = FRONT + 0.0008;
  group.add(display);

  const island = new THREE.Mesh(shapePlane(roundedRect(0.17, 0.048, 0.024)), new THREE.MeshBasicMaterial({ color: 0x000000 }));
  island.position.set(0, H0 / 2 - 0.075, FRONT + 0.0012);
  group.add(island);

  const glare = new THREE.Mesh(
    shapePlane(roundedRect(W0, H0, R)),
    new THREE.MeshPhysicalMaterial({
      color: 0x000000, roughness: 0.05, metalness: 0, clearcoat: 1, envMapIntensity: 0.8,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    })
  );
  glare.position.z = FRONT + 0.0016;
  group.add(glare);

  /* back (local coords: +x = viewer's right when looking at the back) */
  const back = new THREE.Group();
  back.position.z = -FRONT;
  back.rotation.y = Math.PI;
  group.add(back);

  const backGlass = new THREE.Mesh(shapePlane(roundedRect(W0 - 0.01, H0 - 0.01, R - 0.005)), backMat);
  backGlass.position.z = 0.0005;
  back.add(backGlass);

  const logo = new THREE.Mesh(
    new THREE.PlaneGeometry(0.22, 0.22),
    new THREE.MeshPhysicalMaterial({ map: makeLogoTexture(), transparent: true, alphaTest: 0.4, metalness: 1, roughness: 0.15, color: 0xffffff })
  );
  logo.position.set(0, -0.02, 0.0012);
  back.add(logo);

  const P = 0.33;
  const plateau = new THREE.Group();
  plateau.position.set(-(W0 / 2 - 0.035 - P / 2), H0 / 2 - 0.035 - P / 2, 0);
  back.add(plateau);
  const pGeo = new THREE.ExtrudeGeometry(roundedRect(P, P, 0.085), {
    depth: 0.006, bevelEnabled: true, bevelThickness: 0.004, bevelSize: 0.004, bevelSegments: 4, curveSegments: 24,
  });
  plateau.add(new THREE.Mesh(pGeo, plateauMat));
  const top = 0.006 + 0.004;

  const lensTex = makeLensTexture();
  const lensGlass = new THREE.MeshPhysicalMaterial({ map: lensTex, roughness: 0.04, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.02 });
  const ringGeo = new THREE.CylinderGeometry(0.066, 0.069, 0.024, 56);
  ringGeo.rotateX(Math.PI / 2);
  [[-0.078, 0.078], [-0.078, -0.078], [0.078, 0]].forEach(([x, y]) => {
    const ring = new THREE.Mesh(ringGeo, frameMat);
    ring.position.set(x, y, top + 0.012);
    plateau.add(ring);
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.056, 56), lensGlass);
    lens.position.set(x, y, top + 0.0242);
    plateau.add(lens);
  });
  const flash = new THREE.Mesh(new THREE.CircleGeometry(0.023, 32), new THREE.MeshStandardMaterial({ color: 0xf2ecd8, emissive: 0x332e22, roughness: 0.3 }));
  flash.position.set(0.085, 0.1, top + 0.0005);
  plateau.add(flash);
  const sensor = new THREE.Mesh(new THREE.CircleGeometry(0.016, 32), blackGlass);
  sensor.position.set(0.085, -0.1, top + 0.0005);
  plateau.add(sensor);

  /* side buttons (object +x = right side when viewed from the front) */
  const btn = (len, y, side) => {
    const m = new THREE.Mesh(new RoundedBoxGeometry(0.014, len, 0.024, 3, 0.006), frameMat);
    m.position.set(side * (W / 2 + 0.002), y, 0);
    group.add(m);
  };
  btn(0.2, 0.2, 1);     // power
  btn(0.11, -0.22, 1);  // camera control
  btn(0.07, 0.43, -1);  // action
  btn(0.12, 0.29, -1);  // volume +
  btn(0.12, 0.14, -1);  // volume -

  const mats = [frameMat, backMat, plateauMat];
  function setColor(hex, gsap) {
    const target = new THREE.Color(hex);
    mats.forEach((m) => {
      if (gsap) gsap.to(m.color, { r: target.r, g: target.g, b: target.b, duration: 0.9, ease: 'power2.inOut' });
      else m.color.copy(target);
    });
  }

  return { group, setColor };
}
