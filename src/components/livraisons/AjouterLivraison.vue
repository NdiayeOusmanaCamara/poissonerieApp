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
                <label for="nom" class="form-label">Nom du destinataire</label>
                <input type="name" id="nom" v-model="form.nom" class="form-control" required />
                <small v-if="errors.nom" class="text-danger">{{ errors.nom }}</small>
              </div>
            </div>
           
         
          
          <div class="w-100">
            <div class="form-group">
              <label for="contact" class="form-label">Contact</label>
              <input type="tel" id="contact" v-model="form.contact" class="form-control" required />

              <small v-if="errors.contact" class="text-danger">{{ errors.contact }}</small>
            </div>
          </div>
          
        </div>

          <!-- Détails de la livraison -->
          <!-- <div>
            <h3>Détails de la livraison</h3>
            <div v-for="(detail, index) in form.details" :key="index" class="d-flex gap-3 mt-3"> -->
              <div class="w-100">
                <label class="form-label">Commande</label>
                <select v-model="form.commandeId" class="form-control" required>
                  <option disabled value="">Sélectionner une commande</option>
                  <option v-for="commande in commandes" :key="commande.id" :value="commande.id">
                    {{ commande.id }}
                  </option>
                </select> <small v-if="errors.livraisons && errors.livraisonslivraisons[index]" class="text-danger">
                  {{ errors.livraisons[index].message }}
                </small>
              </div>
              <div class="w-100">
                <label class="form-label">Statut</label>
                <select v-model="form.status" class="form-select" required>
                  <option value="EN_ATTENTE">En attente</option>
                  <option value="EN_COURS">En cours</option>
                  <option value="LIVREE">Livré</option>
                 
                </select>
                <small v-if="errors.form && errors.details[index]" class="text-danger">
                  {{ errors.details[index].message }}
                </small>
              </div>

              
          <!-- Soumettre la livraison -->
          <button type="submit" class="btn btn-success mt-5 w-100">Ajouter la livraison</button>
          <small v-if="errors.general" class="text-danger">{{ errors.general }}</small>
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
import moment from 'moment';  // Import Moment.js

const toast = {
  success: (message) => {
    alert(`Succès : ${message}`);
  },
  error: (message) => {
    alert(`Erreur : ${message}`);
  }
};

const router = useRouter();
const livraisonStore = useLivraisonStore();
const commandeStore = useCommandeStore();

const errors = ref({});
const commandes = ref([]);
const form = ref({
  nom: '',
  date: '',
  contact: '',
  
  commandeId: '',
  status: 'EN_ATTENTE',
});

onMounted(async () => {
  try {
    commandes.value = await commandeStore.fetchCommandes();
  } catch (error) {
    errors.value.general = 'Erreur lors du chargement des commandes';
  }
});

const addDetail = () => {
  
  const existingCommandes = form.value.details.map(detail => detail.commandeId);
  const selectedCommande = form.value.details[form.value.details.length - 1].commandeId;
  
  if (existingCommandes.includes(selectedCommande)) {
    toast.error('Cette commande a déjà été ajoutée.');
    return;
  }

  form.value.details.push({ commandeId: '', status:'EN_ATTENTE'});
};

const removeDetail = (index) => {
  if (form.value.details.length > 1) {
    form.value.details.splice(index, 1);
  }
};

const handleSubmit = async () => {
  errors.value = {}; // Reset errors before the new submit

  // Parse the date using moment and compare with today's date
  const today = moment().startOf('day');  // Get the start of today (00:00:00)
  const selectedDate = moment(form.value.date).startOf('day');  // Parse selected date and set to 00:00:00

  if (selectedDate.isBefore(today)) {
    errors.value.date = "La date doit être aujourd'hui ou dans le futur.";  // Error message if the date is in the past
    return;
  }

  try {
    form.value.date = form.value.date ? moment(form.value.date).toISOString() : '';  // Format date to ISO string
    const newLivraison = { ...form.value,};

    await livraisonStore.addLivraison(newLivraison); // Make the API call
    toast.success('Livraison ajoutée avec succès');
    router.push('/dashboard/livraisons');
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      errors.value.general = error.response.data.error; // Affichage d'erreurs globales
    }
    if (error.response && error.response.data.errors) {
      error.response.data.errors.forEach((err) => {
        errors.value[err.path] = err.msg; // Affichage d'erreurs spécifiques par champ
      });
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
