<template>
  <div class="form-container d-flex align-items-center">
    <div class="form-content">
      <router-link to="/dashboard/inventaires" class="btn btn-secondary mb-3">
        <i class="fas fa-arrow-left"></i>
      </router-link>
      <form @submit.prevent="addInventaire" class="p-4 shadow-sm bg-white rounded">
        <h2 class="text-center mb-4">Ajouter un inventaire</h2>

        <div class="d-flex justify-content-between gap-4">
          <!-- Stock Input -->
          <div class="form-group mb-3 w-100">
            <label for="stock">Stock</label>
            <input type="number" id="stock" v-model="stock" class="form-control" required />
            <small v-if="errors.stock" class="text-danger">{{ errors.stock }}</small>
          </div>

          <!-- Produit Selection by Name -->
          <div class="form-group mb-3 w-100">
            <label for="produit">Produit</label>
            <select id="produit" v-model="produitId" class="form-control" required>
              <option disabled value="">Sélectionnez un produit</option>
              <option v-for="produit in produits" :key="produit.id" :value="produit.id">
                {{ produit.nom }}
              </option>
            </select>
            <small v-if="errors.produitId" class="text-danger">{{ errors.produitId }}</small>
          </div>
        </div>

        <div class="d-flex justify-content-between gap-4">
          <!-- Date Input -->
        
        </div>

        <div class="d-flex justify-content-end gap-5">
          <button type="submit" class="btn btn-success mt-5 w-100">Ajouter Inventaire</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useInventaireStore } from '@stores/inventaireStore';
import { useProduitStore } from '@stores/produitStore'; // Assurez-vous que vous avez un store pour les produits
import { useToast } from 'vue-toastification';
import moment from 'moment'; // Import moment.js for date manipulation

const route = useRouter();
const inventaireStore = useInventaireStore();
const produitStore = useProduitStore();
const toast = {
    success: (message) => {
        alert(`Succès : ${message}`);
    },
    error: (message) => {
        alert(`Erreur : ${message}`);
    }
};

// Form data
const stock = ref('');
const produitId = ref('');


// Products list
const produits = ref([]);

// Errors object to handle validation messages
const errors = ref({});

// Fetch products when the component is mounted
onMounted(async () => {
  try {
    produits.value = await produitStore.loadProduitsData(); // Fetch products from store or API
  } catch (error) {
    toast.error("Erreur lors du chargement des produits.");
  }
});

// Function to handle form submission
const addInventaire = async () => {
  errors.value = {}; // Reset errors

  // Validate stock: stock must be greater than 0
  if (stock.value <= 0) {
    errors.value.stock = "Le stock doit être supérieur à 0.";
    return; // Stop form submission if stock is invalid
  }

 

  try {
    await inventaireStore.addInventaire({
      stock: stock.value,
      produitId: produitId.value,

    });
    toast.success('Inventaire ajouté avec succès !');
    route.push("/dashboard/inventaires");
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
