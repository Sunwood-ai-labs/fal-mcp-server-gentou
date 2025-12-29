import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { fal } from "@fal-ai/client";
import dotenv from "dotenv";

dotenv.config();

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

const GenerateImageSchema = z.object({
    prompt: z.string().describe("The description of the image to generate."),
    aspect_ratio: z.string().default("1:1").describe("Aspect ratio (e.g., '1:1', '16:9')."),
    num_images: z.number().default(1).describe("Number of images to generate."),
    output_format: z.string().default("png").describe("Output format (e.g., 'png', 'jpeg')."),
});

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "generate_image",
                description: "Generate an image using Fal AI (fal-ai/nano-banana-pro).",
                inputSchema: {
                    type: "object",
                    properties: {
                        prompt: { type: "string", description: "The description of the image to generate." },
                        aspect_ratio: { type: "string", default: "1:1", description: "Aspect ratio (e.g., '1:1', '16:9')." },
                        num_images: { type: "number", default: 1, description: "Number of images to generate." },
                        output_format: { type: "string", default: "png", description: "Output format (e.g., 'png', 'jpeg')." }
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
                    aspect_ratio,
                    num_images,
                    output_format,
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
