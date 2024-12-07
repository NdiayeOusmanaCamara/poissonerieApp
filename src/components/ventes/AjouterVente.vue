<template>
  <div class="form-container d-flex align-items-center mt-3">
    <div class="form-content">
      <router-link to="/dashboard/ventes" class="btn btn-secondary mb-3">
        <i class="fas fa-arrow-left"></i>
      </router-link>
      <form @submit.prevent="submitVente" class="p-4 shadow-sm bg-white rounded">
        <h2 class="text-center mb-4">Ajouter une vente</h2>

        <!-- Date de vente -->
        <label for="date" class="form-label">Date de vente</label>
        <input
          type="datetime-local"
          v-model="newVente.date"
          class="form-control"
          :min="minDate"
        />
        <small v-if="errors.date" class="text-danger">{{ errors.date }}</small>

        <div class="d-flex justify-content-between gap-4">
        </div>
        
        <!-- Prix total -->
        <div class="form-group w-100">
          <label for="montant" class="form-label">Prix total</label>
          <input
            type="number"
            step="0.01"
            v-model="newVente.montant"
            class="form-control"
            disabled
          />
          <small v-if="errors.montant" class="text-danger">{{ errors.montant }}</small>
        </div>

        <!-- Commande -->
        <!-- Commande -->
<div class="col-md-4">
  <label for="commande" class="form-label">Commande</label>
  <select v-model="newVente.commandeId" class="form-select" required>
    <option disabled value="0">Sélectionnez une commande</option>
    <option v-for="commande in commandes" :key="commande.id" :value="commande.id">
      {{ commande.id }}
    </option>
  </select>
  <!-- Affichage du message d'erreur si la commande est déjà convertie -->
  <small v-if="errors.commandeId" class="text-danger">{{ errors.commandeId }}</small>

</div>


        <!-- Détails de la vente (seulement si aucune commande n'est sélectionnée) -->
        <div v-if="!newVente.commandeId">
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
                min="1" 
              />
              <small v-if="detail.quantite <= 0 && detail.quantite !== ''" class="text-danger">
                La quantité doit être supérieure à zéro
              </small>
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
import { useCommandeStore } from '@/stores/commandeStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const venteStore = useVenteStore();
const produitStore = useProduitStore();
const commandeStore = useCommandeStore();
const commandes = ref([]);
const newVente = ref({
  montant: 0,
  utilisateurId: 1,
  commandeId: 0,
  date: ''
});

const newDetailVente = ref([{ produitId: '', quantite: 1 }]);
const produits = ref([]);
const errors = ref({});

onMounted(async () => {
  try {
    produits.value = await produitStore.loadProduitsData();
    commandes.value = await commandeStore.fetchCommandes();
  } catch (error) {
    console.error('Erreur lors du chargement des produits :', error.message);
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
  errors.value = {};  // Clear previous errors

  newDetailVente.value.forEach((detail) => {
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

const submitVente = async () => {
  errors.value = {};  // Clear any existing errors

  // Vérifiez si la commande sélectionnée a déjà été convertie
  const selectedCommande = commandes.value.find(c => c.id === newVente.value.commandeId);
  
  if (selectedCommande && selectedCommande.isConverted) {
    errors.value.commandeId = "Cette commande a déjà été convertie en vente.";
    // Affichez l'alerte pour informer l'utilisateur
    alert("La commande sélectionnée a déjà été convertie en vente. Veuillez en sélectionner une autre.");
    return;  // Arrêter la soumission du formulaire
  }

  try {
    const detailVentesData = newDetailVente.value.map(detail => ({
      quantite: detail.quantite,
      produitId: detail.produitId,
      prix: produits.value.find(p => p.id === detail.produitId)?.prix || 0
    }));

    const venteData = {
      utilisateurId: newVente.value.utilisateurId,
      commandeId: newVente.value.commandeId,
      date: newVente.value.date,
      details: detailVentesData
    };

    // Envoi des données au backend
    await venteStore.addVente(venteData);

    // Message de succès
    alert('Vente ajoutée avec succès !');
    router.push("/dashboard/ventes");
  } catch (error) {
    // Gestion des erreurs backend
    if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach(err => {
        errors.value[err.path] = err.msg; // Stocke chaque erreur par son path
      });
    } else {
      // Gestion des erreurs génériques
      alert('Cette commande a déjà été convertie en vente.');
    }
  }
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
