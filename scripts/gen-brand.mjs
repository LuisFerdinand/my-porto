// Builds the favicons, app icons, PWA icons and logo marks from the silver-on-transparent logo in public/Web.
// The logo is light, so every icon sits on the site's near-black (#14131a). Run: node scripts/gen-brand.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const SRC = here("../public/Web/android-chrome-512x512.png");
const OUT = here("../public/icons/");
const APP = here("../app/");
const INK = { r: 20, g: 19, b: 26, alpha: 1 };
mkdirSync(OUT, { recursive: true });

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const bbox = (y0, y1, threshold = 70) => {
  let minX = info.width, maxX = 0, minY = info.height, maxY = 0;
  for (let y = y0; y < y1; y++)
    for (let x = 0; x < info.width; x++)
      if (data[(y * info.width + x) * 4 + 3] > threshold) {
        minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      }
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
};

// The LF monogram sits above the name; the lockup is everything.
const markBox = bbox(0, 325);
const lockBox = bbox(0, info.height, 40);
const mark = await sharp(SRC).extract(markBox).png().toBuffer();
const lockup = await sharp(SRC).extract(lockBox).png().toBuffer();
console.log("monogram", markBox, "lockup", lockBox);

// Transparent marks for use inside the site (nav, footer).
await sharp(mark).resize({ height: 192, fit: "inside" }).png().toFile(OUT + "mark.png");
await sharp(lockup).resize({ width: 720, fit: "inside" }).png().toFile(OUT + "lockup.png");

// The monogram centred on a dark square; `pad` is the share of the square left empty around it.
async function square(size, { pad = 0.22, radius = 0 } = {}) {
  const inner = Math.round(size * (1 - pad * 2));
  const glyph = await sharp(mark).resize({ width: inner, height: inner, fit: "inside" }).png().toBuffer();
  const base = sharp({ create: { width: size, height: size, channels: 4, background: INK } });
  let img = await base.composite([{ input: glyph, gravity: "center" }]).png().toBuffer();
  if (radius) {
    const mask = Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#fff"/></svg>`);
    img = await sharp(img).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
  }
  return img;
}

const files = {
  [OUT + "icon-192.png"]: await square(192, { radius: 40 }),
  [OUT + "icon-512.png"]: await square(512, { radius: 112 }),
  [OUT + "maskable-512.png"]: await square(512, { pad: 0.3 }), // full bleed; the OS rounds it
  [APP + "icon.png"]: await square(512, { radius: 112 }),
  [APP + "apple-icon.png"]: await square(180, { pad: 0.2 }), // iOS rounds it itself
};
for (const [path, buf] of Object.entries(files)) writeFileSync(path, buf);

// favicon.ico with 16, 32 and 48 px PNG frames (tighter padding so the mark stays legible when tiny).
const sizes = [16, 32, 48];
const frames = await Promise.all(sizes.map((s) => square(s, { pad: 0.1, radius: Math.round(s * 0.22) })));
const header = Buffer.alloc(6 + 16 * frames.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);
let offset = header.length;
frames.forEach((f, i) => {
  const o = 6 + 16 * i;
  header[o] = sizes[i]; header[o + 1] = sizes[i];
  header.writeUInt16LE(1, o + 4); header.writeUInt16LE(32, o + 6);
  header.writeUInt32LE(f.length, o + 8); header.writeUInt32LE(offset, o + 12);
  offset += f.length;
});
writeFileSync(APP + "favicon.ico", Buffer.concat([header, ...frames]));

// Social preview, 1200x630.
const og = await sharp({ create: { width: 1200, height: 630, channels: 4, background: INK } })
  .composite([{ input: await sharp(lockup).resize({ height: 360, fit: "inside" }).png().toBuffer(), gravity: "center" }])
  .png().toBuffer();
writeFileSync(APP + "opengraph-image.png", og);
console.log("done");
