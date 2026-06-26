// 各ギャラリーの画像とalt。altは元index.htmlの記述を踏襲し、欠けていたものは補った。
export type Slide = { src: string; alt: string };

// HOMEヒーロースライダー（10枚）。hero-08/hero-10は元フォルダに原本がなく暫定base64版。
export const heroSlides: Slide[] = [
  { src: 'hero/hero-01.webp', alt: '写真展の集合写真' },
  { src: 'hero/hero-02.webp', alt: 'フォトウォークのインスタレーション' },
  { src: 'hero/hero-03.webp', alt: '展示会場のSSB文字モザイク' },
  { src: 'hero/hero-04.webp', alt: '海辺で乾杯するメンバー' },
  { src: 'hero/hero-05.webp', alt: '街中を歩くメンバー' },
  { src: 'hero/hero-06.webp', alt: '写真展示会の様子' },
  { src: 'hero/hero-07.webp', alt: 'カメラと観葉植物の静物' },
  { src: 'hero/hero-08.webp', alt: '海辺フォトウォークの集合写真' },
  { src: 'hero/hero-09.webp', alt: '写真展の集合写真' },
  { src: 'hero/hero-10.webp', alt: '赤い吊り橋とメンバー' },
];

// WORKS: SSB写真展スライダー（5枚）
export const exhibitionSlides: Slide[] = [
  { src: 'works/exhibition/ex-01.webp', alt: 'SSB写真展の展示会場' },
  { src: 'works/exhibition/ex-02.webp', alt: 'SSB写真展 フォトブック展示' },
  { src: 'works/exhibition/ex-03.webp', alt: 'SSB写真展 展示鑑賞' },
  { src: 'works/exhibition/ex-04.webp', alt: 'SSB写真展 来場者との交流' },
  { src: 'works/exhibition/ex-05.webp', alt: 'SSB写真展 集合写真' },
];

// WORKS: 活動詳細ごとのギャラリー
export const photowalkSlides: Slide[] = [
  { src: 'works/photowalk/pw-01.webp', alt: 'Nikonジャケットを着たNikonスタッフ' },
  { src: 'works/photowalk/pw-02.webp', alt: 'フォトウォークで街中を撮影' },
  { src: 'works/photowalk/pw-03.webp', alt: '静岡駅前の街並み' },
  { src: 'works/photowalk/pw-04.webp', alt: 'レンタルフォトウォークの参加者' },
];

export const fakuhakuSlides: Slide[] = [
  { src: 'works/fakuhaku/fk-01.webp', alt: 'ファクハク工場見学' },
  { src: 'works/fakuhaku/fk-02.webp', alt: '工場の素材' },
  { src: 'works/fakuhaku/fk-03.webp', alt: '工場の倉庫' },
  { src: 'works/fakuhaku/fk-04.webp', alt: '工場の様子' },
  { src: 'works/fakuhaku/fk-05.webp', alt: '工場の部品' },
  { src: 'works/fakuhaku/fk-06.webp', alt: '工場の火花' },
  { src: 'works/fakuhaku/fk-07.webp', alt: '工場の精密部品' },
  { src: 'works/fakuhaku/fk-08.webp', alt: '工場内部の見学' },
];

export const fujiSlides: Slide[] = [
  { src: 'works/fuji/fj-01.webp', alt: '富士駅前の集合写真' },
  { src: 'works/fuji/fj-02.webp', alt: '富士駅前 集合写真' },
  { src: 'works/fuji/fj-03.webp', alt: '富士の街と富士山' },
  { src: 'works/fuji/fj-04.webp', alt: '商店街の記憶' },
  { src: 'works/fuji/fj-05.webp', alt: '商店街内部' },
];

export const tenryuSlides: Slide[] = [
  { src: 'works/tenryu/tr-01.webp', alt: '天竜区フォトウォークの集合写真' },
  { src: 'works/tenryu/tr-02.webp', alt: '天竜区フォトウォークの参加者' },
  { src: 'works/tenryu/tr-03.webp', alt: '天竜区フォトウォークの様子' },
  { src: 'works/tenryu/tr-04.webp', alt: '天竜区フォトウォークの様子' },
  { src: 'works/tenryu/tr-05.webp', alt: '天竜区フォトウォークでの解説' },
];

export const lightingSlides: Slide[] = [
  { src: 'works/lighting/lt-01.webp', alt: 'ライティングワークショップの作品' },
  { src: 'works/lighting/lt-02.webp', alt: 'スタジオでのライティング実習' },
  { src: 'works/lighting/lt-03.webp', alt: '屋外撮影ワークショップ' },
  { src: 'works/lighting/lt-04.webp', alt: '屋上での撮影実習' },
  { src: 'works/lighting/lt-05.webp', alt: 'ライティングワークショップの集合写真' },
];
