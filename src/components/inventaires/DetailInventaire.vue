<template>
    <div v-if="inventaire" class="commande-detail">
        <h2>Détails inventaire</h2>

        <p><strong>Quantite :</strong> {{ inventaire.id }}</p>
        <p><strong>Type :</strong> {{ inventaire.nom }}</p>
        <p><strong>Produit :</strong> {{ produitNom }}</p>
        <p><strong>Utilisateur :</strong> {{ utilisateurNom }}</p>
    
        <router-link to="/dashboard/inventaires" class="btn btn-primary">Retour à la liste</router-link>
      </div>
    

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useInventaireStore } from '@stores/inventaireStore';

const route = useRoute();
const store = useInventaireStore();
const inventaire = ref(null);
const produitNom = ref('');
const utilisateurNom = ref('');

onMounted(async () => {
  const id = route.params.id;
  await store.loadDataFromApi();
  inventaire.value = store.inventaires.find((i) => i.id === parseInt(id));

  if (inventaire.value) {
    const produits = await store.loadProduits();
    const produit = produits.find(l => l.id === produit.value.produitId);
produitNom.value = produit ? produit.nom : 'produit inconnu';
  
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
