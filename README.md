# Blog d'Actualités

![Version](https://img.shields.io/badge/version-0.0.1-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

Un blog d'actualités moderne développé avec React, TypeScript et Vite. Cette application présente des articles sur divers sujets comme la santé, l'éducation, la finance, le sport, la culture et la politique.

## 🌐 Demo

Visitez le site en ligne : [https://posts-seven-red.vercel.app/](https://posts-seven-red.vercel.app/)

## ✨ Fonctionnalités

- **Interface utilisateur moderne** avec Tailwind CSS
- **Navigation fluide** entre les différentes pages
- **Affichage des articles** par catégories
- **Système de commentaires** sur les articles
- **Optimisation SEO** pour un meilleur référencement
- **Progressive Web App (PWA)** pour une expérience mobile améliorée
- **Mode hors ligne** grâce au Service Worker

## 🚀 Technologies utilisées

- **Frontend**: React 19, TypeScript
- **Routage**: React Router v7
- **Styles**: Tailwind CSS
- **Build tool**: Vite
- **Icônes**: React Icons
- **Déploiement**: Vercel

## 🛠️ Installation

1. Clonez ce dépôt

   ```bash
   git clone https://github.com/votre-nom/nouveaublog.git
   cd nouveaublog
   ```

2. Installez les dépendances

   ```bash
   npm install
   ```

3. Lancez le serveur de développement

   ```bash
   npm run dev
   ```

4. Ouvrez votre navigateur à l'adresse [http://localhost:5173](http://localhost:5173)

## 📦 Build pour la production

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist`.

## 🧪 Structure du projet

```
├── public/              # Ressources statiques
│   ├── robots.txt       # Configuration pour les robots d'indexation
│   ├── sitemap.xml      # Plan du site pour le SEO
│   ├── manifest.json    # Manifest pour PWA
│   └── service-worker.js # Service Worker pour le mode hors ligne
├── src/
│   ├── api/            # Données et API
│   ├── components/      # Composants réutilisables
│   ├── pages/          # Pages de l'application
│   ├── App.tsx         # Composant principal
│   └── main.tsx        # Point d'entrée
└── index.html          # Template HTML
```

## 📱 Fonctionnalités PWA

Cette application est configurée comme une Progressive Web App (PWA), ce qui permet :

- L'installation sur l'écran d'accueil des appareils mobiles
- Le fonctionnement hors ligne
- Des temps de chargement rapides

## 🔍 SEO

L'application est optimisée pour les moteurs de recherche avec :

- Des balises meta appropriées
- Un sitemap.xml
- Un fichier robots.txt
- Des balises Open Graph pour les partages sociaux

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

---

Développé avec ❤️ par [Elhalj](https://github.com/elhalj)
