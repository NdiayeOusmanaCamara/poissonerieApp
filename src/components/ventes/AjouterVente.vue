<template>
    <div class="commande-detail">
        <!-- Formulaire pour ajouter une vente -->
        <div class="form-content">
            <h2 class="text-center mb-4">Ajouter une vente</h2>
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="montant" class="form-label">Montant</label>
                    <input type="number" id="montant" v-model="form.montant" class="form-control" required />
                </div>
                <div class="form-group">
                    <label for="date" class="form-label">Date</label>
                    <input type="date" id="date" v-model="form.date" class="form-control" required />
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


                <div class="mt-4">
                    <h3>Détails de la vente</h3>

                    <div v-for="(detail, index) in detailvente" :key="index" class="mb-3">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="produit">Produit</label>
                                    <select v-model="detail.produitId" class="form-control" required>
                                        <option disabled value="">Sélectionner un produit</option>
                                        <option v-for="produit in produits" :key="produit.id" :value="produit.id">
                                            {{ produit.nom }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <label for="date">Date</label>
                                <input type="date" v-model="detail.date" class="form-control" required />
                            </div>

                            <div class="col-md-3">
                                <label for="montant">Montant</label>
                                <input type="number" v-model="detail.montant" class="form-control" required />
                            </div>
                        </div>
                    </div>

                    <!-- Bouton pour ajouter un détail -->
                    <button type="button" @click="addDetail" class="btn btn-primary mt-3">Ajouter un détail</button>
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
    montant: 0,
    utilisateurId: null
});
const detailvente = ref([{ produitId: '', date: "", montant: 0 }]);
const utilisateurs = ref([]);
const addDetail = () => {
    detailvente.value.push({ produitId: '', date: "", montant: 0 });
};
const produits = ref([]);

onMounted(async () => {
    utilisateurs.value = await store.loadUtilisateurs();
    produits.value = await store.loadProduits(); // Charger les produits
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
