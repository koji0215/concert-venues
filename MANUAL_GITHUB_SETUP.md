# 手動でGitHubリポジトリを作成する方法

GitHub CLIが使えない場合の手順です。

## ステップ1: GitHubでリポジトリを作成

1. ブラウザで [GitHub](https://github.com) にアクセス
2. 右上の「+」→「New repository」をクリック
3. 以下の情報を入力：
   - **Repository name**: `concert-venues`
   - **Description**: `東京23区の公共コンサート会場データベース`
   - **Public** を選択
   - **Initialize this repository with** は何もチェックしない
4. 「Create repository」をクリック

## ステップ2: ローカルリポジトリをプッシュ

GitHubに表示される指示に従って、以下のコマンドを実行：

```bash
cd concert-venues

# Gitの初期化（まだの場合）
git init

# すべてのファイルを追加
git add .

# 初回コミット
git commit -m "Initial commit: 東京23区公共コンサート会場データベース"

# ブランチ名をmainに変更
git branch -M main

# リモートリポジトリを追加（YOUR_USERNAMEを自分のユーザー名に変更）
git remote add origin https://github.com/YOUR_USERNAME/concert-venues.git

# プッシュ
git push -u origin main
```

### ユーザー名の確認方法

GitHubのユーザー名がわからない場合：
1. [GitHub](https://github.com) にログイン
2. 右上のアイコンをクリック
3. 「Your profile」を選択
4. URLの `github.com/YOUR_USERNAME` の部分がユーザー名

## ステップ3: 認証

プッシュ時に認証を求められた場合：

### Personal Access Token を使用

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 「Generate new token」→「Generate new token (classic)」
3. 以下を設定：
   - **Note**: `concert-venues`
   - **Expiration**: `90 days` または `No expiration`
   - **Select scopes**: `repo` にチェック
4. 「Generate token」をクリック
5. 表示されたトークンをコピー（一度しか表示されません！）

6. プッシュ時にパスワードを求められたら、トークンを貼り付け

### SSH を使用（推奨）

```bash
# SSH鍵を生成（まだの場合）
ssh-keygen -t ed25519 -C "your_email@example.com"

# SSH鍵をクリップボードにコピー
pbcopy < ~/.ssh/id_ed25519.pub

# GitHubに登録
# 1. GitHub → Settings → SSH and GPG keys
# 2. 「New SSH key」をクリック
# 3. Title: "MacBook Pro"
# 4. Key: ペースト
# 5. 「Add SSH key」をクリック

# リモートURLをSSHに変更
git remote set-url origin git@github.com:YOUR_USERNAME/concert-venues.git

# プッシュ
git push -u origin main
```

## ステップ4: 確認

ブラウザでリポジトリを開いて、ファイルがアップロードされているか確認：

```bash
# ブラウザで開く
open https://github.com/YOUR_USERNAME/concert-venues
```

## トラブルシューティング

### エラー: "remote: Repository not found"
- リポジトリ名が正しいか確認
- ユーザー名が正しいか確認
- リポジトリが作成されているか確認

### エラー: "Authentication failed"
- Personal Access Token を使用
- または SSH 鍵を設定

### エラー: "Updates were rejected"
```bash
# リモートの変更を取得
git pull origin main --allow-unrelated-histories

# 再度プッシュ
git push -u origin main
```

## 次のステップ

リポジトリが作成できたら、[QUICK_START.md](./QUICK_START.md) の「ステップ2: GitHub Copilot でデータ抽出」に進んでください。
