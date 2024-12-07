import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const useCommandeStore = defineStore("commandeStore", {
  state: () => ({
    commandes: [],          // Liste des commandes
    detailsCommande: [],    // Détails d'une commande spécifique
  }),

  actions: {
    // Charger toutes les commandes
    async fetchCommandes() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get("http://localhost:3000/orders", {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.commandes = response.data;
        return this.commandes;
      } catch (error) {
        console.error("Erreur lors du chargement des commandes :", error.message);
        throw error;
      }
    },

    // Charger une commande spécifique par ID, y compris ses détails
    async getCommandeById(id) {
      const authStore = useAuthStore();
      try {
        const response = await axios.get(`http://localhost:3000/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.detailsCommande = response.data.detailsCommande;
        return response.data; // If only details are needed
      } catch (error) {
        console.error('Erreur lors du chargement de la commande :', error.message);
        throw error;
      }
    },

    // Ajouter une nouvelle commande
    async addCommande(newCommande) {
      const authStore = useAuthStore();
      try {
        const response = await axios.post("http://localhost:3000/orders", newCommande, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });

        if (response.status === 204) {
          console.log("Commande ajoutée sans contenu de réponse.");
        } else if (response.status === 200 || response.status === 201) {
          await this.fetchCommandes(); // Rafraîchir la liste des commandes
        } else {
          throw new Error(`Erreur lors de l'ajout de la commande. Code: ${response.status}`);
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout de la commande :", error.message);
        throw error;
      }
    },
    async removeCommande(id) {
      const authStore = useAuthStore();
      try {
        const response = await axios.delete(`http://localhost:3000/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.commandes = this.commandes.filter(commande => commande.id !== id);
        this.errorMessage = null; // Reset error message if successful
        return response.data;
      } catch (error) {
        console.error('Erreur lors de la suppression de commande :', error.message);
        this.errorMessage = "Failed to delete the order.";
        throw error;
      }
    },

    // Mettre à jour une commande existante
    async updateCommande(id, updatedCommande) {
      const authStore = useAuthStore();
      try {
        const response = await axios.put(`http://localhost:3000/orders/${id}`, updatedCommande, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        if (response.status === 200) {
          console.log("Commande mise à jour avec succès.");
          return response.data;
        }
        throw new Error("Erreur lors de la mise à jour de la commande.");
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la commande :", error.message);
        throw error;
      }
    },
  },
});
