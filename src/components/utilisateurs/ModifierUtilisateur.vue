<template>
  <div v-if="utilisateur" class="commande-detail">
    <h2>Modifier utilisateur </h2>
          
          <form @submit.prevent="submitForm">
            <div class="form-group">
                  <label for="nom">Nom</label>
                  <input type="text" id="nom" v-model="form.nom" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input type="email" step="0.01" v-model="form.email" class="form-control" placeholder="Email" required />
            </div>
            <!-- <div class="form-group mb-4">
                <label for="password" class="form-label">Password</label>
                <input type="password" v-model="password" class="form-control" placeholder="Password" required />
            </div> -->
              <div class="form-group">
                  <label for="role">Role</label>
                  <select id="role" v-model="form.role" class="form-control" required>
                      <option value="GESTIONNAIRE">GESTIONNAIRE</option>
                      <option value="ADMIN">ADMIN</option>
                  </select>
              </div>
              <div class=" modal-footer d-flex justify-content-end gap-5">
                <router-link  to="/dashboard/utilisateurs" class="btn btn-primary mt-3" >Retour à la liste </router-link>
                <button type="submit" class="btn btn-success">Modifie</button>
             
            </div>
          </form>
         
      </div>
    
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@stores/utilisateurStore";

const store = useUserStore();
const route = useRoute();
const router = useRouter();

const utilisateur = ref(null);
const form = reactive({
  nom: '',
  email: '',
  password: '',
  role: 'GESTIONNAIRE', // valeur par défaut
});

onMounted(async () => {
  const id = route.params.id;
  await store.loadDataFromApi();  // Remplacer par loadDataFromApi
  utilisateur.value = store.getUtilisateur(parseInt(id));  // Utiliser getUtilisateur pour trouver l'utilisateur par ID
  if (utilisateur.value) {
    form.nom = utilisateur.value.nom;
    form.email = utilisateur.value.email;
    form.password = utilisateur.value.password;
    form.role = utilisateur.value.role;
  }
});


// Utilisation de watch pour surveiller les changements dans `utilisateur`
watch(utilisateur, (newValue) => {
  if (newValue) {
    form.nom = newValue.nom;
    form.email = newValue.email;
    form.password = newValue.password;
    form.role = newValue.role;
  }
});

async function submitForm() {
  const updatedUtilisateur = {
    ...utilisateur.value,
    nom: form.nom,
    email: form.email,
    password: form.password,
    role: form.role
  };

  await store.updatedUtilisateur(utilisateur.value.id, updatedUtilisateur);  // Utilisez 'updatedUtilisateur' ici
  router.push('/dashboard/utilisateurs');
}

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

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
}

button {
  margin-top: 20px;
}

.btn-primary {
  display: inline-block;
  padding: 10px 20px;
  text-decoration: none;
}
</style>
