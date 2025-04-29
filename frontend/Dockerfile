FROM ghcr.io/proyectos-enee/pnpm:<DOCKER_FRONTEND_IMAGE_VERSION> AS base
ARG APP_VERSION
ENV APP_VERSION=$APP_VERSION
ARG ENVIRONMENT
ENV ENVIRONMENT=$ENVIRONMENT
COPY . /app
COPY ./public/env-config.example.js /app/public/env-config.js

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

FROM ghcr.io/proyectos-enee/nginx:<DOCKER_FRONTEND_IMAGE_VERSION>
COPY --from=prod-deps /app/node_modules /usr/share/nginx/html/node_modules
COPY --from=build /app/dist /usr/share/nginx/html

COPY deploy/environment.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/environment.sh

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
