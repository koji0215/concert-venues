# GitHubプッシュエラーの解決方法

## 問題
大きなファイルが原因でGitHubへのプッシュが失敗しています。

## 解決策：リポジトリを再作成

### ステップ1: GitHubでリポジトリを削除

1. https://github.com/koji0215/concert-venues にアクセス
2. Settings → Danger Zone → Delete this repository
3. リポジトリ名を入力して削除

### ステップ2: ローカルのGit履歴をクリーンアップ

```bash
cd concert-venues

# .gitディレクトリを削除
rm -rf .git

# Gitを再初期化
git init

# 必要なファイルだけを追加
git add app/ components/ public/data/ types/ docs/ .github/
git add package.json package-lock.json tsconfig.json next.config.ts
git add README.md QUICK_START.md GITHUB_COPILOT_INTEGRATION.md
git add .gitignore .eslintrc.json tailwind.config.ts postcss.config.mjs
git add data/handwritten-data.json

# 初回コミット
git commit -m "Initial commit: 東京23区公共コンサート会場データベース"
```

### ステップ3: 新しいリポジトリを作成してプッシュ

```bash
# 新しいリポジトリを作成
gh repo create concert-venues --public --source=. --push
```

または手動で：

```bash
# GitHubで新しいリポジトリを作成
# https://github.com/new

# リモートを追加
git remote add origin https://github.com/koji0215/concert-venues.git

# プッシュ
git branch -M main
git push -u origin main
```

## 注意事項

### 除外されるファイル
以下のファイルは`.gitignore`で除外されます：
- `node_modules/` - 依存関係（npm installで再生成）
- `.next/` - ビルド成果物（npm run buildで再生成）
- `data/source-documents/**/*.pdf` - PDFファイル（大きすぎる）

### PDFファイルの管理方法

PDFファイルはGitで管理せず、以下の方法を推奨：

1. **Google Drive / Dropbox**
   - PDFをクラウドストレージに保存
   - リンクをREADMEに記載

2. **Git LFS**（有料プランが必要）
   ```bash
   brew install git-lfs
   git lfs install
   git lfs track "*.pdf"
   git add .gitattributes
   ```

3. **GitHub Releases**
   - PDFをzipで圧縮
   - Releaseとしてアップロード

## 次のステップ

リポジトリが正常にプッシュできたら：

1. GitHub Copilot でデータ抽出
2. Kiro でデータ検証
3. 開発を継続

詳細は [QUICK_START.md](./QUICK_START.md) を参照してください。
