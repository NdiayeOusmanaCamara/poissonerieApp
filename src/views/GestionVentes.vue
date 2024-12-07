<template>
  <div class="vente-management">
    <div class="top-bar">
        <h2>Liste des ventes</h2>
        <router-link class="btn btn-success create-vente" to="/dashboard/ventes/ajouter">
            <i class="fas fa-plus-circle"></i> Ajouter une vente
        </router-link>
    </div>

    <!-- Table des ventes -->
    <table class="vente-table">
      <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Date</th>
            <th scope="col">Montant</th>
            <th class="text-center">Action</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="(vente, index) in filteredVentes" :key="index">
            <td>{{ vente.id}}</td>
            <td>{{ formatDate(vente.date) }}</td>
            <td>{{ vente.montant }} </td>
            <td class="text-center">
              
              <!-- <button @click="editVente(vente)" class="btn btn-warning btn-sm me-2">Modifier</button> -->
              <button v-if="isAdmin" @click="confirmRemoveVente(vente.id)"  class="btn btn-danger btn-sm me-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
              </button>
              <router-link :to="`/dashboard/ventes/detail/${vente.id}`" class="btn btn-info btn-sm me-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                </svg>
              </router-link>
            </td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useVenteStore } from '@stores/venteStore';
import { useRouter } from 'vue-router';
import moment from 'moment';
import { useAuthStore } from '@stores/authStore';
import { useToast } from 'vue-toastification';
import Swal from 'sweetalert2';

const isAdmin = computed(() => authStore.utilisateur?.role === 'ADMIN');
const router = useRouter();
const authStore = useAuthStore()
const store = useVenteStore();

// Récupération des données des ventes lors du montage du composant
onMounted(async () => {
  try {
    await store.fetchVentes();
  ventes.value = store.ventes;
    } catch (error) {
        
    }
});

// Formatage de la date avec moment.js
const formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD');
};
const toast = {
    success: (message) => {
        alert(`Succès : ${message}`);
    },
    error: (message) => {
        alert(`Erreur : ${message}`);
    }
};
// Propriété calculée pour filtrer les ventes
const filteredVentes = computed(() => {
  return store.ventes; // Applique une logique de filtrage si nécessaire
});

// Gestion des actions : Voir, Modifier, Supprimer



const confirmRemoveVente = async (id) => {
  const result = await Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: 'Voulez-vous vraiment supprimer cette vente ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler'
  });

  if (result.isConfirmed) {
    try {
      await store.removeVente(id);
      toast.success('Vente supprimée avec succès !');
      await store.fetchVentes(); // Rafraîchir la liste des ventes
    } catch (error) {
      console.error("Erreur lors de la suppression:", error.message);
      toast.error('impossible de supprimer ');
    }
  }
};
</script>

<style scoped>
/* Styles pour la gestion des ventes */
.vente-management {
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
    color: #090909;
}

.create-vente {
    color: white;
    border-radius: 5px;
    padding: 10px 15px;
    text-decoration: none;
    display: flex;
    align-items: center;
}

.create-vente i {
    margin-right: 8px;
}

.vente-table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.vente-table th,
.vente-table td {
    padding: 15px 20px;
    text-align: left;
}

.vente-table th {
    background-color: #f9f9f9;
    color: #090909;
    font-weight: bold;
}

.vente-table td {
    border-bottom: 1px solid #e3e3e3;
    color: #090909;
}

.vente-table tbody tr:hover {
    background-color: #f1f1f1;
}
</style>
