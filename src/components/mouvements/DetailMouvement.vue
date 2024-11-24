<template>
    <div class="form-container d-flex align-items-center" v-if="mouvementStore.mouvement && mouvementStore.mouvement.id">
      <div class="form-content">
        <router-link to="/dashboard/mouvements" class="btn btn-secondary mb-3">
          <i class="fas fa-arrow-left"></i>
        </router-link>
        <form class="p-4 shadow-sm bg-white rounded">
          <h2 class="text-center mb-4">Détails du Mouvement</h2>
          <div class="d-flex gap-2">
            <div class="w-100">
              <!-- Type de Mouvement -->
              <div class="form-group">
                <label for="type">Type de Mouvement</label>
                <input id="type" v-model="mouvementStore.mouvement.type" class="form-control" readonly />
              </div>
  
              <!-- Quantité -->
              <div class="form-group">
                <label for="quantite">Quantité</label>
                <input id="quantite" v-model="mouvementStore.mouvement.quantite" class="form-control" readonly />
              </div>
            </div>
          </div>
  
          <div class="d-flex gap-2">
            <div class="w-100">
              <!-- Produit ID -->
              <div class="form-group">
                <label for="produitId">ID Produit</label>
                <input id="produitId" v-model="mouvementStore.mouvement.produitId" class="form-control" readonly />
              </div>
  
              <!-- Utilisateur ID -->
            
            </div>
          </div>
  
          <!-- Date -->
          <div class="w-100">
            <div class="form-group">
              <label for="date">Date du Mouvement</label>
              <input type="date" id="date" v-model="formattedDate" class="form-control" readonly />
            </div>
          </div>
        </form>
      </div>
    </div>
    <p v-else>Chargement des détails du mouvement...</p>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useMouvementStore } from '@stores/mouvementStore';
  import { computed } from 'vue';
  
  const formattedDate = computed(() => {
    if (mouvementStore.mouvement && mouvementStore.mouvement.date) {
      return new Date(mouvementStore.mouvement.date).toISOString().split('T')[0];
    }
    return '';
  });
  
  const mouvementStore = useMouvementStore();
  const route = useRoute();
  
  onMounted(() => {
    const mouvementId = route.params.id;
    mouvementStore.loadMouvementById(mouvementId); // Charger les données du mouvement par ID
  });
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
  