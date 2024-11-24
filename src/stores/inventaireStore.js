import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from "./authStore";

export const useInventaireStore = defineStore('inventaires', {
  state: () => ({
    inventaires: [],
    produits: [],
   
  }),
  actions: {
    async loadDataFromApi() {
      const authStore = useAuthStore();
      try {
        
        const resp = await axios.get('http://localhost:3000/inventories', {
          headers: {
            Authorization: `Bearer ${authStore.token}` // Ajouter le token à l'en-tête
          }
        });
        this.inventaires = resp.data;
      } catch (error) {
        console.error('Erreur lors du chargement des inventaires:', error.response || error.message);
        this.inventaires = [];
      }
    },
    async loadInventaireById(id) {
      const authStore = useAuthStore();
      try {
        const response = await axios.get(`http://localhost:3000/inventories/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.inventaire = response.data;
        return this.inventaire;
      } catch (error) {
        console.error('Erreur lors du chargement du inventaire :', error.message);
        throw error;
      }
    },
  
    async loadProduitsData() {
      try {
        const auth = useAuthStore();
        const resp = await axios.get('http://localhost:3000/products', {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        });
        this.produits = resp.data;
        return this.produits;
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error.response || error.message);
        return [];
      }
    },
    
 
    async addInventaire(newInventaire) {
      const authStore = useAuthStore();
      try {
        const response = await axios.post('http://localhost:3000/inventories', newInventaire, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        this.inventaires.push(response.data);
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'inventaire:', error.response || error.message);
      }
    },
    async removeInventaire(id) {
      const authStore = useAuthStore();
      try {
        const response = await axios.delete(`http://localhost:3000/inventories/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.inventaires = this.inventaires.filter(inventaire => inventaire.id !== id);
        return response.data;
      } catch (error) {
        console.error('Erreur lors de la suppression d/inventaire :', error.message);
        throw error;
      }
   }
   
},


});
