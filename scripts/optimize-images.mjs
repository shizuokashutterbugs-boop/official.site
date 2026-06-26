// 元画像から最適化済みWebP/PNGを public/images 配下に生成する。
// 画像ソースは2系統:
//   file  … ローカルの元画像フォルダ(SSB公式サイト)。写真の正本。リポジトリには含めない。
//   asset … assets/ 配下のコミット済み素材。元フォルダに原本が無いもの
//           (ロゴ2枚・欠落写真3枚・オープンチャットタイル5枚) をここから供給する。
// これにより旧 index.html への依存を排し、リポジトリ単体で再生成が完結する。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.resolve(ROOT, '..', 'SSB公式サイト', 'SSB公式サイト');
const ASSETS_DIR = path.resolve(ROOT, 'assets');
const OUT = path.resolve(ROOT, 'public', 'images');

// 元画像フォルダ(任意)を basename(小文字) -> 絶対パス で索引。
// フォルダが無くても asset 由来の生成は動くよう、存在時のみ走査する。
const fileIndex = new Map();
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else fileIndex.set(ent.name.toLowerCase(), p);
  }
}
if (fs.existsSync(SRC_DIR)) walk(SRC_DIR);

// 出力定義。src は { file:'実ファイル名' } か { asset:'assets配下の相対パス' }
const PHOTO = (out, src) => ({ out, src });
const manifest = [
  // ── HERO (10) ──
  PHOTO('hero/hero-01.webp', { file: '_DSC4539.jpeg' }),
  PHOTO('hero/hero-02.webp', { file: '1L0A5357-3.jpg' }),
  PHOTO('hero/hero-03.webp', { file: '20250803-DSCF8284.jpg' }),
  PHOTO('hero/hero-04.webp', { file: 'DSCF2187.jpg' }),
  PHOTO('hero/hero-05.webp', { file: 'DSC01185.JPG' }),
  PHOTO('hero/hero-06.webp', { file: 'DSCF8750.jpg' }),
  PHOTO('hero/hero-07.webp', { file: 'SSB_3899.jpg' }),
  PHOTO('hero/hero-08.webp', { asset: 'hero/hero-08.jpg' }), // 欠落: 海辺フォトウォーク集合(暫定素材)
  PHOTO('hero/hero-09.webp', { file: 'DSCF0082.jpg' }),
  PHOTO('hero/hero-10.webp', { asset: 'hero/hero-10.jpg' }), // 欠落: 赤い吊り橋とメンバー(暫定素材)
  // ── MEMBERS (3) ──
  PHOTO('members/ryo.webp', { file: 'ryo2.jpg' }),
  PHOTO('members/miho.webp', { file: 'miho.jpg' }),
  PHOTO('members/hiro.webp', { file: 'hiro.jpg' }),
  // ── WORKS: SSB写真展 (5) ──
  PHOTO('works/exhibition/ex-01.webp', { file: '20250320-DSC_1994.jpg' }),
  PHOTO('works/exhibition/ex-02.webp', { file: '20250322-DSC_2147.jpg' }),
  PHOTO('works/exhibition/ex-03.webp', { file: '20250323-DSC_2491.jpg' }),
  PHOTO('works/exhibition/ex-04.webp', { file: '20250323-DSC_2511.jpg' }),
  PHOTO('works/exhibition/ex-05.webp', { file: '20250325-DSCF3991.jpg' }),
  // ── WORKS: レンタルフォトウォーク (4) ──
  PHOTO('works/photowalk/pw-01.webp', { file: 'L1003338.JPG' }),
  PHOTO('works/photowalk/pw-02.webp', { file: 'DSCF0126.JPG' }),
  PHOTO('works/photowalk/pw-03.webp', { file: 'L1003361.JPG' }),
  PHOTO('works/photowalk/pw-04.webp', { file: 'L1003332.JPG' }),
  // ── WORKS: ファクハク (8) ──
  PHOTO('works/fakuhaku/fk-01.webp', { file: 'IMG_0989.jpg' }),
  PHOTO('works/fakuhaku/fk-02.webp', { file: 'retouched-6.jpg' }),
  PHOTO('works/fakuhaku/fk-03.webp', { file: 'DSC07861.jpg' }),
  PHOTO('works/fakuhaku/fk-04.webp', { file: 'PXL_20240720_054657823.jpg' }),
  PHOTO('works/fakuhaku/fk-05.webp', { file: 'DP3Q0924.jpg' }),
  PHOTO('works/fakuhaku/fk-06.webp', { file: 'IMG_4032_Original.jpeg' }),
  PHOTO('works/fakuhaku/fk-07.webp', { file: 'IMG_1112.jpg' }),
  PHOTO('works/fakuhaku/fk-08.webp', { file: 'IMG_1141.jpg' }),
  // ── WORKS: 富士駅前 (5) ──
  PHOTO('works/fuji/fj-01.webp', { file: 'L1005523.jpg' }),
  PHOTO('works/fuji/fj-02.webp', { asset: 'fuji/fj-02.jpg' }), // 欠落: 富士駅前 縦・集合写真(暫定素材)
  PHOTO('works/fuji/fj-03.webp', { file: 'L1005470.jpg' }),
  PHOTO('works/fuji/fj-04.webp', { file: 'L1005529.jpg' }),
  PHOTO('works/fuji/fj-05.webp', { file: 'L1005314.jpg' }),
  // ── WORKS: 天竜区 (5) ──
  PHOTO('works/tenryu/tr-01.webp', { file: 'L1000113.jpg' }),
  PHOTO('works/tenryu/tr-02.webp', { file: 'L1000078.jpg' }),
  PHOTO('works/tenryu/tr-03.webp', { file: 'L1000010.jpg' }),
  PHOTO('works/tenryu/tr-04.webp', { file: 'L1009924.jpg' }),
  PHOTO('works/tenryu/tr-05.webp', { file: 'L1009957.jpg' }),
  // ── WORKS: ライティング (5) ──
  PHOTO('works/lighting/lt-01.webp', { file: 'IMG_0385.JPG' }),
  PHOTO('works/lighting/lt-02.webp', { file: 'IMG_9431.jpg' }),
  PHOTO('works/lighting/lt-03.webp', { file: 'IMG_8019.jpg' }),
  PHOTO('works/lighting/lt-04.webp', { file: 'L1002076.JPG' }),
  PHOTO('works/lighting/lt-05.webp', { file: 'IMG_0382.JPG' }),
  // ── COMMUNITY 魅力カード (3) ──
  PHOTO('community/cm-01.webp', { file: '000020.JPG' }),
  PHOTO('community/cm-02.webp', { file: '250125_浜松駅_130.jpg' }),
  PHOTO('community/cm-03.webp', { file: 'L1005523.jpg' }), // 富士の1枚を流用
  // ── OPENCHAT タイル (5) ロゴ装飾 ──
  PHOTO('openchat/oc-01.webp', { asset: 'openchat/oc-01.jpg' }),
  PHOTO('openchat/oc-02.webp', { asset: 'openchat/oc-02.jpg' }),
  PHOTO('openchat/oc-03.webp', { asset: 'openchat/oc-03.jpg' }),
  PHOTO('openchat/oc-04.webp', { asset: 'openchat/oc-04.jpg' }),
  PHOTO('openchat/oc-05.webp', { asset: 'openchat/oc-05.jpg' }),
];

const MAX = 1600;
const Q = 80;

function getInput(src) {
  if (src.file) {
    const p = fileIndex.get(src.file.toLowerCase());
    if (!p)
      throw new Error(
        `source file not found: ${src.file}（元画像フォルダ ${SRC_DIR} を配置してください）`
      );
    return fs.readFileSync(p);
  }
  if (src.asset) {
    const p = path.join(ASSETS_DIR, src.asset);
    if (!fs.existsSync(p)) throw new Error(`asset not found: ${src.asset}`);
    return fs.readFileSync(p);
  }
  throw new Error('bad src');
}

async function run() {
  let ok = 0;
  for (const item of manifest) {
    const outPath = path.join(OUT, item.out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    const input = getInput(item.src);
    await sharp(input)
      .rotate() // EXIF向きを反映
      .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: Q })
      .toFile(outPath);
    ok++;
    console.log(`  ${item.out}  <- ${item.src.file ?? 'assets/' + item.src.asset}`);
  }

  // ── ブランドロゴ・favicon (assets/brand のロゴから生成) ──
  const brandDir = path.join(OUT, 'brand');
  fs.mkdirSync(brandDir, { recursive: true });
  const navLogo = fs.readFileSync(path.join(ASSETS_DIR, 'brand', 'logo-nav.png'));
  const footerLogo = fs.readFileSync(path.join(ASSETS_DIR, 'brand', 'logo-footer.png'));
  const pub = path.resolve(ROOT, 'public');
  await sharp(navLogo).resize(64, 64, { fit: 'inside' }).png().toFile(path.join(brandDir, 'logo.png'));
  await sharp(footerLogo).resize(180, 180, { fit: 'cover' }).png().toFile(path.join(pub, 'apple-touch-icon.png'));
  await sharp(footerLogo).resize(32, 32, { fit: 'cover' }).png().toFile(path.join(pub, 'favicon.png'));

  console.log(`\nDONE: ${ok} photos + brand logo + favicons`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
