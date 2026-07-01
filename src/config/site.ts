// サイト全体の定数。画像ベースURLはここ1か所に集約し、
// 将来 Cloudflare R2 へ移行する際は PUBLIC_IMAGE_BASE_URL を差し替えるだけで全画像が切り替わる。
export const IMAGE_BASE_URL: string = import.meta.env.PUBLIC_IMAGE_BASE_URL ?? '/images';

// 画像パスを組み立てるヘルパー。各コンポーネントは必ずこれを経由する。
export function img(p: string): string {
  return `${IMAGE_BASE_URL}/${p.replace(/^\/+/, '')}`;
}

export const SITE = {
  name: 'Shizuoka ShutterBugs',
  shortName: 'SSB',
  nickname: 'しずばぐ',
  // 検索エンジン・構造化データ向けの表記ゆれ（略称・愛称・スペース無し表記）
  alternateNames: ['SSB', 'しずばぐ', 'ShizuokaShutterBugs'],
  url: 'https://shizuoka-shutterbugs.com',
  locale: 'ja_JP',
  founded: '2023-06-01',
  area: '静岡県',
  defaultDescription:
    '静岡で写真を楽しむ人たちが集まる写真コミュニティ「Shizuoka ShutterBugs（しずばぐ）」。フォトウォーク・写真展・オンライン交流を通じて、静岡の写真サークル・フォトグラファーがエリアを超えてつながります。',
  ogImage: '/images/hero/hero-01.webp',
  twitter: '@shizu_bug',
} as const;

// グローバルナビ（ABOUTはドロップダウン見出し。URLはフラット）
export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; children: NavLink[] };
export type NavItem = NavLink | NavGroup;

export const NAV: NavItem[] = [
  { label: 'HOME', href: '/' },
  {
    label: 'ABOUT',
    children: [
      { label: 'COMMUNITY', href: '/community' },
      { label: 'BUSINESS', href: '/business' },
    ],
  },
  { label: 'WORKS', href: '/works' },
  { label: 'MEMBER', href: '/members' },
  { label: 'CONTACT', href: '/contact' },
  { label: 'SNS', href: '/sns' },
];
