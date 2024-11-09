import { defineStore } from 'pinia';
import axios from 'axios';

export const useLivraisonStore = defineStore('livraisons', {
  state: () => ({
    livraisons: [],
    produits: [],
    utilisateurs: []
  }),
  actions: {
    async loadDataFromApi() {
      try {
        const resp = await axios.get("http://localhost:3000/livraisons");
        this.livraisons = resp.data;
      } catch (error) {
        console.error("Erreur lors du chargement des livraisons:", error);
      }
    },
  
    async loadUtilisateurs() {
      try {
        const resp = await axios.get("http://localhost:3000/utilisateurs");
        this.utilisateurs = resp.data;
        return this.utilisateurs;  // Retourne la liste des utilisateurs
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs:", error);
        return [];
      }
    },

    async loadProduits() {
      try {
        const resp = await axios.get("http://localhost:3000/produits");
        this.produits = resp.data;
        return this.produits;  // Retourne la liste des produits
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
        return [];
      }
    },

    async addLivraison(newLivraison) {
      try {
        const response = await axios.post('http://localhost:3000/livraisons', newLivraison);
        this.livraisons.push(response.data);  // Ajoute la nouvelle livraison à la liste
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la livraison :', error);
        throw error;  // Relance l'erreur pour être gérée dans le composant Vue
      }
    },

    async deleteLivraison(id) {
      try {
        await axios.delete(`http://localhost:3000/livraisons/${id}`);
        this.livraisons = this.livraisons.filter((livraison) => livraison.id !== id);
      } catch (error) {
        console.error("Erreur lors de la suppression de la livraison:", error);
      }
    }
  }
});
