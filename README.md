# EntreS3etWeTransfer

[Lien vers la documentation de l'API et des endpoints](./packages/api/README.md)

[Collection POSTMAN/Insomnia des endpoints](./documentation/es3ewt.postman_collection.json)

## Objectifs du Projet

Ce projet vise à créer une application de partage de fichiers avec les fonctionnalités suivantes :

- **Dockerisation complète de l'application**. ✅
- **Création d'un Makefile** et d'une base de données d'initialisation pour le conteneur Docker de la base de données. ✅
- **Création d'un compte utilisateur** et **connexion à la webapp**. ✅
- **Téléversement de fichiers**. ✅
- **Consultation des fichiers**. ✅
- **Gestion des métadonnées associées** aux fichiers. ✅
- **Suppression de fichiers**. ✅
- **Mise en place d'un quota de téléversement maximal de 2 Go par utilisateur**. ✅
- **Génération de liens de partage temporaires (1h) et publics** pour les fichiers. ✅
- **Création d'un frontend** pour interagir avec le service. ✅
- **Documentation complète du projet**. ✅

| ![Interface dashboard](https://github.com/user-attachments/assets/e4b78157-839e-40a7-914d-014bedb98d49) | ![Interface share](https://github.com/user-attachments/assets/d27744c4-914d-42c1-8e8c-0d2e92b49dcd) |
| :-----------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: |

## Technologies Utilisées

### Global

![Technologies globales](https://skillicons.dev/icons?i=docker,git,typescript)

### [Client](./packages/client/README.md)

![Technologies du frontend](https://skillicons.dev/icons?i=vite,react)

### [API](./packages/api/README.md)

![Technologies du backend](https://skillicons.dev/icons?i=nodejs,express)

### Base de données

![Base de données](https://skillicons.dev/icons?i=postgres,minio)

## Initialisation de l'Application en Local avec Docker

Pour exécuter l'application en local, suivez les étapes ci-dessous :

1. **Cloner le repository :**

   ```bash
   git clone https://github.com/LTOssian/es3ewt.git
   ```

2. **Naviguer dans le dossier du projet :**

   ```bash
   cd es3ewt
   ```

3. **Lancer les containers avec Docker et effectuer les migrations :**

   ```bash
   make start setup
   ```

4. **Accéder à l'application :**
   - Lien du Backend : [http://localhost:8080/](http://localhost:8080/)
   - Lien du Frontend : [http://localhost:5173/](http://localhost:5173/)

## Crédits

- [AlessGarau](https://github.com/AlessGarau)
- [LeBenjos](https://github.com/LeBenjos)
- [LTOssian](https://github.com/LTOssian)

---

## Documentation du Makefile

Le Makefile fournit des commandes pratiques pour gérer l'application.

### Commandes

- **start** : Lance les containers Docker en arrière-plan et construit les images si nécessaire.
- **stop** : Arrête et supprime les containers en cours d'exécution.
- **restart** : Redémarre les containers.
- **test-api** : Exécute les tests pour l'API.
- **migrate-up** : Applique les dernières migrations à la base de données.
- **migrate-down** : Annule la dernière migration.
- **migrate-create ${name}** : Crée une nouvelle migration avec le nom spécifié.
- **seed** : Exécute les scripts de peuplement pour la base de données.
- **setup** : Effectue les migrations et exécute les scripts de peuplement.

---

Pour toute question ou suggestion, n'hésitez pas à contacter les contributeurs listés ci-dessus. Merci de votre intérêt !
