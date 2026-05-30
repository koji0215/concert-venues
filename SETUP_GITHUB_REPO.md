# GitHubリポジトリ セットアップガイド

## ステップ1: リポジトリの初期化と作成

### 1.1 Gitの初期化（まだの場合）
```bash
cd concert-venues
git init
```

### 1.2 .gitignore の確認
既存の `.gitignore` を確認し、必要に応じて追加：

```bash
# 依存関係
node_modules/
.next/

# 環境変数
.env
.env.local

# ビルド成果物
dist/
build/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# 一時ファイル
*.tmp
*.log
```

### 1.3 Git LFS の設定（PDFファイルが大きい場合）
```bash
# Git LFS のインストール（macOS）
brew install git-lfs

# Git LFS の初期化
git lfs install

# PDFファイルをLFS管理下に
git lfs track "*.pdf"
git add .gitattributes
```

### 1.4 初回コミット
```bash
git add .
git commit -m "Initial commit: 東京23区公共コンサート会場データベース"
```

### 1.5 GitHubリポジトリの作成
```bash
# GitHub CLI を使用（推奨）
gh repo create concert-venues --public --source=. --push

# または、手動でGitHubにリポジトリを作成してから
git remote add origin https://github.com/YOUR_USERNAME/concert-venues.git
git branch -M main
git push -u origin main
```

## ステップ2: GitHub Copilot の設定

### 2.1 Copilot Instructions の確認
`.github/copilot-instructions.md` が正しく配置されていることを確認：

```bash
ls -la .github/copilot-instructions.md
```

### 2.2 リポジトリをGitHubで開く
```bash
gh repo view --web
```

### 2.3 Copilot の有効化
1. GitHubのリポジトリページで Settings → Copilot を確認
2. Copilot が有効になっていることを確認

## ステップ3: GitHub Copilot でのデータ抽出

### 3.1 VS Code で Copilot Chat を開く
- `Cmd + Shift + I` (macOS) または `Ctrl + Shift + I` (Windows/Linux)

### 3.2 データ抽出の依頼

以下のプロンプトを Copilot Chat に送信：

```
@workspace data/source-documents/ 内のPDFファイルから
東京23区の公共施設情報を抽出してください。

以下の手順で作業してください：

1. docs/DATA_STRUCTURE.md のフォーマットに従う
2. 各区のPDFファイルから以下の情報を抽出：
   - 施設名
   - 住所
   - 最寄り駅
   - 収容人数
   - 料金
   - 設備情報（ピアノ、音響など）
   - 利用条件

3. 既存の public/data/venues.json に追加する形で出力

4. 不明な情報はデフォルト値を使用

対象の区：
- 大田区
- 台東区
- 墨田区
- 中央区
- 荒川区
- 目黒区
- 杉並区
- 江戸川区
- 足立区
- 板橋区
- 世田谷区
- 練馬区
- 文京区
- 中野区
- 豊島区
- 葛飾区
- 江東区

まず大田区から始めてください。
```

### 3.3 段階的な抽出（推奨）

一度にすべての区を処理するのではなく、区ごとに処理：

```
@workspace data/source-documents/大田区/ のPDFファイルから
施設情報を抽出して、JSONデータを作成してください。
docs/DATA_STRUCTURE.md のフォーマットに従ってください。
```

## ステップ4: Kiro でのデータ検証

### 4.1 データの確認
```bash
# JSONの構文チェック
cat public/data/venues.json | jq . > /dev/null && echo "JSON is valid" || echo "JSON is invalid"
```

### 4.2 重複チェック
Kiro に依頼：
```
public/data/venues.json 内のデータで、
IDが重複しているエントリがないか確認してください。
```

### 4.3 データの整形
Kiro に依頼：
```
public/data/venues.json を整形して、
2スペースインデントで保存してください。
```

## ステップ5: コミットとプッシュ

### 5.1 変更の確認
```bash
git status
git diff public/data/venues.json
```

### 5.2 コミット
```bash
git add public/data/venues.json
git commit -m "data: Add venues from PDFs (大田区, 台東区, etc.)"
git push
```

## ステップ6: 継続的な更新

### 6.1 新しいデータの追加
```bash
# 新しいPDFを追加
cp ~/Downloads/新しい施設.pdf data/source-documents/渋谷区/

# Copilot で抽出
# → Copilot Chat で依頼

# コミット
git add data/source-documents/渋谷区/新しい施設.pdf
git add public/data/venues.json
git commit -m "data: Add 新しい施設 (渋谷区)"
git push
```

### 6.2 データの更新
```bash
# 既存データの修正
# → Kiro または Copilot で修正

# コミット
git add public/data/venues.json
git commit -m "data: Update venue information"
git push
```

## トラブルシューティング

### Copilot がPDFを読めない場合

#### 解決策1: PDFをテキスト化
```bash
# pdftotext を使用（要インストール）
brew install poppler
pdftotext data/source-documents/大田区/施設.pdf data/source-documents/大田区/施設.txt
```

#### 解決策2: 画像として認識
PDFをスクリーンショットして、画像として Copilot に送信

#### 解決策3: 手動でマークダウン化
PDFの内容を手動でマークダウンファイルに転記

### Git LFS の容量制限

GitHub の無料プランでは Git LFS の容量制限があります：
- ストレージ: 1GB
- 帯域幅: 1GB/月

大きなPDFファイルが多い場合は、以下の対策を検討：
1. PDFを圧縮
2. 外部ストレージ（Google Drive など）にリンク
3. GitHub Pro にアップグレード

### Copilot の応答が遅い場合

1. 一度に処理する区の数を減らす
2. PDFファイルのサイズを確認（大きすぎる場合は分割）
3. Copilot のキャッシュをクリア

## 便利なコマンド

### データ件数の確認
```bash
cat public/data/venues.json | jq 'length'
```

### 特定の区のデータを抽出
```bash
cat public/data/venues.json | jq '[.[] | select(.ward == "渋谷区")]'
```

### IDの重複チェック
```bash
cat public/data/venues.json | jq '[.[].id] | group_by(.) | map(select(length > 1))'
```

### データの統計
```bash
# 区ごとの施設数
cat public/data/venues.json | jq 'group_by(.ward) | map({ward: .[0].ward, count: length})'
```

## 次のステップ

1. ✅ リポジトリ作成
2. ✅ Copilot Instructions 配置
3. ⬜ PDFからデータ抽出（Copilot）
4. ⬜ データ検証（Kiro）
5. ⬜ Webアプリケーション開発
6. ⬜ デプロイ（Vercel など）

## 参考リンク

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Git LFS](https://git-lfs.github.com/)
- [GitHub CLI](https://cli.github.com/)
- [jq Manual](https://stedolan.github.io/jq/manual/)
