<template>
    <div class="container">
      <h2>Create Payment</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="date" class="form-label">Date</label>
          <input
            v-model="date"
            type="datetime-local"
            id="date"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="montant" class="form-label">Amount</label>
          <input
            v-model="montant"
            type="number"
            step="0.01"
            id="montant"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="mode_paiement" class="form-label">Payment Method</label>
          <input
            v-model="mode_paiement"
            type="text"
            id="mode_paiement"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="commandeId" class="form-label">Order ID</label>
          <input
            v-model="commandeId"
            type="number"
            id="commandeId"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="utilisateurId" class="form-label">User ID</label>
          <input
            v-model="utilisateurId"
            type="number"
            id="utilisateurId"
            class="form-control"
          />
        </div>
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary">Add Payment</button>
        </div>
      </form>
  
      <!-- Example of the icon buttons -->
      <div class="icon-buttons mt-4">
        <button class="btn btn-outline-info me-2">
          <i class="fas fa-eye"></i> <!-- Eye Icon -->
        </button>
        <button class="btn btn-outline-warning me-2">
          <i class="fas fa-edit"></i> <!-- Edit Icon -->
        </button>
        <button class="btn btn-outline-danger">
          <i class="fas fa-trash"></i> <!-- Delete Icon -->
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { usePaiementStore } from "@/store/paiementStore";
  import { useRouter } from "vue-router";
  
  // Form fields
  const date = ref("");
  const montant = ref("");
  const mode_paiement = ref("");
  const commandeId = ref("");
  const utilisateurId = ref("");
  
  // Store and router
  const store = usePaiementStore();
  const router = useRouter();
  
  function handleSubmit() {
    if (montant.value <= 0) {
      alert("The amount must be greater than zero.");
      return;
    }
  
    store.addPaiement({
      date: date.value,
      montant: montant.value,
      mode_paiement: mode_paiement.value,
      commandeId: commandeId.value,
      utilisateurId: utilisateurId.value || null, // User ID can be null
    });
  
    // Reset form fields
    date.value = "";
    montant.value = "";
    mode_paiement.value = "";
    commandeId.value = "";
    utilisateurId.value = "";
  
    // Redirect after submission
    router.push("/paiements");
  }
  </script>
  
  <style scoped>
  /* Add some margin between the icon buttons */
  .icon-buttons .btn {
    margin-right: 10px;
  }
  </style>
  