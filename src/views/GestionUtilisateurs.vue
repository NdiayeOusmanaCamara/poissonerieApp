<template>
  <div class="commande-management">
      <div class="top-bar">
          <h2>Liste des utilisateur</h2>
          <router-link class="btn btn-success create-utilisateur" :to="{ name: 'ajouter-utilisateur' }">
              <i class="fas fa-plus-circle"></i> Ajouter un utilisateur
          </router-link>
      </div>

      <table class="commande-table">
          <thead>
              <tr>
                    <th scope="col">#</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Email</th>
                  <!-- <th scope="col">Password</th> -->
                  <th scope="col">Role</th>
                  <th scope="col" class="text-center">Actions</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(utilisateur) in filteredUtilisateurs" :key="utilisateur.id">
                <th scope="row">{{ utilisateur.id}}</th>  
                <td>{{ utilisateur.nom }}</td>
                  <td>{{ utilisateur.email }}</td>
                  <!-- <td>{{ utilisateur.password }}</td> -->
                  <td>{{ utilisateur.role }}</td>
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
                      @click="editUtilisateur(utilisateur)"
                      class="btn btn-warning btn-sm me-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
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
import { RouterLink, useRouter } from 'vue-router';
import { useUserStore } from '@stores/utilisateurStore';

const nom = ref ( '' );
onMounted(() => {
  store.loadDataFromApi();
});
const store = useUserStore();

const utilisateurs = store.utilisateurs;
const router =useRouter()

function deleteUtilisateur(id) {
  // Check if the user has any orders
  const utilisateur = store.utilisateurs.find(user => user.id === id);
  
  if (utilisateur && utilisateur.commandes && utilisateur.commandes.length > 0) {
    // If the user has orders, show an alert and prevent deletion
    alert("Impossible de supprimer cet utilisateur car il a des commandes.");
    return;
  }

  // Proceed with deletion confirmation
  const confirmation = window.confirm("Etes-vous sûr de vouloir supprimer cet utilisateur ?");
  if (confirmation) {
    store.deleteUtilisateur(id);
    console.log("Utilisateur supprimé:", id);
  } else {
    console.log("Suppression annulée");
  }
}


const filteredUtilisateurs = computed(() =>
store.utilisateurs.filter((utilisateur) =>
utilisateur.nom.toLowerCase().includes(nom.value.toLowerCase())
))
function editUtilisateur(utilisateur) {
  router.push({ name: "modifier-utilisateur", params: {id: utilisateur.id}});
}
function viewUtilisateur(utilisateur) {
  router.push({ name: "detail-utilisateur", params: { id: utilisateur.id}});
}



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
