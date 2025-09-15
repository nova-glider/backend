# Deployment guide

How to actually deploy for 'production' (theres only a development command but thats good enough for now)

- Homepage: `http://localhost:3000`
- Backend (API): `http://localhost:3001`

### Docker (highly recommended)

the docker compose is outdated right now 🥲:

Make sure you have git+docker installed

```bash
git clone https https://github.com/nova-glider/website
cd website
mv docker-compose-<example|prod>.yml compose.yml
docker compose up -d
```

---

### Manual

Homepage
```bash
git clone https://github.com/nova-glider/website
cd website
cd homepage
pnpm install
pnpm dev # This also builds the css and fixes formatting issues
```

Backend
```bash
git clone https://github.com/nova-glider/backend
cd backend
pnpm install
pnpm dev
```
