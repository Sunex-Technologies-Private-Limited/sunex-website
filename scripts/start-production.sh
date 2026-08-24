#!/usr/bin/env sh
set -eu

dotnet /app/backend-dotnet/Sunex.Api.dll &
dotnet_pid="$!"

shutdown() {
  kill -TERM "$dotnet_pid" 2>/dev/null || true
  wait "$dotnet_pid" 2>/dev/null || true
  exit 0
}

trap shutdown INT TERM
node dist/index.js &
node_pid="$!"
wait "$node_pid"
status="$?"
shutdown
exit "$status"
