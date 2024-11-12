<template>
  <div class="commande-detail">
    <div class="top-bar">
      <h2>Détail de la commande #{{ commande.id }}</h2>
      <router-link class="btn btn-primary" to="/dashboard/commandes">Retour à la liste</router-link>
    </div>

    <div class="commande-info">
      <p><strong>Nom de la commande:</strong> {{ commande.nom }}</p>
      <p><strong>Prix:</strong> {{ commande.prix }} €</p>
      <p><strong>Date de la commande:</strong> {{ formatDate(commande.date) }}</p>
      <p><strong>Utilisateur:</strong> {{ getUtilisateurNom(commande.utilisateurId) }}</p>
      <p><strong>Produit(s):</strong> {{ getProduitNom(commande.produitId) }}</p>

      <div v-if="commande.details">
        <h3>Détails supplémentaires:</h3>
        <ul>
          <li><strong>Adresse de livraison:</strong> {{ commande.details.adresseLivraison }}</li>
          <li><strong>Statut de la commande:</strong> {{ commande.details.statut }}</li>
          <li><strong>Notes:</strong> {{ commande.details.notes }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCommandeStore } from '@stores/commandeStore';
import moment from 'moment';

const store = useCommandeStore();
const route = useRoute();
const commande = ref(null);

// Fetch the order details when the component is mounted
onMounted(() => {
  const commandeId = route.params.id;
  loadCommandeDetails(commandeId);
});

// Fetch the command details from the store or API
const loadCommandeDetails = (id) => {
  commande.value = store.commandes.find((c) => c.id === parseInt(id)); // Assuming store holds all commandes
};

// Helper functions
const formatDate = (date) => {
  return moment(date).format('DD/MM/YYYY');
};

const getUtilisateurNom = (utilisateurId) => {
  const utilisateur = store.utilisateurs.find((u) => u.id === utilisateurId);
  return utilisateur ? utilisateur.nom : 'Utilisateur non trouvé';
};

const getProduitNom = (produitId) => {
  const produit = store.produits.find((p) => p.id === produitId);
  return produit ? produit.nom : 'Produit inconnu';
};
</script>

<style scoped>
.commande-detail {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  font-size: 24px;
  color: #333;
}

.commande-info {
  margin-top: 20px;
  font-size: 16px;
  color: #555;
}

.commande-info p {
  margin: 10px 0;
}

.commande-info strong {
  font-weight: bold;
}

.btn {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
