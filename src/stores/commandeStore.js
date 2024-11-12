import { defineStore } from 'pinia';
import axios from 'axios';

export const useCommandeStore = defineStore('commandes', {
  state: () => ({
    commandes: [],       // Liste des commandes
    produits: [],         // Liste des produits
    utilisateurs: []      // Liste des utilisateurs
  }),

  actions: {
    // Charger toutes les commandes depuis l'API
    async loadDataFromApi() {
      try {
        const token = localStorage.getItem('jwtToken');
        const resp = await axios.get('http://localhost:3000/commandes', {
          headers: {
            Authorization: `Bearer ${token}` // Ajouter le token à l'en-tête
          }
        });
        this.commandes = resp.data;
      } catch (error) {
        console.error('Erreur lors du chargement des commandes :', error.response || error.message);
        this.inventaires = [];
    }
  },
      // Charger tous les utilisateurs depuis l'API
    async loadUtilisateurs() {
      try {
        const token = localStorage.getItem('jwtToken');
        const resp = await axios.get('http://localhost:3000/utilisateurs', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.utilisateurs = resp.data;
        return this.utilisateurs;
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs :', error.response || error.message);
        return [];
      }
    },
    
    // Charger tous les produits depuis l'API
    async loadProduits() {
      try {
        const token = localStorage.getItem('jwtToken');
        const resp = await axios.get('http://localhost:3000/produits', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.produits = resp.data;
        return this.produits;
      } catch (error) {
        console.error('Erreur lors du chargement des produits :', error.response || error.message);
        return [];
      }
    },


    
    // Ajouter une nouvelle commande
    async addCommande(newCommande) {
      try {
        const response = await axios.post('http://localhost:3000/commandes', newCommande);
        this.commandes.push(response.data);  // Ajouter la nouvelle commande à la liste
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la commande :', error);
      }
    },

    // Mettre à jour une commande existante
    async updateCommande(id, updatedCommande) {
      try {
        await axios.put(`http://localhost:3000/commandes/${id}`, updatedCommande);
        await this.loadDataFromApi(); // Recharger les commandes après la mise à jour
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la commande :", error);
      }
    },

    // Supprimer une commande
    async deleteCommande(id) {
      try {
        await axios.delete(`http://localhost:3000/commandes/${id}`);
        this.commandes = this.commandes.filter((commande) => commande.id !== id);  // Mise à jour de la liste
      } catch (error) {
        console.error("Erreur lors de la suppression de la commande :", error);
      }
    }
  }
});
