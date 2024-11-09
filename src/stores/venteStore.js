import { defineStore } from 'pinia';
import axios from 'axios';

export const useVenteStore = defineStore('ventes', {
  state: () => ({
    ventes: [],
    utilisateurs: [] // Ajout des utilisateurs dans l'état du store
  }),
  
  actions: {
    // Charge les ventes depuis l'API
    async loadDataFromApi() {
      try {
        const resp = await axios.get("http://localhost:3000/ventes");
        this.ventes = resp.data;
      } catch (error) {
        console.error("Erreur lors du chargement des ventes:", error);
      }
    },
    
    
    
    // Charge les utilisateurs depuis l'API
    async loadUtilisateurs() {
      try {
        const resp = await axios.get("http://localhost:3000/utilisateurs");
        this.utilisateurs = resp.data;
        return this.utilisateurs; // Retourne la liste des utilisateurs
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs:", error);
        return [];
      }
    },
    
    // Supprime une vente
    async deleteVente(id) {
      try {
        await axios.delete(`http://localhost:3000/ventes/${id}`);
        this.ventes = this.ventes.filter((vente) => vente.id !== id);
      } catch (error) {
        console.error("Erreur lors de la suppression de la vente:", error);
      }
    },
    
    // Ajoute une nouvelle vente
    
    async addVente(newVente) {
      try {
        const response = await axios.post('http://localhost:3000/ventes', newVente);
        // Ajouter la nouvelle vente dans le store local
        this.Ventes.push(response.data);
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la vente :', error);
      }
  }
}})
