# order management-console-App

## Description

Cette application console est conçue pour gérer les commandes d'achat, les paiements, les clients et les produits associés. Elle offre une interface en ligne de commande permettant de suivre les commandes, gérer les détails des produits, traiter les paiements, et tenir à jour les informations des clients. L'utilisateur interagit avec le programme via des instructions saisies dans la console, permettant ainsi une gestion efficace des données.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (version 12 ou supérieure)
- [MySQL](https://dev.mysql.com/downloads/mysql/) (version 5.7 ou supérieure)

Suivez ces étapes pour configurer le projet sur votre machine locale :

1. **Clonez le repository :**

   ```bash
   git clone https://github.com/Zoubeir7/order-management.git
   ```

2. **Accédez au dossier du projet :**

   ```bash
   cd order-management
   ```
   ```bash
   npm install
   ```

4. **Configuration de la base de données :**

- Connexion en administrateur : "mysql -u root -p";

- Dans le fichier "/assets/script.sql", toutes les commandes pour la création de la base de données, son utilisation et la création des tables.
- Dans le fichier **/config/db.js**:

Remplacer vos identifiants dans la partie suivante, pour connecter l'application à votre base de données :

```bash
    user: "user_name",
    password: "password",
    database: "database_name"
```

## Utilisation

Pour démarrer l'application, exécutez la commande suivante :

```bash
  npm start
```

## Les modules et Fonctionnalités

- **customerModule**

  - Créer, lire, mettre à jour et supprimer des clients.

- **orderModule**

  - Créer, lire, mettre à jour et supprimer des commandes avec ses details.

- **productModule**

  - Créer, lire, mettre à jour et supprimer des produits.

- **paymentModule**
  - Créer, lire, mettre à jour et supprimer des payements.

## Auteur

[Zoubeir Ba](https://github.com/Zoubeir7)
