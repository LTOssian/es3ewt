# EntreS3etWeTransfer

Bienvenue sur EntreS3etWeTransfer, un projet réalisé à HETIC.

**Les consignes étaient les suivantes :**

- Dockerisation de l'application. ✅
- Création d'un Makefile et d'une base de données d'initialisation pour le conteneur Docker de la base de données. ✅
- Capacité à créer un compte et à se connecter à la webapp. ✅
- Possibilité de téléverser des fichiers. (C) ✅
- Capacité à consulter les fichiers. (R) ✅
- Accès à la gestion des métadonnées associées. (U) ✅
- Possibilité de supprimer des fichiers. (D) ✅
- Mise en place d'un quota maximal de téléversement de 2 Go par utilisateur. ✅
- Capacité à générer un lien de partage temporaire et public pour un fichier ou un groupe de fichiers. ✅
- Création d'un frontend pour utiliser le service.
- Rédaction de la documentation. ✅

## Technologies

### Global

![global](https://skillicons.dev/icons?i=docker,git,typescript)

### [Client](./client/README.md)

![frontend](https://skillicons.dev/icons?i=vite,react)

### [API](./api/README.md)

![backend](https://skillicons.dev/icons?i=nodejs,express)

### Base de données

![database](https://skillicons.dev/icons?i=postgres,aws)

## Initialisation de l'application en local avec Docker

1. **Cloner le repository :**

```bash
git clone https://github.com/LTOssian/EntreS3etWeTransfer.git
```

2. **Ouvrer votre application Docker.**

3. **Ouvrer un terminal et naviguer jusqu'à la racine du projet.**

4. **Insérer la commande pour générer les modules, les .env, les images et lancer les conteneurs en local :**

```bash
make start
```

5. **Utiliser EntreS3etWeTransfer !**
   - Lien du Backend : <http://localhost:3000/>
   - Lien du Frontend : <http://localhost:5173/>

## Crédits

[AlessGarau](https://github.com/AlessGarau)  
[LeBenjos](https://github.com/LeBenjos)  
[LTOssian](https://github.com/LTOssian)
