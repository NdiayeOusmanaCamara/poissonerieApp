<template>
  <div class="form-container d-flex align-items-center">
    <div class="form-content">
      <router-link to="/dashboard/livraisons" class="btn btn-secondary mb-3">
        <i class="fas fa-arrow-left"></i>
      </router-link>

      <div class="livraison-detail">
        <form @submit.prevent="handleSubmit" class="p-4 shadow-sm bg-white rounded">
          <h2 class="text-center mb-4">Modifier la livraison</h2>

          <!-- Informations de la livraison -->
          <div class="d-flex gap-2">
            <div class="w-100">
              <div class="form-group">
                <label for="nom" class="form-label">Nom du destinataire</label>
                <input
                  type="text"
                  id="nom"
                  v-model="form.nom"
                  class="form-control"
                  required
                />
                <small v-if="errors.nom" class="text-danger">{{ errors.nom }}</small>
              </div>
            </div>

            <div class="w-100">
              <div class="form-group">
                <label for="contact" class="form-label">Contact</label>
                <input
                  type="tel"
                  id="contact"
                  v-model="form.contact"
                  class="form-control"
                  required
                />
                <small v-if="errors.contact" class="text-danger">{{ errors.contact }}</small>
              </div>
            </div>

           
          </div>

          <!-- Détails de la livraison -->
          <div>
            <h3>Détails de la livraison</h3>
            <div v-for="(detail, index) in form.detailLivraisons" :key="index" class="d-flex gap-3 mt-3">
              <div class="w-100">
                
                <label class="form-label">Commande</label>
                <select
                  v-model="detail.commandeId"
                  class="form-control"
                  required
                >
                  <option disabled value="">Sélectionner une commande</option>
                  <option v-for="commande in commandes" :key="commande.id" :value="commande.id">
                    {{ commande.id }}
                  </option>
                </select>
              </div>
              <div class=w-100>
                  <label class="form-label">Status</label>
                  <select
                    v-model="detail.status"
                    class="form-control"
                    required
                  >
                    <option value="EN_ATTENTE">En attente</option>
                    <option value="EN_TRANSIT">En transit</option>
                    <option value="LIVRE">Livré</option>
                    <option value="ANNULE">Annulé</option>
                  </select>
                  <small v-if="errors.status" class="text-danger">{{ errors.status }}</small>
              
              </div>

              <div class="w-100 d-flex align-items-end">
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="removeDetail(index)"
                >
                  Supprimer
                </button>
              </div>
            </div>
            <button
              type="button"
              @click="addDetail"
              class="btn btn-primary mt-3"
            >
              Ajouter un détail de livraison
            </button>
          </div>

          <!-- Soumettre la livraison -->
          <button type="submit" class="btn btn-success mt-5 w-100">
            Mettre à jour la livraison
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLivraisonStore } from '@stores/livraisonStore';
import { useCommandeStore } from '@stores/commandeStore';
import moment from 'moment';

const route = useRoute();
const router = useRouter();
const livraisonStore = useLivraisonStore();
const commandeStore = useCommandeStore();

// Variables réactives
const errors = ref({});
const commandes = ref([]);
const form = ref({
  nom: '',
  contact: '',
  date: '',
  detailLivraisons: [{ commandeId: '', status: 'EN_ATTENTE' }],
});

// Chargement des données de la livraison
onMounted(async () => {
  try {
    commandes.value = await commandeStore.fetchCommandes();
    const livraisonId = route.params.id;
    const livraison = await livraisonStore.getLivraisonById(livraisonId);

    form.value.nom = livraison.nom;
    form.value.contact = livraison.contact;
    form.value.date = livraison.date ? moment(livraison.date).format('YYYY-MM-DD') : '';
    form.value.detailLivraisons = livraison.detailLivraisons.map(detail => ({
      commandeId: detail.commandeId,
     status: detail.status
    }));
  } catch (error) {
    alert('Erreur lors du chargement des données');
    console.error(error.message);
  }
});

// Ajouter un détail de livraison
const addDetail = () => {
  form.value.detailLivraisons.push({ commandeId: '', status: '' });
};

// Supprimer un détail de livraison
const removeDetail = (index) => {
  if (form.value.detailLivraisons.length > 1) {
    form.value.detailLivraisons.splice(index, 1);
  }
};

// Soumettre les modifications
const handleSubmit = async () => {
  errors.value = {};
  const today = moment().startOf('day');
  const selectedDate = moment(form.value.date).startOf('day');

  if (selectedDate.isBefore(today)) {
    errors.value.date = "La date doit être aujourd'hui ou dans le futur.";
    return;
  }

  try {
    form.value.date = form.value.date ? moment(form.value.date).toISOString() : '';

    // if (!form.value.status) {
    //   errors.value.status = 'Le statut est requis.';
    //   return;
    // }

    const updatedLivraison = {
      ...form.value,
      detailLivraisons: form.value.detailLivraisons,
    };

    await livraisonStore.updateLivraison(route.params.id, updatedLivraison);
    alert('Livraison mise à jour avec succès');
    router.push('/dashboard/livraisons');
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      errors.value = {};
      error.response.data.errors.forEach((err) => {
        errors.value[err.path] = err.msg;
      });
    } else {
      alert('error: cette commande est deja converite en livraison');
    }
  }
};
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
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: none;
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
