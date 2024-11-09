import { defineStore } from 'pinia';
import axios from 'axios';

export const useProduitStore = defineStore('produits', {
  state: () => ({
    produits: [],
    utilisateurs: [] 
  }),
  
  actions: {
    // Récupérer le token JWT depuis le localStorage ou sessionStorage
    getToken() {
      return localStorage.getItem('token'); // ou sessionStorage.getItem('token')
    },
    async loadProduits() {
      try {
        const response = await fetch('http://localhost:3000/produits'); // Remplace par ton URL d'API ou autre source de données
        this.produits = await response.json();
      } catch (error) {
        console.error('Erreur lors du chargement des produits :', error);
      }
    },
    
  
    async loadDataFromApi() {
      try {
        const token = this.getToken(); // Récupérer le token JWT
        const resp = await axios.get("http://localhost:3000/produits", {
          headers: {
            Authorization: `Bearer ${token}` // Ajouter le token aux en-têtes
          }
        });
        
        this.produits = resp.data;
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
        this.produits = [];
      }
    },

    getProduit(id) {
      return this.produits.find(produit => produit.id === id);
    },

    async updatedProduit(id, updatedProduit) {
      try {
        const token = this.getToken(); // Récupérer le token JWT
        await axios.put(`http://localhost:3000/produits/${id}`, updatedProduit, {
          headers: {
            Authorization: `Bearer ${token}` // Ajouter le token aux en-têtes
          }
        });
        const index = this.produits.findIndex(produit => produit.id === id);
        if (index !== -1) {  
          this.produits[index] = updatedProduit;
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour du produit:", error);
      }
    },

    async loadUtilisateurs() {
      try {
        const token = this.getToken(); // Récupérer le token JWT
        const resp = await axios.get("http://localhost:3000/utilisateurs", {
          headers: {
            Authorization: `Bearer ${token}` // Ajouter le token aux en-têtes
          }
        });
        this.utilisateurs = resp.data;
        return this.utilisateurs; 
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs:", error);
        return [];
      }
    },

    async deleteProduit(id) {
      try {
        const token = this.getToken(); // Récupérer le token JWT
        await axios.delete(`http://localhost:3000/produits/${id}`, {
          headers: {
            Authorization: `Bearer ${token}` // Ajouter le token aux en-têtes
          }
        });
        this.produits = this.produits.filter((produit) => produit.id !== id);
      } catch (error) {
        console.error("Erreur lors de la suppression du produit:", error);
      }
    },

    async addProduit(newProduit) {
      try {
        const token = this.getToken(); // Récupérer le token JWT
        const response = await axios.post('http://localhost:3000/produits', newProduit, {
          headers: {
            Authorization: `Bearer ${token}` // Ajouter le token aux en-têtes
          }
        });
        console.log("Produit ajouté avec succès :", response.data);
        return response.data;
      } catch (error) {
        console.error("Erreur lors de l'ajout du produit :", error);
        throw error; // Lancer l'erreur pour la gérer plus haut
      }
    },
    async loadProduits() {
      try {
        const response = await fetch('http://localhost:3000/produits');  // Remplace avec ta source de données
        this.produits = await response.json();  // Met à jour les produits dans le store
      } catch (error) {
        console.error('Erreur lors du chargement des produits :', error);
      }
    },

    async deleteUtilisateur(id) {
      try {
        const token = this.getToken(); // Récupérer le token JWT
        await axios.delete(`http://localhost:3000/utilisateurs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}` // Ajouter le token aux en-têtes
          }
        });
        await this.loadDataFromApi();
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
      }
    },
  },
});
