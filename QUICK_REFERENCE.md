# クイックリファレンス

GitHub Copilotでの開発を始めるための最小限の情報をまとめています。

## 🚀 今すぐ始める

### 1. プロジェクトを開く
```bash
cd ~/.kiro/concert-venues
code .
```

### 2. 開発サーバー起動
```bash
npm run dev
```
→ http://localhost:3000 を開く

### 3. Copilotを使う
- `Cmd + I` (Mac) / `Ctrl + I` (Windows): Copilot Chat
- コメントを書いて `Tab`: コード補完

---

## 📝 よく使うCopilot操作

### データ追加
1. `public/data/venues.json` を開く
2. `Cmd + I` でCopilot Chat
3. 「以下のデータを追加して」+ 施設情報

### コンポーネント作成
1. 新しいファイル作成（例: `components/NewComponent.tsx`）
2. コメントで機能を説明
3. Copilotが補完

### バグ修正
1. エラー箇所を選択
2. `Cmd + I`
3. 「このエラーを修正して」

---

## 🎯 次にやること

### 優先度1: 小規模施設データ追加
- ファイル: `public/data/venues.json`
- 参考: 千代田区のPDF
- 方法: Copilot Chatで「データを追加して」

### 優先度2: 区ごとのページ
- ファイル: `app/wards/[ward]/page.tsx`
- 方法: Copilot Chatで「区別ページを作成して」

### 優先度3: 地図表示
- ファイル: `components/VenueMap.tsx`
- 必要: Google Maps APIキー
- 方法: Copilot Chatで「地図コンポーネントを作成して」

---

## 🔧 トラブル時

### Copilotが動かない
1. VS Code再起動
2. GitHubサインイン確認
3. 拡張機能の有効化確認

### エラーが出た
1. エラーメッセージをコピー
2. Copilot Chatに貼り付け
3. 「このエラーを修正して」

### フォーマットが崩れた
```bash
npx prettier --write .
```

---

## 📚 詳細情報

詳しくは `DEVELOPMENT_GUIDE.md` を参照してください。

---

## ⌨️ ショートカット

| 操作 | Mac | Windows |
|------|-----|---------|
| Copilot Chat | `Cmd + I` | `Ctrl + I` |
| 補完を受け入れ | `Tab` | `Tab` |
| 補完を拒否 | `Esc` | `Esc` |
| 次の提案 | `Option + ]` | `Alt + ]` |
| 前の提案 | `Option + [` | `Alt + [` |

---

**すぐに開発を始められます！ 🎉**
