# cpm-server MCP Server

a prompt manager for claude

This is a TypeScript-based MCP server that implements a prompt manager for claude.

## Features

- creating prompts from the command line
- listing all your saved prompts
- arguments support (WIP)

## Development

Install dependencies:
```bash
bun install
```

Build the server:
```bash
bun run build
```

For development with auto-rebuild:
```bash
bun run watch
```

## Installation

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "cpm-server": {
      "command": "/path/to/cpm-server/build/index.js"
    }
  }
}
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.
