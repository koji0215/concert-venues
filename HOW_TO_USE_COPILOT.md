# GitHub Copilot でデータ抽出する方法

## 📁 ファイルの配置場所

### PDFファイル
PDFファイルは**Gitで管理しない**ため、ローカルに配置するだけでOKです：

```
concert-venues/
└── data/
    └── source-documents/
        ├── 大田区/
        │   └── 公共施設予約システム_音楽練習.pdf
        ├── 台東区/
        │   └── 施設別空き状況_音楽.pdf
        └── ... (他の区)
```

**重要**: PDFファイルは`.gitignore`で除外されているため、Gitにコミットされません。

### 手書きデータ
手書きデータは既に配置済みです：
```
concert-venues/data/handwritten-data.json
```

## 🚀 Copilot への依頼方法

### ステップ1: VS Code で Copilot Chat を開く

- **Mac**: `Cmd + Shift + I`
- **Windows/Linux**: `Ctrl + Shift + I`

### ステップ2: 以下のプロンプトを送信

#### 📝 プロンプト例1: 手書きデータから抽出

```
@workspace data/handwritten-data.json に記載されている施設情報を、
docs/DATA_STRUCTURE.md のフォーマットに従って、
public/data/venues.json に追加してください。

以下の手順で作業してください：

1. data/handwritten-data.json を読み込む
2. 各施設について、以下の情報を調査：
   - 正式な住所
   - 最寄り駅と徒歩時間
   - 収容人数
   - 料金
   - 設備情報
3. docs/DATA_STRUCTURE.md のフォーマットに従ってJSONを作成
4. 既存の public/data/venues.json に追加

まず品川区から始めてください。
```

#### 📄 プロンプト例2: PDFファイルから抽出（区ごと）

```
@workspace data/source-documents/大田区/ にあるPDFファイルから
施設情報を抽出して、docs/DATA_STRUCTURE.md のフォーマットで
JSONデータを作成してください。

抽出する情報：
- 施設名
- 住所
- 最寄り駅
- 収容人数
- 料金
- 設備情報（ピアノ、音響など）
- 利用条件

作成したデータを public/data/venues.json に追加してください。
```

#### 🔄 プロンプト例3: 複数の区を一度に処理

```
@workspace data/source-documents/ 内のすべてのPDFファイルから
施設情報を抽出して、public/data/venues.json に追加してください。

以下の区のPDFファイルを処理：
- 大田区
- 台東区
- 墨田区
- 中央区
- 荒川区
- 目黒区
- 杉並区

docs/DATA_STRUCTURE.md のフォーマットに従ってください。
不明な情報はデフォルト値を使用してください。

一度にすべて処理せず、区ごとに確認しながら進めてください。
```

## 💡 効果的な依頼のコツ

### ✅ 良い依頼の例

```
@workspace data/source-documents/大田区/公共施設予約システム_音楽練習.pdf
から施設情報を抽出してください。

docs/DATA_STRUCTURE.md のフォーマットに従い、
以下の点に注意してください：
- IDは "ota-{施設略称}-{連番}" の形式
- 不明な情報はデフォルト値を使用
- 料金は1日あたりの金額

作成したデータを public/data/venues.json に追加してください。
```

### ❌ 悪い依頼の例

```
PDFから情報を取ってください
```

## 📋 段階的な作業フロー

### フェーズ1: 手書きデータから開始（推奨）

1. **品川区**
   ```
   @workspace data/handwritten-data.json の品川区の施設情報を
   public/data/venues.json に追加してください。
   ```

2. **新宿区**
   ```
   @workspace data/handwritten-data.json の新宿区の施設情報を
   public/data/venues.json に追加してください。
   ```

3. **千代田区**
   ```
   @workspace data/handwritten-data.json の千代田区の施設情報を
   public/data/venues.json に追加してください。
   ```

### フェーズ2: PDFファイルから抽出

各区ごとに処理：

```
@workspace data/source-documents/大田区/ のPDFから
施設情報を抽出して public/data/venues.json に追加してください。
```

## 🔍 Copilot の応答を確認

Copilot がデータを作成したら、以下を確認：

1. **JSONの構文が正しいか**
   ```bash
   cat public/data/venues.json | jq . > /dev/null && echo "OK" || echo "NG"
   ```

2. **IDが重複していないか**
   ```bash
   cat public/data/venues.json | jq '[.[].id] | group_by(.) | map(select(length > 1))'
   ```

3. **データ件数**
   ```bash
   cat public/data/venues.json | jq 'length'
   ```

## 🛠️ Kiro でデータ検証

Copilot でデータを追加した後、Kiro に依頼：

```
public/data/venues.json のデータを検証してください。

以下を確認：
1. JSONの構文が正しいか
2. IDが重複していないか
3. 必須フィールドがすべて存在するか
4. データ型が正しいか（数値、文字列など）
5. docs/DATA_STRUCTURE.md の仕様に準拠しているか

問題があれば修正してください。
```

## 📊 進捗管理

### チェックリスト

- [ ] 手書きデータ（品川区、新宿区、千代田区）
- [ ] 大田区 PDF
- [ ] 台東区 PDF
- [ ] 墨田区 PDF
- [ ] 中央区 PDF
- [ ] 荒川区 PDF
- [ ] 目黒区 PDF
- [ ] 杉並区 PDF
- [ ] 江戸川区 PDF
- [ ] 足立区 PDF
- [ ] 板橋区 PDF
- [ ] 世田谷区 PDF
- [ ] 練馬区 PDF
- [ ] 文京区 PDF
- [ ] 中野区 PDF
- [ ] 豊島区 PDF
- [ ] 葛飾区 PDF
- [ ] 江東区 PDF
- [ ] 港区 PDF
- [ ] 渋谷区 PDF
- [ ] 北区 PDF

## 🚨 トラブルシューティング

### Copilot がPDFを読めない場合

1. **PDFをテキスト化**
   ```bash
   # pdftotext をインストール
   brew install poppler
   
   # PDFをテキストに変換
   pdftotext data/source-documents/大田区/施設.pdf data/source-documents/大田区/施設.txt
   ```

2. **テキストファイルから抽出**
   ```
   @workspace data/source-documents/大田区/施設.txt から
   施設情報を抽出してください。
   ```

### Copilot の応答が不完全な場合

```
前回の続きから、残りの施設情報を追加してください。
```

### データ形式が合わない場合

```
public/data/venues.json の最新のエントリを、
docs/DATA_STRUCTURE.md の仕様に合わせて修正してください。
```

## 📚 参考ドキュメント

- [データ構造仕様](./docs/DATA_STRUCTURE.md)
- [クイックスタート](./QUICK_START.md)
- [GitHub Copilot 連携ガイド](./GITHUB_COPILOT_INTEGRATION.md)

## 次のステップ

データ抽出が完了したら：

1. Kiro でデータ検証
2. Git にコミット
3. GitHub にプッシュ
4. Webアプリケーションで動作確認

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開いて確認！
