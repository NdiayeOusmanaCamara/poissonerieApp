<template>
    <div class="form-container d-flex align-items-center">
        <div class="form-content">
            <router-link to="/dashboard/produits" class="btn btn-secondary mb-3">
                <i class="fas fa-arrow-left"></i>
            </router-link>
            <div class="commande-detail">
                <form @submit.prevent="submitForm" class="p-4 shadow-sm bg-white rounded">
                    <h2 class="text-center mb-4">Modifier un produit</h2>
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
                                <input type="text" id="description" v-model="form.description" class="form-control" required />
                            </div>
                        </div>
                        <div class="w-100">
                            <div class="form-group">
                                <label for="date">Date</label>
                                <input type="date" id="date" v-model="form.date" class="form-control" required />
                            </div>
                        </div>
                    </div>
                    <div class="w-100">
                        <div class="form-group">
                            <label for="stock">Stock</label>
                            <input type="number" id="stock" v-model="form.stock" class="form-control" required />
                        </div>
                    </div>
                    <button type="submit" class="btn btn-success mt-5 w-100">Mettre à jour le produit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useProduitStore } from "@stores/produitStore";
import moment from 'moment';
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
    stock: 0, // Ensure stock is properly initialized
});

onMounted(async () => {
    const id = route.params.id;
    await store.loadProduitById(id); // Load product by ID from API or store
    produit.value = store.produits.find((p) => p.id === parseInt(id));

    if (produit.value) {
        form.value.nom = produit.value.nom;
        form.value.categorie = produit.value.categorie;
        form.value.quantite = produit.value.quantite;
        form.value.prix = produit.value.prix;
        form.value.description = produit.value.description;
        form.value.date = produit.date ? moment(reception.date).format('YYYY-MM-DD') : '';
        form.value.stock = produit.value.stock;
    } else {
        toast.error("Produit non trouvé!");
        router.push('/dashboard/produits'); // Redirect if the product is not found
    }
});

const toast = {
    success: (message) => {
        alert(`Succès : ${message}`);
    },
    error: (message) => {
        alert(`Erreur : ${message}`);
    }
};

async function submitForm() {
    form.value.date = moment(form.value.date).toISOString();
    try {
        const updatedProduit = {
            ...produit.value,
            nom: form.value.nom,
            categorie: form.value.categorie,
            quantite: form.value.quantite,
            prix: form.value.prix,
            description: form.value.description,
            date: form.value.date,
            stock: form.value.stock,
        };
        await store.updatedProduit(produit.value.id, updatedProduit);

        toast.success('Produit mis à jour avec succès!');
        router.push('/dashboard/produits');
    } catch (error) {
        toast.error("Erreur lors de la mise à jour du produit!");
    }
}
</script>


<style scoped>
.form-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}



.form-content {
  flex: 1;
}

.form-control {
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid #ced4da;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: none;
}

.btn1 {
  background-color: #1abc9c;
  color: white;
  font-size: 16px;
  font-weight: 600;
}



h2 {
  color: #343a40;
  font-weight: bold;
}

.shadow-sm {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.bg-white {
  background-color: white;
}

.rounded {
  border-radius: 8px;
}
</style>
