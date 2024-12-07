<template>
  <div class="form-container d-flex align-items-center">
    <div class="form-content">
      <router-link to="/dashboard/utilisateurs" class="btn btn-secondary mb-3">
        <i class="fas fa-arrow-left"></i>
      </router-link>

      <form @submit.prevent="updateUser" class="p-4 shadow-sm bg-white rounded">
        <h2 class="text-center mb-4">Modifier l'utilisateur</h2>
        
        <!-- Nom de l'utilisateur -->
        <div class="form-group mb-3">
          <label for="name" class="form-label">Nom</label>
          <input type="text" v-model="nom" class="form-control" placeholder="Entrez le nom" required />
          <small v-if="errors.nom" class="text-danger">{{ errors.nom }}</small>  
        </div>
        
        <!-- Email de l'utilisateur -->
        <div class="form-group mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" v-model="email" class="form-control" placeholder="Entrez l'adresse email" required />
          <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
        </div>
        
        <!-- Rôle de l'utilisateur -->
        <div class="form-group mb-4">
          <label for="role" class="form-label">Rôle</label>
          <select v-model="role" class="form-control" required>
            <option value="ADMIN">ADMIN</option>
            <option value="GESTIONNAIRE">GESTIONNAIRE</option>
          </select>
          <small v-if="errors.role" class="text-danger">{{ errors.role }}</small>
        </div>
        
        <!-- Bouton de soumission -->
        <button type="submit" class="btn btn-success w-100">Mettre à jour l'utilisateur</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@stores/utilisateurStore'; // Import du store utilisateur
import { useToast } from 'vue-toastification'; // Pour les notifications

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const toast = {
    success: (message) => {
        alert(`Succès : ${message}`);
    },
    error: (message) => {
        alert(`Erreur : ${message}`);
    }
};

// Variables réactives pour le formulaire
const nom = ref('');
const email = ref('');
const role = ref('GESTIONNAIRE');
const errors = ref({}); // Pour stocker les erreurs de validation

// Charger l'utilisateur à la monture du composant
onMounted(() => {
  const userId = route.params.id; // Récupérer l'ID de l'utilisateur à partir des paramètres de l'URL
  userStore.loadUserById(userId).then(() => {
    nom.value = userStore.user.nom;
    email.value = userStore.user.email;
    role.value = userStore.user.role;
  });
});

// Fonction pour mettre à jour l'utilisateur
const updateUser = async () => {
  errors.value = {}; // Réinitialiser les erreurs
  try {
    const userId = route.params.id;
    const updatedUser = {
      nom: nom.value,
      email: email.value,
      role: role.value
    };

    // Appeler la fonction du store pour mettre à jour l'utilisateur
    await userStore.updateUser(userId, updatedUser);
    toast.success('Utilisateur mis à jour avec succès !'); // Notification de succès
    router.push('/dashboard/utilisateurs'); // Redirection vers la page des utilisateurs
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      // Gérer les erreurs de validation renvoyées par l'API
      error.response.data.errors.forEach(err => {
        errors.value[err.path] = err.msg;
      });
    } else {
      toast.error('Une erreur est survenue lors de la mise à jour.'); // Notification d'erreur
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
