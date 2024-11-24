<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
      <div class="card p-4" style="width: 400px;">
        <h2 class="text-center mb-4">Réinitialiser le mot de passe</h2>
  
  
        <form @submit.prevent="resetPassword">
            <div class="form-group mb-4">
                <label for="password">Nouveau mot de passe</label>
                <input type="password" v-model="password" class="form-control form-control-lg" id="password"
                    placeholder="Entrer le nouveau mot de passe" required />
            </div>

            <button type="submit" class="btn btn-primary btn-lg w-100">Réinitialiser</button>
        </form>

        <p v-if="successMessage" class="text-success mt-3 text-center">{{ successMessage }}</p>
        <p v-if="errorMessage" class="text-danger mt-3 text-center">{{ errorMessage }}</p>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@stores/authStore';

const password = ref('');
const successMessage = ref('');
const errorMessage = ref('');
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const resetPassword = async () => {
const token = route.params.token;
try {
    successMessage.value = await authStore.resetPassword(token, password.value);
    errorMessage.value = '';
    setTimeout(() => router.push('/'), 2000);
} catch (error) {
    errorMessage.value = error.response?.data?.message || 'Erreur lors de la réinitialisation du mot de passe.';
    successMessage.value = '';
}
};
</script>

<style scoped>
.card {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    background-color: #fff;
    padding: 30px;
}



.form-group label {
    font-weight: bold;
    color: #333;
}

.form-control-lg {
    font-size: 1.2rem;
    padding: 12px;
}

.btn-primary {
    background-color: #1abc9c;
    border-color: #1abc9c;
}

.btn-primary:hover {
    background-color: #16a085;
    border-color: #16a085;
}
</style>