Here’s a cleaned-up version of the documentation for the **EntreS3etWeTransfer API**, including possible HTTP status codes for each route:

# EntreS3etWeTransfer API

Bienvenue sur l'API de [EntreS3etWeTransfer](https://github.com/LTOssian/EntreS3etWeTransfer).  
Cette API Node.js utilise Express et a été développée en TypeScript. Elle est connectée à une base de données PostgreSQL hébergée sur [MinIO](https://min.io/). L'application est conçue pour gérer les téléchargements et le partage de fichiers de manière sécurisée et efficace.

Pour une expérience utilisateur complète, l'API est intégrée à un [frontend](../client/README.md).

## Technologies

### Backend

![backend](https://skillicons.dev/icons?i=nodejs,express)

### Base de données

![database](https://skillicons.dev/icons?i=postgres,aws)

## Routes

| Routes                                      | Méthode | Données attendues                                    | Données retournées           | Explication                                                                                     |
|---------------------------------------------|---------|------------------------------------------------------|-------------------------------|-------------------------------------------------------------------------------------------------|
| `/auth/login`                               | POST    | `{ "username": "Louisan", "password": "abcdefg" }` | `{ "token": "string" }`      | Authentifie un utilisateur et retourne un jeton dans le cookie du receveur.                   |
|                                             |         |                                                      | **Status Codes**: 201, 404   |                                                                                                 |
| `/auth/register`                            | POST    | `{ "username": "Louisan", "password": "abcdefg" }` | -                             | Enregistre un nouvel utilisateur et le prépare à se connecter.                                 |
|                                             |         |                                                      | **Status Codes**: 201, 401   |                                                                                                 |
| `/files/`                                   | POST    | Form Data avec un fichier                            | -                             | Télécharge un fichier et retourne son identifiant pour un accès futur.                         |
|                                             |         |                                                      | **Status Codes**: 201, 401   |                                                                                                 |
| `/files/:fileId`                            | GET     | -                                                    | `{ id, user_id, name, path, size, lastUpdate }` | Récupère les détails d'un fichier spécifique identifié par son ID.                              |
|                                             |         |                                                      | **Status Codes**: 200, 404, 401 |                                                                                                 |
| `/files/me/all`                             | GET     | -                                                    | `[ ...file, share: { isShared, link } ]` | Récupère tous les fichiers appartenant à l'utilisateur authentifié.                             |
|                                             |         |                                                      | **Status Codes**: 200, 401   |                                                                                                 |
| `/files/:fileId`                            | DELETE  | -                                                    | -                             | Supprime le fichier spécifié par son ID de la base de données.                                 |
|                                             |         |                                                      | **Status Codes**: 204, 404   |                                                                                                 |
| `/files/:fileId`                            | PATCH   | `{ "name": "Nouveau Nom" }`                         | -                             | Met à jour le nom du fichier spécifié par l'ID.                                               |
|                                             |         |                                                      | **Status Codes**: 200        |                                                                                                 |
| `/links/shared/:linkId`                     | POST    | -                                                    | -                             | Permet de télécharger un fichier partagé via un lien unique.                                   |
|                                             |         |                                                      | **Status Codes**: 200, 404   |                                                                                                 |
| `/links/:fileId`                            | POST    | -                                                    | `{ "link": "string" }`      | Crée un lien partageable pour le fichier spécifié, permettant à d'autres utilisateurs d'y accéder. |
|                                             |         |                                                      | **Status Codes**: 201, 404, 401 |                                                                                                 |
| `/links/shared/:linkId`                     | GET     | -                                                    | `{ sharedBy, name, size }`   | Récupère les informations détaillées sur un lien partagé.                                      |
|                                             |         |                                                      | **Status Codes**: 200, 404, 401 |                                                                                                 |
| `/user/limit`                               | GET     | -                                                    | `{ "limit": number }`       | Récupère les limites de stockage et de partage de l'utilisateur authentifié.                    |
|                                             |         |                                                      | **Status Codes**: 200, 401   |                                                                                                 |

## Crédits

- [AlessGarau](https://github.com/AlessGarau)
- [LeBenjos](https://github.com/LeBenjos)
- [LTOssian](https://github.com/LTOssian)

---

### Remarques
- Toutes les requêtes nécessitant un jeton d'authentification doivent inclure une paire clé/valeur dans le cookie `token/{token}`.
- Les réponses des endpoints incluent des objets JSON, où les données retournées peuvent varier selon l'opération réalisée.
