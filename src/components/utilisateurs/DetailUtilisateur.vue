<template>
  <div class="form-container d-flex align-items-center" v-if="userStore.user && userStore.user.nom">
      <div class="form-content">
          <router-link to="/dashboard/utilisateurs" class="btn btn-secondary mb-3">
              <i class="fas fa-arrow-left"></i>
          </router-link>

          <form class="p-4 shadow-sm bg-white rounded">
              <h2 class="text-center mb-4">Détails de l'utilisateur</h2>
              <div class="form-group mb-3">
                  <label for="name" class="form-label">Nom</label>
                  <input type="text" v-model="userStore.user.nom" class="form-control" readonly />
              </div>
              <div class="form-group mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" v-model="userStore.user.email" class="form-control" readonly />
              </div>
              <div class="form-group mb-4">
                  <label for="role" class="form-label">Rôle</label>
                  <select v-model="userStore.user.role" class="form-control" disabled>
                      <option value="ADMIN">ADMIN</option>
                      <option value="GESTIONNAIRE">GESTIONNAIRE</option>
                  </select>
              </div>
          </form>
      </div>
  </div>
  <p v-else>Chargement des détails de l'utilisateur...</p>
</template>


<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@stores/utilisateurStore';

const userStore = useUserStore();
const route = useRoute();


onMounted(() => {
  const userId = route.params.id;
  userStore.loadUserById(userId);
});
</script>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-content {
  flex: 1;
}

.form-control {
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid #ced4da;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: none;
}


.btn:hover {
  background-color: #1abc9c;
}

h2 {
  color: #343a40;
  font-weight: bold;
}

.shadow-sm {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.bg-white {
  background-color: white;
}

.rounded {
  border-radius: 8px;
}
</style>