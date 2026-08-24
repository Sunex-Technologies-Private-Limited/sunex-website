FROM node:22-slim AS node-builder
WORKDIR /app
COPY . .
RUN npm install -g corepack@latest \
    && corepack pnpm install \
    && corepack pnpm run build

FROM node:22-slim AS runtime
RUN groupadd --system sunex \
    && useradd --system --gid sunex --home-dir /app --shell /usr/sbin/nologin sunex
WORKDIR /app
COPY --chown=sunex:sunex --from=node-builder /app/dist ./dist
COPY --chown=sunex:sunex --from=node-builder /app/node_modules ./node_modules
COPY --chown=sunex:sunex --from=node-builder /app/package.json ./package.json
COPY --chown=sunex:sunex scripts/start-production.sh ./scripts/start-production.sh
RUN chmod +x ./scripts/start-production.sh
ENV NODE_ENV=production \
    SUNEX_DOTNET_API_MANAGED=external
USER sunex
CMD ["./scripts/start-production.sh"]
