<!-- Template -->
<template>
  <div class="form-container d-flex align-items-center" v-if="inventaireStore.inventaire && inventaireStore.inventaire.id">
    <div class="form-content">
      <router-link to="/dashboard/inventaires" class="btn btn-secondary mb-3">
        <i class="fas fa-arrow-left"></i>
      </router-link>
      <form class="p-4 shadow-sm bg-white rounded">
        <h2 class="text-center mb-4">Détails de l'inventaire</h2>
        <div class="d-flex gap-2">
          <div class="w-100">
            <!-- Stock -->
            <div class="form-group">
              <label for="stock">Stock</label>
              <input id="stock" v-model="inventaireStore.inventaire.stock" class="form-control" readonly />
            </div>
            
            <!-- Produit Nom -->
            <div class="form-group">
              <label for="produitNom">Produit</label>
              <input id="produitNom" v-model="inventaireStore.inventaire.produit.nom" class="form-control" readonly />
            </div>
          </div>
        </div>

        <!-- Date -->
        <div class="w-100">
          <div class="form-group">
            <label for="date">Date de l'Inventaire</label>
            <input type="date" id="date" v-model="formattedDate" class="form-control" readonly />
          </div>
        </div>
      </form>
    </div>
  </div>
  <p v-else>Chargement des détails de l'inventaire...</p>
</template>


<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useInventaireStore } from '@stores/inventaireStore';
import { computed } from 'vue';

const formattedDate = computed(() => {
  if (inventaireStore.inventaire && inventaireStore.inventaire.date) {
    return new Date(inventaireStore.inventaire.date).toISOString().split('T')[0];
  }
  return '';
});

const inventaireStore = useInventaireStore();
const route = useRoute();

onMounted(() => {
  const inventaireId = route.params.id;
  inventaireStore.loadInventaireById(inventaireId); // Charger les données de l'inventaire par ID
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
