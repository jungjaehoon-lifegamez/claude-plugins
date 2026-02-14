# MAMA Plugin Changelog

## [1.7.11] - 2026-02-14

### Changed
- **PreToolUse Hook**: Show contracts only on first edit per session
  - Session state tracking via `/tmp/mama-sessions/`
  - Reduces noise on repeated edits to same file
  - High threshold (0.85) for relevance matching

- **PostToolUse Hook**: Smart contract pattern detection
  - Detects 13 contract-like patterns (interface, typed function, API decorators, etc.)
  - Only prompts when significant patterns found
  - Silent pass for general code modifications

### Added
- `session-state.js`: Shared session state manager
  - `isFirstEdit(filePath)` - Track first edit per file
  - `markContractsShown(filePath)` - Track shown contracts
  - Auto-cleanup of expired sessions (4h TTL)

### Removed
- Automatic contract extraction/saving (was causing DB noise)
- Generic "save contracts" reminder on every edit
