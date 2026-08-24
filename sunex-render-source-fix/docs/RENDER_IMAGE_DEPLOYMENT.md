# Render Image Deployment

The original `/manus-storage/...` image URLs require private managed-storage credentials that are not available on Render. This repository now serves a bundled image first when it exists in `client/public/manus-storage/`.

## Prepare the Asset Bundle

Run these commands from the repository root after installing dependencies:

```bash
pnpm install
SUNEX_ASSET_SOURCE_URL=https://5173-ixci5viommkoo9xyri496-530d15af.us3.manus.computer \
SUNEX_LOCAL_ASSET_DIR=client/public/manus-storage \
pnpm assets:export
```

On Windows PowerShell:

```powershell
$env:SUNEX_ASSET_SOURCE_URL="https://5173-ixci5viommkoo9xyri496-530d15af.us3.manus.computer"
$env:SUNEX_LOCAL_ASSET_DIR="client/public/manus-storage"
pnpm assets:export
```

Review `client/public/manus-storage/asset-manifest.json`. Commit only approved image assets; never place keys, databases, private documents, or `.env` files in this directory. Once reviewed, commit the fallback code and asset bundle, then push `main`. Render will rebuild and serve the images from its own deployment.
