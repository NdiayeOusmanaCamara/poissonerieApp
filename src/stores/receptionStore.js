import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const useReceptionStore = defineStore("reception", {
  state: () => ({
    receptions: [],
    tokenUserActif: localStorage.getItem("token"),
  }),
  actions: {
    async fetchreceptions() {
      // console.log("TOKEN FROM reception :",this.tokenUserActif);
      try {
        const response = await axios.get("http://localhost:3000/receptions", {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
        });

        this.receptions = response.data;

        return this.receptions;
      } catch (error) {
        console.error(
          "Erreur lors du chargement des produits :",
          error.message
        );
        throw error;
      }
    },

    getreceptionById(receptionId) {
      return this.receptions.find((p) => p.id === receptionId);
    },
    async addreception(receptionData) {
      try {
        const response = await axios.post(
          "http://localhost:3000/receptions/",
          receptionData,
          {
            headers: {
              Authorization: `Bearer ${this.tokenUserActif}`,
            },
          }
        );
        this.receptions.push(response.data);
      } catch (error) {
        console.error("Erreur lors de l’ajout du produit:", error);
      }
    },
    async updatereception(receptionId, receptionData) {
      console.log(receptionId);

      console.log("TOKEN FROM reception :", this.tokenUserActif);
      try {
        const response = await axios.put(
          `http://localhost:3000/receptions/${receptionId}`,
          receptionData,
          {
            headers: {
              Authorization: `Bearer ${this.tokenUserActif}`,
            },
          }
        );
        const index = this.receptions.findIndex(
          (reception) => reception.id === receptionId
        );
        if (index !== -1) this.receptions[index] = response.data;
      } catch (error) {
        console.error("Erreur lors de la mise à jour du produit:", error);
      }
    },
    async deletereception(receptionId) {
      try {
        await axios.delete(`http://localhost:3000/receptions/${receptionId}`, {
          headers: {
            Authorization: `Bearer ${this.tokenUserActif}`,
          },
        });
        this.receptions = this.receptions.filter(
          (reception) => reception.id !== receptionId
        );
      } catch (error) {
        console.error("Erreur lors de la suppression du produit:", error);
      }
    },
  },
});