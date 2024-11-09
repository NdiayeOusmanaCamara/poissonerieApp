<template>
    <div v-if="vente" class="commande-detail">
      <h2>Détails de la vente</h2>
  
      <p><strong>ID :</strong> {{ vente.id }}</p>
      <p><strong>Montant  :</strong> {{ vente.montant }}</p>
      <p><strong>Date :</strong> {{ vente.date }}</p>
      <p><strong>Utilisateur :</strong> {{ utilisateurNom }}</p>
  
      <router-link to="/dashboard/ventes" class="btn btn-primary">Retour à la liste</router-link>
    </div>
  </template>
  

<script setup>

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useVenteStore } from '@stores/venteStore';

const route = useRoute();
const store = useVenteStore();
const vente = ref(null);
const utilisateurNom = ref('');

onMounted(async () => {
  const id = route.params.id;
  await store.loadDataFromApi(); // Assure que les données sont chargées
  vente.value = store.ventes.find((v) => v.id === parseInt(id));

  if (vente.value) {
    // Charger les utilisateurs et trouver le nom de l'utilisateur associé à cette commande
    const utilisateurs = await store.loadUtilisateurs();
    const utilisateur = utilisateurs.find(u => u.id === vente.value.utilisateurId);
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
