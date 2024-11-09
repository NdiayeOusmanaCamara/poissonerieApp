<template>
  <div class="commande-detail">
    <div class="form-content">
      <h2 class="text-center mb-4">Ajouter un utilisateur</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="nom" class="form-label">Nom</label>
          <input type="text" v-model="form.nom" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input type="email" v-model="form.email" class="form-control"  required />
        </div>
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input type="password" v-model="form.password" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="role" class="form-label">Role</label>
          <select v-model="form.role" class="form-control">
            <option value="ADMIN">ADMIN</option>
            <option value="GESTIONNAIRE">GESTIONNAIRE</option>
          </select>
        </div>
        <div class=" modal-footer d-flex justify-content-end gap-5">
          <router-link  class="btn btn-primary mt-3" to="/dashboard/utilisateurs">Retour à la liste</router-link>
          <button type="submit" class="btn btn-success">Ajouter</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useUserStore } from "@stores/utilisateurStore";
import { useRouter } from "vue-router";

// Utilisation d'un objet `form` pour stocker toutes les valeurs du formulaire
const form = ref({
  nom: "",
  email: "",
  role: "GESTIONNAIRE",
  password: ""
});

const store = useUserStore();
const router = useRouter();

function handleSubmit() {
  if (form.value.nom.length < 5 || form.value.nom.length > 500) {
    alert("Le nom doit contenir entre 5 et 500 caractères.");
    return;
  }
  const existingUtilisateur = store.utilisateurs.find(
    (utilisateur) =>
      utilisateur.nom.toLowerCase() === form.value.nom.toLowerCase()
  );

  if (existingUtilisateur) {
    alert("Ce nom existe déjà.");
  } else {
    store.addUtilisateur({
      nom: form.value.nom,
      email: form.value.email,
      password: form.value.password,
      role: form.value.role,
    })
    .then(() => {
      // Réinitialiser le formulaire après l'ajout
      form.value.nom = "";
      form.value.email = "";
      form.value.password = "";
      form.value.role = "GESTIONNAIRE";
      router.push("/dashboard/utilisateurs")
        .catch((err) => {
          console.error("Erreur lors de la redirection :", err);
        });
    })
    .catch(error => {
      console.error("Erreur lors de l'ajout :", error);
    });
  }
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
