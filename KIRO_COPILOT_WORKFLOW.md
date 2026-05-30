# Kiro × Copilot 連携ワークフロー

KiroとGitHub Copilotを効果的に連携させて開発を進めるためのガイドです。

## 🎯 基本的な役割分担

### Kiro（設計・構築）
- ✅ プロジェクトの初期セットアップ
- ✅ 新機能の設計と実装
- ✅ 複数ファイルにまたがる変更
- ✅ アーキテクチャの変更
- ✅ 複雑なロジックの実装
- ✅ バグの診断と修正方針の決定

### Copilot（調整・拡張）
- ✅ データの追加・修正
- ✅ スタイルの微調整
- ✅ 定型的なコードの補完
- ✅ 小さなバグ修正
- ✅ コメント・ドキュメントの追加
- ✅ テストコードの作成

---

## 🔄 連携の流れ

### パターン1: 新機能の追加

```
1. Kiroに依頼 → 「区ごとのページ機能を追加して」
   ↓
   Kiroが基本構造を作成
   - ファイル作成
   - ルーティング設定
   - 基本的なコンポーネント
   
2. Copilotで調整 → VS Codeで開いて微調整
   ↓
   - スタイルの調整
   - 文言の変更
   - 細かい機能追加
```

### パターン2: データの大量追加

```
1. Kiroに依頼 → 「データ構造を設計して、サンプルを5件作成して」
   ↓
   Kiroがフォーマットを確立
   
2. Copilotで拡張 → 同じフォーマットで残りを追加
   ↓
   Copilotが既存パターンを学習して補完
```

### パターン3: バグ修正

```
1. Copilotで試す → エラーメッセージをCopilot Chatに貼り付け
   ↓
   簡単なバグなら修正
   
2. 解決しない場合 → Kiroに相談
   ↓
   Kiroが根本原因を診断して修正
```

---

## 📋 具体的な連携例

### 例1: 地図表示機能の追加

#### ステップ1: Kiroに依頼（設計・実装）

**Kiroへの依頼内容**:
```
地図表示機能を追加したいです。

要件:
- Google Maps APIを使用
- 会場の位置にマーカーを表示
- 詳細ページに地図を表示
- 環境変数でAPIキーを管理

以下を作成してください:
1. VenueMapコンポーネント
2. 環境変数の設定方法
3. 詳細ページへの組み込み
```

**Kiroが実行すること**:
- `components/VenueMap.tsx` を作成
- `.env.local.example` を作成
- `app/venues/[id]/page.tsx` に地図を組み込み
- 必要なパッケージをインストール

#### ステップ2: Copilotで調整

**VS Codeで開いて**:
```typescript
// VenueMap.tsx を開く

// Copilot Chatで調整
「マーカーの色を青に変更して」
「ズームレベルを16に変更して」
「マーカークリック時に会場名を表示して」
```

---

### 例2: フィルタ機能の拡張

#### ステップ1: Kiroに依頼

**Kiroへの依頼内容**:
```
フィルタ機能を拡張したいです。

追加したいフィルタ:
- 区で絞り込み（ドロップダウン）
- 駅で絞り込み（オートコンプリート）
- 営業時間で絞り込み（平日/土日）

VenueListコンポーネントを更新してください。
```

**Kiroが実行すること**:
- フィルタUIの追加
- フィルタロジックの実装
- 型定義の更新

#### ステップ2: Copilotで調整

**VS Codeで開いて**:
```typescript
// VenueList.tsx を開く

// Copilot Chatで微調整
「ドロップダウンのスタイルを改善して」
「フィルタをリセットボタンを追加して」
「フィルタの状態をURLパラメータに保存して」
```

---

### 例3: データベース化

#### ステップ1: Kiroに依頼（大きな変更）

**Kiroへの依頼内容**:
```
JSONファイルからSupabaseに移行したいです。

以下を実装してください:
1. Supabaseのセットアップ
2. テーブル設計とマイグレーション
3. データ取得APIの実装
4. 既存コンポーネントの更新
5. JSONデータのインポートスクリプト
```

**Kiroが実行すること**:
- Supabaseクライアントの設定
- データベーススキーマの作成
- API関数の実装
- コンポーネントの更新

#### ステップ2: Copilotで調整

**VS Codeで開いて**:
```typescript
// Copilot Chatで追加機能
「キャッシュ機能を追加して」
「エラーハンドリングを改善して」
「ローディング状態を追加して」
```

---

## 🔀 作業の切り替え方

### Kiroで作業中 → Copilotに切り替え

1. **Kiroに「ここまでで一旦完了」と伝える**
2. **変更内容を確認**
   ```bash
   git status
   git diff
   ```
3. **VS Codeで開く**
   ```bash
   code .
   ```
4. **Copilotで微調整を開始**

### Copilotで作業中 → Kiroに相談

1. **変更をコミット**
   ```bash
   git add .
   git commit -m "Copilotで調整した内容"
   ```
2. **Kiroに状況を説明**
   ```
   「地図機能を追加しましたが、パフォーマンスが悪いです。
   最適化の方法を教えてください。」
   ```
3. **Kiroが診断・提案**

---

## 💡 効果的な連携のコツ

### 1. 明確な境界を設定

**Kiroに依頼するとき**:
- 「〜の機能を追加して」（機能単位）
- 「〜の構造を変更して」（アーキテクチャ）
- 「〜を設計して」（設計）

**Copilotで調整するとき**:
- 「このスタイルを変更」（見た目）
- 「この値を変更」（パラメータ）
- 「このテキストを変更」（文言）

### 2. Kiroで「型」を作る

```typescript
// Kiroに依頼: 「新しいフィルタ機能の型を定義して」
export interface AdvancedFilter {
  ward?: string;
  station?: string;
  openingHours?: 'weekday' | 'weekend' | 'both';
}

// ↓ Copilotで実装
// 型が定義されているので、Copilotが正確に補完
```

### 3. コメントで意図を残す

```typescript
// Kiroが作成したコード
// TODO: Copilotで調整する項目
// - マーカーの色を変更
// - ズームレベルを調整
// - アニメーションを追加

export function VenueMap({ venue }: VenueMapProps) {
  // ...
}
```

### 4. 段階的に進める

```
フェーズ1（Kiro）: 基本構造
  ↓
フェーズ2（Copilot）: 微調整
  ↓
フェーズ3（Kiro）: 次の機能
  ↓
フェーズ4（Copilot）: 微調整
```

---

## 📝 実践例: 区ごとのページを作る

### ステップ1: Kiroに依頼

**依頼内容**:
```
区ごとのページ機能を追加してください。

要件:
- URL: /wards/[ward]
- その区の会場一覧を表示
- 区の統計情報を表示（施設数、平均料金、平均収容人数）
- 区の説明文を表示
- パンくずリストを追加

以下を作成してください:
1. app/wards/[ward]/page.tsx
2. 必要な型定義
3. 統計計算の関数
4. トップページからのリンク
```

### ステップ2: Kiroが実装

Kiroが以下を作成:
- ✅ ルーティング設定
- ✅ 基本的なページ構造
- ✅ データフィルタリング
- ✅ 統計計算ロジック
- ✅ 基本的なスタイル

### ステップ3: Copilotで調整

**VS Codeで `app/wards/[ward]/page.tsx` を開く**

#### 調整1: スタイルの改善
```typescript
// Copilot Chat: 「統計カードのデザインを改善して」
// ↓ Copilotが提案
<div className="grid grid-cols-3 gap-4">
  <StatCard title="施設数" value={stats.count} />
  <StatCard title="平均料金" value={`¥${stats.avgPrice}`} />
  <StatCard title="平均収容人数" value={`${stats.avgCapacity}人`} />
</div>
```

#### 調整2: 区の説明文を追加
```typescript
// Copilot Chat: 「各区の説明文を追加して」
// ↓ Copilotが提案
const wardDescriptions: Record<string, string> = {
  '渋谷区': '若者文化の中心地。多様な文化施設が集まる。',
  '世田谷区': '住宅街が広がる落ち着いたエリア。',
  // ...
};
```

#### 調整3: グラフを追加
```typescript
// Copilot Chat: 「料金分布のグラフを追加して」
// ↓ Copilotがグラフコンポーネントを提案
```

### ステップ4: 問題が発生したらKiroに相談

```
「区ごとのページを作成しましたが、
パフォーマンスが悪いです。
静的生成（SSG）に変更できますか？」
```

Kiroが最適化:
- `generateStaticParams` の追加
- ビルド時の静的生成設定
- キャッシュ戦略の実装

---

## 🎨 スタイル調整の例

### Kiroで基本構造を作成

```typescript
// Kiroが作成
export function VenueCard({ venue }: VenueCardProps) {
  return (
    <div className="border rounded p-4">
      <h3>{venue.name}</h3>
      <p>{venue.address}</p>
    </div>
  );
}
```

### Copilotで見た目を改善

```typescript
// Copilot Chat: 「このカードをもっと魅力的にして」

// ↓ Copilotが提案
export function VenueCard({ venue }: VenueCardProps) {
  return (
    <div className="border rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow bg-white">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{venue.name}</h3>
      <p className="text-gray-600 text-sm">{venue.address}</p>
      <div className="mt-4 flex gap-2">
        <Badge>収容{venue.capacity}人</Badge>
        <Badge>¥{venue.price.toLocaleString()}</Badge>
      </div>
    </div>
  );
}
```

---

## 🐛 デバッグの連携

### レベル1: Copilotで解決

```typescript
// エラー: "Cannot read property 'name' of undefined"

// Copilot Chat: 「このエラーを修正して」
// ↓ Copilotが提案
<h3>{venue?.name ?? '名称未設定'}</h3>
```

### レベル2: Kiroに相談

```
「以下のエラーが出ますが、原因がわかりません：

TypeError: Cannot read property 'map' of undefined
  at VenueList (VenueList.tsx:45)

データ取得のロジックに問題があるようです。
診断してください。」
```

Kiroが診断:
- データフローの確認
- 非同期処理の問題を特定
- 修正方法を提案・実装

---

## 📊 進捗管理

### Gitを使った連携

```bash
# Kiroで大きな機能を実装
git commit -m "feat: 区ごとのページ機能を追加（Kiro）"

# Copilotで調整
git commit -m "style: 区ページのデザインを改善（Copilot）"
git commit -m "feat: 区の説明文を追加（Copilot）"

# 問題が発生してKiroに相談
git commit -m "fix: パフォーマンス最適化（Kiro）"

# さらにCopilotで微調整
git commit -m "style: ローディング表示を改善（Copilot）"
```

### コミットメッセージの規則

- `feat:` - 新機能（Kiro/Copilot両方）
- `fix:` - バグ修正（Kiro/Copilot両方）
- `style:` - スタイル変更（主にCopilot）
- `refactor:` - リファクタリング（主にKiro）
- `docs:` - ドキュメント（Copilot）
- `test:` - テスト（Copilot）

末尾に `(Kiro)` または `(Copilot)` を付けると、誰が作業したか明確になります。

---

## 🎯 まとめ

### 効果的な連携の公式

```
大きな変更（Kiro）
  ↓
小さな調整（Copilot）
  ↓
問題発生（Kiro）
  ↓
微調整（Copilot）
  ↓
次の機能（Kiro）
```

### 判断基準

**Kiroに依頼**:
- 「どうやって実装するか分からない」
- 「複数のファイルを変更する必要がある」
- 「アーキテクチャを変更する」
- 「複雑なロジックが必要」

**Copilotで自分で**:
- 「やり方は分かっている」
- 「1つのファイルだけ変更」
- 「見た目の調整」
- 「データの追加」

### 両方を使うメリット

1. **開発速度の向上**: Kiroで構造、Copilotで詳細
2. **学習効果**: Kiroの実装をCopilotで調整しながら学ぶ
3. **柔軟性**: 大小の変更を適切なツールで
4. **コスト効率**: Kiroのトークンを節約

---

**Happy Coding with Kiro & Copilot! 🚀**
