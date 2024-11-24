import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const useReceptionStore = defineStore("receptionStore", {
  state: () => ({
    receptions: [],          // Liste des réception        // Liste des produits
    detailsReception: [],    // Détails d'une réception spécifique
  }),

  actions: {
    // Charger toutes les réceptions
    async fetchReceptions() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get("http://localhost:3000/receptions", {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.receptions = response.data;
        return this.receptions;
      } catch (error) {
        console.error("Erreur lors du chargement des réceptions :", error.message);
        throw error;
      }
    },

    // Charger une réception spécifique par ID, y compris ses détails
    async getReceptionById(id) {
      const authStore = useAuthStore();
      try {
        const response = await axios.get(`http://localhost:3000/receptions/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.detailsReception = response.data.detailReceptions;
        return response.data;
      } catch (error) {
        console.error('Erreur lors du chargement de la réception :', error.message);
        throw error;
      }
    },
    

    // Ajouter une nouvelle réception
    async addReception(newReception) {
      const authStore = useAuthStore();
      try {
        const response = await axios.post("http://localhost:3000/receptions", newReception, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });

        if (response.status === 204) {
          console.log("Réception ajoutée sans contenu de réponse.");
        } else if (response.status === 200 || response.status === 201) {
          await this.fetchReceptions(); // Rafraîchir la liste des réceptions
        } else {
          throw new Error("L'ajout de la réception a échoué.");
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout de la réception :", error.response?.data || error.message);
        throw error;
      }
    },

    // Mettre à jour une réception existante
    async updateReception(id, updatedReception) {
      const authStore = useAuthStore();
      try {
        await axios.put(`http://localhost:3000/receptions/${id}`, updatedReception, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        await this.fetchReceptions(); // Rafraîchir après la mise à jour
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la réception :", error.message);
        throw error;
      }
    },

    // Supprimer une réception
    async removeReception(id) {
      const authStore = useAuthStore();
      try {
        await axios.delete(`http://localhost:3000/receptions/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        await this.fetchReceptions(); // Rafraîchir après la suppression
      } catch (error) {
        console.error("Erreur lors de la suppression de la réception :", error.message);
        throw error;
      }
    },
  },

  // Persist pour maintenir les données après rafraîchissement
  persist: true,
});
