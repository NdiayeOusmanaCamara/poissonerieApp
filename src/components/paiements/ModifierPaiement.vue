<template>
  <div class="form-container d-flex align-items-center">
    <div class="form-content">
      <router-link to="/dashboard/paiements" class="btn btn-secondary mb-3">
        <i class="fas fa-arrow-left"></i>
      </router-link>
      <div class="paiement-detail">
        <form @submit.prevent="submitForm" class="p-4 shadow-sm bg-white rounded">
          <h2 class="text-center mb-4">Modifier un Paiement</h2>
          <div class="d-flex gap-3">
            <div class="w-100">
              <div class="form-group">
                <label for="montant">Montant</label>
                <input type="number" id="montant" v-model="form.montant" class="form-control" required />
                <small v-if="errors.montant" class="text-danger">{{ errors.montant }}</small>

              </div>
            </div>

            <div class="w-100">
              <div class="form-group">
                <label for="mode_paiement">Mode de Paiement</label>
                <select id="mode_paiement" v-model="form.mode_paiement" class="form-control" required>
                  <option value="" disabled selected></option>
                  <option value="cash">Cash</option>
                  <option value="bank_transfer">Bank transfer</option>
                  <option value="credit_card">Credit Card</option>
                </select>
                <small v-if="errors.mode_paiement" class="text-danger">{{ errors.mode_paiement }}</small>
              </div>              
            </div>
          </div>

          <div class="d-flex gap-3">
            <div class="w-100">
              <div class="form-group">
                <label for="commandeId">Commande</label>
                <select id="commandeId" v-model="form.commandeId" class="form-control" required>
                  <option v-for="commande in commandes" :key="commande.id" :value="commande.id">
                    {{ commande.nom }} <!-- Show command name here -->
                  </option>
                </select>
              </div>
            </div>

           
          </div>

          <button type="submit" class="btn btn-success mt-5 w-100">Mettre à jour le Paiement</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { usePaiementStore } from "@stores/paiementStore"; // Assuming there's a store for Paiements
import { useCommandeStore } from "@stores/commandeStore"; // Assuming there's a store for Commandes

const store = usePaiementStore();
const commandeStore = useCommandeStore(); // New store for commandes
const route = useRoute();
const router = useRouter();

const paiement = ref({});
const form = ref({
  montant: 0,
  mode_paiement: '',
  commandeId: 0,
  utilisateurId: 0,
  date: '',
});

const commandes = ref([]); // To store fetched commandes
const errors = ref({}); // To store errors
function formatDateForInput(dateString) {
  const date = new Date(dateString);
  return date.toISOString().substring(0, 10); // Convert to YYYY-MM-DD
}
onMounted(async () => {
  const id = route.params.id;
  await store.loadPaiementById(id); // Load paiement details
  paiement.value = store.paiements.find((p) => p.id === parseInt(id));

  if (paiement.value) {
    form.value.montant = paiement.value.montant;
    form.value.mode_paiement = paiement.value.mode_paiement;
    form.value.commandeId = paiement.value.commandeId;
    form.value.utilisateurId = paiement.value.utilisateurId;
    form.value.date = formatDateForInput(paiement.value.date);
  }

  // Fetch commandes to display in the dropdown
  await commandeStore.fetchCommandes();
  commandes.value = commandeStore.commandes; // Store the commandes in local state
});

const toast = {
  success: (message) => {
    alert(`Succès : ${message}`);
  },
  error: (message) => {
    alert(`Erreur : ${message}`);
  }
};

async function submitForm() {
  errors.value = {}; // Reset errors

  // Validate montant (it must be positive)
  if (form.value.montant <= 0) {
    errors.value.montant = "Le montant doit être supérieur à zéro.";
    return;
  }

  const updatedPaiement = {
    ...paiement.value,
    montant: form.value.montant,
    mode_paiement: form.value.mode_paiement,
    commandeId: form.value.commandeId, // Save the selected commande ID
    utilisateurId: form.value.utilisateurId,
    date: form.value.date,
  };

  await store.updatePaiement(paiement.value.id, updatedPaiement); // Update the payment

  // Display success toast
  toast.success('Paiement mis à jour avec succès!');
  router.push('/dashboard/paiements');
}

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
