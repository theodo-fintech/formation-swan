
# Formation Commando SWAN
## ℹ️ Introduction


Ce module de formation est conçu pour permettre aux nouveaux arrivants de découvrir **SWAN**, une solution Banking-as-a-Service (BaaS) utilisée pour intégrer des services financiers dans des applications.

## 🎯 Objectifs:


- Ouvrir une SipioBanque en quelques clics
- Développer une api qui permet d’ouvrir un compte chez SipioBanque, de consulter son solde et de générer une carte
- Apprendre à utiliser le dashboard dev de SWAN


## 🤚🏽 Pré-requis


Avant de commencer ce module, tu dois  :

1. Connaître les bases de **TypeScript** et du **développement web**.
2. [About GraphQL](https://docs.swan.io/developers/graphql)

**Ressources utiles** :

- Documentation sur les endpoints et les concepts métier: https://docs.swan.io/welcome
- Outil pour construire et tester les Query et les Mutations facilement https://explorer.swan.io/
- Collection Postman à disposition dans le dashboard de dev

## 🛠️ Installation et Configuration


Installe les dépendances:
```bash
$ npm install
```
Ajoute les variables d'environnements:
```
SWAN_API_URL=https://api.swan.io/sandbox-partner
SWAN_CLIENT_ID=<A-RÉCUPÉRER-DANS-LE-TABLEAU-DE-BORD>
SWAN_CLIENT_SECRET=<A-RÉCUPÉRER-DANS-LE-TABLEAU-DE-BORD>
SWAN_ONBOARDING_CALLBACK_URL=<A-RÉCUPÉRER-DANS-LE-TABLEAU-DE-BORD>
SWAN_TOKEN_ENDPOINT=https://oauth.swan.io/oauth2/token
SWAN_AUTH_ENDPOINT=https://oauth.swan.io/oauth2/auth
```

Lance l'application:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```


