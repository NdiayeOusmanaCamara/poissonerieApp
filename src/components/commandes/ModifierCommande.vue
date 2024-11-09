<template>
  <div class="commande-detail">
    <div class="form-content">
      <h2>Modifier la commande </h2>
      <form @submit.prevent="submitForm"> 
        <div class=" btn-right-action mt-4 mb-4 d-flex justify-content-end">
          <router-link class="btn btn-primary mt-3" to="/dashboard/commandes" >Retour à la liste</router-link>
          <button type="submit" class="btn btn-success">Modifier</button>
        </div>
        <div class="col-md-6">
          <label for="nom">Nom</label>
          <input type="text" id="nom" v-model="form.nom" class="form-control" />
        </div>
  
        <div class="col-md-6">
          <label for="statut">Statut</label>
          <select id="statut" v-model="form.statut" class="form-control">
            <option value="en attente">En attente</option>
            <option value="en cours">En cours</option>
            <option value="annulée">Annulée</option>
          </select>
        </div>
  
        <div class="col-md-6">
          <label for="prix">Prix</label>
          <input type="number" id="prix" v-model="form.prix" class="form-control" />
        </div>
        <div class="col-md-6">
          <label for="date">Date</label>
          <input type="dateTime" id="date" v-model="form.date" class="form-control" />
        </div>
  
        <div class="col-md-6">
          <label for="utilisateur">Utilisateur</label>
          <input type="text" id="utilisateur" v-model="utilisateurNom" class="form-control" disabled />
        </div>
        <div class=" modal-footer d-flex justify-content-end gap-5">
          <router-link class="btn btn-primary mt-3" to="/dashboard/commandes" >Retour à la liste</router-link>
          <button type="submit" class="btn btn-success">Modifier</button>
        </div>
      </form>
      <div class="row mt-5 mx-1">
        <h2 class="mx-0">Commandes Details</h2>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Produit</th>
              <th scope="col">Quantite</th>
              <th scope="col">Prix</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(detail, index) in order.details" :key="index">
              <td>
                <select v-model="detail.product" class="form-select">
                  <option value="" disabled>Select Product</option>
                  <option value="Product 1">Product 1</option>
                  <option value="Product 2">Product 2</option>
                </select>
              </td>
              <td>
                <input v-model="detail.quantity" type="number" class="form-control" />
              </td>
              <td>
                <input v-model="detail.price" type="number" class="form-control" readonly />
              </td>
              <td>
                <button @click="removeDetail(index)" class="btn btn-danger">Remove</button>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <button @click="addDetail" class="btn btn-success">Add New Detail</button>
              </td>
            </tr>
          </tbody>

        </table>
    </div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useCommandeStore } from '@stores/commandeStore';
  
  const route = useRoute();
  const router = useRouter();
  const store = useCommandeStore();
  const commande = ref(null);
  const utilisateurNom = ref('');
  const form = reactive({
    nom: '',
    statut: '',
    prix: 0,
    date: '',
  });
  
  onMounted(async () => {
    const id = route.params.id;
    await store.loadDataFromApi(); // Assure que les données sont chargées
    commande.value = store.commandes.find((cmd) => cmd.id === parseInt(id));
  
    if (commande.value) {
      // Remplir les champs du formulaire avec les données de la commande actuelle
      form.nom = commande.value.nom;
      form.statut = commande.value.statut;
      form.prix = commande.value.prix;
      form.date = commande.value.date;
  
      // Charger les utilisateurs et trouver le nom de l'utilisateur associé à cette commande
      const utilisateurs = await store.loadUtilisateurs();
      const utilisateur = utilisateurs.find(u => u.id === commande.value.utilisateurId);
      utilisateurNom.value = utilisateur ? utilisateur.nom : 'Utilisateur inconnu';
    }
  });
  
  // Fonction pour soumettre le formulaire
  async function submitForm() {
    // Mettre à jour les données dans le store
    const updatedCommande = {
      ...commande.value,
      nom: form.nom,
      statut: form.statut,
      prix: form.prix
    };
  
    await store.updatedCommande(commande.value.id, updatedCommande);
  
    // Rediriger l'utilisateur vers la liste après la modification
    router.push('/dashboard/commandes');
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
  