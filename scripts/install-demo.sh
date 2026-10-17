#!/bin/sh
# Install a game's Web export as a browser demo on the site.
#
#   sh scripts/install-demo.sh <build dir> <public folder>
#   sh scripts/install-demo.sh ../puzzle-game/scratch/web_build play
#
# Each game's scripts/export_web.sh (and its CI artifact "web-demo") produces
# the build dir. The game pack gets a content-hashed name so returning visitors
# load the new version, then public/<folder>/ is replaced as a whole.
# deploy.yml runs this for every game; it also works by hand from Git Bash.

set -eu
BUILD=$1
NAME=$2
case "$NAME" in
	play|*-play) ;;
	*) echo "unexpected demo folder: $NAME"; exit 2 ;;
esac
SITE=$(cd "$(dirname "$0")/.." && pwd)
DEST="$SITE/public/$NAME"

for f in index.html index.js index.wasm index.pck; do
	[ -s "$BUILD/$f" ] || { echo "$BUILD/$f is missing"; exit 1; }
done

STAGE=$(mktemp -d)
trap 'rm -rf "$STAGE"' EXIT
cp "$BUILD"/index.* "$STAGE"/
PACK="index.$(sha256sum "$STAGE/index.pck" | cut -c1-12).pck"
mv "$STAGE/index.pck" "$STAGE/$PACK"
sed -i "s#\"index.pck\":#\"$PACK\":#; s#\"executable\":\"index\"#\"executable\":\"index\",\"mainPack\":\"$PACK\"#" "$STAGE/index.html"
grep -q "\"mainPack\":\"$PACK\"" "$STAGE/index.html" || { echo "index.html did not take the pack name"; exit 1; }

rm -rf "$DEST"
mkdir -p "$DEST"
cp "$STAGE"/* "$DEST"/
echo "installed $NAME with $PACK"
