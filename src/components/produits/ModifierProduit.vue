<template>
    <div class="form-container d-flex align-items-center">
        <div class="form-content">
            <router-link to="/dashboard/produits" class="btn btn-secondary mb-3">
                <i class="fas fa-arrow-left"></i>
            </router-link>
            <div class="commande-detail">
                <form @submit.prevent="submitForm" class="p-4 shadow-sm bg-white rounded">
                    <h2 class="text-center mb-4">Modifier un produit</h2>
                    <div class="row">
                        <div class="col-md-6 form-group mb-3">
                                <label for="nom">Nom</label>
                                <input type="nom" id="nom" v-model="form.nom" class="form-control" required />
                                <!-- Message d'erreur pour le champ nom -->
                                <small v-if="errors.nom" class="text-danger">{{ errors.nom }}</small>
                            </div>
                            <div class="col-md-6 form-group mb-3">
                                <label for="nom">Date limite</label>
                                <input type="date" id="date" v-model="form.date_limite" class="form-control" required />
                                <small v-if="errors.date_limite" class="text-danger">{{ errors.date_limite }}</small>
                              </div>
                              <div class="col-md-6 form-group mb-3">
                                <label for="categorie">Catégorie</label>
                                <input type="text" id="categorie" v-model="form.categorie" class="form-control" required />
                                <!-- Message d'erreur pour le champ catégorie -->
                                <small v-if="errors.categorie" class="text-danger">{{ errors.categorie }}</small>
                            </div>
                            <div class="col-md-6 form-group mb-3">
                                <label for="prix">Prix</label>
                                <input type="number" id="prix" v-model="form.prix" class="form-control" required />
                                <!-- Message d'erreur pour le champ prix -->
                                <small v-if="errors.prix" class="text-danger">{{ errors.prix }}</small>
                            </div>
                    </div>
                            <div class="row">
                                <div class="col-md-6 form-group mb-4">
                                <label for="description">Description</label>
                                <input type="text" id="description" v-model="form.description" class="form-control" required />
                                <!-- Message d'erreur pour le champ description -->
                                <small v-if="errors.description" class="text-danger">{{ errors.description }}</small>
                            </div>
                            <div class="col-md-6 form-group mb-4">
                                <label for="stock">Stock</label>
                            <input type="number" id="stock" v-model="form.stock" class="form-control" required />
                            <!-- Message d'erreur pour le champ stock -->
                            <small v-if="errors.stock" class="text-danger">{{ errors.stock }}</small>
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
    prix: 0,
    description: '',
    date_entree: '',
    date_limite: '',
    stock: 0, 
});
const errors = ref({});

onMounted(async () => {
    const id = route.params.id;
    await store.loadProduitById(id);
    produit.value = store.produits.find((p) => p.id === parseInt(id));

    if (produit.value) {
        form.value.nom = produit.value.nom;
        form.value.categorie = produit.value.categorie;
        form.value.prix = produit.value.prix;
        form.value.description = produit.value.description;
        form.value.date_entree = produit.value.date_entree ? moment(produit.value.date_entree).format('YYYY-MM-DD') : '';
        form.value.date_limite = produit.value.date_limite ? moment(produit.value.date_limite).format('YYYY-MM-DD') : '';
        form.value.stock = produit.value.stock;
    } else {
        toast.error("Produit non trouvé!");
        router.push('/dashboard/produits');
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
    // Reset errors
    errors.value = {};

    // Check if the 'date_limite' is today or a future date
    const today = moment().startOf('day');
    const dateLimite = moment(form.value.date_limite, 'YYYY-MM-DD');

    if (dateLimite.isBefore(today)) {
        errors.value.date_limite = 'La date limite doit être aujourd\'hui ou dans le futur.';
        return; // Stop the form submission if the date is invalid
    }

    try {
        const updatedProduit = {
            ...produit.value,
            nom: form.value.nom,
            categorie: form.value.categorie,
            prix: form.value.prix,
            description: form.value.description,
            date_entree: form.value.date_entree,
            date_limite: form.value.date_limite,
            stock: form.value.stock,
        };
        await store.updatedProduit(produit.value.id, updatedProduit);

        toast.success('Produit mis à jour avec succès!');
        router.push('/dashboard/produits');
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
            error.response.data.errors.forEach(err => {
                errors.value[err.path] = err.msg;
            });
        } else {
            toast.error('Une erreur est survenue lors de la mise à jour.');
        }
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
