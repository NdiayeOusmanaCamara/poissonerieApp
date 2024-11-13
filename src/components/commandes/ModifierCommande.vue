<template>
  <div class="commande-detail">
    <h2 class="text-center mb-4">Modifier la commande</h2>

    <form @submit.prevent="handleSubmit">
      <div class="d-flex justify-content-end gap-5">
        <router-link to="/dashboard/commandes" class="btn btn-primary mt-3">Retour à la liste</router-link>
        <button type="submit" class="btn btn-success mt-4">Mettre à jour la commande</button>
      </div>

      <div class="d-flex justify-content-between gap-3 mt-3">
        <div class="form-group w-100">
          <label for="nom" class="form-label">Nom de la commande</label>
          <input type="text" id="nom" v-model="form.nom" class="form-control" required />
        </div>
        <div class="form-group w-100">
          <label for="date" class="form-label">Date de commande</label>
          <input type="date" id="date" v-model="form.date" class="form-control" required />
        </div>
      </div>

      <div class="d-flex justify-content-between gap-3 mt-3">
        <div class="form-group w-100">
          <label for="prix" class="form-label">Prix</label>
          <input type="number" id="prix" v-model="form.prix" class="form-control" required />
        </div>
        <div class="form-group w-100">
          <label for="utilisateurId" class="form-label">Utilisateur</label>
          <select id="utilisateurId" v-model="form.utilisateurId" class="form-control" required>
            <option disabled value="">Sélectionne un utilisateur</option>
            <option v-for="utilisateur in utilisateurs" :key="utilisateur.id" :value="utilisateur.id">
              {{ utilisateur.nom }}
            </option>
          </select>
        </div>
      </div>

      <!-- Section Détails de la Commande -->
      <div>
        <h3>Détails de la commande</h3>
        <div v-for="(detail, index) in form.detailsCommande" :key="index" class="mb-3">
          <div class="row">
            <div class="col-md-4">
              <label class="form-label">Produit</label>
              <select v-model="detail.produitId" class="form-control" required>
                <option disabled value="">Sélectionne un produit</option>
                <option v-for="produit in produits" :key="produit.id" :value="produit.id">
                  {{ produit.nom }}
                </option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Quantité</label>
              <input type="number" v-model="detail.quantite" class="form-control" required min="1" />
            </div>
            <div class="col-md-3">
              <label class="form-label">Prix unitaire</label>
              <input type="number" v-model="detail.prix" class="form-control" required min="0" step="0.01" />
            </div>
            <div class="col-md-2 d-flex align-items-end">
              <button type="button" class="btn btn-danger" @click="removeDetail(index)">
                Supprimer
              </button>
            </div>
          </div>
        </div>
        <button type="button" @click="addDetail" class="btn btn-primary mt-3">
          Ajouter un produit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCommandeStore } from '@stores/commandeStore';
import { useProduitStore } from '@stores/produitStore';
import { useUserStore } from '@stores/utilisateurStore';
import moment from 'moment';

// Initialisations
const router = useRouter();
const route = useRoute();
const commandeStore = useCommandeStore();
const produitStore = useProduitStore();
const utilisateurStore = useUserStore();

// Références du formulaire
const form = ref({
  nom: '',
  date: '',
  prix: 0,
  utilisateurId: '',
  detailsCommande: [{ produitId: '', quantite: 1, prix: 0 }]
});

// Liste des utilisateurs et produits
const utilisateurs = ref([]);
const produits = ref([]);
const commandeId = ref(route.params.id); // Récupération de l'ID de la commande

// Charger les données lors du montage du composant
onMounted(async () => {
  try {
    await utilisateurStore.loadUtilisateurs();
    await produitStore.loadProduits();
    utilisateurs.value = utilisateurStore.utilisateurs;
    produits.value = produitStore.produits;

    // Charger la commande actuelle
    const commande = await commandeStore.getCommandeById(commandeId.value);
    form.value.nom = commande.value.nom;
    form.value.date = moment(commande.date).format('YYYY-MM-DD');
    form.value.prix = commande.prix;
    form.value.utilisateurId = commande.utilisateurId;
    form.value.detailsCommande = commande.detailsCommande.map(detail => ({
      produitId: detail.produitId,
      quantite: detail.quantite,
      prix: detail.prix
    }));
  } catch (error) {
    console.error("Erreur lors du chargement des données:", error.message);
  }
});

// Ajouter un détail de commande
const addDetail = () => {
  form.value.detailsCommande.push({ produitId: '', quantite: 1, prix: 0 });
};

// Supprimer un détail de commande
const removeDetail = (index) => {
  if (form.value.detailsCommande.length > 1) {
    form.value.detailsCommande.splice(index, 1);
  }
};

// Calculer le prix total de la commande
const calculateTotalPrice = () => {
  return form.value.detailsCommande.reduce((total, detail) => total + (detail.quantite * detail.prix), 0);
};

// Gérer la soumission du formulaire
const handleSubmit = async () => {
  form.value.prix = calculateTotalPrice();

  try {
    await commandeStore.updateCommande({
      id: commandeId.value,
      ...form.value
    });
    router.push('/dashboard/commandes'); // Redirection après mise à jour
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la commande:", error.message);
  }
};
</script>

<style scoped>
/* Styles pour rendre le formulaire propre et aligné */
.commande-detail {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
}

button {
  margin-top: 20px;
}

.btn-primary {
  display: inline-block;
  padding: 10px 20px;
  text-decoration: none;
}
</style>
