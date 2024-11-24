<template>
  <div class="form-container d-flex align-items-center">
      <div class="form-content">
          <router-link to="/dashboard/utilisateurs" class="btn btn-secondary mb-3">
              <i class="fas fa-arrow-left"></i>
          </router-link>

          <form @submit.prevent="updateUser" class="p-4 shadow-sm bg-white rounded">
              <h2 class="text-center mb-4">Modifier l'utilisateur</h2>
              <div class="form-group mb-3">
                  <label for="name" class="form-label">Nom</label>
                  <input type="text" v-model="nom" class="form-control" placeholder="Entrez le nom" required />
                <small v-if="errors.nom" class="text-danger">{{ errors.nom }}</small>  
              </div>
              <div class="form-group mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" v-model="email" class="form-control" placeholder="Entrez l'adresse email"
                      required />
                  <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
              </div>
              <div class="form-group mb-4">
                  <label for="role" class="form-label">Rôle</label>
                  <select v-model="role" class="form-control" required>
                      <option value="ADMIN">ADMIN</option>
                      <option value="GESTIONNAIRE">GESTIONNAIRE</option>
                  </select>
                  <small v-if="errors.role" class="text-danger">{{ errors.role }}</small>
              </div>
              <button type="submit" class="btn btn-success w-100">Mettre à jour l'utilisateur</button>
          </form>
      </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@stores/utilisateurStore';
import { useToast } from 'vue-toastification';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const nom = ref('');
const email = ref('');
const role = ref('GESTIONNAIRE');
const errors = ref({});

onMounted(() => {
  const userId = route.params.id;
  userStore.loadUserById(userId).then(() => {
      nom.value = userStore.user.nom;
      email.value = userStore.user.email;
      role.value = userStore.user.role;
  });
});

const updateUser = async () => {
  errors.value = {};
  try {
      const userId = route.params.id;
      const updatedUser = {
          nom: nom.value,
          email: email.value,
          role: role.value
      };

      await userStore.updateUser(userId, updatedUser);
      toast.success('Utilisateur mis à jour avec succès !');
      router.push('/dashboard/utilisateurs');
  } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
          error.response.data.errors.forEach(err => {
              errors.value[err.path] = err.msg;
          });
      } else {
          toast.error('Une erreur est survenue lors de la mise à jour.');
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