# 📘 Next.js Prisma Simple CRUD

Une application CRUD simple construite avec Next.js (App Router), Prisma ORM et Shadcn UI.
L’objectif est de fournir une base claire et extensible pour démarrer rapidement un projet avec une architecture moderne.

---

## 🚀 Stack

- Next.js – Framework React fullstack

- Prisma – ORM moderne pour TypeScript

- SQLite – Base de données relationnelle

- Shadcn UI – Composants UI réutilisables basés sur Radix UI

---


## 📂 Fonctionnalités

- ✨ CRUD complet (Create, Read, Update, Delete) pour les utilisateurs

- ✅ Validation de formulaires avec Zod

- 🎨 UI moderne avec Shadcn

- 🔄 Gestion des états asynchrones avec useTransition

- 📦 Prisma pour l’accès à la base de données

## ⚙️ Installation

1. Cloner le projet
```bash
git clone https://github.com/Alexis-Gontier/nextjs-prisma-simple-crud
cd nextjs-prisma-simple-crud
```
2. Installer les dépendances
```bash
pnpm i
```
3. Configurer la base de données
Copie .env.example → .env et configure ton DATABASE_URL :
```env
DATABASE_URL="file:./dev.db"
```
4. Générer le client Prisma
```bash
pnpx prisma generate
```

## ▶️ Démarrer l’application
En mode développement :
```bash
pnpm dev
```
L’application sera disponible sur `http://localhost:3000`
