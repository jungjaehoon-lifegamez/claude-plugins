/**
 * Where this plugin keeps its memory, and where it caches the embedding model.
 *
 * The core used to default to both paths when nobody named one, which meant a shared
 * library held one product's data location and chose a directory on one user's
 * machine. It does not any more: a caller that does not say gets an error for the
 * database, and the library's own (in-package) default for the model cache.
 *
 * So the plugin says. These are the same paths the core used, so nothing moves - and
 * an unstated cache would re-download 560MB into node_modules on the next hook run.
 */
const os = require('node:os');
const path = require('node:path');

const { declareProductionDatabasePath } = require('@jungjaehoon/mama-core/db-manager');
const { declareEmbeddingCacheDir } = require('@jungjaehoon/mama-core/embeddings');

const PLUGIN_DB_PATH = path.join(os.homedir(), '.claude', 'mama-memory.db');
const PLUGIN_MODEL_CACHE_DIR = path.join(os.homedir(), '.cache', 'huggingface', 'transformers');

/**
 * Name the database before the core opens one. Call before initDB().
 *
 * An explicit MAMA_DB_PATH wins: a test or a one-off run that set it meant it.
 */
function usePluginDatabase() {
  // Declaring it is what makes the core's test guard refuse it: the core no longer
  // knows this path, so nothing protects it until its owner says it is the live one.
  declareProductionDatabasePath(PLUGIN_DB_PATH);
  // The same statement for the model cache: the core names no directory here either.
  declareEmbeddingCacheDir(PLUGIN_MODEL_CACHE_DIR);
  if (!process.env.MAMA_DB_PATH && !process.env.MAMA_DATABASE_PATH) {
    process.env.MAMA_DB_PATH = PLUGIN_DB_PATH;
  }
  return process.env.MAMA_DB_PATH || process.env.MAMA_DATABASE_PATH;
}

module.exports = { PLUGIN_DB_PATH, PLUGIN_MODEL_CACHE_DIR, usePluginDatabase };
