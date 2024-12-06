# WebSocket Chat Application

Ce projet est une application de chat en temps réel construite avec **Angular** pour le frontend et **Node.js** pour le backend. Il utilise WebSocket via **Socket.IO** pour permettre la communication en temps réel entre plusieurs utilisateurs.

---

## Table des Matières
1. [Prérequis](#prérequis)
2. [Structure du Projet](#structure-du-projet)
3. [Installation](#installation)
4. [Lancement du Projet](#lancement-du-projet)
5. [Fonctionnalités](#fonctionnalités)
6. [Résolution des Problèmes](#résolution-des-problèmes)
7. [Améliorations Futures](#améliorations-futures)

---

## Prérequis

Pour exécuter ce projet, assurez-vous d'avoir :
1. **Node.js** (version 14 ou supérieure) installé. [Télécharger Node.js](https://nodejs.org)
2. **Angular CLI** installé globalement :
   ```bash
   npm install -g @angular/cli
   ```
3. Un éditeur de code comme **VS Code** (facultatif mais recommandé).

---

## Structure du Projet

```
websocketF/
├── client/          # Frontend (Angular)
│   ├── src/
│   │   ├── app/
│   │   │   ├── chat/
│   │   │   │   ├── chat.component.ts    # Logique du composant Chat
│   │   │   │   ├── chat.component.html  # Template HTML du Chat
│   │   │   │   ├── chat.component.css   # Styles CSS du Chat
│   │   │   ├── app.component.ts         # Composant principal
│   │   │   ├── app.component.html       # Template principal
│   │   │   ├── app.component.css        # Styles principaux
│   │   │   ├── services/
│   │   │   │   ├── websocket.service.ts # Service WebSocket
│   ├── angular.json                     # Configuration Angular
│   ├── package.json                     # Dépendances Angular
├── server/          # Backend (Node.js)
│   ├── server.js                       # Serveur WebSocket
│   ├── package.json                    # Dépendances Node.js
```

---

## Installation

### Étape 1 : Cloner le projet
```bash
git clone <repository-url>
cd websocketF
```

### Étape 2 : Installer les dépendances

#### a) Installation côté Client
1. Naviguez dans le dossier `client` :
   ```bash
   cd client
   ```
2. Installez les dépendances Angular :
   ```bash
   npm install
   ```

#### b) Installation côté Serveur
1. Naviguez dans le dossier `server` :
   ```bash
   cd ../server
   ```
2. Installez les dépendances Node.js :
   ```bash
   npm install
   ```

---

## Lancement du Projet

### Étape 1 : Lancer le serveur WebSocket
1. Naviguez dans le dossier `server` :
   ```bash
   cd server
   ```
2. Lancez le serveur Node.js :
   ```bash
   node server.js
   ```
3. Par défaut, le serveur écoute sur `http://localhost:3000`. Vous devriez voir ce message :
   ```
   Serveur WebSocket en écoute sur http://localhost:3000
   ```

---

### Étape 2 : Lancer le client Angular
1. Ouvrez un nouveau terminal et naviguez dans le dossier `client` :
   ```bash
   cd client
   ```
2. Démarrez l'application Angular :
   ```bash
   ng serve
   ```
3. Par défaut, l'application est accessible sur `http://localhost:4200`.

---

### Étape 3 : Tester l'Application
1. Ouvrez plusieurs onglets ou navigateurs sur `http://localhost:4200`.
2. Tapez un message dans l'un des onglets et envoyez-le. Le message devrait apparaître instantanément dans tous les onglets connectés.

---

## Fonctionnalités

1. **Affichage des messages en temps réel** :
   - Les messages envoyés par un utilisateur sont immédiatement visibles pour tous les utilisateurs connectés.

2. **Interface utilisateur basique mais fonctionnelle** :
   - Champ de saisie pour taper des messages.
   - Liste des messages affichés dynamiquement.

3. **Architecture modulaire** :
   - Séparation claire entre le frontend (Angular) et le backend (Node.js).

---

## Résolution des Problèmes

### Problème 1 : `ng serve` ou `node server.js` ne fonctionne pas
- Assurez-vous que les dépendances sont correctement installées dans leurs répertoires respectifs (`client` et `server`).
  ```bash
  npm install
  ```

### Problème 2 : Problème de CORS (Cross-Origin Resource Sharing)
- Si le client Angular ne peut pas se connecter au serveur Node.js, vérifiez que le middleware `cors` est bien activé dans `server.js` :
  ```javascript
  const cors = require('cors');
  app.use(cors({
    origin: 'http://localhost:4200'
  }));
  ```

### Problème 3 : `socket.io` ne fonctionne pas
- Assurez-vous que la bibliothèque `socket.io-client` est installée côté Angular :
  ```bash
  npm install socket.io-client
  ```

---

## Dépendances

### Côté Client (Angular)
- **@angular/core** : Framework Angular.
- **@angular/forms** : Pour gérer les formulaires et le binding (ngModel).
- **socket.io-client** : Pour connecter Angular au serveur WebSocket.

### Côté Serveur (Node.js)
- **express** : Framework pour le serveur HTTP.
- **socket.io** : Bibliothèque pour gérer les connexions WebSocket.
- **cors** : Middleware pour gérer les restrictions cross-origin.

---

## Améliorations Futures
1. **Identifiants utilisateurs** :
   - Associer chaque message à l'utilisateur qui l'a envoyé.
2. **Gestion des connexions et déconnexions** :
   - Notifier quand un utilisateur rejoint ou quitte la session.
3. **Amélioration de l'interface utilisateur** :
   - Ajouter des styles CSS modernes et des animations.

---

## Auteur
Créé par **[Votre Nom]**.

---

## Licence
Ce projet est sous licence **MIT**.
```

