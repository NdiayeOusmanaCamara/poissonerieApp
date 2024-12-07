<template>
  <div class="form-container d-flex align-items-center">
    <div class="form-content">
      <router-link to="/dashboard/commandes" class="btn btn-secondary mb-3">
        <i class="fas fa-arrow-left"></i>
      </router-link>
      <form class="p-4 shadow-sm bg-white rounded w-100">
        <div v-if="commande" class="commande-details mt-4">
          <h2 class="text-center mb-4">Détails de la Commande</h2>

          <!-- Affichage des détails de l'utilisateur -->
          <p><strong>Utilisateur :</strong> {{ commande.utilisateur?.nom || 'Utilisateur inconnu' }}</p>
          <p><strong>Commande ID :</strong> {{ commande.id }}</p>
          <p><strong>Date :</strong> {{ formatDate(commande.date) }}</p>

          <h2 class="text-center mb-4">Produits de la Commande</h2>
          <div v-if="commande.detailCommandes && commande.detailCommandes.length">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Quantité</th>
                  <th>Prix Unitaire</th>
                  <th>Prix total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(detail, index) in commande.detailCommandes" :key="index">
                  <td>{{ getProduitName(detail.produitId) }}</td>
                  <td>{{ detail.quantite }}</td>
                  <td>{{ detail.produit.prix }}</td>
                  <td>{{ detail.prix }} €</td>
                  
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Paiements de la commande -->
          <!-- <h2 class="text-center mb-4">Paiements</h2>
          <div v-if="commande.paiements && commande.paiements.length">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Date de Paiement</th>
                  <th>Montant</th>
                  <th>Méthode</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(paiement, index) in commande.paiements" :key="index">
                  <td>{{ formatDate(paiement.date) }}</td>
                  <td>{{ paiement.montant }} €</td>
                  <td>{{ paiement.methode }}</td>
                </tr>
              </tbody>
            </table>
          </div> -->

          <!-- Détails de la livraison -->
          <!-- <h2 class="text-center mb-4">Livraison</h2>
          <div v-if="commande.detailLivraisons && commande.detailLivraisons.length">
            <p><strong>Adresse de Livraison :</strong> {{ commande.detailLivraisons[0].adresse }}</p>
            <p><strong>Date de Livraison :</strong> {{ formatDate(commande.detailLivraisons[0].dateLivraison) }}</p>
          </div> -->
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

// Fetching the 'Commande' and related data based on the route ID
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
