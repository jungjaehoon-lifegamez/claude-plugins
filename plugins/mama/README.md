# MAMA - Memory-Augmented MCP Assistant

Track decisions, learn from mistakes, never repeat errors.

MAMA is an always-on companion for Claude Code that remembers your decision evolution. It helps you maintain context across sessions, learn from past mistakes, and build institutional knowledge.

## Prerequisites

- Node.js >= 18.0.0 (20+ recommended)
- 500MB free disk space for embedding model cache
- SQLite support (included on most systems)

## Installation

```bash
# Add marketplace
/plugin marketplace add jungjaehoon-lifegamez/claude-plugins

# Install MAMA
/plugin install mama
```

First use of `/mama-save` downloads the MCP server automatically (~1-2 minutes).

## Usage

```bash
# Save your first decision
/mama-save topic="auth_strategy" decision="Use JWT with refresh tokens" reasoning="Better security and user experience"

# Search for related decisions
/mama-suggest "How should I handle authentication?"

# View decision history
/mama-recall auth_strategy

# List all decisions
/mama-list
```

## Features

**Decision Evolution Tracking**
Track decisions with full context and reasoning. Link related decisions (supersedes, contradicts, refines). Update outcomes as you learn.

**Semantic Search**
Find relevant decisions using natural language. Cross-lingual support (English + Korean). Confidence scoring for relevance.

**Automatic Context Injection**
Relevant decisions surface automatically as you work. File-specific context when editing code. Zero overhead - all processing happens locally.

**Local-First Architecture**
No network calls - everything runs on your device. SQLite database with vector extensions. Privacy-focused design.

**Multilingual Support**
Natural language in English and Korean. Cross-lingual semantic search. Supports decision tracking in any language.

## Commands

| Command | Purpose | Example |
|---------|---------|---------|
| `/mama-save` | Save decision with reasoning | `/mama-save topic="api_design"` |
| `/mama-recall <topic>` | View decision history | `/mama-recall api_design` |
| `/mama-suggest <query>` | Semantic search | `/mama-suggest "database choice"` |
| `/mama-list` | Browse all decisions | `/mama-list --limit=20` |
| `/mama-checkpoint` | Save session state | `/mama-checkpoint` |
| `/mama-resume` | Resume from checkpoint | `/mama-resume` |
| `/mama-configure` | View/modify settings | `/mama-configure --show` |

## Use Cases

### Code Review Learning

```bash
# After finding a bug
/mama-save topic="validation_bug_2024" \
  decision="Always validate user input at API boundary" \
  reasoning="XSS vulnerability found in profile endpoint"

# Later, when writing similar code
# MAMA automatically surfaces: "Remember validation_bug_2024..."
```

### Architecture Decisions

```bash
# Document your choice
/mama-save topic="state_management" \
  decision="Use Zustand instead of Redux" \
  reasoning="Simpler API, less boilerplate, better TypeScript support"

# Track outcome
/mama-update state_management --outcome=success
```

### Session Continuity

```bash
# End of day
/mama-checkpoint

# Next morning
/mama-resume
# See: "Yesterday you were working on authentication refactor..."
```

## Configuration

### Database Location

Default: `~/.claude/mama-memory.db`

Change via environment variable:
```bash
export MAMA_DB_PATH=/custom/path/mama-memory.db
```

### Embedding Model

MAMA uses `Xenova/all-MiniLM-L6-v2` for local embeddings (384 dimensions). No configuration needed - works out of the box.

## Architecture

MAMA consists of two packages:

1. **MCP Server** (`@jungjaehoon/mama-server`) - Core memory engine
   - SQLite + vector similarity search
   - Local embeddings via Transformers.js
   - MCP protocol for tool integration

2. **Claude Code Plugin** (this package) - User interface
   - Slash commands for decision management
   - Hooks for automatic context injection
   - Skills for background processing

## Documentation

- [Full Documentation](https://github.com/jungjaehoon-lifegamez/MAMA#documentation)
- [Developer Guide](https://github.com/jungjaehoon-lifegamez/MAMA/tree/main/docs/development)
- [Architecture Deep-Dive](https://github.com/jungjaehoon-lifegamez/MAMA/blob/main/docs/development/developer-playbook.md)

## Troubleshooting

### MCP Server Not Starting

```bash
# Test MCP server manually
npx @jungjaehoon/mama-server

# Check Node.js version (requires >= 18.0.0)
node --version
```

### Database Errors

```bash
# Check database location
/mama-configure --show

# Reset database (WARNING: deletes all data)
rm ~/.claude/mama-memory.db
```

### Plugin Not Loading

```bash
# Validate plugin structure
/plugin validate mama

# Reinstall
/plugin uninstall mama
/plugin install mama
```

## Contributing

Found a bug? Have a feature request?

- [Report Issues](https://github.com/jungjaehoon-lifegamez/MAMA/issues)
- [Main Repository](https://github.com/jungjaehoon-lifegamez/MAMA)

## License

MIT License - see [LICENSE](https://github.com/jungjaehoon-lifegamez/MAMA/blob/main/LICENSE)

## Acknowledgments

MAMA was inspired by the excellent work of [mem0](https://github.com/mem0ai/mem0) (Apache 2.0). While MAMA is a distinct implementation focused on local-first SQLite/MCP architecture for Claude, we appreciate their pioneering work in LLM memory management.

Built with:
- [Model Context Protocol](https://modelcontextprotocol.io/) - Anthropic's MCP SDK
- [Transformers.js](https://huggingface.co/docs/transformers.js) - Local embeddings
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) - Fast SQLite
- [sqlite-vec](https://github.com/asg017/sqlite-vec) - Vector similarity search

---

Author: SpineLift Team
Last Updated: 2025-11-22
