# Imagen única: compila server/ y web/ y sirve todo desde Express.
FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY server/package.json server/
COPY web/package.json web/
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:22-slim
ENV NODE_ENV=production PORT=4000 DB_PATH=/data/bibliaquiz.db WEB_DIST=/app/web/dist
WORKDIR /app/server
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/server/dist ./dist
COPY --from=build /app/server/package.json ./
COPY --from=build /app/web/dist /app/web/dist
# /data debe ser un volumen persistente (Railway Volume o Fly volume)
RUN mkdir -p /data
EXPOSE 4000
CMD ["node", "dist/index.js"]
