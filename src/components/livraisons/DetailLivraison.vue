<template>
    <div v-if="livraison" class="commande-detail">
        <h2>Détails de la livraison</h2>

        <p><strong>ID :</strong> {{ livraison.id }}</p>
        <p><strong>Nom de la livraison :</strong> {{ livraison.nom }}</p>
        <p><strong>Date :</strong> {{ livraison.statut }}</p>
        <p><strong>Mode Paiement :</strong> {{ livraison.prix }}</p>
        <p><strong>Produit :</strong> {{ produitNom }}</p>
        <p><strong>Utilisateur :</strong> {{ utilisateurNom }}</p>
    
        <router-link to="/dashboard/livraisons" class="btn btn-primary">Retour à la liste</router-link>
      </div>
    

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useLivraisonStore } from '@stores/livraisonStore';

const route = useRoute();
const store = useLivraisonStore();
const livraison = ref(null);
const produitNom = ref('');
const utilisateurNom = ref('');

onMounted(async () => {
  const id = route.params.id;
  await store.loadDataFromApi(); // Assure que les données sont chargées
  livraison.value = store.livraisons.find((l) => l.id === parseInt(id));

  if (livraison.value) {
    // Charger les utilisateurs et trouver le nom de l'utilisateur associé à cette commande
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
