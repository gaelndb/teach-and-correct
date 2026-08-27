# TeachAndCorrect

TeachAndCorrect est une application web de correction assistée par intelligence artificielle destinée aux enseignants.

L’objectif est de permettre à un professeur de transmettre une copie d’élève, d’obtenir une proposition de correction et de note, puis de vérifier et valider le résultat avant de le restituer à l’élève.

<!-- ## Aperçu -->

## Structure du projet

```text
TeachAndCorrect/
├── frontend/    # Application React, TypeScript et Vite
├── backend/     # API Spring Boot
├── docs/        # Documentation et captures d’écran
├── docker-compose.yml
└── README.md
```
## Technologies

### Frontend

- React
- TypeScript
- Vite

### Backend

- Java
- Spring Boot
- Maven

### Base de données

- PostgreSQL

### Tests

- Testcontainers

### Infrastructure et environnement local

- Docker
- Docker Compose


## Installation

### Prérequis

Avant de lancer le projet, vérifiez que les outils suivants sont installés :

- Git
- Node.js
- npm
- Java
- Maven, ou utilisation du Maven Wrapper fourni avec le backend
- Docker
- Docker Compose

### Cloner le dépôt

```bash
git clone https://github.com/gaelndb/teach-and-correct.git
cd teachandcorrect
```

## Lancer la base de données

Depuis la racine du projet :

```bash
cp .env.example .env
docker compose up -d
```

Cette commande démarre les services nécessaires à l'environnement local, notamment la base de données PostgreSQL.

Pour vérifier les conteneurs en cours d'exécution :

```bash
docker compose ps
```

Pour arrêter les services :

```bash
docker compose down
```

## Lancer le backend

Depuis la racine du projet :

```bash
cd backend
./mvnw spring-boot:run
```

Sous Windows :

```bash
cd backend
mvnw.cmd spring-boot:run
```

Le backend est ensuite accessible à l'adresse :

```text
http://localhost:8080
```

## Lancer le frontend

Depuis la racine du projet :

```bash
cd frontend
npm install
npm run dev
```

L'application frontend est ensuite accessible à l'adresse indiquée par Vite, généralement :

```text
http://localhost:5173
```

## Documentation de l'API

La documentation interactive de l'API est disponible via OpenAPI / Swagger UI lorsque le backend est lancé.

```text
http://localhost:8080/swagger-ui/index.html
```

## Lancer les tests backend

Les tests d'intégration utilisent Testcontainers.

Docker doit être installé et en cours d'exécution avant de lancer les tests.

Depuis le dossier `backend` :

```bash
./mvnw test
```

Sous Windows :

```bash
mvnw.cmd test
```

Testcontainers démarre automatiquement les conteneurs nécessaires à l'exécution des tests.

> Il n'est pas nécessaire de lancer `docker compose up -d` avant `./mvnw test` lorsque les tests utilisent uniquement les conteneurs démarrés par Testcontainers.

## Vision du produit

TeachAndCorrect a pour objectif d'assister les enseignants dans la correction des copies tout en conservant leur contrôle sur la décision finale.

L'intelligence artificielle doit proposer une correction, une appréciation et éventuellement une note, mais ces éléments doivent rester modifiables et être validés par le professeur avant d'être considérés comme définitifs.

Le projet vise également à permettre aux enseignants de centraliser leurs classes, leurs élèves, leurs devoirs, les copies corrigées et certaines statistiques de suivi.

## Documentation

La documentation complémentaire du projet est disponible dans le dossier [`docs/`](docs/).

Elle regroupe progressivement :

- la documentation fonctionnelle ;
- la documentation technique ;
- la documentation de l'API avec OpenAPI / Swagger UI ;
- les règles métier ;
- les diagrammes d'architecture ;
- le modèle de données ;
- les captures d'écran de l'application.

## Auteur

**Gaël Ndibodjo**

- LinkedIn : [linkedin.com/in/gael-ndibodjo](https://www.linkedin.com/in/gael-ndibodjo)
- GitHub : [github.com/gaelndb](https://github.com/gaelndb)
