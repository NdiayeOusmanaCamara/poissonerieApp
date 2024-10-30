<template>
  <div id="app">
    <Dashboard /> <!-- Affiche la barre latérale à gauche -->
    <div class="content">
      <router-view /> <!-- Affiche le contenu de la page en fonction de la route -->
    </div>
  </div>
</template>

<script setup>
import Dashboard from './components/Dashboard.vue';
import Login from './components/Login.vue';
</script>

<style scoped>
#app {
  display: flex;
}

.content {
  width: calc(100% - 250px);
}

@media (max-width: 768px) {
  .content {
    margin-left: 0;
  }
}
</style>
