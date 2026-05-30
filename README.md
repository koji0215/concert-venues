# 🎵 公共コンサート会場検索サイト

東京都内の公共ホール・文化施設を検索できるWebアプリケーションです。

## 機能

- 会場一覧表示
- 検索機能（会場名、駅名、区名）
- フィルタ機能
  - 収容人数
  - 料金
  - ピアノの種類
  - 音響設備
  - 駐車場
- 会場詳細ページ
- レスポンシブデザイン

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **デプロイ**: Vercel（推奨）

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### 3. ビルド

```bash
npm run build
```

### 4. 本番環境での起動

```bash
npm start
```

## プロジェクト構造

```
concert-venues/
├── app/                    # Next.js App Router
│   ├── page.tsx           # トップページ
│   ├── layout.tsx         # レイアウト
│   └── venues/
│       └── [id]/
│           └── page.tsx   # 会場詳細ページ
├── components/            # Reactコンポーネント
│   ├── VenueCard.tsx     # 会場カード
│   └── VenueList.tsx     # 会場一覧
├── types/                 # TypeScript型定義
│   └── venue.ts          # 会場の型
├── public/
│   └── data/
│       └── venues.json   # 会場データ
└── README.md
```

## データの追加方法

### GitHub Copilot を使用する場合（推奨）

1. **リポジトリをGitHubに作成**
   ```bash
   gh repo create concert-venues --public --source=. --push
   ```

2. **Copilot Chat でデータ抽出**
   ```
   @workspace data/source-documents/大田区/ のPDFファイルから
   施設情報を抽出して、docs/DATA_STRUCTURE.md のフォーマットで
   JSONデータを作成してください。
   ```

3. **Kiro でデータ検証**
   ```
   public/data/venues.json のデータを検証してください。
   ```

詳細は [QUICK_START.md](./QUICK_START.md) を参照してください。

### 手動で追加する場合

`public/data/venues.json` に新しい会場情報を追加してください。
データ構造の詳細は [docs/DATA_STRUCTURE.md](./docs/DATA_STRUCTURE.md) を参照してください。

```json
{
  "id": "unique-id",
  "name": "会場名",
  "address": "住所",
  "prefecture": "都道府県",
  "city": "市区町村",
  "ward": "区",
  "station": "最寄駅",
  "stationWalkMinutes": 5,
  "capacity": 200,
  "price": 15000,
  "priceNote": "料金の補足",
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
  "reservationUrl": "https://...",
  "officialUrl": "https://...",
  "description": "説明文",
  "createdAt": "2026-04-19T00:00:00Z",
  "updatedAt": "2026-04-19T00:00:00Z"
}
```

## 今後の拡張予定

- [ ] データベース化（Supabase）
- [ ] ユーザー認証
- [ ] お気に入り機能
- [ ] 地図表示（Google Maps API）
- [ ] 管理画面
- [ ] より多くの会場データ
- [ ] 都道府県の拡大

## ライセンス

MIT

## 開発ガイド

### 📚 ドキュメント一覧

このプロジェクトはKiroで初期セットアップが完了しています。
GitHub Copilotで開発を継続する場合は、以下のドキュメントを参照してください：

#### 開発ガイド
| ドキュメント | 内容 | 対象 |
|------------|------|------|
| **[CHEATSHEET.md](./CHEATSHEET.md)** | すぐに使える判断基準とコマンド集 | ⭐ まずこれ |
| **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** | クイックリファレンス | 初めての方 |
| **[KIRO_COPILOT_WORKFLOW.md](./KIRO_COPILOT_WORKFLOW.md)** | Kiro×Copilot連携ワークフロー | 重要 |
| **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)** | 詳細な開発ガイド | 詳しく知りたい方 |

#### GitHub連携・データ管理
| ドキュメント | 内容 | 対象 |
|------------|------|------|
| **[QUICK_START.md](./QUICK_START.md)** | 5分でセットアップ | ⭐ まずこれ |
| **[GITHUB_COPILOT_INTEGRATION.md](./GITHUB_COPILOT_INTEGRATION.md)** | GitHub Copilot連携ガイド | 重要 |
| **[SETUP_GITHUB_REPO.md](./SETUP_GITHUB_REPO.md)** | リポジトリセットアップ詳細 | 詳しく知りたい方 |
| **[docs/DATA_STRUCTURE.md](./docs/DATA_STRUCTURE.md)** | データ構造仕様 | データ追加時 |

### 🚀 今すぐ始める

```bash
cd ~/.kiro/concert-venues
code .
npm run dev
```

Copilot Chatを開く: `Cmd + I` (Mac) / `Ctrl + I` (Windows)

### 🤔 どっちを使う？

- **大きな変更（新機能、構造変更）** → Kiroに依頼
- **小さな調整（スタイル、データ追加）** → Copilotで自分で

詳しくは [CHEATSHEET.md](./CHEATSHEET.md) を参照

## 作成者

Yuki Kojima
