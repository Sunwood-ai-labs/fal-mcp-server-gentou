<div align="center">
<img src="https://raw.githubusercontent.com/Sunwood-ai-labs/fal-mcp-server-gentou/main/assets/release_header_v0.2.0-alpha.png" alt="Release Header" width="100%" />
</div>

<div align="center">

[![Version](https://img.shields.io/badge/version-v0.2.0--alpha-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen)]()

**🎉 fal-mcp-server-gentou v0.2.0-alpha がリリースされました！**

[📖 README](https://github.com/Sunwood-ai-labs/fal-mcp-server-gentou#readme) | [🐛 Issue報告](https://github.com/Sunwood-ai-labs/fal-mcp-server-gentou/issues)

</div>

---

## Overview

このリリースでは、MCPサーバーとしての使い勝手を大幅に向上させる機能追加と、開発・テスト環境の整備を行いました。
特にCLIからの直接実行対応や、ツールの説明文のローカライズ（日本語化）により、より直感的に Fal AI の画像生成機能を利用できるようになりました。

## Highlights

>[!NOTE] 💡 **TL;DR**: CLI実行への対応と、ツール説明の日本語化、スキーマ検証の強化が行われました。

**🚀 CLI実行に対応**
`npx` 等を通じて直接MCPサーバーを起動できるようになり、導入が簡単になりました。

**🇯🇵 ツール説明のローカライズ**
MCPクライアント（Claude Desktop等）から見えるツールの説明文を日本語化し、より分かりやすくなりました。

## What's Changed

**⚡ 新機能**

| 機能 | 説明 |
|------|------|
| CLI実行対応 | `package.json` の `bin` 設定の追加 |
| 日本語化 | ツール名や説明文のローカライズ |
| スキーマ検証 | `src/schema.ts` による堅牢な入力チェック |

**🔧 改善**

- `.gitignore` の整理（OS/IDE固有ファイルの除外）
- README のデザイン調整と YOROZU バッジの追加
- 日本語でのテストレポート生成機能の追加

**🧪 テスト**

- スキーマ検証用のテストスイート (`tests/schema.test.js`) の追加

## Technical Details

<details>
<summary>📊 コード差分の詳細分析（クリックで展開）</summary>

**ビルド・実行構成の変更**
- ES Modules への完全移行と `package.json` の `type: module` 設定
- `dist/index.js` の直接実行をサポート

**コード品質**
- `dotenv` への依存を排除し、環境変数の管理を柔軟に
- `src/schema.ts` へのバリデーションロジックの集約

</details>

## Upgrade Guide
```bash
# npm を使用する場合
npm install -g @sunwood-ai-labs/fal-mcp-server-gentou@latest

# 直接実行する場合
npx @sunwood-ai-labs/fal-mcp-server-gentou
```

## Contributors

このリリースに貢献してくださった皆様に感謝します！

@Maki (Sunwood-ai-labs)

## Full Changelog

**Full Changelog**: [`v0.1.0-alpha...v0.2.0-alpha`](https://github.com/Sunwood-ai-labs/fal-mcp-server-gentou/compare/v0.1.0-alpha...v0.2.0-alpha)

---

<div align="center">

⭐ このプロジェクトが役に立ったら、スターをお願いします！

</div>
