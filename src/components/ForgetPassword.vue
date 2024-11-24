<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4 shadow-lg" style="width: 400px; border-radius: 10px;">
          

            <h2 class="text-center mb-4">Mot de passe oublié</h2>

            <form @submit.prevent="submitForgotPassword">
                <div class="form-group mb-4">
                    <label for="email">Email</label>
                    <input type="email" v-model="email" class="form-control form-control-lg" id="email"
                        placeholder="Entrer votre email" required />
                </div>
                <button type="submit" class="btn btn-primary btn-lg w-100">Envoyer le lien de réinitialisation</button>
                <!-- <p v-if="authStore.emailMessage" class="text-success mt-3 text-center">{{ authStore.emailMessage }}</p> -->
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@stores/authStore';

const email = ref('');
const authStore = useAuthStore();

const submitForgotPassword = async () => {
    try {
        await authStore.forgotPassword(email.value);
    } catch (error) {
        console.error('Failed to send reset link', error);
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
