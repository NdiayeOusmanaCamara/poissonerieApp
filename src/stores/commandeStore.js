import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const useCommandeStore = defineStore("commandeStore", {
  state: () => ({
    commandes: [], // Liste des commandes
    utilisateurs: [], // Liste des utilisateurs (clients)
    produits: [], // Liste des produits
    detailsOrder: [], // Détails d'une commande spécifique
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
        console.error("Erreur lors du chargement des commandes :", error.response?.data || error.message);
        throw error;
      }
    },

    // Charger une commande spécifique par ID
    async getCommandeById(id) {
      if (!id || isNaN(parseInt(id, 10))) {
        console.error("Invalid ID provided:", id);
        throw new Error("Invalid ID. Please provide a valid ID.");
      }
    
      const authStore = useAuthStore();
      try {
        const response = await axios.get(`http://localhost:3000/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.detailsOrder = response.data.detailsCommande;
        return response.data;
      } catch (error) {
        console.error("Erreur lors du chargement de la commande :", error.response?.data || error.message);
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
        if ([200, 201].includes(response.status)) {
          await this.fetchCommandes(); // Rafraîchir la liste
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout de la commande :", error.response?.data || error.message);
        throw error;
      }
    },

    // **Mettre à jour une commande existante**
    async updateCommande(id, updatedCommande) {
      const authStore = useAuthStore();
      try {
        // Validation locale
        if (!updatedCommande.nom || !updatedCommande.date || !updatedCommande.detailsOrder || !updatedCommande.detailsOrder.length) {
          throw new Error("Certaines informations obligatoires sont manquantes ou invalides.");
        }

        // Construction du payload
        const payload = {
          nom: updatedCommande.nom,
          date: updatedCommande.date,
          prix: parseFloat(updatedCommande.prix),
          detailsOrder: updatedCommande.detailsOrder.map(detail => ({
            produitId: detail.produitId,
            quantite: parseInt(detail.quantite, 10),
          })),
        };

        // Requête PUT pour mise à jour
        await axios.put(`http://localhost:3000/orders/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });

        await this.fetchCommandes(); // Rafraîchir la liste
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la commande :", error.response?.data || error.message);
        throw error;
      }
    },

    // Supprimer une commande
    async removeCommande(id) {
      const authStore = useAuthStore();
      try {
        await axios.delete(`http://localhost:3000/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        await this.fetchCommandes(); // Rafraîchir la liste
      } catch (error) {
        console.error("Erreur lors de la suppression de la commande :", error.response?.data || error.message);
        throw error;
      }
    },
  },

  persist: true, // Garder les données en mémoire après le rafraîchissement
});
