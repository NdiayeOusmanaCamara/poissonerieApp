<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4" style="width: 400px;">
      <h2 class="text-center mb-4">Login</h2>

      <form @submit.prevent="handleSubmit">
        <div class="form-group mb-3">
          <label for="email">Email</label>
          <input type="email" v-model="email" class="form-control" id="email" placeholder="Entrer votre email"
            required />
        </div>

        <div class="form-group mb-3">
          <label for="password">Mot de passe</label>
          <input type="password" v-model="password" class="form-control" id="password"
            placeholder="Entrer votre mot de passe" required />
        </div>

        <!-- Remplacement du router-link par un bouton -->
        <button type="submit" class="btn btn-success w-100">Se connecter</button>
      </form>

      <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {useAuthStore} from '@stores/authStore.js';
import { useRouter } from "vue-router";

const store = useAuthStore();
const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');


const handleSubmit = async () => {
  try {
    await store.login(email.value, password.value);
    router.push("/dashboard/home"); // Navigation vers le tableau de bord
  } catch (error) {
    errorMessage.value = "Une erreur est survenue lors de la connexion.";
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
