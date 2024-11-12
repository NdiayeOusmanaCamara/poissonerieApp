

# Application de Gestion Commerciale pour les Poissonneries
Cette application est conçue pour aider les poissonneries à gérer leurs opérations commerciales quotidiennes de manière efficace. Elle inclut des fonctionnalités telles que la gestion des commandes, des réceptions, des ventes, des utilisateurs, des produits, des paiements, des inventaires, des livraisons, ainsi que des mouvements de stock. Chaque fonctionnalité est pensée pour simplifier et automatiser les processus de gestion afin de maximiser la productivité et l'exactitude des opérations.

# Fonctionnalités
## Gestion de l'authentification et de la sécurité

**Connexion** : Authentification sécurisée par mot de passe.
**Déconnexion** : Les utilisateurs peuvent se déconnecter du système en toute sécurité.


## Gestion des Commndes
**Ajouter des commandes** : Ajouter de nouvelles commandes avec des informations comme la date, le statut, le nom, et le prix.  
**Modification de commande** : Modifier les informations d'une commande existante (statut, montant, etc.).   
**Suppression de commande** : Supprimer une commande annulée.   
**Consulter de commande** : Consulter la liste et les détails des commandes.

## Gestion des réceptions
**Ajouter de réception**: Ajouter de nouvelles réceptions avec des informations telles que la date, la quantité reçue et le produit.   
**Modification de réception** : Modifier les informations d'une réception (date, quantité, etc.).      
**Suppression de réception** : Supprimer une réception annulée ou incorrecte.  
**Consulter de reception** : Consulter les réceptions avec détails du produit.

## Gestion des ventes
**Ajouter de vente**: Ajouter de nouvelles ventes avec des informations comme la date et le montant.    
**Suppression de vente** : Supprimer une vente annulée.   
**Consulter de vente** :Consulter la liste des ventes et leurs détails.

## Gestion des utilisateurs
**Ajouter de utilisateur**: Ajouter de nouveaux utilisateurs avec des informations telles que le nom d'utilisateur, l'email, le mot de passe, et le rôle.  
**Modification de utilisateur** :Modifier les informations d'un utilisateur (email, mot de passe, rôle, etc.).      
**Suppression de utilisateur** : Supprimer un utilisateur.    
**Consulter de utilisateur** : Consulter la liste des utilisateurs.


## Gestion des produits
**Ajouter de produit**: Ajouter de nouveaux produits avec des informations comme le nom, la catégorie, le prix, la quantité, la description et la date d’ajout.  
**Modification de produit** : Modifier les informations d'un produit (quantité, prix, catégorie, etc.).     
**Suppression de produit** : Supprimer un produit qui n'est plus en stock ou n'est plus pertinent.    
**Consulter de produit** : Consulter la liste des produits.

## Gestion des paiements
**Ajouter de paiement**: Ajouter de nouveaux paiements avec des informations comme la date, le montant, et le mode de paiement.  
**Modification de paiement** : Modifier les informations d'un paiement existant (montant, mode de paiement, etc.).    
**Suppression de paiement** : Supprimer un paiement.    
**Consulter de paiement** : Consulter la liste des paiements et leurs détails.

## Gestion des inventaires
**Ajouter de inventaire**: Ajouter de nouveaux inventaires avec des informations telles que la quantité, la date et le type.     
**Suppression de inventaire** : Supprimer un inventaire non pertinent ou épuisé.    
**Consulter de inventaire** :Consulter les inventaires existants avec des détails comme la quantité et le type.

## Gestion des livraisons
**Ajouter de livraison**: Ajouter de nouvelles livraisons avec des informations comme le nom, la date et le contact de livraison.      
**Suppression de livraison** :Supprimer une livraison.    
**Consulter de livraison** : Consulter les livraisons avec détails du contact et de la date.

## Gestion des mouvements de stock
**Consulter de mouvements de stock** : Consulter les mouvements de stock (entrées et sorties de produits à cause des achats, ventes, etc.).

## Prérequis
- Node.js
- Vue.js 3
- Pinia
- Bootstrap

## Installation
Clonez le projet et installez les dépendances :
```
git clone https://github.com/NdiayeOusmanaCamara/poissonerieApp.git
```

```
cd poissonerieApp
```

```
npm install
```

## Démarrer le projet

```
npm run dev 
```

## Utilisation d'Axios
L'application de gestion des poissonerie utilise Axios pour gérer la communication avec le serveur backend. Elle permet de récupérer, ajouter, modifier et supprimer des commandes, des produits, des receptions et des des paiement etc... en envoyant des requêtes HTTP.

## Autheur
[NdiayeOusmaneCamara](https://github.com/NdiayeOusmanaCamara)