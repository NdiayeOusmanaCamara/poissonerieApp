<template>
  <div class="commande-management">
    <div class="top-bar">
      <h2>Liste des commandes</h2>
      <router-link class="btn btn-success create-commande" to="/dashboard/commandes/ajouter">
        <i class="fas fa-plus-circle"></i> Ajouter une commande
      </router-link>
    </div>

    <!-- Add a search input for filtering orders -->
    <input v-model="nom" type="text" placeholder="Rechercher par nom..." class="form-control mb-4"/>

    <table class="table table-striped table-bordered mt-4 mb-4">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nom</th>
          <th scope="col">Prix</th>
          <th scope="col">Date</th>
          <th scope="col">Utilisateur</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(commande) in filteredCommandes" :key="commande.id">
          <th scope="row">{{ commande.id }}</th>
          <td>{{ commande.nom }}</td>
          <td>{{ commande.prix }}</td>
          <td>{{ formatDate(commande.date) }}</td>
          <td>{{ getUtilisateurNom(commande.utilisateurId) }}</td>
            <td class="text-center">
              <button
                @click="deleteUtilisateur(utilisateur.id)"
                class="btn btn-danger btn-sm me-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash3"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
                  />
                </svg>
              </button>
             
              <button
                @click="viewUtilisateur(utilisateur)"
                class="btn btn-info btn-sm me-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-eye"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                  />
                  <path
                    d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                  />
                </svg>
              </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCommandeStore } from '@stores/commandeStore';
import moment from 'moment';

const store = useCommandeStore();
const router = useRouter();
const utilisateurs = ref([]);
const produits = ref([]);
const selectionCommande = ref(null);
const nom = ref('');  // Define the 'nom' variable for filtering

onMounted(() => {
  store.loadDataFromApi(); // Load orders
  loadUtilisateurs();
  loadProduits();
});

const loadUtilisateurs = async () => {
  utilisateurs.value = await store.loadUtilisateurs();
};

const loadProduits = async () => {
  produits.value = await store.loadProduits();
};

const getUtilisateurNom = (utilisateurId) => {
  const utilisateur = utilisateurs.value.find((u) => u.id === utilisateurId);
  return utilisateur ? utilisateur.nom : 'Utilisateur non trouvé';
};

const getProduitNom = (produitId) => {
  const produit = produits.value.find((p) => p.id === produitId);
  return produit ? produit.nom : 'Produit inconnu';
};

const filteredCommandes = computed(() => {
  return store.commandes.filter((commande) =>
    commande.nom.toLowerCase().includes(nom.value.toLowerCase())  // Use 'nom' to filter commandes
  );
});

const deleteCommande = (id) => {
  const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ?");
  if (confirmation) {
    store.deleteCommande(id);
  }
};

const openModal = (commande) => {
  selectionCommande.value = commande;
  const modal = new bootstrap.Modal(document.getElementById('detailsModal'));
  modal.show();
};

const formatDate = (date) => {
  return moment(date).format('DD/MM/YYYY');
};
</script>


<style scoped>
.commande-management {
    margin: 0 auto;
    max-width: 1200px;
}

.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    margin-top: 100px;
}

h2 {
    font-size: 24px;
    color: #4a4a4a;
}

.create-commande {
    color: white;
    border-radius: 5px;
    padding: 10px 15px;
    text-decoration: none;
    display: flex;
    align-items: center;
}

.create-commande i {
    margin-right: 8px;
}

.commande-table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.commande-table th,
.commande-table td {
    padding: 15px 20px;
    text-align: left;
}

.commande-table th {
    background-color: #f9f9f9;
    color: #666;
    font-weight: bold;
}

.commande-table td {
    border-bottom: 1px solid #e3e3e3;
    color: #333;
}

.commande-table tbody tr:hover {
    background-color: #f1f1f1;
}

.actions {
    text-align: center;
}

.action-btn {
    background-color: transparent;
    border: none;
    margin-right: 10px;
    cursor: pointer;
}

.action-btn i {
    color: #6c757d;
    font-size: 18px;
}
</style>
