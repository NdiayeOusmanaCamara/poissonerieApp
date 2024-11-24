<template>
  <div class="form-container d-flex align-items-center">
    <div class="form-content">
      <router-link to="/dashboard/receptions" class="btn btn-secondary mb-3">
        <i class="fas fa-arrow-left"></i>
      </router-link>

      <div class="reception-detail">
        <form @submit.prevent="handleSubmit" class="p-4 shadow-sm bg-white rounded">
          <h2 class="text-center mb-4">Ajouter une réception</h2>

          <!-- Informations de la réception -->
          <div class="d-flex gap-2">
            <div class="w-100">
              <div class="form-group">
                <label for="date" class="form-label">Date de réception</label>
                <input type="date" id="date" v-model="form.date" class="form-control" required />
                <small v-if="errors.date" class="text-danger">{{ errors.date }}</small>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between gap-3 mt-2">
            <div class="form-group w-100">
              <label for="montant" class="form-label">Montant total</label>
              <input type="number" step="0.01" v-model="form.montant" class="form-control" disabled />
            </div>
          </div>

          <!-- Détails de la réception -->
          <div>
            <h3>Détails de la réception</h3>
            <div v-for="(detail, index) in form.detailReceptions" :key="index" class="d-flex gap-3 mt-3">
              <div class="w-100">
                <label class="form-label">Produit</label>
                <select v-model="detail.produitId" class="form-control" required @change="updateTotalMontant">
                  <option disabled value="">Sélectionner un produit</option>
                  <option v-for="produit in produits" :key="produit.id" :value="produit.id">
                    {{ produit.nom }}
                  </option>
                </select>
              </div>
              <div class="w-100">
                <label class="form-label">Quantité</label>
                <input
                  type="number"
                  v-model="detail.quantite"
                  class="form-control"
                  required
                  min="1"
                  @input="updateTotalMontant"
                />
              </div>
              <div class="w-100">
                <label class="form-label">Prix unitaire</label>
                <input
                  type="number"
                  :value="produits.find(p => p.id === detail.produitId)?.prix || 0"
                  class="form-control"
                  disabled
                />
              </div>
              <div class="w-100 d-flex align-items-end">
                <button type="button" class="btn btn-danger" @click="removeDetail(index)">
                  Supprimer
                </button>
              </div>
            </div>
            <button type="button" @click="addDetail" class="btn btn-primary mt-3">
              Ajouter un produit
            </button>
          </div>

          <!-- Soumettre la réception -->
          <button type="submit" class="btn btn-success mt-5 w-100">Ajouter la réception</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useReceptionStore } from '@stores/receptionStore';
import { useProduitStore } from '@stores/produitStore';
import { useToast } from 'vue-toastification';

// Dépendances
const toast = useToast();
const router = useRouter();
const receptionStore = useReceptionStore();
const produitStore = useProduitStore();

// Variables réactives
const errors = ref({});
const produits = ref([]);
const form = ref({
  date: '',
  montant: 0,
  detailReceptions: [{ produitId: '', quantite: 1 }],
});

// Charger les produits disponibles
onMounted(async () => {
  try {
    produits.value = await produitStore.loadProduitsData();
  } catch (error) {
    toast.error('Erreur lors du chargement des produits');
    console.error(error.message);
  }
});

// Ajouter un détail
const addDetail = () => {
  form.value.detailReceptions.push({ produitId: '', quantite: 1 });
};

// Supprimer un détail
const removeDetail = (index) => {
  if (form.value.detailReceptions.length > 1) {
    form.value.detailReceptions.splice(index, 1);
    updateTotalMontant();
  }
};

// Mettre à jour le montant total
const updateTotalMontant = () => {
  form.value.montant = form.value.detailReceptions.reduce((total, detail) => {
    const produit = produits.value.find((p) => p.id === detail.produitId);
    return total + (produit ? produit.prix * detail.quantite : 0);
  }, 0);
};

// Soumettre la nouvelle réception
const handleSubmit = async () => {
  try {
    // Calculer le montant total
    form.value.montant = form.value.detailReceptions.reduce((total, detail) => {
      const produit = produits.value.find((p) => p.id === detail.produitId);
      return total + (produit ? produit.prix * detail.quantite : 0);
    }, 0);

    // Convertir la date en format ISO pour Prisma
    form.value.date = new Date(form.value.date).toISOString();

    // Cloner les données du formulaire
    const newReception = {
      ...form.value,
      detailReceptions: form.value.detailReceptions, // Mapper avec la structure attendue par le backend
    };

    // Ajouter la réception
    await receptionStore.addReception(newReception);
    toast.success('Réception ajoutée avec succès');
    router.push('/dashboard/receptions');
  } catch (error) {
    toast.error('Erreur lors de l\'ajout de la réception');
    console.error(error.message);
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
  