<template>
  <div class="form-container d-flex align-items-center">
    <div class="form-content">
      <router-link to="/dashboard/livraisons" class="btn btn-secondary mb-3">
        <i class="fas fa-arrow-left"></i>
      </router-link>

      <div class="livraison-detail">
        <form @submit.prevent="handleSubmit" class="p-4 shadow-sm bg-white rounded">
          <h2 class="text-center mb-4">Ajouter une livraison</h2>

          <!-- Informations de la livraison -->
          <div class="d-flex gap-2">
            <div class="w-100">
              <div class="form-group">
                <label for="nom" class="form-label">Nom de la livraison</label>
                <input type="text" id="nom" v-model="form.nom" class="form-control" required />
                <small v-if="errors.nom" class="text-danger">{{ errors.nom }}</small>
              </div>
            </div>
            <div class="w-100">
              <div class="form-group">
                <label for="date" class="form-label">Date de livraison</label>
                <input type="date" id="date" v-model="form.date" class="form-control" required />
                <small v-if="errors.date" class="text-danger">{{ errors.date }}</small>
              </div>
            </div>
          </div>
          
          <div class="w-100">
            <div class="form-group">
              <label for="contact" class="form-label">Contact</label>
              <input type="phone" id="contact" v-model="form.contact" class="form-control" required />
              <small v-if="errors.contact" class="text-danger">{{ errors.contact }}</small>
            </div>
          </div>

          <!-- Détails de la livraison -->
          <div>
            <h3>Détails de la livraison</h3>
            <div v-for="(detail, index) in form.detailLivraisons" :key="index" class="d-flex gap-3 mt-3">
              <div class="w-100">
                <label class="form-label">Commande</label>
                <select v-model="detail.commandeId" class="form-control" required>
                  <option disabled value="">Sélectionner une commande</option>
                  <option v-for="commande in commandes" :key="commande.id" :value="commande.id">
                    {{ commande.nom }}
                  </option>
                </select>
              </div>
              <div class="w-100">
                <label class="form-label">Statut</label>
                <select v-model="detail.status" class="form-control" required>
                  <option value="EN_ATTENTE">En attente</option>
                  <option value="EN_TRANSIT">En transit</option>
                  <option value="LIVRE">Livré</option>
                  <option value="ANNULE">Annulé</option>
                </select>
              </div>

              <div class="w-100 d-flex align-items-end">
                <button type="button" class="btn btn-danger" @click="removeDetail(index)">
                  Supprimer
                </button>
              </div>
            </div>
            <button type="button" @click="addDetail" class="btn btn-primary mt-3">
              Ajouter une commande
            </button>
          </div>

          <!-- Soumettre la livraison -->
          <button type="submit" class="btn btn-success mt-5 w-100">Ajouter la livraison</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useLivraisonStore } from '@stores/livraisonStore';
import { useCommandeStore } from '@stores/commandeStore';
import { useToast } from 'vue-toastification';

const toast = useToast();
const router = useRouter();
const livraisonStore = useLivraisonStore();
const commandeStore = useCommandeStore();

const errors = ref({});
const commandes = ref([]);
const form = ref({
  nom: '',
  date: '',
  contact: '',
  detailLivraisons: [{ commandeId: '', status: 'EN_ATTENTE' }],
});

onMounted(async () => {
  try {
    commandes.value = await commandeStore.fetchCommandes();
  } catch (error) {
    toast.error('Erreur lors du chargement des commandes');
  }
});

const addDetail = () => {
  form.value.detailLivraisons.push({ commandeId: '', status: 'EN_ATTENTE' });
};

const removeDetail = (index) => {
  if (form.value.detailLivraisons.length > 1) {
    form.value.detailLivraisons.splice(index, 1);
  }
};

const handleSubmit = async () => {
  errors.value = {};
  try {
    form.value.date = new Date(form.value.date).toISOString();
    const newLivraison = {
      ...form.value,
      detailLivraisons: form.value.detailLivraisons,
    };

    await livraisonStore.addLivraison(newLivraison);
    toast.success('Livraison ajoutée avec succès');
    router.push('/dashboard/livraisons');
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach((err) => {
        errors.value[err.path] = err.msg;
      });
    } else {
      toast.error('Une erreur est survenue lors de l\'ajout.');
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
  transition: border-color 0.3s ease;
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
