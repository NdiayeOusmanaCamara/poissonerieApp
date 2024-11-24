import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from "./authStore";
export const useProduitStore = defineStore('produitStore', {
  state: () => ({
    produits: [],
    produit: {}
  }),
  
  actions: {
    // Récupérer le token JWT depuis le localStorage ou sessionStorage
  
    async loadProduitsData() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get('http://localhost:3000/products', {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.produits = response.data;
        return this.produits;
      } catch (error) {
        console.error('Erreur lors du chargement des produits :', error.message);
      }
    },
    
    async loadProduitById(id) {
      const authStore = useAuthStore();
      try {
        const response = await axios.get(
          `http://localhost:3000/product/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          }
        );
        this.produit = response.data;
  
        return this.produits;
      } catch (error) {
        console.error(
          "Erreur lors du chargement de la produit :",
          error.message
        );
        throw error;
      }
    },

    async addProduit(newProduit) {
      const authStore = useAuthStore();
      try {
        const response = await axios.post(
            "http://localhost:3000/product",
            newProduit,
            {
              headers: {
                Authorization: `Bearer ${authStore.token}`
              }
            }
          );
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("L'ajout a échoué.");
        }
        await this.loadProduitsData(); // Corrected function name
      } catch (error) {
        console.error(
            "Erreur lors de l'ajout du produit :",
            error.response?.data || error.message
          );
        throw error;
      }
    },
    
          
    async updatedProduit(id, updatedProduit) {
      const authStore = useAuthStore();
      try {
        // Send the PUT request to update the product
        const response = await axios.put(`http://localhost:3000/product/${id}`, updatedProduit, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
    
        // Check if the update was successful, then reload the list of products
        if (response.status === 200 || response.status === 201) {
          await this.loadProduitsData();  // Update the product list
        } else {
          throw new Error('La mise à jour a échoué.');
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour du produit :', error.message);
        throw error;
      }
    },
    
  
    async removeProduit(id) {
      const authStore = useAuthStore();
      try {
        const response = await axios.delete(`http://localhost:3000/product/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.produits = this.produits.filter(produit => produit.id !== id);
        return response.data;
      } catch (error) {
        console.error('Erreur lors de la suppression du produit :', error.message);
        throw error;
      }
   }
   
},


});
