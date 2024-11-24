<template>
  <div class="form-container d-flex align-items-center"></div>
  <div class="form-content">
    <router-link to="/dashboard/ventes" class="btn btn-secondary mb-3">
      <i class="fas fa-arrow-left"></i>
    </router-link>
    <form class="p-4 shadow-sm bg-white rounded w-50">
      <div v-if="vente" class="vente-details mt-4">
        <h2 class="text-center mb-4">Détails de la Vente</h2>
        <p><strong>Date:</strong> {{ formatDate(vente.date) }}</p>
        <p><strong>Montant Total:</strong> {{ vente.montant }} €</p>
        <h2 class="text-center mb-4">Produits de la Vente</h2>
        <div v-if="vente.detailVentes && vente.detailVentes.length">
          <h5>Produits dans la vente :</h5>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(detail, index) in vente.detailVentes" :key="index">
                <td>{{ getProduitName(detail.produitId) }}</td>
                <td>{{ detail.quantite }}</td>
                <td>{{ detail.prix }} €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useVenteStore } from '@stores/venteStore'; // New store for 'Vente'
import { useProduitStore } from '@stores/produitStore';
import { useUserStore } from '@stores/utilisateurStore';
import moment from 'moment';

const route = useRoute();
const venteStore = useVenteStore();
const produitStore = useProduitStore();
const utilisateurStore = useUserStore();
const vente = ref(null);

// Chargement des données de la vente en fonction de l'ID de la route
onMounted(async () => {
  await venteStore.fetchVentes(); // Fetching 'Ventes' instead of 'Commandes'
  await produitStore.loadProduitsData();
  await utilisateurStore.loadUserData();

  vente.value = venteStore.ventes.find(v => v.id === Number(route.params.id));
});
const getProduitName = (produitId) => {
  const produit = produitStore.produits.find(p => p.id === produitId);
  return produit ? produit.nom : 'Produit inconnu';
};
// Méthodes utilitaires
const formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD');
};
</script>

<style scoped>
.rounded[data-v-db82e79a] {
  border-radius: 8px;
  margin: auto;
}
.form-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-content {
  flex: 1;
}

.form-control {
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid #ced4da;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: none;
}

.btn {

  font-weight: 600;
  margin-left: 363px;
}

.btn:hover {
  background-color: #1abc9c;
}

h2 {
  color: #343a40;
  font-weight: bold;
}

.shadow-sm {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.bg-white {
  background-color: white;
}
.rounded[data-v-374408ce] {
  border-radius: 8px;

  margin: auto;
}
.rounded {
  border-radius: 8px;
}
</style>