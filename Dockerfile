FROM mcr.microsoft.com/dotnet/sdk:8.0-bookworm-slim AS dotnet-builder
WORKDIR /src
COPY backend-dotnet ./backend-dotnet
RUN dotnet restore backend-dotnet/Sunex.Api/Sunex.Api.csproj \
    && dotnet publish backend-dotnet/Sunex.Api/Sunex.Api.csproj -c Release -o /out --no-restore

FROM node:22-slim AS node-builder
WORKDIR /app
COPY . .
RUN npm install -g corepack@latest \
    && corepack pnpm install \
    && corepack pnpm run build

FROM mcr.microsoft.com/dotnet/aspnet:8.0-bookworm-slim AS runtime
RUN apt-get update \
    && groupadd --system sunex \
    && useradd --system --gid sunex --home-dir /app --shell /usr/sbin/nologin sunex \
    && rm -rf /var/lib/apt/lists/*
COPY --from=node-builder /usr/local/bin/node /usr/local/bin/
COPY --from=node-builder /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm
WORKDIR /app
COPY --chown=sunex:sunex --from=node-builder /app/dist ./dist
COPY --chown=sunex:sunex --from=node-builder /app/node_modules ./node_modules
COPY --chown=sunex:sunex --from=node-builder /app/package.json ./package.json
COPY --chown=sunex:sunex --from=dotnet-builder /out ./backend-dotnet
COPY --chown=sunex:sunex scripts/start-production.sh ./scripts/start-production.sh
RUN chmod +x ./scripts/start-production.sh
ENV NODE_ENV=production \
    SUNEX_DOTNET_API_MANAGED=external \
    SUNEX_API_BIND=http://127.0.0.1:5090
USER sunex
CMD ["./scripts/start-production.sh"]
