<template>
    <div class="commande-detail">
        <!-- Formulaire pour ajouter une vente -->
        <div class="form-content">
            <h2 class="text-center mb-4">Ajouter une vente</h2>
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="montant" class="form-label">Montant</label>
                    <input type="number" id="montant" v-model="form.montant" class="form-control"  required />
                </div>
                <div class="form-group">
                    <label for="date" class="form-label">Date</label>
                    <input type="date" id="date" v-model="form.date" class="form-control"  required />
                </div>
                <div class="form-group">
                    <label for="utilisateur">Utilisateur</label>
                    <select id="utilisateur" v-model="form.utilisateurId" class="form-control" required>
                        <option v-for="utilisateur in utilisateurs" :key="utilisateur.id" :value="utilisateur.id">
                            {{ utilisateur.nom }}
                        </option>
                    </select>
                </div>
                <div class=" d-flex justify-content-end gap-5">
                    <router-link to="/dashboard/ventes" class="btn btn-primary mt-3">Retour à la liste</router-link>
                    <button type="submit" class="btn btn-success">Ajouter</button>
                </div>
                </form>
            </div>
        </div>
</template>

<script setup>
import { useVenteStore } from '@/stores/venteStore';
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useVenteStore();
const form = reactive({
    montant : 0,
    utilisateurId: null
});
const utilisateurs = ref([]);

onMounted(async () => {
    utilisateurs.value = await store.loadUtilisateurs();
});

const submitForm = () => {
    store.addVente(form);
    router.push('/dashboard/ventes');
};
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
