<template>
    <div class="commande-detail">
        <div class="form-content">
            <h2 class="text-center mb-4">Ajouter une livraison</h2>
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="nom" class="form-label">Nom</label>
                    <input type="text" id="nom" v-model="form.nom" class="form-control" placeholder="Entrez le nom de la livraison" required />
                </div>
                
                <div class="form-group ">
                    <label for="date" class="form-label">Date de livraison</label>
                    <input type="date" id="date" v-model="form.date" class="form-control" required />
                </div>

                <div class="form-group">
                    <label for="commande">Commande</label>
                    <select id="commande" v-model="form.commandeId" class="form-control" required>
                        <option v-for="commande in commandes" :key="commande.id" :value="commande.id">
                            {{ commande.nom }}
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
    
                <div class="d-flex justify-content-end gap-5">
                    <router-link to="/dashboard/livraisons" class="btn btn-primary mt-3">Retour à la liste</router-link>
                    <button type="submit" class="btn btn-success">Ajouter</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useLivraisonStore } from '@stores/livraisonStore';

// Initialisation du router et du store
const router = useRouter();
const store = useLivraisonStore();

// Déclaration des objets réactifs
const form = reactive({
    nom: '',
    date: '',
    commandeId: null,
    utilisateurId: null
});

const commandes = ref([]);
const utilisateurs = ref([]);
const errorMessage = ref('');

// Chargement des données depuis l'API lors du montage du composant
onMounted(async () => {
    commandes.value = await store.loadCommandes();
    utilisateurs.value = await store.loadUtilisateurs();

    // Vérification dans la console
    console.log("Commandes :", commandes.value);
    console.log("Utilisateurs :", utilisateurs.value);
});


// Soumission du formulaire
const submitForm = async () => {
    try {
        await store.addLivraison(form);
        await store.loadCommandes();
        await store.loadUtilisateurs();  // Ajoute la livraison via le store
        router.push('/dashboard/livraisons');  // Redirige vers la liste des livraisons
    } catch (error) {
        console.error("Erreur lors de l'ajout de la livraison :", error);
        errorMessage.value = 'Une erreur est survenue lors de l\'ajout de la livraison';
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

