import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const directory = "public/assets/images";
const output = path.join(directory, "responsive");
await mkdir(output, { recursive: true });
const manifest = {};
for (const file of (await readdir(directory)).filter((name) =>
  /\.(webp|jpe?g|png)$/i.test(name),
)) {
  const source = path.join(directory, file);
  const { width, height } = await sharp(source).metadata();
  const widths = [
    ...new Set(
      [160, 480, 768, 1200, Math.min(width, 1600)].filter(
        (value) => value <= width,
      ),
    ),
  ].sort((a, b) => a - b);
  const variants = [];
  for (const size of widths) {
    const name = `${path.parse(file).name}-${size}.webp`;
    await sharp(source)
      .resize({ width: size, withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 })
      .toFile(path.join(output, name));
    variants.push({ src: `/assets/images/responsive/${name}`, width: size });
  }
  manifest[`/assets/images/${file}`] = { width, height, variants };
}
await writeFile(
  "src/data/responsiveImages.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(
  `Created responsive versions of ${Object.keys(manifest).length} images.`,
);
