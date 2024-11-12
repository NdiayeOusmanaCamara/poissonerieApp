import { defineStore } from "pinia";
import axios from "axios";

export const usePaiementStore = defineStore("paiements", {
  state: () => ({
    paiements: [],
    commandes: [],
    utilisateurs: [],
    
  }),

  actions: {
    getToken() {
      return localStorage.getItem('token'); // ou sessionStorage.getItem('token')
    },
    async loadPaiements() {
      try {
        const response = await fetch('http://localhost:3000/paiements'); // Remplace par ton URL d'API ou autre source de données
        this.paiements = await response.json();
      } catch (error) {
        console.error('Erreur lors du chargement des paiements :', error);
      }
    },

    async loadDataFromApi() {
      try {
        const token = this.getToken(); // Récupérer le token JWT
        const resp = await axios.get("http://localhost:3000/paiements", {
          headers: {
            Authorization: `Bearer ${token}` // Ajouter le token aux en-têtes
          }
        });

        this.paiements = resp.data;
      } catch (error) {
        console.error("Erreur lors du chargement des paiements :", error);
        this.paiements = [];
      }
    },
    getPaiement(id) {
      return this.paiements.find(paiement => paiement.id === id);
    },
    async updatedPaiement(id, updatedPaiement) {
      try {
        const token = this.getToken(); // Récupérer le token JWT
        await axios.put(`http://localhost:3000/paiements/${id}`, updatedPaiement, {
          headers: {
            Authorization: `Bearer ${token}` // Ajouter le token aux en-têtes
          }
        });
        const index = this.paiements.findIndex(paiement => paiement.id === id);
        if (index !== -1) {  
          this.paiements[index] = updatedPaiement;
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour du produit:", error);
      }
    },
    
    async loadUtilisateurs() {
      try {
  
        const resp = await axios.get("http://localhost:3000/utilisateurs",);
        this.utilisateurs = resp.data;
        return this.utilisateurs; 
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs:", error);
        return [];
      }
    },
    
    async loadCommandes() {
      try {
        const token = this.getToken(); // Récupérer le token JWT
        const resp = await axios.get("http://localhost:3000/commandes", {
          headers: {
            Authorization: `Bearer ${token}` // Ajouter le token aux en-têtes
          }
        });
        this.commandes = resp.data;
        return this.commandes; 
      } catch (error) {
        console.error("Erreur lors du chargement des commandes:", error);
        return [];
      }
    },
    async deletePaiement(id) {
      try {
        const token = this.getToken(); // Récupérer le token JWT
        await axios.delete(`http://localhost:3000/paiements/${id}`, {
          headers: {
            Authorization: `Bearer ${token}` // Ajouter le token aux en-têtes
          }
        });
        this.paiements = this.paiements.filter((paiement) => paiement.id !== id);
      } catch (error) {
        console.error("Erreur lors de la suppression du paiement:", error);
      }
    },

    async addPaiement(newPaiement) {
      try {
        const token = this.getToken(); // Récupérer le token JWT
        const response = await axios.post('http://localhost:3000/paiements', newPaiement, {
          headers: {
            Authorization: `Bearer ${token}` // Ajouter le token aux en-têtes
          }
        });
        console.log("Paiement ajouté avec succès :", response.data);
        return response.data;
      } catch (error) {
        console.error("Erreur lors de l'ajout du paiement :", error);
        throw error; 
      }
    },
    async loadPaiements() {
      try {
        const response = await fetch('http://localhost:3000/paiements');  
        this.paiements = await response.json();  
      } catch (error) {
        console.error('Erreur lors du chargement des paiements :', error);
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

async deleteCommande(id) {
  try {
    const token = this.getToken(); // Récupérer le token JWT
    await axios.delete(`http://localhost:3000/commandes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}` // Ajouter le token aux en-têtes
      }
    });
    await this.loadDataFromApi();
  } catch (error) {
    console.error("Erreur lors de la suppression de commandes :", error);
  }
},
},
});