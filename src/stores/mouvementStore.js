import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './authStore';

export const useMouvementStore = defineStore('mouvements', {
  state: () => ({
    mouvements: [],
    produits: [],
    utilisateurs: [],
  }),
  actions: {
    // Load all movements from API
    async loadDataFromApi() {
      const authStore = useAuthStore();
      try {
        const resp = await axios.get('http://localhost:3000/movements', {
          headers: {
            Authorization: `Bearer ${authStore.token}`, // Adding token to header
          },
        });
        this.mouvements = resp.data;
      } catch (error) {
        console.error('Erreur lors du chargement des mouvements:', error.response || error.message);
        this.mouvements = [];
      }
    },

    // Load a specific movement by its ID
    async loadMouvementById(id) {
      const authStore = useAuthStore();
      try {
        const response = await axios.get(`http://localhost:3000/movements/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        
        this.mouvement = response.data;
        return this.mouvement;
      } catch (error) {
        console.error('Erreur lors du chargement du mouvement:', error.message);
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
   
   

  
  },
});
