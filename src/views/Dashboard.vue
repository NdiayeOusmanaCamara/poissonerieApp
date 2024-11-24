<template>

  <div class="dashboard">
    <nav class="sidebar" v-if="sidebarVisible">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link" active-class="active">
            <i class="fas fa-home"></i> Dashboard
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/utilisateurs" class="nav-link" active-class="active">
            <i class="fas fa-users"></i> Utilisateurs
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/produits" class="nav-link" active-class="active">
            <i class="fas fa-box-open"></i> Produits
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/commandes" class="nav-link" active-class="active">
            <i class="fas fa-shopping-cart"></i> Commandes
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/paiements" class="nav-link" active-class="active">
            <i class="fas fa-credit-card"></i> Paiements
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/livraisons" class="nav-link" active-class="active">
            <i class="fas fa-truck"></i> Livraisons
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/ventes" class="nav-link" active-class="active">
            <i class="fas fa-chart-line"></i> Ventes
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/inventaires" class="nav-link" active-class="active">
            <i class="fas fa-warehouse"></i> Inventaires
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/mouvements" class="nav-link" active-class="active">
            <i class="fas fa-exchange-alt"></i>
            Mouvements
          </router-link>

          
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/receptions" class="nav-link" active-class="active">
            <i class="fas fa-receipt"></i>
            Receptions
          </router-link>

          
        </li>
      </ul>
    </nav>

    <!-- Top bar -->
    <div class="top-bar">
      <div class="bar">
      <div class="sidebar-header" @click="toggleSidebar">
        <img src="@/assets/images/logo.jpg" alt="logo" class="w-10">
        <h2>POISSONERIE</h2>
      </div>

      <div class="user-info">
        <button @click="logout" class="btn btn-outline-light ms-3">Se déconnecter</button>
      </div>
  
      </div>
    </div>

    <!-- Content -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
<script setop>
import { computed } from 'vue';
import { useAuthStore } from '@stores/authStore'; // Assuming you are using a store for authentication

export default {
  name: 'Dashboard',
  data() {
    return {
      sidebarVisible: true, // Sidebar is visible by default
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
    logout() {
      const authStore = useAuthStore();
      authStore.logout(); 
      this.$router.push('/');// Ensure the logout function is defined in your auth store
    }
  },
  computed: {
    isAuthenticated() {
      const authStore = useAuthStore();
      return authStore.isAuthenticated;

    }
  }
};
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.bar h2{
  font-weight: bold;
  margin-top: 20px;
  color: white;
}
.bar{
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: auto;
}
img, svg {
  vertical-align: middle;
  width: 60px;
  margin-top:10px ;
}

.sidebar-header[data-v-7f773d42] {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
}
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  transition: all 0.3s ease;
}

.sidebar-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  cursor: pointer;
}

.sidebar-header i {
  margin-right: 10px;
  font-size: 24px;
}

.sidebar-header h5 {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-link {
  color: #000000;
  text-decoration: none;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  font-size: 1rem;
  padding: 10px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-link i {
  margin-right: 10px;
  font-size: 18px;
}

.nav-link:hover {
  background-color: #34495e;
  color: #1abc9c;
  border-radius: 5px;
}

.nav-link.active {
  background-color: #1abc9c;
  color: white;
  border-radius: 5px;
}

.top-bar {
  width:100%;
  background-color: #2c3e50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  
  z-index: 1000;
  
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info i {
  margin-right: 15px;
  font-size: 20px;
  color: #2c3e50;
  transition: color 0.3s;
}

.user-info i:hover {
  color: #1abc9c;
}

.content {
  flex-grow: 1;
  padding: 80px 20px 20px;
  background: #ecf0f1;
  
}
.sidebar[data-v-7f773d42] {
  width: 240px;
  background-color:  white;
  color:#2c3e50;
  padding: 15px;
  transition: all 0.3s ease;
  margin-top: 100px;
  
}
.sidebar[data-v-7f773d42][data-v-7f773d42] {
  width: 240px;
  background-color:white;
  color: #2c3e50;
  padding: 15px;
  transition: all 0.3s ease;
  margin-top: 100px;
  position: fixed;
}
.content[data-v-7f773d42] {
  flex-grow: 1;
  padding: 80px 20px 20px;
  
}

</style>
