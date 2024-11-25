#!/usr/bin/env node
/**
 * This is a template MCP server that implements a simple notes system.
 * It demonstrates core MCP concepts like resources and tools by allowing:
 * - Listing notes as resources
 * - Reading individual notes
 * - Creating new notes via a tool
 * - Summarizing all notes via a prompt
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListPromptsRequestSchema, GetPromptRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
const dataPath = path.join(os.homedir(), ".cpm", "prompts.json");
let prompts = {};
/**
 * Create an MCP server with capabilities for resources (to list/read notes),
 * tools (to create new notes), and prompts (to summarize notes).
 */
const server = new Server({
    name: "cpm-server",
    version: "0.1.0",
}, {
    capabilities: {
        resources: {},
        tools: {},
        prompts: {},
    },
});
server.setRequestHandler(ListPromptsRequestSchema, async () => {
    return {
        prompts: Object.entries(prompts).map(([name, prompt]) => ({
            name,
            description: prompt.description,
        })),
    };
});
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const prompt = prompts[request.params.name];
    if (!prompt) {
        throw new Error("Unknown prompt");
    }
    return {
        description: prompt.description,
        messages: [
            {
                role: "user",
                content: {
                    type: "text",
                    text: prompt.content,
                },
            },
        ],
    };
});
async function main() {
    const json = fs.readFileSync(dataPath, { encoding: "utf8" });
    prompts = JSON.parse(json);
    const transport = new StdioServerTransport();
    await server.connect(transport);
}
main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});
