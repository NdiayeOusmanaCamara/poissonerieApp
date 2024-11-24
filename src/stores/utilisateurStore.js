import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from './authStore'; 

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [],
    user: {
      nom: "",
      email: "",
      role: ""
    }
  }),

  actions: {
    async loadUserData() {
      const authStore = useAuthStore(); 
      try {
        const response = await axios.get("http://localhost:3000/user", {
          headers: {
            Authorization: `Bearer ${authStore.token}` 
          }
        });
        this.users = response.data;
      } catch (error) {
        console.error(
          "Erreur lors du chargement des utilisateurs :",
          error.message
        );
      }
    },
    
    async loadUserById(id) {
      const authStore = useAuthStore(); 
      try {
        const response = await axios.get(
          `http://localhost:3000/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authStore.token}` 
            }
          }
        );
        const userData = response.data;
        this.user = {
          nom: userData.nom,
          email: userData.email,
          role: userData.role
        };
        console.log("Données utilisateur récupérées:", this.user);
      } catch (error) {
        console.error(
          "Erreur lors du chargement de l'utilisateur :",
          error.message
        );
      }
    },

    async addUser(newUser) {
      const authStore = useAuthStore();
      try {
        const response = await axios.post(
          "http://localhost:3000/user",
          newUser,
          {
            headers: {
              Authorization: `Bearer ${authStore.token}` 
            }
          }
        );
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("L'ajout a échoué.");
        }
        await this.loadUserData();
      } catch (error) {
        console.error(
          "Erreur lors de l'ajout de l'utilisateur :",
          error.response?.data || error.message
        );
        throw error;
      }
    },    

    async updateUser(id, updatedUser) {
      const authStore = useAuthStore();
      try {
        const response = await axios.put(
          `http://localhost:3000/user/${id}`,
          updatedUser,
          {
            headers: {
              Authorization: `Bearer ${authStore.token}` 
            }
          }
        );

        if (response.status !== 200) {
          throw new Error("La mise à jour a échoué.");
        }

       await this.loadUserData();
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour de l'utilisateur :",
          error.message
        );
        throw error;
      }
    },

    async removeUser(id) {
      const authStore = useAuthStore();
      try {
        await axios.delete(`http://localhost:3000/user/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}` 
          }
        });
      await this.loadUserData();
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de l'utilisateur :",
          error.message
        );
        throw error;
      }
    }
  },

  persist: true
});
