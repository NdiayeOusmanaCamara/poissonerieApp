<template>
  <div class="form-container d-flex align-items-center" v-if="produitStore.produit && produitStore.produit.nom">
      <div class="form-content">
        <router-link to="/dashboard/produits" class="btn btn-secondary mb-3">
          <i class="fas fa-arrow-left"></i>
        </router-link>
        <form class="p-4 shadow-sm bg-white rounded">
          <h2 class="text-center mb-4">Détails de la produit</h2>
          <div class="d-flex gap-2">
            <div class="w-100">
              <div class="form-group">
                <label for="nom">Nom</label>
                <input  id="nom" v-model="produitStore.produit.nom" class="form-control" readonly />
              </div>
              <div class="form-group">
                <label for="categorie">Catégorie</label>
                <input  id="categorie" v-model="produitStore.produit.categorie" class="form-control"
                readonly />
              </div>
            </div>
            <div class="w-100">
              <div class="form-group">
                <label for="quantite">Quantité</label>
                <input id="quantite" v-model="produitStore.produit.quantite" class="form-control"
                readonly />
              </div>
              <div class="form-group">
                <label for="prix">Prix</label>
                <input  id="prix" v-model="produitStore.produit.prix" class="form-control" readonly />
              </div>
            </div>
          </div>
          <div class="d-flex gap-2">
            <div class="w-100">
              <div class="form-group">
                <label for="description">Description</label>
                <input id="description" v-model="produitStore.produit.description" class="form-control"
                readonly />
              </div>
            </div>
            <div class="w-100">
              <div class="form-group">
                <label for="date">Date</label>
                <input  id="date" v-model="formattedDate" class="form-control" readonly />

              </div>
            </div>
          </div>
          

            <div class="w-100">
              <div class="form-group">
                <label for="stock">Stock</label>
                <input  id="number" v-model="produitStore.produit.stock" class="form-control" readonly />
              </div>
            
          </div>

          
        </form>
      </div>
    </div>
    <p v-else>Chargement des produits...</p>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProduitStore } from '@stores/produitStore';
import { computed } from 'vue';

const formattedDate = computed(() => {
  if (produitStore.produit && produitStore.produit.date) {
    return new Date(produitStore.produit.date).toISOString().split('T')[0];
  }
  return '';
});
const produitStore = useProduitStore();
const route = useRoute();


onMounted(() => {
  const produitId = route.params.id;
  produitStore.loadProduitById(produitId);
});
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



.btn:hover {
  background-color: #1abc9c;
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

p {
  margin: 10px 0;
  font-size: 18px;
}

.btn-primary {
  margin-top: 20px;
  display: inline-block;
  padding: 10px 20px;
  text-decoration: none;
}
</style>
