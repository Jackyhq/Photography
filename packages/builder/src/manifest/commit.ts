/**
 * Commit the new manifest before removing files referenced only by the old one.
 * If committing fails, cleanup must never run so the last-good manifest keeps all
 * of its thumbnail dependencies.
 */
export async function commitManifestThenCleanup(
  commitManifest: () => Promise<void>,
  cleanupThumbnails: () => Promise<number>,
): Promise<number> {
  await commitManifest()
  return cleanupThumbnails()
}
