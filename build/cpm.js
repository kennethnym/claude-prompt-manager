#!/usr/bin/env node
import prompts from "prompts";
import * as fs from "fs/promises";
import * as path from "path";
import { existsSync, writeFileSync, mkdirSync } from "fs";
import * as os from "os";
const args = process.argv;
const dataPath = path.join(os.homedir(), ".cpm", "prompts.json");
if (!existsSync(dataPath)) {
    console.log("data file does not exist. making one at", dataPath);
    mkdirSync(path.join(os.homedir(), ".cpm"));
    writeFileSync(dataPath, "{}", { encoding: "utf8" });
}
switch (args[2].trim()) {
    case "add":
        addPrompt();
        break;
    case "list":
        listPrompt();
        break;
    default:
        console.log(`unknown command: ${args[2]}`);
        break;
}
async function addPrompt() {
    const prompt = await prompts([
        {
            type: "text",
            name: "name",
            message: "What is the name of the prompt? (must be unique and cannot contain space)",
        },
        {
            type: "text",
            name: "description",
            message: "What is the description for the prompt?",
        },
        {
            type: "text",
            name: "content",
            message: "What is the prompt?",
        },
    ]);
    const json = await fs.readFile(dataPath, { encoding: "utf8" });
    let allPrompts = JSON.parse(json);
    allPrompts[prompt.name] = prompt;
    await fs.writeFile(dataPath, JSON.stringify(allPrompts), {
        encoding: "utf8",
    });
    console.log("prompt saved!");
}
async function listPrompt() {
    const json = await fs.readFile(dataPath, { encoding: "utf8" });
    const allPrompts = JSON.parse(json);
    for (const promptName in allPrompts) {
        const prompt = allPrompts[promptName];
        console.log(`Name: ${prompt.name}`);
        console.log(`Description: ${prompt.description}`);
        console.log(`Prompt: ${prompt.content}`);
        console.log();
    }
}
