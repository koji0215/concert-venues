# クイックスタートガイド

## 🚀 5分でセットアップ

### 1. リポジトリ作成
```bash
cd concert-venues
git init
git add .
git commit -m "Initial commit"
gh repo create concert-venues --public --source=. --push
```

### 2. GitHub Copilot でデータ抽出

VS Code で Copilot Chat を開き（`Cmd + Shift + I`）、以下を送信：

```
@workspace data/source-documents/大田区/ のPDFファイルから
施設情報を抽出して、docs/DATA_STRUCTURE.md のフォーマットで
JSONデータを作成してください。
```

### 3. Kiro でデータ検証

```
public/data/venues.json のデータを検証して、
重複や形式エラーがないか確認してください。
```

### 4. コミット & プッシュ
```bash
git add public/data/venues.json
git commit -m "data: Add venues from PDFs"
git push
```

## 📋 チェックリスト

- [ ] `.github/copilot-instructions.md` が配置されている
- [ ] `docs/DATA_STRUCTURE.md` が配置されている
- [ ] Git LFS を設定（PDFが大きい場合）
- [ ] GitHubリポジトリを作成
- [ ] Copilot でデータ抽出
- [ ] Kiro でデータ検証
- [ ] コミット & プッシュ

## 🎯 Kiro と Copilot の使い分け

| タスク | 使用ツール |
|--------|-----------|
| PDFからデータ抽出 | **Copilot** |
| データの検証・整形 | **Kiro** |
| コードの実装 | **両方** |
| Git操作 | **Kiro** |
| 大量データ処理 | **Copilot** |

## 📚 詳細ドキュメント

- [GitHub連携ガイド](./GITHUB_COPILOT_INTEGRATION.md)
- [セットアップ詳細](./SETUP_GITHUB_REPO.md)
- [データ構造仕様](./docs/DATA_STRUCTURE.md)
