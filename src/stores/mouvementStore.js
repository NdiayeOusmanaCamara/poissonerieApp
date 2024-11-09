import { defineStore } from 'pinia';
import axios from 'axios';

export const useStockMovementStore = defineStore('stockMovements', {
  state: () => ({
    movements: [],
    produits: [],
    utilisateurs: [],
  }),
  
  actions: {
    async loadDataFromApi() {
      try {
        const response = await axios.get("http://localhost:3000/mouvements");
        this.movements = response.data;
      } catch (error) {
        console.error("Erreur lors du chargement des mouvements:", error);
      }
    },
    
    async loadUtilisateurs() {
      try {
        const response = await axios.get("http://localhost:3000/utilisateurs");
        this.utilisateurs = response.data;
        return this.utilisateurs;
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs:", error);
        return [];
      }
    },
    
    async deleteMovement(id) {
      try {
        await axios.delete(`http://localhost:3000/mouvements/${id}`);
        this.movements = this.movements.filter(movement => movement.id !== id);
      } catch (error) {
        console.error("Erreur lors de la suppression du mouvement:", error);
      }
    },

    async selectMovement(movement) {
      // Logic to select movement for editing/viewing can be implemented here
    },
  },
});
