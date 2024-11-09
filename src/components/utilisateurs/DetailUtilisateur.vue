<template>
    <div v-if="utilisateur" class="commande-detail">
      <h2>Détails de l'utilisateur</h2>
      <p><strong>ID :</strong> {{ utilisateur.id }}</p>
      <p><strong>Nom :</strong> {{ utilisateur.nom }}</p>
      <p><strong>Email :</strong> {{ utilisateur.email }}</p>
      <p><strong>Role :</strong> {{ utilisateur.role }}</p>

      <router-link to="/dashboard/utilisateurs" class="btn btn-primary">Retour à la liste</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@stores/utilisateurStore";

const store = useUserStore();
const route = useRoute();
const router = useRouter();
const utilisateur = ref(null);

onMounted(() => {
  const id = parseInt(route.params.id);
  utilisateur.value = store.getUtilisateur(id);
});

function goBack() {
  router.push({ name: "gestion-utilisateurs" });
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

p {
  margin: 10px 0;
  font-size: 18px;
}

.btn-primary {
  margin-top: 20px;
  display: inline-block;
  padding: 10px 20px;
  text-decoration: none;
}
</style>
