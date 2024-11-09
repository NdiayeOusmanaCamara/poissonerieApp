<template>
    <div class="commande-detail">
      <div class="form-content">
        <h2 class="text-center mb-4">Ajouter un nouveau produit</h2>
  
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
  
          <div class="form-group">
            <label for="stock">Stock</label>
            <input type="number" id="stock" v-model="form.stock" class="form-control" required />
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
            <router-link to="/dashboard/produits" class="btn btn-primary mt-3">Retour à la liste</router-link>
            <button type="submit" class="btn btn-success">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useProduitStore } from '@stores/produitStore';
  
  const router = useRouter();
  const store = useProduitStore();
  
  const form = reactive({
    nom: '',
    categorie: '',
    quantite: 0,
    prix: 0,
    description: '',
    date: '',
    stock: 0,
    utilisateurId: null
  });
  
  const utilisateurs = ref([]);
  
  onMounted(async () => {
    utilisateurs.value = await store.loadUtilisateurs();  // Charger les utilisateurs à l'initialisation
  });
  
  const submitForm = async () => {
    try {
      await store.addProduit(form);  // Appel correct à la méthode d'ajout de produit
      await store.loadDataFromApi();  // Recharger la liste des produits après l'ajout
      router.push('/dashboard/produits');  // Rediriger vers la liste des produits
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
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
  