<template>
  <div v-if="commande" class="commande-detail">
    <h2>Détails de la commande</h2>

    <p><strong>ID :</strong> {{ detail.id }}</p>
    <p><strong>Produit :</strong> {{ produitNom }}</p>
    <p><strong>Quantite :</strong> {{ detail.quantite }}</p>
    <p><strong>Prix :</strong> {{ detail.prix }}</p>
    <p><strong>Commande :</strong> {{ commandeNom}}</p>
   

    <router-link to="/dashboard/commandes" class="btn btn-primary">Retour à la liste</router-link>
  </div>
</template>

<script setup> 
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCommandeStore } from '@stores/commandeStore';

const route = useRoute();
const store = useCommandeStore();
const commande = ref(null);
const utilisateurNom = ref('');

// Charger les détails de la commande
onMounted(async () => {
  const id = route.params.id;
  await store.loadDataFromApi(); // Assure que les données sont chargées
  commande.value = store.commandes.find((cmd) => cmd.id === parseInt(id));

  if (commande.value) {
    // Charger les utilisateurs et trouver le nom de l'utilisateur associé à cette commande
    const utilisateurs = await store.loadUtilisateurs();
    const utilisateur = utilisateurs.find(u => u.id === commande.value.utilisateurId);
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
