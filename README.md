# INF1007-projet

## Description

Projet de fin de session pour le cours INF1007

## Auteurs

- Luc Allaire
- Raouf Guessim
- Julien Boisvert
- Alexis Young
- Trystan Piette

## Setup Docker en production

1. Cloner le docker-compose.yml
2. Changer les variables d'environnement dans celui-ci pour les valeurs désirées
3. Exécuter le docker-compose

```bash
docker-compose up -d
```

## Setup Docker en développement

1. Cloner le repo
2. Commencer le docker de la bd

```bash
docker-compose -f docker-compose.dev.yml up -d
```

3. Installer les dépendances pour le backend et le frontend

```bash
cd backend
yarn install
cd ../frontend
yarn install
```

4. Démarrer le backend

```bash
cd backend
yarn start:dev
```

5. Démarrer le frontend

```bash
cd ../frontend
yarn start:dev
```

6. Le site web est accessible à l'adresse [http://localhost:4200](http://localhost:4200)
