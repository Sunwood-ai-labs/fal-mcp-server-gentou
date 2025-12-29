# Fal mcp サーバー 「幻燈」 (Gentou)

![Header](assets/header.png)

> [!NOTE]
> 幻燈 (Gentou) - A magic lantern that projects dreams into reality. This MCP server connects your agent to the Fal AI image generation infrastructure.

## 概要 (Overview)
`fal-mcp-server-gentou` は、Fal AI の強力な画像生成モデル（`fal-ai/nano-banana-pro`）を Model Context Protocol (MCP) を通じて利用可能にするサーバーです。
これにより、Claude desktop やその他の MCP クライアントから直接、高品質な画像を生成することができます。

## ✨ 特徴 (Features)
- **高速生成**: `fal-ai/nano-banana-pro` モデルを使用し、数秒で画像を生成します。
- **シンプルなインターフェース**: プロンプトを入力するだけで、直感的に操作可能。
- **柔軟な設定**: アスペクト比や画像数、フォーマットをカスタマイズ可能。

## 📦 インストール (Installation)

### Method 1: NPX (Recommended)
すぐにサーバーを起動したい場合は、`npx` を使用するのが最も簡単です。

```bash
npx -y @sunwood-ai-labs/fal-mcp-server-gentou
```

### Method 2: Global Install
頻繁に使用する場合は、グローバルにインストールすることをお勧めします。

```bash
npm install -g @sunwood-ai-labs/fal-mcp-server-gentou
# 実行 (Run)
@sunwood-ai-labs/fal-mcp-server-gentou
```

### Method 3: Source (For Developers)
開発に参加する場合や、ソースコードからビルドしたい場合の手順です。

```bash
git clone https://github.com/Sunwood-ai-labs/fal-mcp-server-gentou.git
cd fal-mcp-server-gentou
npm install
npm run build
```

## ⚙️ 設定 (Configuration)

`.env` ファイルを作成し、Fal AI の API キーを設定してください。

```env
FAL_KEY=your_fal_key_here
```

## 🚀 使い方 (Usage)

MCP 設定ファイル（例: `claude_desktop_config.json`）に以下を追加します。

### NPX を使用する場合 (Recommended)

```json
{
  "mcpServers": {
    "gentou": {
      "command": "npx",
      "args": ["-y", "@sunwood-ai-labs/fal-mcp-server-gentou"],
      "env": {
        "FAL_KEY": "your_fal_key_here"
      }
    }
  }
}
```

### ソースコードを使用する場合

```json
{
  "mcpServers": {
    "gentou": {
      "command": "node",
      "args": ["/absolute/path/to/fal-mcp-server-gentou/dist/index.js"],
      "env": {
        "FAL_KEY": "your_fal_key_here"
      }
    }
  }
}
```

## 🛠️ ツール (Tools)

### `generate_image`
画像を生成します。

- `prompt` (required): 画像の説明
- `aspect_ratio`: アスペクト比 (デフォルト: "1:1")
- `num_images`: 生成枚数 (デフォルト: 1)
- `output_format`: 出力フォーマット (デフォルト: "png")

## 📜 ライセンス (License)
ISC
