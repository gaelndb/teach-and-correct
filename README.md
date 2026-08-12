# TeachAndCorrect

TeachAndCorrect est une application web de correction assistée par intelligence artificielle destinée aux enseignants.

L’objectif est de permettre à un professeur de transmettre une copie d’élève, d’obtenir une proposition de correction et de note, puis de vérifier et valider le résultat avant de le restituer à l’élève.

## État actuel du projet

Le projet est actuellement en cours de développement.

Fonctionnalités actuellement disponibles :

- landing page de présentation ;
- navigation vers un dashboard de démonstration ;
- ouverture d’une modale d’inscription ;
- validation basique du formulaire d’inscription :
  - champs obligatoires ;
  - vérification simple du format de l’adresse email ;
  - confirmation du mot de passe ;
- communication entre le frontend React et le backend Spring Boot ;
- création d’un compte enseignant ;
- persistance des données dans PostgreSQL ;
- exécution de PostgreSQL avec Docker Compose ;
- tests backend avec Testcontainers ;
- affichage de données fictives concernant les élèves et leurs résultats ;
- affichage d’une copie et d’une proposition de correction simulée.

Ne sont pas encore implémentés :

- authentification et autorisation sécurisées ;
- connexion réelle d’un enseignant avec vérification de ses identifiants ;
- gestion complète des sessions utilisateurs ;
- gestion réelle des classes et des élèves ;
- import réel des copies ;
- extraction du contenu des copies ;
- intégration d’un modèle d’intelligence artificielle ;
- génération réelle des corrections ;
- validation et persistance des corrections.

> Certaines données visibles dans le dashboard sont encore des données de démonstration. Les fonctionnalités sont remplacées progressivement par leur implémentation réelle au cours du développement du MVP.

## Aperçu

### Landing page

![Landing page](docs/screenshots/landing_page.png)

### Inscription

![Formulaire d'inscription](docs/screenshots/registration_modal.png)

### Dashboard professeur

![Dashboard professeur](docs/screenshots/dashboard_page.png)

### Proposition de correction

![Proposition de correction](docs/screenshots/correction-preview.png)

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

### Technologies prévues pour le MVP

- Spring Security pour l'authentification et les autorisations
- Une solution d'OCR ou un modèle multimodal pour analyser les copies
- Une API de modèle de langage pour générer une proposition de correction

> Les choix techniques pourront évoluer au cours du développement en fonction des besoins du MVP.

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
git clone https://github.com/gaelndb/TeachAndCorrect.git
cd TeachAndCorrect
```

## Lancer la base de données

Depuis la racine du projet :

```bash
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

## API

### Créer un compte enseignant

```http
POST /api/auth/register
```

Endpoint local :

```text
http://localhost:8080/api/auth/register
```

Cet endpoint permet actuellement de créer un compte enseignant.

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

## Roadmap du MVP

- [x] Créer la structure du monorepo
- [x] Mettre en place le frontend React
- [x] Mettre en place le backend Spring Boot
- [x] Créer la landing page
- [x] Créer la modale d'inscription
- [x] Ajouter une validation frontend basique
- [x] Créer une première interface de dashboard
- [x] Connecter le frontend à l'API Spring Boot
- [x] Ajouter PostgreSQL
- [x] Configurer PostgreSQL avec Docker Compose
- [x] Permettre la création d'un compte enseignant
- [x] Ajouter des tests backend avec Testcontainers
- [ ] Mettre en place une authentification sécurisée
- [ ] Permettre la connexion réelle d'un enseignant
- [ ] Gérer les classes et les élèves
- [ ] Permettre l'import d'une copie
- [ ] Extraire le contenu d'une copie
- [ ] Générer une proposition de correction avec un modèle d'IA
- [ ] Permettre au professeur de modifier et valider la correction
- [ ] Enregistrer les devoirs, les copies et les résultats
- [ ] Compléter la couverture des tests automatisés
- [ ] Conteneuriser les autres composants de l'application si nécessaire
- [ ] Déployer une première version du MVP

## Vision du produit

TeachAndCorrect a pour objectif d'assister les enseignants dans la correction des copies tout en conservant leur contrôle sur la décision finale.

L'intelligence artificielle doit proposer une correction, une appréciation et éventuellement une note, mais ces éléments doivent rester modifiables et être validés par le professeur avant d'être considérés comme définitifs.

Le projet vise également à permettre aux enseignants de centraliser leurs classes, leurs élèves, leurs devoirs, les copies corrigées et certaines statistiques de suivi.

## Documentation

La documentation complémentaire du projet est disponible dans le dossier [`docs/`](docs/).

Elle pourra notamment contenir :

- la documentation fonctionnelle ;
- la documentation technique ;
- les règles métier ;
- les diagrammes d'architecture ;
- le modèle de données ;
- les captures d'écran de l'application.

## Auteur

**Gaël Ndibodjo**

- LinkedIn : [linkedin.com/in/gael-ndibodjo](https://www.linkedin.com/in/gael-ndibodjo)
- GitHub : [github.com/gaelndb](https://github.com/gaelndb)
