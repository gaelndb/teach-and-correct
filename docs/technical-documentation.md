# Documentation technique — TeachAndCorrect

## 1. Présentation technique

TeachAndCorrect est une application web destinée à assister les enseignants dans la correction de copies d’élèves.

L’objectif de l’application est de permettre à un enseignant d’importer une copie, de faire analyser son contenu par un système d’intelligence artificielle et d’obtenir une proposition de correction directement annotée sur la copie.

L’enseignant conserve le contrôle sur la correction finale : les annotations proposées doivent pouvoir être vérifiées et modifiées avant validation.

L’application repose sur trois briques principales :

- un frontend développé avec React et TypeScript ;
- une API REST développée avec Spring Boot ;
- une base de données PostgreSQL exécutée localement avec Docker.

---

## 2. Architecture générale

TeachAndCorrect sépare l’interface utilisateur, la logique applicative backend et la persistance des données.

```text
Utilisateur
    │
    ▼
Frontend React
    │
    │ Requêtes HTTP / JSON
    ▼
API REST Spring Boot
    │
    ▼
Services / logique applicative
    │
    ▼
Repositories JPA
    │
    ▼
PostgreSQL
```

Le frontend React gère l’affichage, les formulaires et les interactions utilisateur. Les opérations nécessitant un traitement backend sont envoyées à l’API avec Axios.

Le backend Spring Boot expose les endpoints REST, valide les données reçues, applique la logique applicative et utilise Spring Data JPA pour accéder à PostgreSQL.

### Exemple : inscription d’un enseignant

```text
Formulaire d'inscription React
        │
        │ POST /api/auth/register
        ▼
AuthController
        │
        ▼
AuthService
        │
        ▼
UserRepository
        │
        ▼
PostgreSQL
```

Le modèle de données est actuellement en cours de conception. Il devra notamment représenter les relations entre enseignants, classes, élèves et copies.

---

## 3. Structure du dépôt

Le dépôt est organisé en monorepo avec une séparation entre le frontend et le backend.

```text
TeachAndCorrect/
├── frontend/
├── backend/
├── docs/
├── docker-compose.yml
├── .env.example
└── README.md
```

### `frontend/`

Contient l’application React.

Principales responsabilités :

- interface utilisateur ;
- navigation entre les écrans ;
- gestion des formulaires ;
- validation côté client ;
- appels HTTP vers l’API backend.

Le code frontend est notamment organisé en :

```text
src/
├── api/
├── components/
├── lib/
├── mocks/
├── pages/
└── types/
```

### `backend/`

Contient l’application Spring Boot et l’API REST.

Le code backend est organisé par responsabilité :

```text
com.teachandcorrect.backend/
├── config/
├── controller/
├── dto/
├── entity/
├── exception/
├── repository/
├── service/
└── validation/
```

Cette organisation permet de séparer :

- l’exposition des endpoints HTTP ;
- la logique applicative ;
- l’accès aux données ;
- les objets échangés par l’API ;
- la configuration ;
- la validation ;
- la gestion des erreurs.

### `docs/`

Contient la documentation complémentaire du projet ainsi que les captures d’écran utilisées pour présenter l’application.

### `docker-compose.yml`

Décrit le service PostgreSQL utilisé pour l’environnement de développement local.

### `.env.example`

Fournit un modèle des variables d’environnement nécessaires au lancement local du projet sans exposer les valeurs locales réelles.

---

## 4. Technologies utilisées

### Frontend

- React 18
- TypeScript
- Vite
- Axios
- Tailwind CSS

### Backend

- Java 21
- Spring Boot 4.1.0
- Spring Web MVC
- Spring Data JPA
- Jakarta Bean Validation
- Maven

### Base de données

- PostgreSQL 16
- Hibernate via Spring Data JPA

### Tests

- JUnit 5
- Testcontainers 1.21.3

### Infrastructure locale

- Docker
- Docker Compose

### Documentation de l’API

- OpenAPI
- Swagger UI via `springdoc-openapi`

---

## 5. Configuration de l’environnement

Les informations propres à l’environnement local sont externalisées dans des variables d’environnement.

Le dépôt fournit un fichier `.env.example` contenant les variables attendues :

```env
POSTGRES_DB=teachandcorrect
POSTGRES_USER=change_me
POSTGRES_PASSWORD=change_me_strong_password
```

Après clonage du dépôt, le développeur crée son fichier `.env` à partir de ce modèle :

```bash
cp .env.example .env
```

Il doit ensuite remplacer les valeurs d’exemple par ses propres valeurs locales.

Le fichier `.env` est ignoré par Git, tandis que `.env.example` est versionné afin de documenter les variables nécessaires.

Le backend charge ces valeurs dans `application.properties` pour configurer la connexion à PostgreSQL.

Une URL de datasource personnalisée peut également être fournie avec `SPRING_DATASOURCE_URL`.

---

## 6. Lancement local

Les prérequis et les commandes de lancement sont centralisés dans le fichier principal [`README.md`](../README.md).

Il décrit notamment le lancement :

- de PostgreSQL avec Docker Compose ;
- du backend Spring Boot ;
- du frontend React ;
- des tests backend.

---

## 7. Backend et API REST

Le backend expose une API REST sous le préfixe `/api`.

Les endpoints sont regroupés par responsabilité dans des contrôleurs dédiés.

### Authentification

Le contrôleur `AuthController` expose actuellement :

```http
POST /api/auth/register
POST /api/auth/login
```

#### Inscription

`POST /api/auth/register` :

1. valide les données reçues ;
2. normalise l’adresse email ;
3. vérifie que l’adresse email n’existe pas déjà ;
4. hache le mot de passe avec BCrypt ;
5. enregistre l’utilisateur en base ;
6. renvoie les informations publiques du compte créé.

#### Connexion

`POST /api/auth/login` :

1. valide le format de la requête ;
2. normalise l’adresse email ;
3. recherche l’utilisateur dans PostgreSQL ;
4. compare le mot de passe fourni avec le hash BCrypt enregistré ;
5. renvoie les informations publiques de l’utilisateur lorsque les identifiants sont valides.

La réponse d’authentification contient :

```text
id
firstName
lastName
email
role
```

Le rôle actuellement défini est `TEACHER`.

### CORS

Le backend autorise actuellement les requêtes vers `/api/**` provenant du frontend de développement :

```text
http://localhost:5173
```

Les méthodes HTTP autorisées sont :

```text
GET, POST, PUT, PATCH, DELETE, OPTIONS
```

---

## 8. Documentation OpenAPI / Swagger UI

L’API est documentée avec OpenAPI et Swagger UI.

Lorsque le backend est lancé avec sa configuration par défaut, Swagger UI est accessible à l’adresse :

```text
http://localhost:8080/swagger-ui.html
```

La spécification OpenAPI brute est exposée sur :

```text
http://localhost:8080/v3/api-docs
```

La documentation interactive permet notamment de :

- consulter les endpoints disponibles ;
- visualiser les corps de requête attendus ;
- consulter les modèles de réponse ;
- tester directement les endpoints contre l’API locale.

---

## 9. Base de données et persistance

PostgreSQL est utilisé comme système de gestion de base de données relationnelle.

La persistance backend repose sur Spring Data JPA.

### Entité actuellement présente

L’entité `User` est persistée dans la table :

```text
users
```

Elle contient notamment :

- un identifiant technique ;
- le prénom ;
- le nom ;
- l’adresse email, unique ;
- le hash du mot de passe ;
- le rôle ;
- la date de création ;
- la date de dernière modification.

L’adresse email possède une contrainte d’unicité en base de données.

Hibernate est actuellement configuré avec :

```properties
spring.jpa.hibernate.ddl-auto=update
```

Le modèle de données évoluera avec l’ajout des entités nécessaires aux classes, élèves et copies.

### Pourquoi PostgreSQL ?

Le domaine de TeachAndCorrect contient des données structurées possédant des relations explicites entre elles : enseignants, classes, élèves et copies.

Une base relationnelle est adaptée à ce modèle car elle permet de représenter ces relations avec des clés primaires, des clés étrangères et des contraintes d’intégrité, tout en garantissant la cohérence des données.

---

## 10. Validation et sécurité des données

### Validation backend

Les objets reçus par l’API utilisent Jakarta Bean Validation.

Pour l’inscription, les contrôles comprennent notamment :

- prénom obligatoire, limité à 100 caractères ;
- nom obligatoire, limité à 100 caractères ;
- adresse email obligatoire, au format email et limitée à 253 caractères ;
- mot de passe d’au moins 8 caractères ;
- présence d’au moins une majuscule ;
- présence d’au moins une minuscule ;
- présence d’au moins un chiffre ;
- présence d’au moins un caractère spécial.

Une validation personnalisée contrôle également que le mot de passe ne dépasse pas la limite de 72 octets UTF-8 prise en charge par BCrypt.

### Validation frontend

Le frontend applique également des contrôles avant l’envoi des formulaires afin de fournir un retour utilisateur immédiat.

Ces contrôles comprennent notamment :

- présence des champs obligatoires ;
- longueur maximale du nom et du prénom ;
- longueur maximale de l’adresse email ;
- règles de robustesse du mot de passe ;
- confirmation identique au mot de passe saisi.

Les validations backend restent la référence pour les données acceptées par l’API.

### Stockage des mots de passe

Les mots de passe ne sont pas stockés en clair.

Ils sont hachés avec `BCryptPasswordEncoder` avant leur enregistrement dans PostgreSQL.

### État de l’authentification

La version actuelle vérifie les identifiants lors de la connexion et renvoie les informations publiques de l’utilisateur.

Le frontend conserve actuellement l’utilisateur connecté dans son état React pour naviguer vers le dashboard. Aucun mécanisme persistant de session ou de token n’est présent dans le code de cette version.

---

## 11. Gestion des erreurs

La gestion des exceptions backend est centralisée dans `GlobalExceptionHandler` avec `@RestControllerAdvice`.

Les erreurs retournées par l’API utilisent une structure commune :

```json
{
  "message": "Description de l'erreur"
}
```

Principaux cas actuellement gérés :

| Situation | Réponse HTTP |
| --- | --- |
| Données de requête invalides | `400 Bad Request` |
| Adresse email déjà utilisée | `409 Conflict` |
| Identifiants de connexion invalides | `401 Unauthorized` |
| Base PostgreSQL inaccessible | `503 Service Unavailable` |
| Autre erreur d’accès aux données | `500 Internal Server Error` |

Le backend détecte également le SQL State PostgreSQL `23505` afin d’identifier une violation de contrainte d’unicité.

Certaines erreurs techniques sont journalisées avec SLF4J :

- `WARN` pour les violations d’intégrité ;
- `ERROR` pour les problèmes de connexion à la base ;
- `ERROR` pour les erreurs inattendues d’accès aux données.

---

## 12. Tests backend

Les tests backend utilisent JUnit 5 et Testcontainers.

Le test actuellement présent démarre automatiquement un véritable conteneur PostgreSQL 16 :

```java
new PostgreSQLContainer<>("postgres:16")
```

Une base isolée nommée `teachandcorrect_test` est créée pour l’exécution du test.

Testcontainers fournit dynamiquement à Spring Boot :

- l’URL JDBC ;
- le nom d’utilisateur ;
- le mot de passe.

Le test `contextLoads()` vérifie que le contexte Spring Boot peut démarrer correctement avec cette instance PostgreSQL conteneurisée.

Il ne s’agit pas encore d’un test fonctionnel des endpoints métier.

Les tests se lancent depuis le dossier `backend` :

```bash
./mvnw test
```

Sous Windows :

```bash
mvnw.cmd test
```

Docker doit être installé et démarré. Il n’est pas nécessaire d’exécuter préalablement `docker compose up -d`, car Testcontainers démarre son propre conteneur PostgreSQL.

---

## 13. Frontend

Le frontend est développé avec React, TypeScript et Vite.

Les appels vers le backend sont centralisés dans un client Axios.

L’URL de base de l’API peut être configurée avec :

```text
VITE_API_BASE_URL
```

À défaut, le frontend utilise :

```text
http://localhost:8080/api
```

Les opérations d’inscription et de connexion sont regroupées dans `auth-api.ts`.

Le frontend transmet uniquement les données nécessaires au backend ; par exemple, le champ de confirmation du mot de passe est validé côté client mais n’est pas envoyé dans la requête d’inscription.

Certaines vues du dashboard utilisent encore des données de démonstration stockées dans `src/mocks/`. Elles servent à construire et valider l’interface pendant le développement des fonctionnalités backend correspondantes.

---

## 14. Choix techniques

### Spring Boot

Spring Boot fournit la structure principale du backend et permet de séparer clairement les contrôleurs, services, repositories, validations et configurations de l’application.

Il permet également d’intégrer les besoins actuels du projet avec Spring Web MVC, Spring Data JPA, Bean Validation et l’écosystème de tests Java.

### PostgreSQL

PostgreSQL a été choisi pour représenter un domaine composé de données structurées et fortement liées entre elles.

Le modèle relationnel permet de représenter explicitement les relations entre les futures entités du projet et d’appliquer des contraintes garantissant leur cohérence.

### Docker Compose

PostgreSQL est exécuté dans Docker pendant le développement afin de fournir un environnement local reproductible.

Cette approche limite les différences de configuration entre machines et évite de dépendre d’une installation PostgreSQL locale susceptible d’utiliser une version différente de celle attendue par le projet.

### Testcontainers

Testcontainers permet d’exécuter les tests contre une véritable instance PostgreSQL temporaire au lieu d’utiliser une base différente de celle du projet.

Cela réduit les écarts de comportement entre l’environnement de test et PostgreSQL.

### Séparation frontend / backend

Le frontend et le backend sont séparés afin de découpler l’interface utilisateur de l’API et de la logique de persistance.

Cette organisation permet aux deux parties d’évoluer indépendamment tout en communiquant au travers de contrats HTTP explicites.

---

## 15. Évolution de la documentation

Cette documentation est versionnée avec le code et doit évoluer en même temps que l’application.

Elle sera enrichie au fur et à mesure de l’ajout :

- des entités classes, élèves et copies ;
- des nouveaux endpoints REST ;
- des fonctionnalités de correction de copies ;
- des tests automatisés associés aux fonctionnalités métier ;
- des mécanismes de sécurité supplémentaires lorsque ceux-ci seront introduits.
