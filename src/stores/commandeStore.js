import { defineStore } from 'pinia';
import axios from 'axios';

export const useCommandeStore = defineStore('commande', {
  state: () => ({
    commandes: [],
  }),

  actions: {
    // Charger toutes les commandes
    async fetchCommandes() {
      try {
        const response = await axios.get('http://localhost:3000/commandes');
        this.commandes = response.data;
        return this.commandes;
      } catch (error) {
        console.error('Erreur lors du chargement des commandes:', error.message);
        throw error;
      }
    },

    // Ajouter une commande
    async addCommande(newCommande) {
      try {
        const response = await axios.post('http://localhost:3000/commandes', newCommande);
        console.log('Réponse API ajout:', response.data);
        this.commandes.push(response.data); // Ajouter la nouvelle commande dans la liste
      } catch (error) {
        console.error('Erreur lors de l’ajout de la commande:', error.message);
        throw error;  // Capturer l'erreur pour le composant
      }
    },

    // Mettre à jour une commande
    async updateCommande(commandeId, commandeData) {
      try {
        const response = await axios.put(`http://localhost:3000/commandes/${commandeId}`, commandeData);
        const index = this.commandes.findIndex((commande) => commande.id === commandeId);
        if (index !== -1) this.commandes[index] = response.data;
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la commande:', error.message);
      }
    },

    // Supprimer une commande
    async deleteCommande(commandeId) {
      try {
        await axios.delete(`http://localhost:3000/commandes/${commandeId}`);
        this.commandes = this.commandes.filter((commande) => commande.id !== commandeId);
      } catch (error) {
        console.error('Erreur lors de la suppression de la commande:', error.message);
      }
    },
  },
});
