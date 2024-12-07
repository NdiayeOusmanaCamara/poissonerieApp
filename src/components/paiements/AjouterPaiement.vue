<template>
  <div class="form-container d-flex align-items-center">
    <div class="form-content">
      <router-link to="/dashboard/paiements" class="btn btn-secondary mb-3">
        <i class="fas fa-arrow-left"></i>
      </router-link>
      <form @submit.prevent="addPaiement" class="p-4 shadow-sm bg-white rounded">
        <h2 class="text-center mb-4">Ajouter un Paiement</h2>
        
        <div class="d-flex justify-content-between gap-4">
          <div class="form-group mb-3 w-100">
            <label for="montant">Montant</label>
            <input type="number" id="montant" v-model="montant" class="form-control" step="0.01" required />
            <small v-if="errors.montant" class="text-danger">{{ errors.montant }}</small>
          </div>
      
          <div class="form-group mb-3 w-100">
            <label for="mode_paiement">Mode de Paiement</label>
            <select id="mode_paiement" v-model="mode_paiement" class="form-control" required>
              <option value="" disabled selected></option>
              <option value="cash">Cash</option>
              <option value="bank_transfer">Bank transfer</option>
              <option value="credit_card">Credit Card</option>
            </select>
            <small v-if="errors.mode_paiement" class="text-danger">{{ errors.mode_paiement }}</small>
          </div>
        </div>

        <div class="d-flex justify-content-between gap-4">
          <!-- Liste déroulante pour les commandes -->
          <div class="form-group mb-4 w-100">
            <label for="commandeId">Commande</label>
            <select id="commandeId" v-model="commandeId" class="form-control" required>
              <option value="" disabled selected>Choisir un commande</option>
              <option v-for="commande in commandes" :key="commande.id" :value="commande.id">
                {{ commande.nom }}
              </option>
            </select>
            <small v-if="errors.commandeId" class="text-danger">{{ errors.commandeId }}</small>
          </div>
          
        
        </div>

        <div class="d-flex justify-content-end gap-5">
          <button type="submit" class="btn btn-success mt-5 w-100">Ajouter paiement</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePaiementStore } from '@stores/paiementStore';  // Assuming you have a store for handling paiements
import { useToast } from 'vue-toastification';

const route = useRouter();
const paiementStore = usePaiementStore();
const toast = {
    success: (message) => {
        alert(`Succès : ${message}`);
    },
    error: (message) => {
        alert(`Erreur : ${message}`);
    }
};

// Form data
const montant = ref('');
const mode_paiement = ref('cash');
const commandeId = ref('');  // Selected commande ID
const date = ref('');

// Errors object to handle validation messages
const errors = ref({});
const commandes = ref([]);  // List of commandes

// Load commandes when component is mounted
onMounted(async () => {
  try {
    commandes.value = await paiementStore.fetchCommandes();
  } catch (error) {
    toast.error('Erreur lors du chargement des commandes.');
  }
});

// Function to handle form submission
const addPaiement = async () => {
  errors.value = {}; // Reset errors

  // Validation: check if the amount is positive
  if (montant.value <= 0) {
    errors.value.montant = "Le montant doit être supérieur à zéro.";
    return; // Stop submission if validation fails
  }

  try {
    await paiementStore.addPaiement({
      montant: montant.value,
      mode_paiement: mode_paiement.value,
      commandeId: commandeId.value,
      date: date.value,
    });
    toast.success('Paiement ajouté avec succès !');
    route.push("/dashboard/paiements");
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach(err => {
        errors.value[err.path] = err.msg;
      });
    } else {
      toast.error("Une erreur est survenue lors de l'ajout.");
    }
  }
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
  