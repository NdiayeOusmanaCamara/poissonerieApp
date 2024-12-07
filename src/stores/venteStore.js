import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const useVenteStore = defineStore("venteStore", {
  state: () => ({
    ventes: [], // Liste des ventes
    utilisateurs: [], // Liste des utilisateurs (clients)
    produits: [], // Liste des produits
    detailsVente: [], // Détails d'une vente spécifique
  }),

  actions: {
    // Charger toutes les ventes
    async fetchVentes() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get("http://localhost:3000/sale", {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.ventes = response.data;
        return this.ventes;
      } catch (error) {
        console.error("Erreur lors du chargement des ventes :", error.response?.data || error.message);
        throw error;
      }
    },

    // Charger une vente spécifique par ID
    async getVenteById(id) {
      // if (!id || isNaN(parseInt(id, 10))) {
      //   console.error("Invalid ID provided:", id);
      //   throw new Error("Invalid ID. Please provide a valid ID.");
      // }

      const authStore = useAuthStore();
      try {
        const response = await axios.get(`http://localhost:3000/sale/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.detailsVente = response.data.detailVentes;
        return response.data;
      } catch (error) {
        console.error("Erreur lors du chargement de la vente :", error.response?.data || error.message);
        throw error;
      }
    },

    // Ajouter une nouvelle vente
    async addVente(newVente) {
      const authStore = useAuthStore();
      try {
        const response = await axios.post("http://localhost:3000/sale", newVente, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        if ([200, 201].includes(response.status)) {
          await this.fetchVentes(); // Rafraîchir la liste
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout de la vente :", error.response?.data || error.message);
        throw error;
      }
    },

    // Mettre à jour une vente existante
    async updateVente(id, updatedVente) {
      const authStore = useAuthStore();
      try {
        // Validation locale
        if (!updatedVente.montant || !updatedVente.date || !updatedVente.detailsVente || !updatedVente.detailsVente.length) {
          throw new Error("Certaines informations obligatoires sont manquantes ou invalides.");
        }

        // Construction du payload
        const payload = {
          montant: parseFloat(updatedVente.montant),
          date: updatedVente.date,
          detailsVente: updatedVente.detailsVente.map(detail => ({
            produitId: detail.produitId,
            quantite: parseInt(detail.quantite, 10),
            prix: parseFloat(detail.prix),
          })),
        };

        // Requête PUT pour mise à jour
        await axios.put(`http://localhost:3000/sale/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });

        await this.fetchVentes(); // Rafraîchir la liste
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la vente :", error.response?.data || error.message);
        throw error;
      }
    },

    // Supprimer une vente
    async removeVente(id) {
      const authStore = useAuthStore();
      try {
        await axios.delete(`http://localhost:3000/sale/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        await this.fetchVentes(); // Rafraîchir la liste
      } catch (error) {
        console.error("Erreur lors de la suppression de la vente :", error.response?.data || error.message);
        throw error;
      }
    },
  },

  persist: true, // Garder les données en mémoire après le rafraîchissement
});
