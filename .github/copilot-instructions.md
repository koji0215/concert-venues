# GitHub Copilot Instructions

このリポジトリは**東京23区の公共コンサート会場データベース**プロジェクトです。

## プロジェクト概要

東京23区の公共施設で楽器演奏・コンサートが可能な会場の情報を収集・整理し、検索可能なWebアプリケーションとして提供します。

## ディレクトリ構造

```
concert-venues/
├── app/                         # Next.js アプリケーション
├── components/                  # Reactコンポーネント
├── public/
│   └── data/
│       └── venues.json         # 会場データ（最終成果物）
├── data/
│   ├── source-documents/       # PDFなどのソースファイル
│   └── handwritten-data.json   # 手書き調査メモ
├── docs/
│   └── DATA_STRUCTURE.md       # データ構造の詳細仕様
└── types/                      # TypeScript型定義
```

## データ抽出タスク

### 目的
`data/source-documents/` 内のPDFファイルから施設情報を抽出し、`public/data/venues.json` に追加する。

### データ構造
**必ず `docs/DATA_STRUCTURE.md` を参照してください。**

主要なフィールド：
- `id`: ユニークID（例: "shibuya-bunka-1"）
- `name`: 施設名
- `address`: 住所
- `station`: 最寄り駅
- `capacity`: 収容人数
- `price`: 料金（円）
- `facilities`: 設備情報（ピアノ、音響など）
- `conditions`: 利用条件（区民割引など）

### 抽出ルール

1. **施設名**: 正式名称を使用（略称は避ける）
2. **ID命名**: `{区名ローマ字}-{施設略称}-{連番}` 形式
3. **料金**: 1日あたりの料金を記載
4. **複数の部屋**: 同じ施設内の複数の部屋は別エントリとして作成
5. **不明な情報**: デフォルト値を使用（`docs/DATA_STRUCTURE.md` 参照）
6. **日時**: ISO 8601形式（例: "2026-05-31T00:00:00Z"）

### 出力フォーマット

既存の `public/data/venues.json` と同じ構造で出力してください。

```json
[
  {
    "id": "example-venue-1",
    "name": "施設名",
    "address": "東京都○○区...",
    "prefecture": "東京都",
    "city": "○○区",
    "ward": "○○区",
    "station": "○○駅",
    "stationWalkMinutes": 5,
    "capacity": 200,
    "price": 15000,
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
    "reservationUrl": "https://...",
    "officialUrl": "https://...",
    "description": "施設の説明",
    "createdAt": "2026-05-31T00:00:00Z",
    "updatedAt": "2026-05-31T00:00:00Z"
  }
]
```

## コーディング規約

### TypeScript/JavaScript
- ESLint + Prettier を使用
- 関数には JSDoc コメントを記載
- 日本語コメント推奨

### JSON
- 2スペースインデント
- キーはダブルクォート
- 末尾のカンマなし

### コミットメッセージ
- 日本語または英語
- プレフィックス: `feat:`, `fix:`, `docs:`, `data:` など

## よくあるタスク

### PDFからデータ抽出
```
@workspace data/source-documents/大田区/ のPDFファイルから
施設情報を抽出して、docs/DATA_STRUCTURE.md のフォーマットで
JSONデータを作成してください。
```

### データの検証
```
@workspace public/data/venues.json のデータが
docs/DATA_STRUCTURE.md の仕様に準拠しているか確認してください。
```

### 新しいコンポーネント作成
```
@workspace 会場一覧を表示するReactコンポーネントを作成してください。
public/data/venues.json からデータを読み込み、
検索・フィルタリング機能を実装してください。
```

## 注意事項

1. **データの正確性**: 不確かな情報は推測せず、デフォルト値を使用
2. **重複チェック**: 新しいデータを追加する前に、既存データと重複していないか確認
3. **ID の一意性**: IDは必ず一意である必要がある
4. **日本語の扱い**: 施設名や説明は日本語で記載
5. **URL の検証**: URLは有効な形式であることを確認

## 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [データ構造仕様](./docs/DATA_STRUCTURE.md)

## 質問がある場合

不明な点があれば、以下を確認してください：
1. `docs/DATA_STRUCTURE.md` - データ構造の詳細
2. `public/data/venues.json` - 既存データの例
3. `README.md` - プロジェクト全体の説明
