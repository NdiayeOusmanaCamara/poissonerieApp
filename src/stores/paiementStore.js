import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from "./authStore";

export const usePaiementStore = defineStore('paiementStore', {
  state: () => ({
    paiements: [],
    commandes: [],
    paiement: {},
  }),
  
  actions: {
    async fetchCommandes() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get('http://localhost:3000/orders', {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.commandes = response.data;
        console.log("Commandes chargées :", this.commandes); // Ajoutez ce log pour vérifier les données
        return this.commandes;
      } catch (error) {
        console.error('Erreur lors du chargement des commandes :', error.message);
        throw error;
      }
    },
    
    // Récupérer le token JWT depuis le localStorage ou sessionStorage
    async loadPaiements() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get('http://localhost:3000/paiements', {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.paiements = response.data;
        return this.paiements;
      } catch (error) {
        console.error('Erreur lors du chargement des paiements :', error.message);
        throw error;
      }
    },
    
    async loadPaiementById(id) {
      const authStore = useAuthStore();
      try {
        const response = await axios.get(`http://localhost:3000/paiements/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.paiement = response.data;
        return this.paiement;
      } catch (error) {
        console.error('Erreur lors du chargement du paiement :', error.message);
        throw error;
      }
    },

    async addPaiement(newPaiement) {
      const authStore = useAuthStore();
      try {
        const response = await axios.post('http://localhost:3000/paiements', newPaiement, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("L'ajout a échoué.");
        }
        await this.loadPaiements(); // Reload the list of payments after adding
      } catch (error) {
        console.error("Erreur lors de l'ajout du paiement :", error.response?.data || error.message);
        throw error;
      }
    },

    async updatePaiement(id, updatedPaiement) {
      const authStore = useAuthStore();
      try {
        const response = await axios.put(`http://localhost:3000/paiements/${id}`, updatedPaiement, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        if (response.status === 200 || response.status === 201) {
          await this.loadPaiements(); // Reload the list of payments after updating
        } else {
          throw new Error('La mise à jour a échoué.');
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour du paiement :', error.message);
        throw error;
      }
    },

    async removePaiement(id) {
      const authStore = useAuthStore();
      try {
        const response = await axios.delete(`http://localhost:3000/paiements/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.paiements = this.paiements.filter(paiement => paiement.id !== id);
        return response.data;
      } catch (error) {
        console.error('Erreur lors de la suppression du paiement :', error.message);
        throw error;
      }
    },
  },
});
