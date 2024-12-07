<template>
  <div class="form-container d-flex align-items-center mt-3">
    <div class="form-content">
      <router-link to="/dashboard/commandes" class="btn btn-secondary mb-3">
        <i class="fas fa-arrow-left"></i>
      </router-link>
      <form @submit.prevent="submitCommande" class="p-4 shadow-sm bg-white rounded">
        <h2 class="text-center mb-4">Ajouter une commande</h2>

        <div class="d-flex justify-content-between gap-4">
          <!-- Nom de la commande -->
          <div class="form-group w-100">
            <label for="montant" class="form-label">Prix total</label>
            <input type="Decimal" step="0.01" v-model="newCommande.montant" class="form-control" disabled />
            <small v-if="errors.montant" class="text-danger">{{ errors.montant }}</small>
          </div>
        </div>

        <!-- Section Détails de la Commande -->
        <div>
          <h3>Détails de la commande</h3>
          <div v-for="(detail, index) in newDetailCommande" :key="index" class="row mb-3">
            <div class="col-md-4">
              <label for="produit" class="form-label">Produit</label>
              <select v-model="detail.produitId" class="form-select" required>
                <option disabled value="">Sélectionnez un produit</option>
                <option v-for="produit in produits" :key="produit.id" :value="produit.id">
                  {{ produit.nom }}
                </option>
              </select>
              <small v-if="errors.produitId" class="text-danger">{{ errors.produitId }}</small>
            </div>
            <div class="col-md-3">
              <label for="quantite" class="form-label">Quantité</label>
              <input
                type="number"
                v-model="detail.quantite"
                class="form-control"
                required
                @input="updateTotalPrice"
                :min="1"
              />
              <small v-if="detail.quantite <= 0" class="text-danger">La quantité doit être supérieure  à Zéro</small>
            </div>
            <div v-if="errors.stock" class="col-12">
              <small class="text-danger">{{ errors.stock }}</small>
              </div>
            <div class="col-md-3">
              <label class="form-label">Prix unitaire</label>
              <input
                type="number"
                :value="produits.find(p => p.id === detail.produitId)?.prix || 0"
                class="form-control"
                disabled
              />
              <small v-if="errors.prix" class="text-danger">{{ errors.prix }}</small>
            </div>
            <div class="col-md-2 d-flex align-items-end">
              <button type="button" class="btn btn-danger" @click="removeDetail(index)">Supprimer</button>
            </div>
          </div>
          <button type="button" @click="addDetail" class="btn btn-primary mt-3">Ajouter un produit</button>
        </div>

        <div class="d-flex justify-content-end gap-5">
          <button type="submit" class="btn btn-success m-3 w-100">Ajouter la commande</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useCommandeStore } from '@stores/commandeStore';
import { useProduitStore } from '@stores/produitStore';
import { useToast } from 'vue-toastification';
import moment from 'moment';
import { useRouter } from 'vue-router';

const router = useRouter();
const commandeStore = useCommandeStore();
const produitStore = useProduitStore();

const toast = {
    success: (message) => {
        alert(`Succès : ${message}`);
    },
    error: (message) => {
        alert(`Erreur : ${message}`);
    }
};

const newCommande = ref({
  montant: 0,
  utilisateurId: 1, // Assuming a default user for simplicity
});

const newDetailCommande = ref([{ produitId: '', quantite: 1 }]);
const produits = ref([]);
const errors = ref({});

onMounted(async () => {
  try {
    produits.value = await produitStore.loadProduitsData();
  } catch (error) {
    console.error('Erreur lors du chargement des données :', error.message);
  }
});

const addDetail = () => {
  newDetailCommande.value.push({ produitId: '', quantite: 1 });
};

const removeDetail = (index) => {
  if (newDetailCommande.value.length > 1) {
    newDetailCommande.value.splice(index, 1);
    updateTotalPrice();
  }
};

const calculateTotalPrice = computed(() => {
  return newDetailCommande.value.reduce((total, detail) => {
    const produit = produits.value.find((p) => p.id === detail.produitId);
    return total + (produit ? produit.prix * detail.quantite : 0);
  }, 0);
});

const updateTotalPrice = () => {
  newCommande.value.montant = calculateTotalPrice.value;
  errors.value = {};
  newDetailCommande.value.forEach((detail) => {
    // Find the product by ID
    const produit = produits.value.find(p => p.id === detail.produitId);
    if (produit) {
      // Check if the requested quantity exceeds available stock
      if (detail.quantite > produit.stock) {
        errors.value.stock = `Stock insuffisant pour le produit ${produit.nom}. Quantité disponible: ${produit.stock}.`;
      } else {
        delete errors.value.stock;
      }

      // Validation: Ensure quantity is positive
      if (detail.quantite <= 0) {
        errors.value.quantite = "La quantité doit être positive.";
      } else {
        delete errors.value.quantite;
      }
    }
  });
};

const submitCommande = async () => {
  errors.value = {}; // Reset previous errors
  try {
    const commandeDetails = newDetailCommande.value.map(detail => ({
      quantite: detail.quantite,
      prix: produits.value.find(p => p.id === detail.produitId)?.prix || 0,
      produitId: detail.produitId
    }));

    const commandeData = {
      utilisateurId: newCommande.value.utilisateurId,
      date: new Date(),
      detailsOrder: commandeDetails, // Assurez-vous que "detailsOrder" est un tableau ici
    };

    // Envoi de la requête au backend
    const response = await commandeStore.addCommande(commandeData);

    toast.success('Commande ajoutée avec succès !');
    router.push("/dashboard/commandes");
  } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
          error.response.data.errors.forEach(err => {
              errors.value[err.path] = err.msg;
          });
      } else {
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
