<template>
    <div class="form-container d-flex align-items-center"></div>
    <div class="form-content">
      <router-link to="/dashboard/receptions" class="btn btn-secondary mb-3">
        <i class="fas fa-arrow-left"></i>
      </router-link>
      <form class="p-4 shadow-sm bg-white rounded w-50">
        <div v-if="reception" class="reception-details mt-4">
          <h2 class="text-center mb-4">Détails de la réception </h2>
          <p><strong>Reception ID:</strong> {{ reception.id }}</p>
          <p><strong>Date:</strong> {{ formatDate(reception.date) }}</p>
          
          <h2 class="text-center mb-4">Produits dans la réception </h2>
          <div v-if="reception.detailReceptions && reception.detailReceptions.length">

            <table class="table table-bordered">
              <thead>
                <tr>
                    <th>Produit</th>
                    <th>Quantité</th>
                    <th>Montant</th>
                   
                </tr>
              </thead>
              <tbody>
                <tr v-for="(detail, index) in reception.detailReceptions" :key="index">
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
  import { useReceptionStore } from '@stores/receptionStore';
  import { useProduitStore } from '@stores/produitStore';
  import { useUserStore } from '@stores/utilisateurStore';
  import moment from 'moment';
  
  const route = useRoute();
  const receptionStore = useReceptionStore();
  const produitStore = useProduitStore();
  const utilisateurStore = useUserStore();
  const reception = ref(null);
  const getProduitName = (produitId) => {
  const produit = produitStore.produits.find(p => p.id === produitId);
  return produit ? produit.nom : 'Produit inconnu';
};
  // Load data when component is mounted
  onMounted(async () => {
    await receptionStore.fetchReceptions();
    await produitStore.loadProduitsData();
    await utilisateurStore.loadUserData();
  
    reception.value = receptionStore.receptions.find(r => r.id === Number(route.params.id));
  });
  
  // Format the date
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
.rounded[data-v-0d26a737] {
  border-radius: 8px;
  margin: auto;
}
</style>