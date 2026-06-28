# Shizuoka ShutterBugs 公式サイト

静岡の写真コミュニティ Shizuoka ShutterBugs 公式サイト。
[Astro](https://astro.build/) + TypeScript の静的サイトで、Cloudflare Pages にデプロイします。

## 必要環境

- Node.js 18 以上（22 で動作確認）

## セットアップ・ビルド

```bash
npm install      # 依存をインストール
npm run dev      # 開発サーバ（http://localhost:4321）
npm run build    # 本番ビルド → dist/ に出力
npm run preview  # ビルド結果をローカル確認
npm run check    # 型チェック（astro check）
```

通常の開発・デプロイは **`npm install && npm run build` だけで完結**します。
最適化済み画像（`public/images/`）はコミット済みのため、元画像フォルダや旧 `index.html` は不要です。

## ディレクトリ構成

```
src/
  config/       site.ts（サイト定数・画像ベースURL・ナビ）, forms.ts（フォーム連携定数）
  data/         gallery.ts / members.ts / sns.ts（表示データとalt）
  layouts/      BaseLayout.astro（<head>・SEO・OGP・JSON-LD・ナビ・共通スクリプト）
  components/   Nav, Drawer, Footer, HeroSlider, WorksGallery, ActGallery
  pages/        各ページ（= 各URL）
  styles/       global.css
public/
  images/       最適化済みWebP（コミット対象）
  CNAME, favicon.png, apple-touch-icon.png
assets/         元画像フォルダに原本が無い素材（後述）。画像再生成時のみ使用
scripts/        optimize-images.mjs（画像最適化スクリプト）
```

### ページ（URL）構成

元の1ページSPA（`showPage()` 切替）を、SEO・保守性のため個別URLに分割しています。

| URL | 内容 |
|---|---|
| `/` | HOME（ヒーロースライダー＋ Greeting） |
| `/community` | COMMUNITY（About＋魅力） |
| `/business` | BUSINESS（取り組み＋VISION） |
| `/works` | 活動実績（写真展・各活動ギャラリー） |
| `/members` | 運営メンバー |
| `/contact` | お問い合わせフォーム |
| `/sns` | SNS・各種リンク |
| `/openchat` | オープンチャット詳細 |

ナビの「ABOUT」は COMMUNITY / BUSINESS をまとめる見出しで、URL はフラットです。

## 画像パイプライン

### 参照のしくみ

- 画像のベースURLは **`src/config/site.ts` の `IMAGE_BASE_URL` 1か所**に集約。
  各所は `img('works/fuji/fj-01.webp')` ヘルパー経由で参照します。
- 将来 Cloudflare R2 へ移す場合は、環境変数 `PUBLIC_IMAGE_BASE_URL` を
  R2 の公開URLに差し替えるだけで全画像の参照先が切り替わります。
- `public/images/` はサイト構成に合わせた階層：
  `hero/` `members/` `community/` `openchat/` と、WORKS配下は `works/<活動>/`。

### 画像の生成（`npm run images`）

`scripts/optimize-images.mjs` が元画像を長辺1600px・WebP(q80) に最適化して
`public/images/` に出力します。ソースは2系統：

| ソース種別 | 置き場所 | 内容 |
|---|---|---|
| `file` | 元画像フォルダ `../SSB公式サイト/`（**リポジトリ外**・非コミット） | 写真の正本 |
| `asset` | `assets/`（**コミット対象**） | 元フォルダに原本が無いもの＝ロゴ2枚・欠落写真3枚・オープンチャットタイル5枚 |

**生成済みの `public/images/` をコミットして共有する運用**のため、
通常のメンバーは `npm run images` を実行する必要はありません。

写真を**追加・差し替え・再圧縮**するときだけ次を行います：

1. 元画像フォルダ `../SSB公式サイト/SSB公式サイト/`（バックアップ）を所定の位置に復元する
2. `scripts/optimize-images.mjs` のマニフェストを編集（追加・差し替え）
3. `npm run images` を実行 → `public/images/` を再生成
4. 生成された `public/images/` をコミット

> `file` 系（元フォルダ由来）を1枚でも再生成するには元画像フォルダが必要です。
> `asset` 系のみなら `assets/` だけで再生成できます。

### 暫定素材（欠落写真3枚）

次の3枚は元画像フォルダに原本が無く、旧サイトの埋め込み画像から抽出した
**暫定素材**を `assets/` から使用しています。

- `assets/hero/hero-08.jpg`（ヒーロー：海辺フォトウォーク集合）
- `assets/hero/hero-10.jpg`（ヒーロー：赤い吊り橋とメンバー）
- `assets/fuji/fj-02.jpg`（富士駅前 縦・集合写真）

原本が用意できたら、上記ファイルを高解像度の本物に置き換えて
`npm run images` を実行するだけで反映されます（マニフェストの編集は不要）。

## 外部連携（変更しないこと）

- **メンバー数取得**：Google Apps Script。`src/config/forms.ts` の `GAS_URL`
- **お問い合わせフォーム**：Google フォームへ送信。`GOOGLE_FORM_ID` と各 `entry.*` ID

送信先URL・entry ID は現行の集計先と一致しているため、勝手に変更しないでください。

## デプロイ（Cloudflare Pages）

リポジトリを連携し、ビルド設定を以下にします（**`dist/` はコミットしない**：
クラウド側でビルドされます）。

| 項目 | 値 |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 18 以上 |

独自ドメインは Cloudflare Pages 側のカスタムドメイン設定で行います。
`public/CNAME`（`shizuoka-shutterbugs.com`）は GitHub Pages 併用時のための保険で、
Cloudflare Pages では無害です。

## ブランチ運用・プレビュー確認フロー

**main では直接作業しない。** 作業ブランチで実装し、Cloudflare Pages の
プレビューデプロイURLを管理者に送って確認 → 承認後に main へマージする。

Cloudflare Pages は **main 以外のブランチへ push するたびにプレビュー環境を自動ビルド**し、
`*.pages.dev` のURLを発行する。本番ドメインに触れずにレビューできる。

### 初回のみ（Cloudflare Pages プロジェクト作成）

1. Cloudflare ダッシュボード → Workers & Pages → Create → Pages → Connect to Git で
   GitHub リポジトリ `official.site` を連携
2. Production branch = `main`、Framework preset = `Astro`、
   Build command = `npm run build`、Build output = `dist`
3. 環境変数 `NODE_VERSION` = `20`（18/22でも可）
4. カスタムドメインは**承認・公開準備ができるまで付けない**（現行サイトを止めない）

### 毎回の作業フロー

```bash
# 1. main 以外のブランチで作業
git checkout -b feature/xxxx

# 2. 実装後、ローカル確認
npm run check && npm run build

# 3. コミット & push（初回は -u）
git add -A
git commit -m "..."
git push -u origin feature/xxxx
```

push すると Cloudflare が自動でプレビュービルドを開始する。

### プレビューURLの取得・共有

| 種類 | 形 | 用途 |
|---|---|---|
| ブランチエイリアス（推奨） | `https://<branch>.<project>.pages.dev` | 同ブランチの**最新**を常に指す。修正をpushしても同じURL |
| コミット単位 | `https://<hash>.<project>.pages.dev` | そのコミットに固定 |

- GitHub で PR を作ると、Cloudflare Pages が PR にプレビューURLを自動投稿する。
- または Cloudflare ダッシュボード → 該当プロジェクト → Deployments。
- **管理者にはブランチエイリアスURLを送付**（追加修正後も同じURLで最新を確認できる）。

> ブランチ名のスラッシュは `-` に変換され、エイリアスは28文字まで。
> 例：`feature/astro-migration` → `feature-astro-migration`。長い場合は短いブランチ名にする。

### 承認後

PR を `main` にマージ → main の本番ビルドが走る。公開準備ができたら
Cloudflare Pages の Custom domains で `shizuoka-shutterbugs.com` を接続する。

### 注意

- Cloudflare のビルドは `npm run build` のみ。`npm run images` は走らない
  （元画像フォルダがクラウドに無い）。**画像を追加・差し替えたら、先にローカルで
  `npm run images` して `public/images/` をコミット**しておくこと。
- プレビューを関係者だけに限定したい場合は Cloudflare Access で
  `*.pages.dev` に認証をかけられる（Pages → Settings）。

## コミット対象の目安

- コミットする：`src/` `public/`（`images/` 含む）`assets/` `scripts/`
  `astro.config.mjs` `package.json` `package-lock.json` 等
- コミットしない（`.gitignore` 済み）：`dist/` `node_modules/` `.astro/`
- リポジトリに置かない：元画像フォルダ `SSB公式サイト/`（容量大・ローカル/バックアップ保管）
