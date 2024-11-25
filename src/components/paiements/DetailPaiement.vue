<template>
  <div class="form-container d-flex align-items-center" v-if="paiementStore.paiement && paiementStore.paiement.id">
    <div class="form-content">
      <router-link to="/dashboard/paiements" class="btn btn-secondary mb-3">
        <i class="fas fa-arrow-left"></i>
      </router-link>
      <form class="p-4 shadow-sm bg-white rounded">
        <h2 class="text-center mb-4">Détails du Paiement</h2>
        <div class="d-flex gap-2">
          <div class="w-100">
            <div class="form-group">
              <label for="montant">Montant</label>
              <input id="montant" v-model="paiementStore.paiement.montant" class="form-control" readonly />
            </div>
            <div class="form-group">
              <label for="mode_paiement">Mode de Paiement</label>
              <input id="mode_paiement" v-model="paiementStore.paiement.mode_paiement" class="form-control" readonly />
            </div>
          </div>
        </div>

        <!-- Commande -->
        <div class="w-100">
          <div class="form-group">
            <label for="commandeNom">Commande</label>
            <input id="commandeNom" v-model="commandeNom" class="form-control" readonly />
          </div>
        </div>

        <!-- Date -->
        <div class="w-100">
          <div class="form-group">
            <label for="date">Date du Paiement</label>
            <input  id="date" v-model="formattedDate" class="form-control" readonly />
          </div>
        </div>
      </form>
    </div>
  </div>
  <p v-else>Chargement des détails du paiement...</p>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePaiementStore } from '@stores/paiementStore';
import { useCommandeStore } from '@stores/commandeStore'; // Assuming you have a store for orders

const formattedDate = computed(() => {
  if (paiementStore.paiement && paiementStore.paiement.date) {
    return new Date(paiementStore.paiement.date).toISOString().split('T')[0];
  }
  return '';
});

const paiementStore = usePaiementStore();
const commandeStore = useCommandeStore(); // Store for orders
const route = useRoute();
const commandeNom = ref(''); // To store the name of the commande

onMounted(async () => {
  const paiementId = route.params.id;
  await paiementStore.loadPaiementById(paiementId); // Charger les données de paiement

  // Charger les informations de la commande en utilisant l'ID de la commande
  const commandeId = paiementStore.paiement.commandeId;
  if (commandeId) {
    const commande = await commandeStore.getCommandeById(commandeId);
    commandeNom.value = commande.nom; // Assurez-vous que la commande contient un champ 'name'
  }
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
