# サイト公開クイックスタート

## 🚀 最も簡単な方法: Cloudflare Pages（推奨）

### ステップ1: 設定の確認

すでに準備完了です！`next.config.ts` が静的エクスポート用に設定されています。

### ステップ2: GitHubにプッシュ

```bash
cd concert-venues
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### ステップ3: Cloudflare Pagesで公開

1. **[Cloudflare Dashboard](https://dash.cloudflare.com/)** にアクセス
   - アカウントがない場合は無料登録（メールアドレスのみ）

2. **Workers & Pages** → **Create application** をクリック

3. **Pages** タブ → **Connect to Git** を選択

4. **GitHub** を選択してアカウントを接続

5. リポジトリ **`concert-venues`** を選択

6. ビルド設定を入力：
   ```
   Project name: concert-venues
   Production branch: main
   Build command: npm run build
   Build output directory: out
   ```

7. **Save and Deploy** をクリック

8. **完了！** 3-5分でサイトが公開されます

**公開URL**: `https://concert-venues-xxx.pages.dev`

---

## 📋 もう1つの方法: GitHub Pages

### ステップ1: next.config.ts の修正

`next.config.ts` に `basePath` を追加：

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/concert-venues',  // この行を追加
  images: {
    unoptimized: true,
  },
};
```

### ステップ2: GitHubにプッシュ

```bash
git add .
git commit -m "Configure for GitHub Pages"
git push origin main
```

### ステップ3: GitHub Pagesを有効化

1. GitHubリポジトリページを開く: https://github.com/koji0215/concert-venues

2. **Settings** タブ → **Pages** に移動

3. **Source** を **GitHub Actions** に変更

4. 保存

5. **Actions** タブで進行状況を確認

6. **完了！** 数分でサイトが公開されます

**公開URL**: `https://koji0215.github.io/concert-venues/`

---

## 🎯 どちらを選ぶべきか？

### Cloudflare Pages（推奨）
✅ 超高速（世界中のCDN）  
✅ クリーンなURL（`/concert-venues` が不要）  
✅ 無制限のリクエスト  
✅ カスタムドメイン簡単  
✅ プレビュー機能  

**向いている人**: プロフェッショナルなサイトを作りたい、パフォーマンス重視

### GitHub Pages
✅ 完全無料  
✅ GitHub内で完結  
✅ 設定が簡単  

**向いている人**: まずは試してみたい、Cloudflareアカウントを作りたくない

---

## 🔄 更新方法

どちらの方法でも、以降は簡単です：

```bash
# データを更新
vim public/data/venues.json

# コミットしてプッシュするだけで自動デプロイ
git add .
git commit -m "Update venue data"
git push origin main
```

自動的にサイトが更新されます！

---

## ⚡ ローカルでプレビュー

デプロイ前にローカルで確認：

```bash
npm run build
npx serve out
```

ブラウザで `http://localhost:3000` を開いて確認できます。

---

## 🔧 トラブルシューティング

### ビルドエラーが出る場合

```bash
rm -rf .next out node_modules
npm install
npm run build
```

### GitHub Pagesで404エラー

`next.config.ts` に `basePath: '/concert-venues'` が設定されているか確認。

### Cloudflareでビルドが失敗

Build command: `npm run build`  
Build output directory: `out`  
が正しく設定されているか確認。

---

## 📝 次のステップ

1. 上記の手順でサイトを公開
2. 公開URLを確認
3. 友人やユーザーとシェア
4. データを更新して再デプロイ
5. 必要に応じてカスタムドメインを設定

詳細な手順は `DEPLOYMENT_GUIDE.md` を参照してください。
