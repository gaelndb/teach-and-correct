# Documentation fonctionnelle — TeachAndCorrect

## 1. Présentation du produit

TeachAndCorrect est une application web destinée aux enseignants afin de les assister dans la correction des copies d’élèves.

L’objectif principal de l’application est de permettre à un enseignant d’importer une copie, d’obtenir une proposition de correction générée avec l’aide de l’intelligence artificielle, puis de vérifier et modifier cette correction avant sa validation définitive.

L’intelligence artificielle joue donc un rôle d’assistance : l’enseignant conserve le contrôle sur la correction finale.

L’application a également vocation à centraliser les informations liées aux classes, aux élèves, aux copies et aux résultats afin de faciliter leur consultation et leur suivi.

---

## 2. Objectifs fonctionnels

TeachAndCorrect poursuit plusieurs objectifs fonctionnels :

- réduire le temps consacré à la correction des copies ;
- proposer une première correction assistée par intelligence artificielle ;
- permettre à l’enseignant de vérifier et modifier les corrections proposées ;
- conserver l’enseignant comme décisionnaire final concernant la correction et la note ;
- permettre la consultation des copies des élèves avant et après correction ;
- centraliser les copies associées aux différents élèves ;
- organiser les élèves par classe ;
- faciliter le suivi des résultats des élèves ;
- permettre à l’enseignant de retrouver l’historique des copies et corrections ;
- fournir une interface permettant de consulter rapidement les informations importantes liées à ses classes et à ses élèves.

---

## 3. Utilisateurs concernés

### Enseignant

L’enseignant est actuellement l’utilisateur principal de TeachAndCorrect.

Il peut notamment :

- créer un compte ;
- se connecter à l’application ;
- accéder à son espace personnel ;
- consulter ses élèves ;
- gérer ses classes ;
- importer des copies ;
- consulter les copies avant correction ;
- consulter les propositions de correction ;
- modifier les corrections proposées ;
- valider une correction ;
- consulter les copies corrigées ;
- suivre les résultats des élèves.

D’autres types d’utilisateurs pourront éventuellement être ajoutés ultérieurement, mais ils ne font pas partie du périmètre fonctionnel actuel.

---

## 4. Parcours utilisateur

Plusieurs parcours utilisateur structurent le fonctionnement de TeachAndCorrect.

### 4.1 Création d’un compte

```text
Landing page
    ↓
Inscription
    ↓
Saisie des informations personnelles
    ↓
Validation des informations
    ↓
Création du compte enseignant
    ↓
Accès à l'application
```

L’enseignant renseigne les informations nécessaires à la création de son compte.

Les données saisies sont vérifiées avant la création du compte.

---

### 4.2 Connexion à l’application

```text
Page de connexion
    ↓
Saisie de l'adresse email et du mot de passe
    ↓
Vérification des identifiants
    ↓
Accès au dashboard
```

Si les informations saisies sont valides, l’enseignant accède à son espace personnel.

En cas d’identifiants incorrects, un message d’erreur est présenté à l’utilisateur.

---

### 4.3 Consultation des élèves

```text
Connexion
    ↓
Dashboard
    ↓
Liste des élèves
    ↓
Sélection d'un élève
    ↓
Consultation de ses informations et de ses copies
```

L’enseignant peut consulter les élèves associés à ses classes.

La page d’un élève doit permettre de retrouver les informations nécessaires à son suivi ainsi que ses différentes copies.

---

### 4.4 Import et correction d’une copie

```text
Connexion
    ↓
Dashboard
    ↓
Import d'une copie
    ↓
Association de la copie à un élève
    ↓
Analyse de la copie
    ↓
Génération d'une proposition de correction
    ↓
Consultation par l'enseignant
    ↓
Modification éventuelle
    ↓
Validation de la correction
    ↓
Enregistrement de la copie corrigée
```

Ce parcours constitue le cœur fonctionnel de TeachAndCorrect.

L’application doit permettre à l’enseignant de consulter la copie originale ainsi que la correction proposée.

La correction générée automatiquement n’est pas considérée comme définitive tant que l’enseignant ne l’a pas validée.

---

### 4.5 Consultation d’une copie corrigée

```text
Connexion
    ↓
Dashboard
    ↓
Sélection d'un élève
    ↓
Consultation des copies
    ↓
Sélection d'une copie
    ↓
Consultation de la version originale
    ↓
Consultation de la version corrigée
```

L’enseignant doit pouvoir retrouver les copies déjà traitées afin de comparer notamment la copie initiale avec sa version corrigée.

---

### 4.6 Validation d’une correction

```text
Consultation d'une proposition de correction
    ↓
Lecture des annotations proposées
    ↓
Modification ou suppression éventuelle
    ↓
Validation par l'enseignant
    ↓
Correction considérée comme définitive
```

L’enseignant garde le contrôle sur la décision finale.

Une correction proposée automatiquement doit pouvoir être modifiée avant validation.

---

## 5. Fonctionnalités

### 5.1 Inscription d’un enseignant

La fonctionnalité d’inscription permet à un nouvel enseignant de créer un compte TeachAndCorrect.

Les informations demandées comprennent notamment :

- le prénom ;
- le nom ;
- l’adresse email ;
- le mot de passe.

Les données sont validées avant la création du compte.

---

### 5.2 Connexion

L’enseignant peut se connecter à l’application en renseignant :

- son adresse email ;
- son mot de passe.

Les identifiants sont vérifiés avant l’accès à l’application.

---

### 5.3 Dashboard

Le dashboard constitue le point d’entrée principal de l’application après connexion.

Il a vocation à fournir une vue synthétique de l’activité de l’enseignant.

Il peut notamment permettre d’accéder rapidement :

- aux élèves ;
- aux classes ;
- aux copies ;
- aux dernières corrections ;
- aux résultats ;
- à l’import d’une nouvelle copie.

---

### 5.4 Gestion des élèves

L’application permet à l’enseignant de gérer les élèves associés à ses classes.

Les fonctionnalités prévues autour des élèves comprennent notamment :

- l’ajout d’un élève ;
- la consultation de la liste des élèves ;
- la consultation du profil d’un élève ;
- la consultation de ses copies ;
- la consultation de ses résultats.

---

### 5.5 Gestion des classes

Les enseignants peuvent organiser leurs élèves au sein de classes.

Une classe permet de regrouper plusieurs élèves afin de faciliter leur suivi.

Les relations entre enseignants, classes et élèves seront précisées dans le modèle fonctionnel et le modèle de données au fur et à mesure du développement.

---

### 5.6 Import d’une copie

L’enseignant peut importer une copie d’élève dans l’application.

La copie doit ensuite être associée à l’élève concerné.

L’import constitue le point de départ du processus de correction.

---

### 5.7 Analyse d’une copie

Après import, le contenu de la copie doit pouvoir être analysé afin de permettre la génération d’une proposition de correction.

L’analyse doit notamment permettre de récupérer les informations nécessaires au traitement de la copie.

---

### 5.8 Proposition de correction

À partir du contenu de la copie, TeachAndCorrect doit pouvoir générer une proposition de correction.

Cette proposition peut notamment comprendre :

- des annotations ;
- des commentaires ;
- des indications sur les erreurs ;
- une appréciation ;
- une proposition de note.

La proposition produite par l’application reste modifiable par l’enseignant.

---

### 5.9 Validation de la correction

Avant qu’une correction soit considérée comme définitive, l’enseignant doit pouvoir :

- consulter la proposition ;
- modifier une annotation ;
- supprimer une annotation ;
- ajouter ses propres remarques ;
- modifier éventuellement la note proposée ;
- valider le résultat final.

---

### 5.10 Consultation des copies

L’enseignant peut consulter les copies associées à un élève.

Pour chaque copie, l’objectif est de pouvoir retrouver :

- la copie originale ;
- la correction proposée ;
- la correction validée ;
- la note ;
- les commentaires associés.

Cette fonctionnalité permet notamment de consulter une copie avant et après correction.

---

## 6. Règles métier

Les règles métier suivantes ont été définies pour le fonctionnement de TeachAndCorrect.

### Comptes enseignants

- une adresse email ne peut être associée qu’à un seul compte enseignant ;
- les informations obligatoires doivent être valides avant la création d’un compte ;
- un enseignant doit utiliser des identifiants valides pour accéder à son espace.

### Classes et élèves

- un enseignant peut gérer plusieurs classes ;
- une classe peut contenir plusieurs élèves ;
- un élève peut être lié à plusieurs enseignants selon son organisation scolaire ;
- les relations exactes entre enseignants, classes et élèves seront représentées de manière à permettre ce fonctionnement.

### Copies

- une copie doit être associée à un élève ;
- un élève peut posséder plusieurs copies ;
- une copie doit rester consultable après sa correction ;
- la version originale d’une copie ne doit pas être remplacée par sa version corrigée.

### Corrections

- une proposition générée automatiquement n’est jamais considérée comme définitive sans validation de l’enseignant ;
- l’enseignant peut modifier les éléments proposés par l’intelligence artificielle ;
- l’enseignant peut supprimer une annotation proposée ;
- l’enseignant peut ajouter ses propres commentaires ;
- la note finale reste sous le contrôle de l’enseignant ;
- une correction validée doit être associée à la copie correspondante.

---

## 7. Validation des données et erreurs fonctionnelles

L’application vérifie les informations saisies afin d’éviter l’enregistrement de données incorrectes.

### Inscription

Des validations sont notamment appliquées sur :

- le prénom ;
- le nom ;
- l’adresse email ;
- le mot de passe.

Le prénom et le nom doivent respecter les contraintes de longueur définies par l’application.

L’adresse email doit respecter le format attendu.

Le mot de passe doit respecter les contraintes définies pour la création d’un compte.

### Adresse email déjà utilisée

Si un enseignant tente de créer un compte avec une adresse email déjà associée à un autre compte, l’inscription est refusée et un message approprié est affiché.

### Connexion

Si l’adresse email ou le mot de passe est incorrect, l’utilisateur ne peut pas accéder à l’application.

### Erreurs de saisie

Lorsqu’un champ contient une valeur invalide ou ne respecte pas les contraintes attendues, l’utilisateur reçoit un message lui permettant d’identifier le problème.

---

## 8. Données fonctionnelles principales

TeachAndCorrect manipule plusieurs objets métier principaux.

### Enseignant

Représente l’utilisateur principal de l’application.

Il possède notamment :

- une identité ;
- une adresse email ;
- un compte permettant d’accéder à l’application ;
- des classes ;
- des élèves associés à ses classes.

### Classe

Représente un groupe d’élèves suivi par un enseignant.

Une classe permet d’organiser et de retrouver les élèves concernés.

### Élève

Représente un élève dont les copies et les résultats peuvent être suivis dans l’application.

Un élève peut être associé à plusieurs copies.

### Copie

Représente un travail remis par un élève.

Elle contient ou référence notamment :

- le document original ;
- l’élève concerné ;
- les informations liées au devoir ;
- la correction associée ;
- éventuellement une note.

### Correction

Représente la correction associée à une copie.

Elle peut contenir :

- des annotations ;
- des commentaires ;
- une appréciation ;
- une note proposée ;
- une version modifiée et validée par l’enseignant.

---

## 9. Périmètre fonctionnel

TeachAndCorrect est développé progressivement.

La priorité fonctionnelle est donnée au parcours principal :

```text
Enseignant
    ↓
Import d'une copie
    ↓
Analyse
    ↓
Proposition de correction
    ↓
Modification
    ↓
Validation
    ↓
Consultation de la copie corrigée
```

Les fonctionnalités complémentaires de gestion des classes, des élèves, des résultats et du dashboard servent principalement à organiser et retrouver les données produites par ce parcours.

Le cœur du produit reste la correction de copies assistée par intelligence artificielle sous le contrôle de l’enseignant.

---

## 10. Évolutions fonctionnelles

La documentation fonctionnelle sera enrichie progressivement avec l’évolution de l’application.

Les prochaines évolutions pourront notamment concerner :

- la gestion complète des classes ;
- la gestion complète des élèves ;
- l’association des copies aux élèves ;
- l’analyse réelle du contenu des copies ;
- la génération des corrections ;
- l’ajout d’annotations directement sur les copies ;
- la validation et l’enregistrement des corrections ;
- la consultation de l’historique des copies ;
- le suivi des résultats des élèves ;
- l’enrichissement des informations présentées dans le dashboard.

Cette documentation sera mise à jour au fur et à mesure de la mise en œuvre de ces fonctionnalités.
