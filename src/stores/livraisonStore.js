import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const useLivraisonStore = defineStore("livraisonStore", {
  state: () => ({
    livraisons: [], // Liste des livraisons
    detailLivraisons: [], // Détails de livraison spécifiques
    commandes: [], // Liste des utilisateurs (clients)
  }),

  actions: {
    // Charger toutes les livraisons
    async fetchLivraisons() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get("http://localhost:3000/livraisons", {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.livraisons = response.data;
        return this.livraisons;
      } catch (error) {
        console.error("Erreur lors du chargement des livraisons :", error.response?.data || error.message);
        throw error;
      }
    },

    // Charger une livraison spécifique par ID
    async getLivraisonById(id) {
      if (!id || isNaN(parseInt(id, 10))) {
        console.error("Invalid ID provided:", id);
        throw new Error("Invalid ID. Please provide a valid ID.");
      }

      const authStore = useAuthStore();
      try {
        const response = await axios.get(`http://localhost:3000/livraisons/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.detailLivraisons = response.data.detailLivraisons;
        return response.data;
      } catch (error) {
        console.error("Erreur lors du chargement de la livraison :", error.response?.data || error.message);
        throw error;
      }
    },

    // Ajouter une nouvelle livraison
    async addLivraison(newLivraison) {
      const authStore = useAuthStore();
      try {
        const response = await axios.post("http://localhost:3000/livraisons", newLivraison, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        if ([200, 201].includes(response.status)) {
          await this.fetchLivraisons(); // Rafraîchir la liste
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout de la livraison :", error.response?.data || error.message);
        throw error;
      }
    },

    // Mettre à jour une livraison existante
    async updateLivraison(id, updatedLivraison) {
      const authStore = useAuthStore();
      try {
        if (!updatedLivraison.nom || !updatedLivraison.date || !updatedLivraison.detailLivraisons.length) {
          throw new Error("Certaines informations obligatoires sont manquantes ou invalides.");
        }

        const payload = {
          nom: updatedLivraison.nom,
          date: updatedLivraison.date,
          contact: updatedLivraison.contact,
          detailLivraisons: updatedLivraison.detailLivraisons.map(detail => ({
            commandeId: detail.commandeId,
            status: detail.status,
          })),
        };

        await axios.put(`http://localhost:3000/livraisons/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });

        await this.fetchLivraisons(); // Rafraîchir la liste
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la livraison :", error.response?.data || error.message);
        throw error;
      }
    },

    // Supprimer une livraison
    async removeLivraison(id) {
      const authStore = useAuthStore();
      try {
        await axios.delete(`http://localhost:3000/livraisons/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        await this.fetchLivraisons(); // Rafraîchir la liste
      } catch (error) {
        console.error("Erreur lors de la suppression de la livraison :", error.response?.data || error.message);
        throw error;
      }
    },
  },

  persist: true, // Garder les données en mémoire après le rafraîchissement
});
