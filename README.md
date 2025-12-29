# Fal mcp サーバー 「幻燈」 (Gentou)

![Header](https://via.placeholder.com/1200x400/222222/FFFFFF?text=Fal+MCP+Server+%E5%B9%BB%E7%87%88)

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

```json
{
  "mcpServers": {
    "gentou": {
      "command": "node",
      "args": ["/path/to/fal-mcp-server-gentou/dist/index.js"],
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
