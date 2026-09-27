---
description: Show MAMA's effective configuration (database, embedding model, hook switches)
allowed-tools: Read, Bash
argument-hint: '[--show]'
---

# MAMA Configuration

You are helping the user see how MAMA is configured. Nothing here is written: every setting below comes
from an environment variable or is fixed in the code.

**User Arguments:** `$ARGUMENTS`

## What to report

1. **Database.** Use the first nonempty environment value in this order: `MAMA_DB_PATH`, then
   `MAMA_DATABASE_PATH`; when neither is set, use `~/.claude/mama-memory.db`
   (the plugin's development-memory database, shared by the hooks and the MCP server). Report whether
   the file exists and its size. This database is separate from the MAMA OS daemon's state in `~/.mama/`.
2. **Embedding model.** Fixed in the core: `Xenova/multilingual-e5-large`, 1024 dimensions, cached in
   `~/.cache/huggingface/transformers`. It cannot be changed by configuration.
3. **Hooks.** `MAMA_DISABLE_HOOKS=true` turns every hook off. Under `MAMA_DAEMON=1`, only the features
   listed in `MAMA_HOOK_FEATURES` (comma-separated: memory, keywords, rules, agents, contracts) run.
   Otherwise all features run. Report the values the current environment has.
4. **Debugging.** `MAMA_DEBUG=true` enables verbose logs.

## How to change something

- Another database: set `MAMA_DB_PATH` before Claude Code starts (for example in the shell profile).
  `MAMA_DATABASE_PATH` also works when the higher-priority variable is unset or empty.
- Turn hooks off: set `MAMA_DISABLE_HOOKS=true`.

## Output format

```markdown
**Database:** {path} ({exists, size} or "not created yet")
**Embedding model:** Xenova/multilingual-e5-large (1024-dim, fixed)
**Hooks:** {all on | off (MAMA_DISABLE_HOOKS) | daemon mode: {features}}
**Debug logs:** {on | off}
```
