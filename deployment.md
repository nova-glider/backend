# Deployment guide

How to actually deploy for 'production' (theres only a development command but thats good enough for now)

### Docker (highly recommended)

the docker compose is outdated right now 🥲:

Make sure you have git+docker installed

```bash
git clone https https://github.com/nova-can/website
cd website
mv docker-compose-<example|prod>.yml compose.yml
docker compose up -d
```
- Homepage: `http://localhost:3000`
- Backend (API): `http://localhost:3001`

---

### Manual
> [!WARNING]  
> You need to manually set the ports for homepage and backend to be different.

Homepage
```bash
git clone https://github.com/nova-can/website
cd website
cd homepage
pnpm install
pnpm dev # This also builds the css and fixes formatting issues
```

Backend
```bash
git clone https://github.com/nova-can/backend
cd backend
pnpm install
pnpm dev
```
