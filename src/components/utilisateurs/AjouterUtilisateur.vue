<template>
  <div class="form-container d-flex align-items-center">
      <div class="form-content">
          <router-link to="/dashboard/utilisateurs" class="btn btn-secondary mb-3">
              <i class="fas fa-arrow-left"></i>
          </router-link>

          <form @submit.prevent="addUser" class="p-4 shadow-sm bg-white rounded">
              <h2 class="text-center mb-4">Ajouter un utilisateur</h2>
              <div class="d-flex justify-content-between gap-4">
                  <div class="form-group mb-3 w-100">
                      <label for="name" class="form-label">Nom</label>
                      <input type="text" v-model="nom" class="form-control" placeholder="Entrez le nom" required />
                      <small v-if="errors.nom" class="text-danger">{{ errors.nom }}</small>
                  </div>
                  <div class="form-group mb-3 w-100">
                      <label for="email" class="form-label">Email</label>
                      <input type="email" v-model="email" class="form-control" placeholder="Entrez l'adresse email" required />
                      <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
                  </div>
              </div>
              <div class="d-flex justify-content-between gap-4">
                  <div class="form-group mb-4 w-100">
                      <label for="role" class="form-label">Rôle</label>
                      <select v-model="role" class="form-control" required>
                          <option value="ADMIN">ADMIN</option>
                          <option value="GESTIONNAIRE">GESTIONNAIRE</option>
                      </select>
                      <small v-if="errors.role" class="text-danger">{{ errors.role }}</small>
                  </div>
                  <div class="form-group mb-3 w-100">
                      <label for="password" class="form-label">Mot de passe</label>
                      <input type="password" v-model="password" class="form-control" placeholder="Entrez le mot de passe" required />
                      <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
                  </div>
              </div>
              <button type="submit" class="btn btn-success w-100">Ajouter l'utilisateur</button>
          </form>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@stores/utilisateurStore';
import { useToast } from 'vue-toastification';
import { useRouter } from "vue-router";

const toast = {
    success: (message) => {
        alert(`Succès : ${message}`);
    },
    error: (message) => {
        alert(`Erreur : ${message}`);
    }
};
const route = useRouter();

const nom = ref('');
const email = ref('');
const password = ref('');
const role = ref('GESTIONNAIRE');
const errors = ref({});

const userStore = useUserStore();

const addUser = async () => {
  errors.value = {};
  try {
    
      await userStore.addUser({
          nom: nom.value,
          email: email.value,
          role: role.value,
          password: password.value
      });
      toast.success('Utilisateur ajouté avec succès !');
      route.push("/dashboard/utilisateurs");
  } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
          error.response.data.errors.forEach(err => {
              errors.value[err.path] = err.msg;
          });
      } else {
          toast.error('Une erreur est survenue lors de l\'ajout.');
      }
  }
};
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
