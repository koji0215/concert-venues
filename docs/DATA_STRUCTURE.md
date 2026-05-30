# データ構造仕様

## venues.json フォーマット

### TypeScript 型定義

```typescript
interface Venue {
  id: string;                    // ユニークID（例: "shibuya-bunka-1"）
  name: string;                  // 施設名
  address: string;               // 住所
  prefecture: string;            // 都道府県（例: "東京都"）
  city: string;                  // 市区町村（例: "渋谷区"）
  ward: string;                  // 区（例: "渋谷区"）
  station: string;               // 最寄り駅（例: "渋谷駅"）
  stationWalkMinutes: number;    // 駅からの徒歩時間（分）
  capacity: number;              // 収容人数
  price: number;                 // 料金（円、1日あたり）
  priceNote?: string;            // 料金に関する注記
  facilities: {
    piano: "grand" | "upright" | "none";  // ピアノの種類
    soundSystem: boolean;        // 音響設備
    lighting: boolean;           // 照明設備
    airConditioning: boolean;    // 空調
    parking: boolean;            // 駐車場
  };
  conditions: {
    residentOnly: boolean;       // 区民限定か
    residentDiscount: boolean;   // 区民割引があるか
    advanceBookingDays: number;  // 事前予約可能日数
  };
  reservationUrl?: string;       // 予約URL
  officialUrl?: string;          // 公式URL
  description?: string;          // 説明
  createdAt: string;             // 作成日時（ISO 8601形式）
  updatedAt: string;             // 更新日時（ISO 8601形式）
}
```

### JSON サンプル

```json
{
  "id": "shibuya-bunka-1",
  "name": "渋谷区文化総合センター大和田 さくらホール",
  "address": "東京都渋谷区桜丘町23-21",
  "prefecture": "東京都",
  "city": "渋谷区",
  "ward": "渋谷区",
  "station": "渋谷駅",
  "stationWalkMinutes": 5,
  "capacity": 200,
  "price": 15000,
  "priceNote": "区民料金あり（割引率は要確認）",
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
  "reservationUrl": "https://www.shibuya-bunka.jp/",
  "officialUrl": "https://www.shibuya-bunka.jp/",
  "description": "渋谷駅から徒歩5分の好立地。グランドピアノ完備の本格的なホール。",
  "createdAt": "2026-04-19T00:00:00Z",
  "updatedAt": "2026-04-19T00:00:00Z"
}
```

## ID命名規則

### フォーマット
```
{区名ローマ字}-{施設名略称}-{連番}
```

### 例
- `shibuya-bunka-1` - 渋谷区文化総合センター 1つ目の施設
- `setagaya-kumin-1` - 世田谷区民会館 1つ目の施設
- `suginami-kokaido-1` - 杉並公会堂 1つ目の施設

### ルール
1. すべて小文字
2. ハイフン（-）で区切る
3. 連番は1から開始
4. 同じ施設内の複数の部屋は連番を増やす

## 区名のローマ字表記

| 区名 | ローマ字 |
|------|----------|
| 千代田区 | chiyoda |
| 中央区 | chuo |
| 港区 | minato |
| 新宿区 | shinjuku |
| 文京区 | bunkyo |
| 台東区 | taito |
| 墨田区 | sumida |
| 江東区 | koto |
| 品川区 | shinagawa |
| 目黒区 | meguro |
| 大田区 | ota |
| 世田谷区 | setagaya |
| 渋谷区 | shibuya |
| 中野区 | nakano |
| 杉並区 | suginami |
| 豊島区 | toshima |
| 北区 | kita |
| 荒川区 | arakawa |
| 板橋区 | itabashi |
| 練馬区 | nerima |
| 足立区 | adachi |
| 葛飾区 | katsushika |
| 江戸川区 | edogawa |

## フィールド詳細

### 必須フィールド
- `id`: 重複不可、一意である必要がある
- `name`: 正式名称を使用
- `address`: 郵便番号は不要
- `prefecture`: 常に "東京都"
- `city`: 区名を使用
- `ward`: 区名を使用（cityと同じ）
- `station`: 最寄り駅名（「駅」を含む）
- `stationWalkMinutes`: 徒歩時間（分単位、不明な場合は10）
- `capacity`: 収容人数（不明な場合は50）
- `price`: 1日あたりの料金（円）
- `facilities`: すべてのサブフィールドが必須
- `conditions`: すべてのサブフィールドが必須
- `createdAt`: ISO 8601形式
- `updatedAt`: ISO 8601形式

### オプションフィールド
- `priceNote`: 料金に関する補足情報
- `reservationUrl`: 予約システムのURL
- `officialUrl`: 施設の公式サイトURL
- `description`: 施設の特徴や説明

## デフォルト値

情報が不明な場合のデフォルト値：

```json
{
  "stationWalkMinutes": 10,
  "capacity": 50,
  "price": 10000,
  "facilities": {
    "piano": "none",
    "soundSystem": false,
    "lighting": true,
    "airConditioning": true,
    "parking": false
  },
  "conditions": {
    "residentOnly": false,
    "residentDiscount": true,
    "advanceBookingDays": 90
  }
}
```

## バリデーションルール

1. **ID**: 英数字とハイフンのみ、重複不可
2. **capacity**: 1以上の整数
3. **price**: 0以上の整数
4. **stationWalkMinutes**: 1以上の整数
5. **advanceBookingDays**: 1以上の整数
6. **createdAt/updatedAt**: ISO 8601形式（例: "2026-04-19T00:00:00Z"）
7. **URL**: 有効なURL形式（http/https）

## データ抽出時の注意点

### PDFから抽出する際
1. 施設名は正式名称を使用（略称は避ける）
2. 料金は「1日あたり」または「全日」の料金を優先
3. 複数の部屋がある場合は、それぞれ別のエントリとして作成
4. 不明な情報はデフォルト値を使用し、`description`に「要確認」と記載

### 手書きメモから抽出する際
1. 施設名と部屋名を組み合わせて`name`を作成
2. 詳細情報が不足している場合は、公式サイトで補完
3. 同じ施設の既存データがあれば、それを参考にする

## 更新履歴

- 2026-05-31: 初版作成
