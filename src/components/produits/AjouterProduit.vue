<template>
  <div class="form-container d-flex align-items-center">
    <div class="form-content">
      <router-link to="/dashboard/produits" class="btn btn-secondary mb-3">
        <i class="fas fa-arrow-left"></i>
      </router-link>
      <form @submit.prevent="addProduit" class="p-4 shadow-sm bg-white rounded">
        <h2 class="text-center mb-4">Ajouter un produit</h2>
        <div class="row">
          <div class="col-md-6 form-group mb-3">
            <label for="nom">Nom</label>
            <input type="text" id="nom" v-model="nom" class="form-control" required />
            <small v-if="errors.nom" class="text-danger">{{ errors.nom }}</small>
          </div>
          <div class="col-md-6 form-group mb-3">
            <label for="nom">Date limite</label>
            <input type="date" id="date" v-model="date_limite" class="form-control" required />
            <small v-if="errors.date_limite" class="text-danger">{{ errors.date_limite }}</small>
          </div>
          
          
          <div class="col-md-6 form-group mb-3">
            <label for="categorie">Catégorie</label>
            <input type="text" id="categorie" v-model="categorie" class="form-control" required />
            <small v-if="errors.categorie" class="text-danger">{{ errors.categorie }}</small>
          </div>
          <div class="col-md-6 form-group mb-3">
            <label for="prix">Prix</label>
            <input type="decimal" id="prix" v-model="prix" class="form-control" required />
            <small v-if="errors.prix" class="text-danger">{{ errors.prix }}</small>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-6 form-group mb-4">
            <label for="description">Description</label>
            <input type="text" id="description" v-model="description" class="form-control" required />
            <small v-if="errors.description" class="text-danger">{{ errors.description }}</small>
          </div>
          <div class="col-md-6 form-group mb-4">
            <label for="stock">Stock</label>
          <input type="number" id="stock" v-model="stock" class="form-control" required />
          <small v-if="errors.stock" class="text-danger">{{ errors.stock }}</small>
          </div>
        </div>
       
        <div class="d-flex justify-content-end gap-5">
          <button type="submit" class="btn btn-success mt-5 w-100">Ajouter produit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProduitStore } from '@stores/produitStore';

// Hooks and store
const route = useRouter();
const produitStore = useProduitStore();

// Toast notification system
const toast = {
  success: (message) => {
    alert(`Succès : ${message}`);
  },
  error: (message) => {
    alert(`Erreur : ${message}`);
  },
};

// Fields
const nom = ref('');
const categorie = ref('');
const prix = ref('');
const description = ref('');
const date_limite = ref('');
const date_entree = ref('')
const stock = ref('');
const errors = ref({});

// Function to reset form after submission
const resetForm = () => {
  nom.value = '';
  categorie.value = '';
  prix.value = '';
  description.value = '';
  date_limite.value = '';
  date_entree.value = new Date(),
  stock.value = '';
};

const addProduit = async () => {
  errors.value = {}; // Clear previous errors

  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00 to compare only dates

  const selectedDate = new Date(date_limite.value);
  selectedDate.setHours(0, 0, 0, 0); // Set time to 00:00 to compare only dates

  // Validate if the selected date is today or in the future
  if (selectedDate < today) {
    errors.value.date_limite = "La date limite doit être aujourd'hui ou dans le futur.";
    return;
  }

  try {
    await produitStore.addProduit({
      nom: nom.value,
      categorie: categorie.value,
      prix: prix.value,
      description: description.value,
      date_limite: date_limite.value,
      date_entree: new Date(),
      stock: stock.value,
    });

    // Success notification
    toast.success('Produit ajouté avec succès !');
    resetForm(); // Clear form after successful submission
    route.push("/dashboard/produits"); // Redirect after successful submission

  } catch (error) {
    // Handle validation errors from the backend
    if (error.response && error.response.data && error.response.data.errors) {
      // Loop through backend errors and assign them to `errors`
      error.response.data.errors.forEach(err => {
        errors.value[err.path] = err.msg;
      });
    } else {
      // Handle generic error if it's not a validation error
      toast.error('Une erreur est survenue lors de l\'ajout.');
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