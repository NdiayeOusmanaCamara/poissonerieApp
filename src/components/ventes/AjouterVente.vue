<template>
  <div class="form-container d-flex align-items-center mt-3">
    <div class="form-content">
      <router-link to="/dashboard/ventes" class="btn btn-secondary mb-3">
        <i class="fas fa-arrow-left"></i>
      </router-link>
      <form @submit.prevent="submitVente" class="p-4 shadow-sm bg-white rounded">
        <h2 class="text-center mb-4">Ajouter une vente</h2>

        <div class="d-flex justify-content-between gap-4">
          
          <div class="form-group w-100">
            <label for="date" class="form-label">Date de vente</label>
            <input type="date" v-model="newVente.date" class="form-control" required />
            <small v-if="errors.date" class="text-danger">{{ errors.date }}</small>
          </div>
        </div>

        <div class="d-flex justify-content-between gap-3 mt-2">
          <div class="form-group w-100">
            <label for="prix" class="form-label">Montant total</label>
            <input type="number" step="0.01" v-model="newVente.montant" class="form-control" disabled />
            <small v-if="errors.prix" class="text-danger">{{ errors.prix }}</small>
          </div>
        </div>

        <!-- Section Détails de la Vente -->
        <div>
          <h3>Détails de la vente</h3>
          <div v-for="(detail, index) in newDetailVente" :key="index" class="row mb-3">
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
              />
              <small v-if="errors.quantite" class="text-danger">{{ errors.quantite }}</small>
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
          <button type="submit" class="btn btn-success m-3 w-100">Ajouter la vente</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useVenteStore } from '@stores/venteStore';
import { useProduitStore } from '@stores/produitStore';
import { useToast } from 'vue-toastification';
import moment from 'moment';
import { useRouter } from 'vue-router';

const router = useRouter();
const venteStore = useVenteStore();
const produitStore = useProduitStore();

const toast = useToast();

const newVente = ref({
  date: '',
  montant: 0,
});

const newDetailVente = ref([{ produitId: '', quantite: 1 }]);
const produits = ref([]);
const utilisateurs = ref([]); // Liste des utilisateurs
const errors = ref({});

onMounted(async () => {
  try {
    produits.value = await produitStore.loadProduitsData();
  } catch (error) {
    console.error('Erreur lors du chargement des données :', error.message);
  }
});

const addDetail = () => {
  newDetailVente.value.push({ produitId: '', quantite: 1 });
};

const removeDetail = (index) => {
  if (newDetailVente.value.length > 1) {
    newDetailVente.value.splice(index, 1);
    updateTotalPrice();
  }
};

const calculateTotalPrice = computed(() => {
  return newDetailVente.value.reduce((total, detail) => {
    const produit = produits.value.find((p) => p.id === detail.produitId);
    return total + (produit ? produit.prix * detail.quantite : 0);
  }, 0);
});

const updateTotalPrice = () => {
  newVente.value.montant = calculateTotalPrice.value;
};

const submitVente = async () => {
  errors.value = {};
  try {
    // Formater la date au format ISO 8601
    const formattedDate = moment(newVente.value.date).toISOString();
    
    // Préparer les détails de la vente
    const venteDetails = newDetailVente.value.map(detail => ({
      quantite: detail.quantite,
      prix: produits.value.find(p => p.id === detail.produitId)?.prix || 0,
      produitId: detail.produitId
    }));

    // Construire les données à envoyer
    const venteData = {
      date: formattedDate,
      details: venteDetails
    };

    // Appeler la fonction du store pour ajouter la vente
    await venteStore.addVente(venteData);

    toast.success('Vente ajoutée avec succès !');
    router.push("/dashboard/ventes");
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la vente :', error);
    toast.error('Une erreur est survenue lors de l\'ajout de la vente.');
  }
};


const resetForm = () => {
  newVente.value = { date: '', montant: 0 };
  newDetailVente.value = [{ produitId: '', quantite: 1 }];
};
</script>

<style scoped>
/* Styles similaires à ceux du formulaire initial */
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
