import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./authStore"; // Importer authStore pour l'utiliser dans userStore

export const useUserStore = defineStore("utilisateurs", {
  state: () => ({
    utilisateurs: [],
    tokenUtilisateurActif: localStorage.getItem("token") // Récupération du token dans le state
  }),
  
  actions: {
    // Configure axios pour inclure automatiquement le token dans les en-têtes
    setAuthHeader() {
      if (this.tokenUtilisateurActif) {
        axios.defaults.headers['Authorization'] = `Bearer ${this.tokenUtilisateurActif}`;
      }
    },
    async loadUtilisateurs() {
      try {
        const response = await fetch("http://localhost:3000/utilisateurs"); // Remplace par ton URL d'API ou autre source de données
        this.utilisateurs = await response.json();
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs :', error);
      }
    },
    // Charger les données des utilisateurs depuis l'API
    async loadDataFromApi() {
      try {
        this.setAuthHeader();  // Définir l'en-tête Authorization avant chaque requête
        const resp = await axios.get("http://localhost:3000/utilisateurs");
        this.utilisateurs = resp.data;
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs", error);
        this.utilisateurs = [];  // Réinitialiser les utilisateurs en cas d'erreur
      }
    },

    // Ajouter un utilisateur
    async addUtilisateur(utilisateur) {
      try {
        this.setAuthHeader();  // Définir l'en-tête Authorization avant chaque requête
        const response = await axios.post("http://localhost:3000/utilisateurs", utilisateur);
        return response;
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur", error);
        throw error; // Propage l'erreur pour gestion ultérieure
      }
    },

    // Récupérer un utilisateur par son ID
    getUtilisateur(id) {
      return this.utilisateurs.find(utilisateur => utilisateur.id === id);
    },
    

    // Mettre à jour un utilisateur
    async updatedUtilisateur(id, updatedUtilisateur) {
      try {
        this.setAuthHeader();  // Définir l'en-tête Authorization avant chaque requête
        await axios.put(`http://localhost:3000/utilisateurs/${id}`, updatedUtilisateur);
        // Mettre à jour l'utilisateur dans la liste
        const index = this.utilisateurs.findIndex(user => user.id === id);
        if (index !== -1) {
          this.utilisateurs[index] = updatedUtilisateur;
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur", error);
        throw error; // Propage l'erreur pour gestion ultérieure
      }
    },

    // Supprimer un utilisateur
    async deleteUtilisateur(id) {
      try {
        this.setAuthHeader();  // Définir l'en-tête Authorization avant chaque requête
        await axios.delete(`http://localhost:3000/utilisateurs/${id}`);
        await this.loadDataFromApi();  // Recharger les données après suppression
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur", error);
        throw error; // Propage l'erreur pour gestion ultérieure
      }
    },

    // Définir un nouveau token utilisateur actif
    setToken(token) {
      this.tokenUtilisateurActif = token;
      localStorage.setItem("token", token);  // Sauvegarder le token dans localStorage
      this.setAuthHeader();  // Mettre à jour l'en-tête d'autorisation
    },

    // Déconnexion de l'utilisateur (suppression du token)
    logout() {
      this.tokenUtilisateurActif = null;
      localStorage.removeItem("token");  // Supprimer le token de localStorage
      delete axios.defaults.headers['Authorization'];  // Supprimer l'en-tête Authorization
    }
  },
});
