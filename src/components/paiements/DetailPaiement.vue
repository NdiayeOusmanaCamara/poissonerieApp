<template>
  <div v-if="commandeNom" class="commande-detail">
    <h2>Détails de la paiement</h2>
  
    <p><strong>ID :</strong> {{ paiement.id }}</p>
    <p><strong>Date :</strong> {{formatDate(paiement.date) }}</p>
    <p><strong>Montant :</strong> {{ paiement.montant }}</p>
    <p><strong>Mode Paiement :</strong> {{ paiement.mode_paiement }}</p>
    <p><strong>Commande :</strong> {{ commandeNom }}</p>
    <p><strong>Utilisateur :</strong> {{ utilisateurNom }}</p>
  
    <router-link to="/dashboard/paiements" class="btn btn-primary">Retour à la liste</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePaiementStore } from '@stores/paiementStore';
import moment from "moment";
const route = useRoute();
const store = usePaiementStore();
const paiement = ref(null);
const commandeNom = ref('');
const utilisateurNom = ref('');


const formatDate = (date) => {
  return moment(date).format("DD/MM/YYYY"); // Format date to DD/MM/YYYY
};
onMounted(async () => {
  const id = route.params.id;
  await store.loadDataFromApi(); // Assure que les données sont chargées
  paiement.value = store.paiements.find((p) => p.id === parseInt(id));

  if (paiement.value) {
    // Charger les commandes et trouver celle associée à cette commande
    const commandes = await store.loadCommandes();
    const commande = commandes.find(c => c.id === paiement.value.commandeId); // Corrected line
    commandeNom.value = commande ? commande.nom : 'Commande inconnue';
  
    // Charger les utilisateurs et trouver l'utilisateur associé à la commande
    const utilisateurs = await store.loadUtilisateurs();
    const utilisateur = utilisateurs.find(u => u.id === paiement.value.utilisateurId); // Corrected line
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
