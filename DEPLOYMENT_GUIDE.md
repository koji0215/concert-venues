# デプロイメントガイド

このドキュメントでは、concert-venuesサイトを公開する2つの方法を説明します。

## 目次
- [方法1: GitHub Pages](#方法1-github-pages)
- [方法2: Cloudflare Pages（推奨）](#方法2-cloudflare-pages推奨)
- [独自ドメインの設定](#独自ドメインの設定)

---

## 前提条件

- GitHubリポジトリが作成済み（https://github.com/koji0215/concert-venues）
- ローカルでプロジェクトが動作している
- Node.js と npm がインストール済み

---

## 方法1: GitHub Pages

### ステップ1: Next.js を静的エクスポート用に設定

1. `next.config.ts` を以下のように編集：

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/concert-venues',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

2. `package.json` にデプロイスクリプトを追加：

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "export": "next build"
  }
}
```

### ステップ2: GitHub Pages用のワークフローを作成

`.github/workflows/deploy.yml` ファイルを作成：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build with Next.js
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### ステップ3: GitHubリポジトリの設定

1. GitHubリポジトリのページを開く
2. **Settings** → **Pages** に移動
3. **Source** を **GitHub Actions** に変更
4. 保存

### ステップ4: デプロイ

```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

プッシュ後、GitHub Actionsが自動的に実行され、サイトが公開されます。

**公開URL**: `https://koji0215.github.io/concert-venues/`

### GitHub Pagesのメリット・デメリット

✅ **メリット**:
- 完全無料
- GitHubと完全統合
- 設定が簡単

❌ **デメリット**:
- 配信速度が遅め
- basePath設定が必要（URLに `/concert-venues` が含まれる）
- カスタムヘッダーの設定が制限的

---

## 方法2: Cloudflare Pages（推奨）

Cloudflare Pagesは高速で、カスタムドメインの設定も簡単です。

### ステップ1: Next.js を静的エクスポート用に設定

1. `next.config.ts` を以下のように編集：

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // basePathは不要！
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

2. ローカルでビルドテスト：

```bash
npm run build
```

### ステップ2: Cloudflare Pagesでプロジェクトを作成

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) にログイン
2. **Workers & Pages** に移動
3. **Create application** → **Pages** → **Connect to Git** を選択
4. GitHubアカウントを接続
5. `concert-venues` リポジトリを選択

### ステップ3: ビルド設定

以下の設定を入力：

- **Project name**: `concert-venues` （または任意の名前）
- **Production branch**: `main`
- **Framework preset**: `Next.js`
- **Build command**: `npm run build`
- **Build output directory**: `out`

### ステップ4: 環境変数（オプション）

必要に応じて環境変数を設定できます。今回は不要です。

### ステップ5: デプロイ

1. **Save and Deploy** をクリック
2. 自動的にビルドが開始されます
3. 完了後、URLが表示されます

**公開URL**: `https://concert-venues.pages.dev`

### 自動デプロイの設定

以降、`main` ブランチにプッシュするたびに自動的にデプロイされます：

```bash
git add .
git commit -m "Update venue data"
git push origin main
```

### Cloudflare Pagesのメリット・デメリット

✅ **メリット**:
- **超高速**（Cloudflareのグローバルネットワーク）
- 無料で無制限のリクエスト
- カスタムドメインが簡単
- basePathが不要（クリーンなURL）
- 優れたキャッシング
- 自動HTTPS
- プレビューデプロイ機能

❌ **デメリット**:
- Cloudflareアカウントが必要
- 初回設定がGitHub Pagesより少し複雑

---

## 独自ドメインの設定

### GitHub Pagesの場合

1. **Settings** → **Pages** → **Custom domain** に移動
2. ドメイン名を入力（例: `concert-venues.com`）
3. DNSレコードを設定：
   - `A` レコード: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` レコード: `koji0215.github.io`

### Cloudflare Pagesの場合

1. Cloudflare Pagesのプロジェクトページで **Custom domains** に移動
2. **Set up a custom domain** をクリック
3. ドメイン名を入力
4. Cloudflareが自動的にDNS設定を行います（Cloudflareでドメインを管理している場合）

---

## どちらを選ぶべきか？

### GitHub Pagesを選ぶ場合
- 完全無料で始めたい
- GitHub内で完結させたい
- 技術的な設定を最小限にしたい

### Cloudflare Pagesを選ぶ場合（推奨）
- パフォーマンスを重視
- プロフェッショナルな公開サイトにしたい
- 将来的にカスタムドメインを使う予定
- クリーンなURL構造が欲しい

---

## トラブルシューティング

### ビルドエラーが出る場合

```bash
# ローカルでビルドテスト
npm run build

# キャッシュをクリア
rm -rf .next out node_modules
npm install
npm run build
```

### 画像が表示されない場合

`next.config.ts` で `images.unoptimized: true` が設定されているか確認してください。

### 404エラーが出る場合

- GitHub Pages: `basePath` が正しく設定されているか確認
- Cloudflare Pages: `output: 'export'` が設定されているか確認

---

## 次のステップ

1. デプロイ方法を選択
2. 設定ファイルを更新
3. GitHubにプッシュ
4. 公開URLでサイトを確認
5. 必要に応じてカスタムドメインを設定

何か問題が発生した場合は、このガイドのトラブルシューティングセクションを参照してください。
