import { defineStore } from "pinia";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


export const useAuthStore = defineStore("authStore", {
  state: () => ({
    isAuthenticated: false,
    utilisateur: null,
    token: null,
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post("http://localhost:3000/auth/login", { email, password });
        const { accessToken, utilisateur } = response.data;

        this.isAuthenticated = true;
        this.token = accessToken;
        this.utilisateur = utilisateur;
        localStorage.setItem('authToken', accessToken);

        // Ajout de l'authentification dans les headers d'axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      } catch (error) {
        // Gestion spécifique des erreurs d'authentification
        if (error.response?.status === 401) {
          throw new Error('Email ou mot de passe incorrect.');
        } else {
          throw new Error(error.response?.data?.error || 'Erreur lors de l\'authentification.');
        }
      }
    },

    logout() {
      this.isAuthenticated = false;
      this.utilisateur = null;
      this.token = null;
      localStorage.removeItem("authToken");
      delete axios.defaults.headers.common["Authorization"];
    },

    checkAuth() {
      const token = localStorage.getItem("authToken");

      if (token) {
        // Décoder le token pour vérifier s'il est expiré
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convertir le temps en secondes

        if (decodedToken.exp > currentTime) {
          // Le token est valide, connecter l'utilisateur
          this.isAuthenticated = true;
          this.token = token;
          this.utilisateur = decodedToken;  // Si tu stockes des informations utilisateur dans le token
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          // Le token est expiré, déconnecter l'utilisateur
          this.logout();
        }
      } else {
        this.isAuthenticated = false;
      }
    },
  },
});
