<template>
  <div v-if="produit" class="commande-detail">
    <h2>Détails du produit</h2>

    <p><strong>ID :</strong> {{ produit.id }}</p>
    <p><strong>Nom :</strong> {{ produit.nom }}</p>
    <p><strong>Catégorie :</strong> {{ produit.categorie }}</p>
    <p><strong>Quantité :</strong> {{ produit.quantite }}</p>
    <p><strong>Prix :</strong> {{ produit.prix }}</p>
    <p><strong>Description :</strong> {{ produit.description }}</p>
    <p><strong>Date :</strong> {{formatDate(produit.date) }}</p>
    <p><strong>Stock :</strong> {{ produit.stock }}</p> <!-- Ajout du stock -->
    <p><strong>Utilisateur :</strong> {{ utilisateurNom }}</p>

    <router-link to="/dashboard/produits" class="btn btn-primary">Retour à la liste</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProduitStore } from '@stores/produitStore';
import moment from 'moment';
const route = useRoute();
const store = useProduitStore();
const produit = ref(null);
const utilisateurNom = ref('');

const formatDate = (date) => {
  return moment(date).format("DD/MM/YYYY"); // Format date to DD/MM/YYYY
};

onMounted(async () => {
  const id = route.params.id;
  await store.loadDataFromApi(); 
  produit.value = store.produits.find((cmd) => cmd.id === parseInt(id));

  if (produit.value) {
    const utilisateurs = await store.loadUtilisateurs();
    const utilisateur = utilisateurs.find(u => u.id === produit.value.utilisateurId);
    utilisateurNom.value = utilisateur ? utilisateur.nom : 'Utilisateur inconnu';
  }
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

h2 {
  margin-bottom: 20px;
}

p {
  margin: 10px 0;
  font-size: 18px;
}

.btn-primary {
  margin-top: 20px;
  display: inline-block;
  padding: 10px 20px;
  text-decoration: none;
}
</style>
