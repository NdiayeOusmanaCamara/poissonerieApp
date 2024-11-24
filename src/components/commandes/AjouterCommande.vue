<template>
  <div class="form-container d-flex align-items-center">
    <div class="form-content">
      <router-link to="/dashboard/commandes" class="btn btn-secondary mb-3">
        <i class="fas fa-arrow-left"></i>
      </router-link>

      <div class="commande-detail">
        <form @submit.prevent="handleSubmit" class="p-4 shadow-sm bg-white rounded">
          <h2 class="text-center mb-4">Ajouter une commande</h2>

          <!-- Informations de la commande -->
          <div class="d-flex gap-2">
            <div class="w-100">
              <div class="form-group">
                <label for="nom" class="form-label">Nom de la commande</label>
                <input type="text" id="nom" v-model="form.nom" class="form-control" required />
                <small v-if="errors.nom" class="text-danger">{{ errors.nom }}</small>
              </div>
            </div>
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
              <label for="prix" class="form-label">Prix total</label>
              <input type="number" step="0.01" v-model="form.prix" class="form-control" disabled />
              <small v-if="errors.prix" class="text-danger">{{ errors.prix }}</small>
            </div>
          </div>

          <!-- Détails de la commande -->
          <div>
            <h3>Détails de la commande</h3>
            <div v-for="(detail, index) in form.DetailCommande" :key="index" class="d-flex gap-3 mt-3">
              <div class="w-100">
                <label class="form-label">Produit</label>
                <select v-model="detail.produitId" class="form-control" required @change="updateTotalPrice">
                  <option disabled value="">Sélectionner un produit</option>
                  <option v-for="produit in produits" :key="produit.id" :value="produit.id">
                    {{ produit.nom }}
                  </option>
                </select>
              </div>
              
              <!-- Sélection du statut de la commande -->
              <div class="w-100">
                <label class="form-label">Statut</label>
                <select v-model="detail.status" class="form-control" required>
                  <option value="EN_ATTENTE">En attente</option>
                  <option value="EN_TRANSIT">En cours</option>
                  <option value="LIVRE">Livrée</option>
                  <option value="ANNULE">Annulée</option>
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
                  @input="updateTotalPrice"
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
          <button type="submit" class="btn btn-success mt-5 w-100">Ajouter la commande</button>
        </form>
      </div>
    </div>
  </div>
</template>

  
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCommandeStore } from '@stores/commandeStore';
import { useProduitStore } from '@stores/produitStore';
import { useToast } from 'vue-toastification';

// Dépendances
const toast = useToast();
const router = useRouter();
const commandeStore = useCommandeStore();
const produitStore = useProduitStore();

// Variables réactives
const errors = ref({});
const produits = ref([]);
const form = ref({
  nom: '',
  date: '',
  prix: 0,
  DetailCommande: [{ produitId: '', quantite: 1, prix: 0, status: 'EN_ATTENTE' }],
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
  form.value.DetailCommande.push({ produitId: '', quantite: 1, prix: 0, status: 'EN_ATTENTE' });
};

// Supprimer un détail
const removeDetail = (index) => {
  if (form.value.DetailCommande.length > 1) {
    form.value.DetailCommande.splice(index, 1);
    updateTotalPrice();
  }
};

// Mettre à jour le prix total
const updateTotalPrice = () => {
  form.value.prix = form.value.DetailCommande.reduce((total, detail) => {
    const produit = produits.value.find((p) => p.id === detail.produitId);
    return total + (produit ? produit.prix * detail.quantite : 0);
  }, 0);
};

// Validation du nom et de la quantité
const validateForm = () => {
  errors.value = {};

  // Validation du nom de la commande (au moins 3 caractères)
  if (form.value.nom.length < 3) {
    errors.value.nom = 'Le nom de la commande doit contenir au moins 3 caractères.';
  }

  // Validation de la quantité (doit être supérieure à 1)
  form.value.DetailCommande.forEach((detail, index) => {
    if (detail.quantite < 1) {
      errors.value[`quantite-${index}`] = 'La quantité doit être supérieure à 1.';
    }
  });

  // Si des erreurs existent, retourner false
  return Object.keys(errors.value).length === 0;
};

// Soumettre la nouvelle commande
const handleSubmit = async () => {
  try {
    // Valider le formulaire
    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs dans le formulaire.');
      return;
    }

    // Calculer le prix total
    form.value.prix = form.value.DetailCommande.reduce((total, detail) => {
      const produit = produits.value.find((p) => p.id === detail.produitId);
      return total + (produit ? produit.prix * detail.quantite : 0);
    }, 0);

    // Convertir la date en format ISO pour Prisma
    form.value.date = new Date(form.value.date).toISOString();

    // Cloner les données du formulaire
    const newCommande = {
      ...form.value,
      detailsOrder: form.value.DetailCommande,  // Mapper avec la structure attendue par le backend
    };

    // Ajouter la commande
    await commandeStore.addCommande(newCommande);
    toast.success('Commande ajoutée avec succès');
    router.push('/dashboard/commandes');
  } catch (error) {
    toast.error('Erreur lors de l\'ajout de la commande');
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
