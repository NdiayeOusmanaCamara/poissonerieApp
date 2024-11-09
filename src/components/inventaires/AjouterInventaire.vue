<template>
    <div class="commande-detail">
        <div class="form-content">
            <h2 class="text-center mb-4">Ajouter un inventaire</h2>
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="quantite" class="form-label">Quantité</label>
                    <input type="number" id="quantite" v-model="form.quantite" class="form-control" placeholder="Entrez la quantité" required />
                </div>
                <div class="form-group">
                    <label for="date" class="form-label">Date</label>
                    <input type="date" id="date" v-model="form.date" class="form-control" placeholder="Entrez la quantité" required />
                </div>
                <div class="form-group">
                    <label for="type" class="form-label">Type</label>
                    <select id="type" v-model="form.type" class="form-control" required>

                        <option value="Entrée">Entrée</option>
                        <option value="Sortie">Sortie</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="produit">Produit</label>
                    <select id="produit" v-model="form.produitId" class="form-control" required>
                        <option v-for="produit in produits" :key="produit.id" :value="produit.id">
                            {{ produit.nom }}
                        </option>
                    </select>
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
                    <router-link to="/dashboard/inventaires" class="btn btn-primary mt-3">Retour à la liste</router-link>
                    <button type="submit" class="btn btn-success">Ajouter</button>
                </div>
                </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useInventaireStore } from '@stores/inventaireStore';


const router = useRouter();
const store = useInventaireStore();
const form = reactive({
    quantite: '',
    type: '',
    date: '',
    produitId: null,
    utilisateurId: null
});
const produits = ref([]);
const utilisateurs = ref([])

onMounted(async () => {
    produits.value = await store.loadProduits();
});
onMounted(async () => {
    utilisateurs.value = await store.loadUtilisateurs();
});
const submitForm = async () => {
    try {
      await store.addInventaire(form);  // Appel correct à la méthode d'ajout de produit
      await store.loadDataFromApi();  // Recharger la liste des produits après l'ajout
      router.push('/dashboard/inventaires');  // Rediriger vers la liste des produits
    } catch (error) {
      console.error("Erreur lors de l'ajout du inventaires :", error);
    }
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

