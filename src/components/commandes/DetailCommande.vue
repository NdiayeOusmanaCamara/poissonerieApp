<template>
  <div v-if="commande" class="commande-details mt-4">
    <h3>Détails de la commande #{{ commande.id }}</h3>
    <p><strong>Date:</strong> {{ formatDate(commande.commande_date) }}</p>
    <p><strong>Utilisateur:</strong> {{ getUtilisateurNom(commande.utilisateurId) }}</p>
    <p><strong>Prix:</strong> {{ commande.prix }}</p>
    
    <div v-if="commande.details && commande.details.length">
      <h5>Produits dans la commande :</h5>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Prix unitaire</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detail, index) in commande.details" :key="index">
            <td>{{ getProduitNom(detail.produitId) }}</td>
            <td>{{ detail.quantite }}</td>
            <td>{{ detail.prix }} €</td>
          </tr>
        </tbody>
      </table>
    </div>
    <router-link to="/dashboard/commandes" class="btn btn-primary">Retour à la liste</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCommandeStore } from '@stores/commandeStore';
import { useProduitStore } from '@stores/produitStore';
import { useUserStore } from '@stores/utilisateurStore';
import moment from 'moment';

const route = useRoute();
const store = useCommandeStore();
const produitStore = useProduitStore();
const utilisateurStore = useUserStore();
const commande = ref(null);

// Chargement des données de la commande en fonction de l'ID de la route
onMounted(async () => {
  await store.fetchCommandes();
  await produitStore.loadProduits();
  await utilisateurStore.loadUtilisateurs();
  
  commande.value = store.commandes.find(c => c.id === Number(route.params.id));
});

// Méthodes utilitaires
const getProduitNom = (produitId) => {
  const produit = produitStore.produits.find(p => p.id === produitId);
  return produit ? produit.nom : 'Produit inconnu';
};

const getUtilisateurNom = (utilisateurId) => {
  const utilisateur = utilisateurStore.utilisateurs.find(u => u.id === utilisateurId);
  return utilisateur ? utilisateur.nom : 'Utilisateur inconnu';
};

const formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD');
};
</script>

<style scoped>
.commande-details {
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.commande-details h3 {
  margin-bottom: 20px;
}
</style>
