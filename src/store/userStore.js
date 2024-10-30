import axios from "axios";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [],
    currentUser: null,
    userForm: reactive({
      fullname: null,
      email: null,
      role: null,
      status: null,
    }),
    searchResults: [],
  }),
  actions: {
    // Charger tous les utilisateurs depuis l'API
    async loadDataFromApi() {
      try {
        const resp = await axios.get("http://localhost:3022/users");
        this.users = resp.data;
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs :", error);
        this.users = [];
      }
    },
    // Ajouter un nouvel utilisateur
    async store(user) {
      try {
        const resp = await axios.post("http://localhost:3022/users", user);
        await this.loadDataFromApi(); // Recharger la liste des utilisateurs
        return resp;
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", error);
      }
    },
    // Mettre à jour un utilisateur existant
    async update(id, user) {
      try {
        const resp = await axios.put(`http://localhost:3022/users/${id}`, user);
        await this.loadDataFromApi(); // Recharger la liste des utilisateurs
        return resp;
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      }
    },
    // Supprimer un utilisateur
    async destroy(id) {
      try {
        await axios.delete(`http://localhost:3022/users/${id}`);
        await this.loadDataFromApi(); // Recharger la liste des utilisateurs
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
      }
    },
    // Obtenir un utilisateur par ID
    async getById(id) {
      try {
        const resp = await axios.get(`http://localhost:3022/users/${id}`);
        return resp.data;
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      }
    },
    // Réinitialiser le formulaire utilisateur
    resetForm() {
      this.userForm.fullname = null;
      this.userForm.email = null;
      this.userForm.role = null;
      this.userForm.status = null;
    },
  },
});
