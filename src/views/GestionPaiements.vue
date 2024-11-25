<template>
  <div class="paiement-management">
      <div class="top-bar">
          <h2>Liste des paiements</h2>
          <router-link class="btn btn-success create-user" to="/dashboard/paiements/ajouter">
            <i class="fas fa-plus-circle"></i> Ajouter un paiement
        </router-link>
      </div>

      <table class="paiement-table">
          <thead>
              <tr>
                <th scope="col">ID</th>
                  <th scope="col">Date</th>
                  <th scope="col">Montant</th>
                  <th scope="col">Mode de paiement</th>
                  <th scope="col">Commande</th>
                  <th class="text-center">Actions</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(paiement,index) in paiements" :key="index">
                <td>{{ paiement.id }}</td>
                  <td>{{ formatDate(paiement.date)}}</td>
                  <td>{{ paiement.montant}} €</td>
                  <td>{{ paiement.mode_paiement }}</td>     
          <td>{{ getCommandeName(paiement.commandeId) }}</td>
                  
                 

                  <td class="actions">
                    <button  @click="confirmRemovePaiement(paiement.id)"  class="btn btn-danger btn-sm me-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                      </svg>
                    </button>
                      <router-link :to="`/dashboard/paiements/modifier/${paiement.id}`" class="btn btn-warning btn-sm me-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                      </router-link>
                    
                      <router-link :to="`/dashboard/paiements/detail/${paiement.id}`" class="btn btn-info btn-sm me-2">
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
import { onMounted, ref } from 'vue';
import { usePaiementStore } from '@/stores/paiementStore';
import { useToast } from 'vue-toastification';
import Swal from 'sweetalert2';
import moment from 'moment';
const paiementStore = usePaiementStore();
const toast = {
    success: (message) => {
        alert(`Succès : ${message}`);
    },
    error: (message) => {
        alert(`Erreur : ${message}`);
    }
};
const formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD');
};
const paiements = ref([]);

onMounted(async () => {
    try {
        await paiementStore.fetchCommandes();
        commandes.value = paiementStore.commandes;
        await paiementStore.loadPaiements();
        paiements.value = paiementStore.paiements;
    } catch (error) {
        console.error("Erreur lors du chargement des paiements :", error.message);
        toast.error("Une erreur est survenue lors du chargement des paiements.");
    }
});
const getCommandeName = (commandeId) => {
    const commande = commandes.value.find((c) => c.id === commandeId);
    return commande ? commande.nom : 'commande non trouve'
}
const commandes = ref([]);
const confirmRemovePaiement = async (id) => {
    const result = await Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Voulez-vous vraiment supprimer ce paiement ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler'
    });
    if (result.isConfirmed) {
        try {
            await paiementStore.removePaiement(id);
            toast.success('Paiement supprimé avec succès !');
            await paiementStore.loadPaiements();
            paiements.value = paiementStore.paiements;
        } catch (error) {
            console.error("Erreur lors de la suppression :", error.message);
            toast.error('Une erreur est survenue lors de la suppression.');
        }
    }
};
</script>
<style scoped>
.paiement-management {
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

.create-paiement {
    color: white;
    border-radius: 5px;
    padding: 10px 15px;
    text-decoration: none;
    display: flex;
    align-items: center;
}

.create-paiement i {
    margin-right: 8px;
}

.paiement-table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.paiement-table th,
.paiement-table td {
    padding: 15px 20px;
    text-align: left;
}

.paiement-table th {
    background-color: #f9f9f9;
    color: #090909;
    font-weight: bold;
}

.paiement-table td {
    border-bottom: 1px solid #ddd;
    color: #333;
}

.paiement-table td:last-child {
    text-align: right;
}

.paiement-table tr:hover {
    background-color: #f5f5f5;
}

.text-center {
    text-align: center;
}
</style>
