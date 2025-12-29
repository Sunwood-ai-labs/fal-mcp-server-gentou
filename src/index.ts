#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { fal } from "@fal-ai/client";


const server = new Server(
    {
        name: "fal-mcp-server-gentou",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

import { GenerateImageSchema } from "./schema.js";

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "generate_image",
                description: "Fal AI (fal-ai/nano-banana-pro) を使用して画像を生成します。",
                inputSchema: {
                    type: "object",
                    properties: {
                        prompt: { type: "string", description: "生成する画像のプロンプト (英語推奨)" },
                        aspect_ratio: { type: "string", default: "1:1", description: "アスペクト比 (例: '1:1', '16:9')" },
                        num_images: { type: "number", default: 1, description: "生成する画像の枚数" },
                        output_format: { type: "string", default: "png", description: "出力フォーマット (例: 'png', 'jpeg')" }
                    },
                    required: ["prompt"]
                },
            },
        ],
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === "generate_image") {
        const { prompt, aspect_ratio, num_images, output_format } = GenerateImageSchema.parse(request.params.arguments);

        if (!process.env.FAL_KEY) {
            throw new Error("FAL_KEY environment variable is not set.");
        }

        try {
            const result: any = await fal.subscribe("fal-ai/nano-banana-pro", {
                input: {
                    prompt,
                    aspect_ratio: aspect_ratio as any,
                    num_images,
                    output_format: output_format as any,
                },
                logs: true,
                onQueueUpdate: (update) => {
                    if (update.status === "IN_PROGRESS" && update.logs) {
                        update.logs.map((log) => log.message).forEach(msg => console.error(`[FAL LOG] ${msg}`));
                    }
                },
            });

            if (result.data && result.data.images) {
                return {
                    content: result.data.images.map((img: any) => ({
                        type: "text",
                        text: `Image generated: ${img.url}`,
                    })),
                };
            } else {
                return {
                    content: [
                        {
                            type: "text",
                            text: "No images returned from Fal AI.",
                        },
                    ],
                    isError: true,
                };
            }
        } catch (error: any) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Fal AI error: ${error.message}`,
                    },
                ],
                isError: true,
            };
        }
    }

    throw new Error(`Tool not found: ${request.params.name}`);
});

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Fal MCP Server 'Gentou' running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main:", error);
    process.exit(1);
});
