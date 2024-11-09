<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Login from './components/Login.vue';

export default {
  name: 'App',
  components: {
    Login,
  },
};
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';
</style>
