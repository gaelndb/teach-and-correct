# TeachAndCorrect

Base monorepo pour l'application TeachAndCorrect.

## Structure

- `frontend/` : application React + TypeScript avec Vite
- `backend/` : API Spring Boot

## Lancer le frontend

```bash
cd frontend
npm install
npm run dev
```

## Lancer le backend

```bash
cd backend
./mvnw spring-boot:run
```

Endpoint de test : `GET http://localhost:8080/api/health`
