# 開発ガイド - GitHub Copilotで開発を継続する

このドキュメントは、Kiroで開始したプロジェクトをGitHub Copilotで継続開発するための手順をまとめています。

## 📋 目次

1. [プロジェクト概要](#プロジェクト概要)
2. [現在の状態](#現在の状態)
3. [GitHub Copilotのセットアップ](#github-copilotのセットアップ)
4. [よくある作業とCopilotの使い方](#よくある作業とcopilotの使い方)
5. [データ追加の手順](#データ追加の手順)
6. [トラブルシューティング](#トラブルシューティング)

---

## プロジェクト概要

### アプリ名
公共コンサート会場検索サイト

### 目的
東京都内の公共ホール・文化施設を検索できるWebアプリケーション

### 技術スタック
- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **デプロイ**: Vercel（予定）

---

## 現在の状態

### ✅ 実装済み機能
- 会場一覧表示（72施設）
- 検索機能（会場名、駅名、区名）
- フィルタ機能（収容人数、料金、ピアノ、音響設備、駐車場）
- 会場詳細ページ
- レスポンシブデザイン

### 📁 プロジェクト構造
```
concert-venues/
├── app/                      # Next.js App Router
│   ├── page.tsx             # トップページ（会場一覧）
│   ├── layout.tsx           # レイアウト
│   └── venues/
│       └── [id]/
│           └── page.tsx     # 会場詳細ページ
├── components/              # Reactコンポーネント
│   ├── VenueCard.tsx       # 会場カード
│   └── VenueList.tsx       # 会場一覧とフィルタ
├── types/                   # TypeScript型定義
│   └── venue.ts            # 会場の型
├── public/
│   └── data/
│       └── venues.json     # 会場データ（72施設）
└── scripts/
    └── merge-venues.js     # データ統合スクリプト
```

### 🎯 次にやること
1. 小規模施設（会議室・集会室）のデータ追加
2. 区ごとのページ作成
3. 地図表示機能（Google Maps API）
4. データベース化（Supabase）
5. デプロイ（Vercel）

---

## GitHub Copilotのセットアップ

### 1. VS Codeの準備

#### 必要な拡張機能
- **GitHub Copilot** (必須)
- **GitHub Copilot Chat** (必須)

インストール方法：
1. VS Codeを開く
2. 左サイドバーの拡張機能アイコンをクリック
3. "GitHub Copilot" で検索
4. "GitHub Copilot" と "GitHub Copilot Chat" をインストール
5. GitHubアカウントでサインイン

### 2. プロジェクトを開く

```bash
cd ~/.kiro/concert-venues
code .
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開いて動作確認

---

## よくある作業とCopilotの使い方

### 🔧 基本的な使い方

#### 1. **コード補完（インライン）**
コメントを書くだけでCopilotが自動補完：

```typescript
// 会場データを収容人数でソートする関数
// ↑ ここまで書くとCopilotが関数を提案
```

**ショートカット**:
- `Tab`: 提案を受け入れる
- `Esc`: 提案を拒否
- `Option/Alt + ]`: 次の提案
- `Option/Alt + [`: 前の提案

#### 2. **Copilot Chat（対話形式）**
**開き方**:
- `Cmd + I` (Mac) / `Ctrl + I` (Windows): インラインチャット
- サイドバーのチャットアイコン: サイドバーチャット

**使用例**:
```
「このコンポーネントにソート機能を追加して」
「このバグを修正して」
「このコードをリファクタリングして」
```

#### 3. **ファイル全体の生成**
新しいファイルを作成して、コメントで指示：

```typescript
// components/VenueMap.tsx
// Google Maps APIを使って会場の位置を表示するコンポーネント
// propsでvenueを受け取る
```

---

## データ追加の手順

### 方法1: Copilot Chatを使う（推奨）

#### ステップ1: データファイルを開く
```bash
code public/data/venues.json
```

#### ステップ2: Copilot Chatを開く
`Cmd + I` (Mac) または `Ctrl + I` (Windows)

#### ステップ3: 指示を入力
```
以下の施設データを追加してください。
既存のフォーマットに従って、配列の最後に追加してください。

施設名: 麹町区民館 洋室A
住所: 東京都千代田区麹町2-8-3
最寄駅: 麹町駅
徒歩: 3分
収容人数: 40人
料金: 2400円
設備: グランドピアノあり、音響設備あり
```

#### ステップ4: 生成されたコードを確認
- Copilotが提案したコードを確認
- 問題なければ `Accept` をクリック
- 修正が必要なら `Regenerate` で再生成

### 方法2: 手動で追加（Copilotの補完を活用）

#### ステップ1: 配列の最後に移動
`venues.json` の最後の `]` の前にカーソルを置く

#### ステップ2: カンマと改行を入力
```json
  },
  {
```

#### ステップ3: Copilotの補完を待つ
`"id":` と入力すると、Copilotが残りを補完してくれます

#### ステップ4: 内容を確認・修正
- `Tab` で補完を受け入れ
- 必要に応じて値を修正

### データフォーマット（参考）

```json
{
  "id": "chiyoda-kojimachi-1",
  "name": "麹町区民館 洋室A",
  "address": "東京都千代田区麹町2-8-3",
  "prefecture": "東京都",
  "city": "千代田区",
  "ward": "千代田区",
  "station": "麹町駅",
  "stationWalkMinutes": 3,
  "capacity": 40,
  "price": 2400,
  "priceNote": "区民料金あり",
  "facilities": {
    "piano": "grand",
    "soundSystem": true,
    "lighting": true,
    "airConditioning": true,
    "parking": false
  },
  "conditions": {
    "residentOnly": false,
    "residentDiscount": true,
    "advanceBookingDays": 90
  },
  "reservationUrl": "https://www.city.chiyoda.lg.jp/",
  "officialUrl": "https://www.city.chiyoda.lg.jp/",
  "description": "麹町駅から徒歩3分の便利な会議室。",
  "createdAt": "2026-04-19T00:00:00Z",
  "updatedAt": "2026-04-19T00:00:00Z"
}
```

---

## 新機能の追加

### 例: 区ごとのページを作成

#### ステップ1: 新しいファイルを作成
```bash
mkdir -p app/wards/[ward]
touch app/wards/[ward]/page.tsx
```

#### ステップ2: Copilot Chatで指示
ファイルを開いて `Cmd + I`:

```
このファイルに以下の機能を実装してください：

1. URLパラメータから区名を取得
2. その区の会場データをフィルタリング
3. 会場一覧を表示
4. 区の統計情報を表示（施設数、平均料金など）

参考: app/page.tsx と同じスタイルで
```

#### ステップ3: 生成されたコードを確認・調整

---

## コンポーネントの作成

### 例: 地図表示コンポーネント

#### ステップ1: ファイル作成
```bash
touch components/VenueMap.tsx
```

#### ステップ2: コメントで指示
```typescript
// components/VenueMap.tsx
// Google Maps APIを使って会場の位置を地図上に表示するコンポーネント
// 
// Props:
// - venue: Venue型のオブジェクト
// 
// 機能:
// - 会場の位置にマーカーを表示
// - 最寄駅の位置も表示
// - ズームレベルは15
```

#### ステップ3: Copilotが補完
`Enter` を押すとCopilotがコンポーネント全体を生成

---

## スタイリングの調整

### Tailwind CSSのクラスを追加

#### 方法1: Copilot Chatで指示
コンポーネントを選択して `Cmd + I`:

```
このカードのデザインを改善してください：
- ホバー時に影を濃くする
- 角を丸くする
- パディングを増やす
```

#### 方法2: コメントで指示
```tsx
{/* このdivにホバーエフェクトと影を追加 */}
<div className="
```
↑ ここでCopilotが適切なクラスを提案

---

## デバッグ

### エラーが出たとき

#### ステップ1: エラーメッセージをコピー

#### ステップ2: Copilot Chatに貼り付け
```
以下のエラーを修正してください：

[エラーメッセージをペースト]
```

#### ステップ3: 提案された修正を適用

---

## Git操作

### コミット前の確認

```bash
# 変更内容を確認
git status
git diff

# ステージング
git add .

# コミット（Copilotがメッセージを提案）
git commit
# ↑ コミットメッセージ入力画面でCopilotが提案
```

### Copilotによるコミットメッセージ生成
コミットメッセージ入力時に、Copilotが変更内容から適切なメッセージを提案します。

---

## トラブルシューティング

### Copilotが反応しない

1. **GitHubにサインインしているか確認**
   - VS Code右下のアカウントアイコンをクリック
   - GitHub Copilotのステータスを確認

2. **拡張機能が有効か確認**
   - `Cmd + Shift + P` → "Extensions: Show Installed Extensions"
   - GitHub Copilotが有効になっているか確認

3. **VS Codeを再起動**

### 提案が的外れ

1. **より具体的なコメントを書く**
   ```typescript
   // ❌ 悪い例
   // ソート機能
   
   // ✅ 良い例
   // 会場データを収容人数の降順でソートする関数
   // 引数: venues (Venue[])
   // 戻り値: ソート済みのVenue[]
   ```

2. **周辺のコードを参考にさせる**
   - 既存の似たコードをファイル内に残しておく
   - Copilotは同じファイル内のコードを参考にします

### JSONのフォーマットが崩れた

```bash
# フォーマットを修正
npm run format
# または
npx prettier --write public/data/venues.json
```

---

## 便利なCopilot Chatコマンド

### ファイル全体に対する操作

```
/explain - コードの説明
/fix - バグ修正
/tests - テストコード生成
/doc - ドキュメント生成
```

### 使用例

```
/explain このコンポーネントの動作を説明して

/fix このエラーを修正して

/tests このコンポーネントのテストを作成して

/doc この関数のJSDocコメントを追加して
```

---

## 次のステップ

### 1. 小規模施設データの追加
- `public/data/venues.json` を開く
- 千代田区の区民館データを追加（PDFを参照）
- Copilot Chatで「以下のデータを追加して」と指示

### 2. 区ごとのページ作成
- `app/wards/[ward]/page.tsx` を作成
- Copilot Chatで機能を指示

### 3. 地図表示機能
- Google Maps APIキーを取得
- `components/VenueMap.tsx` を作成
- Copilot Chatでコンポーネントを生成

### 4. データベース化
- Supabaseアカウント作成
- Copilot Chatで「Supabaseにデータをマイグレートするスクリプトを作成して」

### 5. デプロイ
- GitHubリポジトリ作成
- Vercelと連携
- 自動デプロイ設定

---

## 参考リンク

- [Next.js公式ドキュメント](https://nextjs.org/docs)
- [TypeScript公式ドキュメント](https://www.typescriptlang.org/docs/)
- [Tailwind CSS公式ドキュメント](https://tailwindcss.com/docs)
- [GitHub Copilot公式ドキュメント](https://docs.github.com/en/copilot)
- [Supabase公式ドキュメント](https://supabase.com/docs)

---

## 質問・サポート

### Copilotで解決できない場合

1. **公式ドキュメントを確認**
2. **Stack Overflowで検索**
3. **GitHubのIssuesを確認**
4. **必要に応じてKiroに相談**

---

## まとめ

### Copilotを効果的に使うコツ

1. **具体的なコメントを書く**
2. **既存のコードパターンを参考にさせる**
3. **生成されたコードを必ず確認する**
4. **小さな変更から始める**
5. **わからないことはCopilot Chatに聞く**

### 開発の流れ

1. 機能を決める
2. Copilot Chatで設計を相談
3. コメントを書いてCopilotに補完させる
4. 生成されたコードを確認・調整
5. テスト
6. コミット

---

**Happy Coding! 🚀**
