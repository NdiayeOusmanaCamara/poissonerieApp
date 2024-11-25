<template>
  <div class="form-container d-flex align-items-center">
    <div class="form-content">
      <router-link to="/dashboard/receptions" class="btn btn-secondary mb-3">
        <i class="fas fa-arrow-left"></i>
      </router-link>

      <div class="reception-detail">
        <form @submit.prevent="handleSubmit" class="p-4 shadow-sm bg-white rounded">
          <h2 class="text-center mb-4">Modifier la commande</h2>

          <!-- Informations de la commande -->
          <div class="d-flex gap-2">
            <div class="w-100">
              <div class="form-group">
                <label for="date" class="form-label">Date de commande</label>
                <input type="date" id="date" v-model="form.date" class="form-control" required />
                <small v-if="errors.date" class="text-danger">{{ errors.date }}</small>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between gap-3 mt-2">
            <div class="form-group w-100">
              <label for="prix" class="form-label">Montant total</label>
              <input type="number" step="0.01" v-model="form.prix" class="form-control" disabled />
              <small v-if="errors.prix" class="text-danger">{{ errors.prix }}</small>
            </div>
          </div>

          <!-- Détails de la commande -->
          <div>
            <h3>Détails de la commande</h3>
            <div v-for="(detail, index) in form.details" :key="index" class="d-flex gap-3 mt-3">
              <div class="w-100">
                <label class="form-label">Produit</label>
                <select v-model="detail.produitId" class="form-control" required @change="updateTotalAmount">
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
                  @input="updateTotalAmount"
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

          <!-- Soumettre la commande -->
          <button type="submit" class="btn btn-success mt-5 w-100">Mettre à jour la commande</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCommandeStore } from '@stores/commandeStore';
import { useProduitStore } from '@stores/produitStore';
import { useToast } from 'vue-toastification';
import moment from 'moment';

// Dépendances
const toast = useToast();
const route = useRoute();
const router = useRouter();
const commandeStore = useCommandeStore();
const produitStore = useProduitStore();

// Variables réactives
const errors = ref({});
const produits = ref([]);
const form = ref({
  date: '',
  prix: 0,
  utilisateurId: null,
  details: [{ produitId: '', quantite: 1, prix: 0 }],
});

// Charger les produits et les données de la commande
onMounted(async () => {
  try {
    // Charger les produits
    produits.value = await produitStore.loadProduitsData();

    // Charger la commande existante
    const commandeId = route.params.id;
    const commande = await commandeStore.getCommandeById(commandeId);

    form.value.date = commande.date ? moment(commande.date).format('YYYY-MM-DD') : '';
    form.value.prix = commande.prix || 0;
  
    form.value.details = commande.details.map((detail) => ({
      produitId: detail.produitId,
      quantite: detail.quantite || 1,
      prix: produits.value.find((p) => p.id === detail.produitId)?.prix || 0,
    }));
  } catch (error) {
    toast.error('Erreur lors du chargement des données');
    console.error(error.message);
  }
});

// Ajouter un détail
const addDetail = () => {
  form.value.details.push({ produitId: '', quantite: 1, prix: 0 });
};

// Supprimer un détail
const removeDetail = (index) => {
  if (form.value.details.length > 1) {
    form.value.details.splice(index, 1);
    updateTotalAmount();
  }
};

// Mettre à jour le montant total
const updateTotalAmount = () => {
  form.value.prix = form.value.details.reduce((total, detail) => {
    const produit = produits.value.find((p) => p.id === detail.produitId);
    return total + (produit ? produit.prix * detail.quantite : 0);
  }, 0);
};

// Soumettre la commande modifiée
const handleSubmit = async () => {
  try {
    // Calculer le montant total
    updateTotalAmount();

    // Convertir la date en format ISO pour Prisma
    form.value.date = moment(form.value.date).toISOString();

    // Cloner les données du formulaire
    const updatedCommande = {
      ...form.value,
      details: form.value.details,
    };

    // Soumettre la commande mise à jour
    await commandeStore.updateCommande(route.params.id, updatedCommande);
    toast.success('Commande mise à jour avec succès');
    router.push('/dashboard/receptions');
  } catch (error) {
    toast.error('Erreur lors de la mise à jour');
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
