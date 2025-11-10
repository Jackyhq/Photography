set -e
pnpm --filter=@afilmory/builder run cli

cd apps/web/assets-git

echo "git add ."
git add . || true
echo "git commit -m 'chore: update photos-manifest.json and thumbnails'"
git commit -m "chore: update photos-manifest.json and thumbnails" || true
echo "git push"
git push || true

echo "done"
