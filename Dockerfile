# --- Backend build ---
FROM node:20-slim AS backend-builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /backend

COPY ./package.json ./pnpm-lock.yaml ./
RUN pnpm install
COPY ./src ./src

# --- Backend runner ---
FROM node:20-slim AS backend-runner

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /backend

COPY --from=backend-builder /backend /backend

# Create db directory and set permissions before switching user
RUN mkdir -p /backend/db && \
        useradd --user-group --create-home --shell /bin/#false appuser && \
        chown -R appuser:appuser /backend

USER appuser

ENV PORT=3001
EXPOSE 3001

CMD ["pnpm", "dev"]