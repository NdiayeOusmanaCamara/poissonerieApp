<template>
    <div class="commande-management">
        <div class="top-bar">
            <h2>Liste des mouvements</h2>
            
        </div>

        <table class="mouvement-table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Type</th>
                    <th scope="col">Quantité</th>
                    <th scope="col">Date</th>
                    <th scope="col">Produit</th>
                    
                    <th class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(mouvement) in store.mouvements" :key="mouvement.id">
                    <td>{{ mouvement.id }}</td>
                    <td>{{ mouvement.type }}</td>
                    <td>{{ mouvement.quantite }}</td>
                    <td>{{ formatDate(mouvement.date) }}</td>
                    <td>{{getProduitName (mouvement.produitId) }}</td>
                   
                    <td class="text-center d-flex">
                       
                     
                        <button @click="viewMouvement(mouvement)" class="btn btn-info btn-sm me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-eye" viewBox="0 0 16 16">
                                <path
                                    d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                <path
                                    d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                            </svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMouvementStore } from '@stores/mouvementStore';
import moment from 'moment';
const store = useMouvementStore();
const router = useRouter();
const mouvements = ref([]);
const produits = ref([]);
const formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD');
};
const getProduitName = (produitId) => {
    const produit = produits.value.find((p) => p.id === produitId);
    return produit ? produit.nom : 'produit non trouve'
}
onMounted(async () => {
    try {
        await store.loadProduitsData();
        produits.value = store.produits;
        await store.loadDataFromApi();
        mouvements.value = store.mouvements;
    } catch (error) {
        console.error("Erreur lors du chargement des mouvements :", error.message);
        toast.error("Une erreur est survenue lors du chargement des mouvements.");
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



const viewMouvement = (mouvement) => {
  router.push({ name: 'detail-mouvement', params: { id: mouvement.id } });
};
</script>

<style scoped>
.commande-management {
    margin: 0 auto;
    max-width: 1200px;
}

.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    margin-top: 100px;
}

h2 {
    font-size: 24px;
    color: #090909;
}

.create-mouvement {
    color: white;
    border-radius: 5px;
    padding: 10px 15px;
    text-decoration: none;
    display: flex;
    align-items: center;
}

.mouvement-table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.mouvement-table th,
.mouvement-table td {
    padding: 15px 20px;
    text-align: left;
}

.mouvement-table th {
    background-color: #f9f9f9;
    color: #090909;
    
}

.mouvement-table td {
    border-bottom: 1px solid #e3e3e3;
    color: #090909;
}

.mouvement-table tbody tr:hover {
    background-color: #f1f1f1;
}

.actions {
    text-align: center;
}

.action-btn {
    background-color: transparent;
    border: none;
    margin-right: 10px;
    cursor: pointer;
}

.action-btn i {
    color: #6c757d;
    font-size: 18px;
}
</style>
