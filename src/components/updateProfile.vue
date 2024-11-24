<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4 shadow-lg" style="width: 500px; border-radius: 10px;">
            <div class="text-center mb-4">
                <i class="fas fa-user-circle user-icon"></i>
            </div>

            <h2 class="text-center mb-4">Modifier le profil</h2>

            <form @submit.prevent="updateProfile">
                <div class="form-group mb-4">
                    <label for="nom">Nom</label>
                    <input type="text" v-model="nom" class="form-control form-control-lg" id="nom"
                        placeholder="Entrer votre nom" required />
                </div>

                <div class="form-group mb-4">
                    <label for="email">Email</label>
                    <input type="email" v-model="email" class="form-control form-control-lg" id="email"
                        placeholder="Entrer votre email" required />
                </div>

                <div class="form-group mb-4 position-relative">
                    <label for="password">Mot de passe</label>
                    <input :type="showPassword ? 'text' : 'password'" v-model="password"
                        class="form-control form-control-lg" id="password" placeholder="Nouveau mot de passe" />
                    <small class="text-muted">Laisser vide si vous ne souhaitez pas changer le mot de passe.</small>
                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" @click="togglePasswordVisibility"
                        style="position: absolute; top: 50%; right: 15px; transform: translateY(-50%); cursor: pointer;"></i>
                </div>

                <button type="submit" class="btn btn-primary btn-lg w-100">Mettre à jour le profil</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@stores/authStore";
import { useToast } from "vue-toastification";

const authStore = useAuthStore();
const toast = useToast();

const nom = ref(authStore.user.nom);
const email = ref(authStore.user.email);
const password = ref("");
const showPassword = ref(false);

const updateProfile = async () => {
    try {
        await authStore.updateProfile({
            nom: nom.value,
            email: email.value,
            password: password.value,
        });
        toast.success("Profil mis à jour avec succès !");
    } catch (error) {
        console.error("Erreur lors de la mise à jour du profil :", error);
    }
};

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};
</script>

<style scoped>
.card {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    background-color: #fff;
    padding: 30px;
}

.user-icon {
    font-size: 80px;
    color: #16a085;
    margin-bottom: 15px;
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