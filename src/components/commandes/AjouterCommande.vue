<template>
  <div class="commande-detail">
    <h2>Ajouter une commande</h2>

    <form @submit.prevent="handleSubmit">
      <!-- Retour à la liste et soumission -->
      <div class="d-flex justify-content-end gap-5">
        <router-link to="/dashboard/commandes" class="btn btn-primary mt-3">Retour à la liste</router-link>
        <button type="submit" class="btn btn-success">Ajouter</button>
      </div>

      <!-- Nom et Date de la commande -->
      <div class="d-flex justify-content-between gap-3 mt-3">
        <div class="form-group w-100">
          <label for="nom" class="form-label">Nom de la commande</label>
          <input type="text" id="nom" v-model="form.nom" class="form-control" required />
        </div>
        <div class="form-group w-100">
          <label for="date" class="form-label">Date</label>
          <input type="date" id="date" v-model="form.date" class="form-control" required />
        </div>
      </div>

      <!-- Utilisateur et Statut -->
      <div class="d-flex justify-content-between gap-3 mt-3">
        <div class="form-group w-100">
          <label for="utilisateur" class="form-label">Utilisateur</label>
          <select id="utilisateur" v-model="form.utilisateurId" class="form-control" required>
            <option v-for="utilisateur in utilisateurs" :key="utilisateur.id" :value="utilisateur.id">
              {{ utilisateur.nom }}
            </option>
          </select>
        </div>
        <div class="form-group w-100">
          <label for="statut" class="form-label">Statut de la commande</label>
          <input type="text" id="statut" v-model="form.statut" class="form-control" required />
        </div>
      </div>

      <!-- Détails de la commande -->
      <div class="mt-4">
        <h3>Détails de la commande</h3>

        <div v-for="(detail, index) in detailcommande" :key="index" class="mb-3">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="produit">Produit</label>
                <select v-model="detail.produitId" class="form-control" required>
                  <option disabled value="">Sélectionner un produit</option>
                  <option v-for="produit in produits" :key="produit.id" :value="produit.id">
                    {{ produit.nom }}
                  </option>
                </select>
              </div>
            </div>

            <div class="col-md-3">
              <label for="quantite">Quantité</label>
              <input type="number" v-model="detail.quantite" class="form-control" required />
            </div>

            <div class="col-md-3">
              <label for="prix">Prix</label>
              <input type="number" v-model="detail.prix" class="form-control" required />
            </div>
          </div>
        </div>

        <!-- Bouton pour ajouter un détail -->
        <button type="button" @click="addDetail" class="btn btn-primary mt-3">Ajouter un détail</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCommandeStore } from '@stores/commandeStore';
import { useProduitStore } from '@stores/produitStore';
import { useUserStore } from '@stores/utilisateurStore';

// Stores pour récupérer les données
const commandeStore = useCommandeStore();
const produitStore = useProduitStore();
const utilisateurStore = useUserStore();

// Variables du formulaire et données externes
const form = ref({
  nom: '',
  date: '',
  statut: '',
  utilisateurId: null,
});
const detailcommande = ref([{ produitId: '', quantite: 1, prix: 0 }]);

// Chargement des utilisateurs et produits
const utilisateurs = ref([]);
const produits = ref([]);

// Ajouter un détail de commande
const addDetail = () => {
  detailcommande.value.push({ produitId: '', quantite: 1, prix: 0 });
};

// Calcul du prix total de la commande
const calculateTotalPrix = () => {
  return detailcommande.value.reduce((total, detail) => total + detail.prix * detail.quantite, 0);
};

// Soumettre la commande
const handleSubmit = async () => {
  const totalPrix = calculateTotalPrix();

  const nouvelleCommande = {
    nom: form.value.nom,
    statut: form.value.statut,
    prix: totalPrix,
    date: form.value.date,
    utilisateurId: form.value.utilisateurId,
    details: detailcommande.value.map(detail => ({
      produitId: detail.produitId,
      quantite: detail.quantite,
      prix: detail.prix,
    })),
  };

  await commandeStore.addCommande(nouvelleCommande);
};

// Charger les utilisateurs et produits lors du montage
onMounted(async () => {
  utilisateurs.value = await utilisateurStore.loadUtilisateurs();
  produits.value = await produitStore.loadProduits();
});
</script>


<style scoped>
.commande-detail {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2, h3 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

button {
  margin-top: 20px;
}
</style>
