export type SnsKind = 'instagram' | 'x' | 'note' | 'youtube';

export type SnsLink = {
  kind: SnsKind;
  name: string;
  handle: string;
  href: string;
  desc?: string[];
};

export const snsLinks: SnsLink[] = [
  {
    kind: 'instagram',
    name: 'Instagram',
    handle: '@shizuokashutterbugs',
    href: 'https://www.instagram.com/shizuokashutterbugs/',
    desc: ['静岡＆隣県で撮影された写真のフィーチャー', 'SSBイベントおよび各種情報発信'],
  },
  {
    kind: 'instagram',
    name: 'Instagram',
    handle: '@ssb_information',
    href: 'https://www.instagram.com/ssb_information/',
    desc: ['メンバー各種連絡用アカウント', 'SSB参加連絡はこちらから'],
  },
  {
    kind: 'x',
    name: 'X (Twitter)',
    handle: '@shizu_bug',
    href: 'https://x.com/shizu_bug',
  },
  {
    kind: 'note',
    name: 'note',
    handle: 'しずばぐマガジン',
    href: 'https://note.com/shizu_bug',
    desc: ['SSB活動報告'],
  },
  {
    kind: 'youtube',
    name: 'YouTube',
    handle: 'しずばぐチャンネル',
    href: 'https://www.youtube.com/channel/UCPBH8mqdLoyK7lOUq9F4EEg',
    desc: ['「写真×静岡×バラエティ」な企画発信'],
  },
];

// オープンチャットのルーム紹介
export type OpenChatRoom = {
  title: string;
  body: string;
  bg: string; // カード背景色
  tile: string; // 右上の装飾タイル画像
};

export const openChatRooms: OpenChatRoom[] = [
  {
    title: 'オールメンバールーム',
    body: 'SSBメンバー全員が参加する、お知らせや情報共有のためのメインルームです。',
    bg: '#ffffff',
    tile: 'openchat/oc-01.webp',
  },
  {
    title: 'エリアルーム',
    body: '東部・中部・西部など、お住まいの地域に合わせて参加できるルームです。',
    bg: '#8eebe1',
    tile: 'openchat/oc-02.webp',
  },
  {
    title: '会議室',
    body: 'イベント・企画について話し合うためのトークルームです。発案・企画成立しますと専用のルームが作られ、参加者はそのルームの中で企画を進めます。',
    bg: '#e5e899',
    tile: 'openchat/oc-03.webp',
  },
  {
    title: '部室',
    body: '専門性に特化したトークルームです。「フィルム部」「グルメ部」などがあります。',
    bg: '#ceeca4',
    tile: 'openchat/oc-04.webp',
  },
  {
    title: '喫煙所',
    body: '代表がいます。企画の相談や何でもない雑談などをするためのルームで、話した内容は全て煙と共に消えます。',
    bg: '#f1b3b4',
    tile: 'openchat/oc-05.webp',
  },
];
