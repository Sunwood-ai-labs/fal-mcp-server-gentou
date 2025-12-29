import { z } from "zod";

export const GenerateImageSchema = z.object({
    prompt: z.string().describe("生成する画像のプロンプト (英語推奨)"),
    aspect_ratio: z.string().default("1:1").describe("アスペクト比 (例: '1:1', '16:9')"),
    num_images: z.number().default(1).describe("生成する画像の枚数"),
    output_format: z.string().default("png").describe("出力フォーマット (例: 'png', 'jpeg')"),
});
