<template>
  <div class="form-container d-flex align-items-center">
  <div class="form-content">
    <router-link to="/dashboard/livraisons" class="btn btn-secondary mb-3">
      <i class="fas fa-arrow-left"></i>
    </router-link>
    <form class="p-4 shadow-sm bg-white rounded w-100">
      <div v-if="livraison" class="livraison-details mt-4">
        <h2 class="text-center mb-4">Détails de la Livraison</h2>
        <p><strong>Nom de la livraison:</strong> {{ livraison.nom }}</p>
        <p><strong>Contact:</strong> {{ livraison.contact }}</p>
        <p><strong>Date:</strong> {{ formatDate(livraison.date) }}</p>

        <h2 class="text-center mb-4">Détails des Commandes Livrés</h2>
        <div v-if="livraison.detailLivraisons && livraison.detailLivraisons.length">
          <table class="table table-bordered">
            <thead>
              <tr>
                
                <th>commande</th>
                <th>Status</th>
            
              </tr>
            </thead>
            <tbody>
              <tr v-for="(detail, index) in livraison.detailLivraisons" :key="index">
                <td>{{  getCommandeName(detail.commandeId) }}</td>
                <td>{{ detail.status }}</td>
                
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </form>
  </div></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useLivraisonStore } from '@stores/livraisonStore'; 
import { useCommandeStore } from '@stores/commandeStore';
import moment from 'moment';

const route = useRoute();
const livraisonStore = useLivraisonStore();
const livraison = ref(null);
const commandeStore = useCommandeStore();
// Chargement des données de la livraison en fonction de l'ID de la route
onMounted(async () => {
  await livraisonStore.fetchLivraisons();  
  await commandeStore.fetchCommandes();   
 

  livraison.value = livraisonStore.livraisons.find(l => l.id === Number(route.params.id));
});
const getCommandeName = (commandeId) => {
  const commande = commandeStore.commandes.find(c => c.id === commandeId);
  return commande ? commande.nom : 'commande inconnu';
};

// Méthodes utilitaires
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
</style>
