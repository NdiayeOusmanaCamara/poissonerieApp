import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js";



import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "@router";
// import i18n from "./i18n"; 

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Importer des icônes spécifiques
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'; 
import "@fortawesome/fontawesome-free/css/all.css";


library.add(faUser, faLock);

const app = createApp(App);
const pinia = createPinia();
// app.use(i18n); 
app.use(pinia);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount("#app");
