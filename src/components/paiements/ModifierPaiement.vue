<template>
    <div class="commande-detail">
        <div class="form-content">
            <h2>Modifier un paiement</h2>
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="date" class="form-label">Date</label>
                    <input type="date" id="date" v-model="form.date" class="form-control" required />
                </div>
                <div class="form-group">
                    <label for="montant" class="form-label">Montant</label>
                    <input type="number" id="montant" v-model="form.montant" class="form-control"
                        placeholder="Entrez le montant" step="0.01" required />
                </div>
                <div class="form-group">
                    <label for="modePaiement" class="form-label">Mode de paiement</label>
                    <select id="modePaiement" v-model="form.modePaiement" class="form-control" required>
                        <option value="CREDIT_CARD">Carte de crédit</option>
                        <option value="DEBIT_CARD">Carte de débit</option>
                        <option value="PAYPAL">PayPal</option>
                        <option value="BANK_TRANSFER">Virement bancaire</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="commande" class="form-label">Commande</label>
                    <input type="number" id="commande" v-model="commandeNom" class="form-control"
                        required />
                </div>
                <div class="form-group">
                    <label for="utilisateur" class="form-label">Utilisateur</label>
                    <input type="number" id="utilisateur" v-model="utilisateurNom" class="form-control"
                        required />
                </div>
                <div class=" modal-footer d-flex justify-content-end gap-5">
                    <router-link class="btn btn-primary mt-3" to="/dashboard/paiements">Retour à la liste</router-link>
                    <button type="submit" class="btn btn-success">Modifier</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { usePaiementStore } from '@stores/paiementStore';
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const store = usePaiementStore();
const paiement = ref(null);
const commandeNom = ref('');
const utilisateurNom = ref('');
const form = reactive({
    date: '',
    montant: 0,
    modePaiement: '',

});

onMounted(async () => {
    const id = route.params.id;
    await store.loadDataFromApi(); // Assure que les données sont chargées
    paiement.value = store.paiements.find((p) => p.id === parseInt(id));
    
    if (paiement.value) {
      // Remplir les champs du formulaire avec les données de la commande actuelle
      form.date = paiement.value.date;
      form.montant = paiement.value.montant;
      form.modePaiement = paiement.value.modePaiement;

      const commandes = await store.loadUtilisateurs();
      const commande = commandes.find(c => c.id === paiement.value.commandeId);
      commandeNom.value = commande ? commande.nom : 'Commande inconnu';
    
      const utilisateurs = await store.loadUtilisateurs();
      const utilisateur = utilisateurs.find(u => u.id === paiement.value.utilisateurId);
      utilisateurNom.value = utilisateur ? utilisateur.nom : 'Utilisateur inconnu'; 
    }
    
  });

   // Fonction pour soumettre le formulaire
   async function submitForm() {
    // Mettre à jour les données dans le store
    const updatedPaiement = {
      ...paiement.value,
      date: form.date,
      montant: form.montant,
      modePaiement: form.modePaiement
    };
  
    await store.updatedPaiement(paiement.value.id, updatedPaiement);
  
    // Rediriger l'utilisateur vers la liste après la modification
    router.push('/dashboard/paiements');
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
