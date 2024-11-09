import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: null,
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post("http://localhost:3000/api/login", { email, password });
        const { accessToken, user } = response.data;

        this.isAuthenticated = true;
        this.token = accessToken;
        this.user = user;
        localStorage.setItem('authToken', accessToken);

        // Ajout de l'authentification dans les headers d'axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      } catch (error) {
        this.isAuthenticated = false;
        this.token = null;
        this.user = null;
        throw new Error(error.response?.data?.error || 'Login failed');
      }
    },

    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
      localStorage.removeItem("authToken");
      delete axios.defaults.headers.common["Authorization"];
    },

    checkAuth() {
      const token = localStorage.getItem("authToken");
      if (token) {
        this.isAuthenticated = true;
        this.token = token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        this.isAuthenticated = false;
      }
    },
  },
});
