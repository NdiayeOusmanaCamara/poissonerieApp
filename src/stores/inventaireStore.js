import { defineStore } from 'pinia';
import axios from 'axios';

export const useInventaireStore = defineStore('inventaires', {
  state: () => ({
    inventaires: [],
    produits: [],
    utilisateurs: [],
  }),
  actions: {
    async loadDataFromApi() {
      try {
        const token = localStorage.getItem('jwtToken'); // Récupérer le token JWT
        const resp = await axios.get('http://localhost:3000/inventaires', {
          headers: {
            Authorization: `Bearer ${token}` // Ajouter le token à l'en-tête
          }
        });
        this.inventaires = resp.data;
      } catch (error) {
        console.error('Erreur lors du chargement des inventaires:', error.response || error.message);
        this.inventaires = [];
      }
    },
    
    async loadUtilisateurs() {
      try {
        const token = localStorage.getItem('jwtToken');
        const resp = await axios.get('http://localhost:3000/utilisateurs', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.utilisateurs = resp.data;
        return this.utilisateurs;
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error.response || error.message);
        return [];
      }
    },

    async loadProduits() {
      try {
        const token = localStorage.getItem('jwtToken');
        const resp = await axios.get('http://localhost:3000/produits', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.produits = resp.data;
        return this.produits;
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error.response || error.message);
        return [];
      }
    },
    
    async deleteInventaire(id) {
      try {
        const token = localStorage.getItem('jwtToken');
        await axios.delete(`http://localhost:3000/inventaires/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.inventaires = this.inventaires.filter((inventaire) => inventaire.id !== id);
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'inventaire:', error.response || error.message);
      }
    },
    
    async addInventaire(newInventaire) {
      try {
        const token = localStorage.getItem('jwtToken');
        console.log('Données envoyées :', newInventaire);
        const response = await axios.post('http://localhost:3000/inventaires', newInventaire, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.inventaires.push(response.data);
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'inventaire:', error.response || error.message);
      }
    }
  }
});
