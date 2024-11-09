<template>
    <div class="commande-detail">
        <div class="form-content">
            <h2 class="text-center mb-4">Modifier un produit</h2>
            <form @submit.prevent="submitForm">
                <div class="d-flex gap-2">
                    <div class="w-100">
                        <div class="form-group">
                            <label for="nom">Nom</label>
                            <input type="text" id="nom" v-model="form.nom" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label for="categorie">Catégorie</label>
                            <input type="text" id="categorie" v-model="form.categorie" class="form-control" required />
                        </div>
                    </div>
                    <div class="w-100">
                        <div class="form-group">
                            <label for="quantite">Quantité</label>
                            <input type="number" id="quantite" v-model="form.quantite" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label for="prix">Prix</label>
                            <input type="number" id="prix" v-model="form.prix" class="form-control" required />
                        </div>
                    </div>
                </div>
                <div class="d-flex gap-2">
                    <div class="w-100">
                        <div class="form-group">
                            <label for="description">Description</label>
                            <input type="text" id="description" v-model="form.description" class="form-control"
                                required />
                        </div>
                    </div>
                    <div class="w-100">
                        <div class="form-group">
                            <label for="date">Date</label>
                            <input type="date" id="date" v-model="form.date" class="form-control" required />
                        </div>
                    </div>
                </div>
                <div class="d-flex gap-2">
                    <div class="w-100">
                        <div class="form-group">
                            <label for="utilisateur">Utilisateur</label>
                            <input type="text" id="utilisateur" v-model="utilisateurNom" class="form-control"
                                disabled />
                        </div>
                    </div>

                    <div class="w-100">
                        <div class="form-group">
                            <label for="stock">Stock</label>
                            <input type="number" id="number" v-model="form.stock" class="form-control" required />
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-end gap-5">
                    <router-link to="/dashboard/produits" class="btn btn-primary mt-3">Retour à la
                        liste</router-link>
                    <button type="submit" class="btn btn-success">Modifier</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useProduitStore } from "@stores/produitStore";

const store = useProduitStore();
const route = useRoute();
const router = useRouter();

const produit = ref({});
const form = ref({
    nom: '',
    categorie: '',
    quantite: 0,
    prix: 0,
    description: '',
    date: '',
    stock: '',
    utilisateurId: null,
});
const utilisateurNom = ref(''); // Ajout de la variable pour le nom de l'utilisateur

onMounted(async () => {
    const id = route.params.id;
    await store.loadDataFromApi(); // Charger les produits depuis l'API
    produit.value = store.produits.find((p) => p.id === parseInt(id));

    if (produit.value) {
        form.value.nom = produit.value.nom;
        form.value.categorie = produit.value.categorie;
        form.value.quantite = produit.value.quantite;
        form.value.prix = produit.value.prix;
        form.value.description = produit.value.description;
        form.value.date = produit.value.date;
        form.value.stock = produit.value.stock;
        form.value.utilisateurId = produit.value.utilisateurId;

        // Charger le nom de l'utilisateur en fonction de l'ID
        const utilisateur = store.utilisateurs.find((u) => u.id === produit.value.utilisateurId);
        if (utilisateur) {
            utilisateurNom.value = utilisateur.nom; // Mettre à jour le nom de l'utilisateur
        }
    }
});

async function submitForm() {
    const updatedProduit = {
        ...produit.value,
        nom: form.value.nom,
        categorie: form.value.categorie,
        quantite: form.value.quantite,
        prix: form.value.prix,
        description: form.value.description,
        date: form.value.date,
        stock: form.value.stock,
        utilisateurId: form.value.utilisateurId,
    };
    await store.updatedProduit(produit.value.id, updatedProduit);
    router.push('/dashboard/produits');
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

.btn {
    margin-top: 20px;

    color: white;
    font-size: 16px;
    font-weight: 600;
}

.btn:hover {
    background-color: #16a085;
}
</style>
