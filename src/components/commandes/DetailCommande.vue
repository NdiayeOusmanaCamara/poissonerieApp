<template>
  <div class="form-container d-flex align-items-center">
    <div class="form-content">
      <router-link to="/dashboard/commandes" class="btn btn-secondary mb-3">
        <i class="fas fa-arrow-left"></i>
      </router-link>
      <form class="p-4 shadow-sm bg-white rounded w-100">
        <div v-if="commande" class="commande-details mt-4">
          <h2 class="text-center mb-4">Détails de la Commande</h2>
          <p><strong>Nom:</strong> {{ commande.nom }}</p>
          <p><strong>Date:</strong> {{ formatDate(commande.date) }}</p>
          <h2 class="text-center mb-4">Produits de la Commande</h2>
          <div v-if="commande.details && commande.details.length">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Status</th>
                  <th>Quantité</th>
                  <th>Montant</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(detail, index) in commande.details" :key="index">
                  <td>{{ getProduitName(detail.produitId) }}</td>
                  <td>{{ detail.status }}</td>
                  <td>{{ detail.quantite }} </td>
                  <td>{{ detail.prix }} €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCommandeStore } from '@stores/commandeStore';  // Store for 'Commande'
import { useProduitStore } from '@stores/produitStore';    // Store for 'Produit'
import moment from 'moment';

const route = useRoute();
const commandeStore = useCommandeStore();
const produitStore = useProduitStore();
const commande = ref(null);

// Fetching the 'Commande' and related 'DetailCommande' data based on the route ID
onMounted(async () => {
  await commandeStore.fetchCommandes(); // Fetch all 'Commandes'
  await produitStore.loadProduitsData(); // Load product data
  
  commande.value = commandeStore.commandes.find(c => c.id === Number(route.params.id));
});

// Helper function to get the product name by its ID
const getProduitName = (produitId) => {
  const produit = produitStore.produits.find(p => p.id === produitId);
  return produit ? produit.nom : 'Produit inconnu';
};

// Utility method to format date
const formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD');
};
</script>

<style scoped>
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

.rounded {
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f8f9fa;
}

table, th, td {
  border: 1px solid #ddd;
}
</style>
