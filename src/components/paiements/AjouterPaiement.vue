<template>
    <div class="commande-detail">
        <div class="form-content">
            <h2 class="text-center mb-4">Ajouter un paiement</h2>
            <form @submit.prevent="submitForm">
                <div class="d-flex justify-content-between gap-3">
                    <div class="form-group w-100">
                        <label for="date">Date</label>
                        <input type="date" id="date" v-model="form.date" class="form-control" required />
                    </div>
                    <div class="form-group w-100">
                        <label for="montant">Montant</label>
                        <input type="number" id="montant" v-model="form.montant" class="form-control" placeholder="Entrez le montant" step="0.01" required />
                    </div>
                </div>
                <div class="d-flex justify-content-between gap-3">
                    <div class="form-group w-100">
                        <label for="mode_paiement">Mode de paiement</label>
                        <select id="mode_paiement" v-model="form.mode_paiement" class="form-control" required>
                            <option value="CREDIT_CARD">Carte de crédit</option>
                            <option value="DEBIT_CARD">Carte de débit</option>
                            <option value="PAYPAL">PayPal</option>
                            <option value="BANK_TRANSFER">Virement bancaire</option>
                        </select>
                    </div>
                    <div class="form-group w-100">
                        <label for="commande">Commande</label>
                        <select id="commande" v-model="form.commandeId" class="form-control" required>
                            <option v-for="commande in commandes" :key="commande.id" :value="commande.id">
                                {{ commande.nom }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="utilisateur">Utilisateur</label>
                    <select id="utilisateur" v-model="form.utilisateurId" class="form-control" required>
                        <option v-for="utilisateur in utilisateurs" :key="utilisateur.id" :value="utilisateur.id">
                            {{ utilisateur.nom }}
                        </option>
                    </select>
                </div>

                <div class="d-flex justify-content-end gap-5">
                    <router-link to="/dashboard/paiements" class="btn btn-primary mt-3">Retour à la liste</router-link>
                    <button type="submit" class="btn btn-success">Ajouter</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePaiementStore } from '@stores/paiementStore';

const router = useRouter();
const store = usePaiementStore();
const form = reactive({
    date: '',
    montant: '0',
    mode_paiement: 'CREDIT_CARD', // Valeur par défaut
    commandeId: null,
    utilisateurId: null
});
const commandes = ref([]);
const utilisateurs = ref([]);

onMounted(async () => {
    commandes.value = await store.loadCommandes();
    utilisateurs.value = await store.loadUtilisateurs();
});

const submitForm = () => {
    // Affiche les données du formulaire pour vérifier
    console.log("Données du formulaire avant soumission :", form);

    store.addPaiement({ 
        date: form.date, 
        montant: form.montant, 
        mode_paiement: form.mode_paiement, 
        commandeId: form.commandeId 
    });

    // Redirection après soumission
    router.push('/dashboard/paiements');
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
