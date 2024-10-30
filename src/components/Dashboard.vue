<template>
    <div :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
      <!-- Header -->
      <header class="header">
        <div class="header-left">
          <button @click="toggleSidebar" class="btn btn-outline-secondary">
            <i class="fas fa-bars"></i>
          </button>
        </div>
  
        <div class="header-right">
          <button class="btn btn-outline-secondary" @click="toggleTheme">
            <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
            <span class="ms-2">{{
              isDarkMode ? "Light Mode" : "Dark Mode"
            }}</span>
          </button>
          <div class="notification">
            <i class="fas fa-bell"></i>
            <span class="badge">{{ notifications }}</span>
          </div>
        </div>
      </header>
  
      <!-- Sidebar -->
      <nav class="sidebar">
        <div class="sidebar-header">
          <i class="fas fa-fish"></i>
          <h4 v-if="!isSidebarCollapsed"> Poissonerie</h4>
        </div>
        <ul class="list-unstyled">
          <li>
            <a href="#" class="nav-link" @click="showUser">
              <i class="fas fa-user me-2"></i>
              <span v-if="!isSidebarCollapsed">Utilisateur</span>
            </a>
          </li>
          <li>
            <a href="#" class="nav-link" @click="showTimeTracking">
              <i class="fas fa-box me-2"></i>
              <span v-if="!isSidebarCollapsed">Produit</span>
            </a>
          </li>
          <li>
            <a href="#" class="nav-link" @click="showTypeLeave">
              <i class="fas fa-truck me-2"></i>
              <span v-if="!isSidebarCollapsed">Livraison</span>
            </a>
          </li>
          <li>
            <a href="#" class="nav-link" @click="showRequestLeave">
              <i class="fas fa-shopping-cart me-2"></i>
              <span v-if="!isSidebarCollapsed">Ventes</span>
            </a>
          </li>
          <li>
            <a href="#" class="nav-link" @click="showRequestLeave">
              <i class="fas fa-clipboard-list me-2"></i>
              <span v-if="!isSidebarCollapsed">Commandes</span>
            </a>
          </li>
          <li>
            <a href="#" class="nav-link" @click="showRequestLeave">
              <i class="fas fa-credit-card me-2"></i>
              <span v-if="!isSidebarCollapsed">Paiements</span>
            </a>
          </li>
        </ul>
      </nav>
  
      <!-- Main Content -->
      <div class="content">
        <div
          class="dashboard-content"
          v-if="!showUserPage && !showTimeTrackingPage && !showTypeLeavePage && !showRequestLeavePage"
        >
          <h1>Dashboard</h1>
          <p>Welcome to your HR management dashboard!</p>
        </div>
        <User v-if="showUserPage" @cancel="showUserPage = false" />
        <TimeTracking v-if="showTimeTrackingPage" @cancel="showTimeTrackingPage = false" />
        <TypeLeave v-if="showTypeLeavePage" @cancel="showTypeLeavePage = false" />
        <RequestLeave v-if="showRequestLeavePage" @cancel="showRequestLeavePage = false" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  import UserList from '@/components/user/UserList.vue';
//   import Timetracking from "./TimeTracking.vue"; 
import TypeleaveList from '@/components/typeLeave/TypeleaveList.vue';
//   import Requestleave from "./RequestLeave.vue"; 
  
  // State Management
  const isSidebarCollapsed = ref(false);
  const isDarkMode = ref(false);
  const notifications = ref(3);
  const showUserPage = ref(false);
  const showTimeTrackingPage = ref(false);
  const showTypeLeavePage = ref(false);
  const showRequestLeavePage = ref(false);
  
  // Toggle sidebar collapse
  const toggleSidebar = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value;
  };
  
  // Toggle light/dark mode
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
  };
  
  // Watch for theme changes
  watch(isDarkMode, (newVal) => {
    document.body.classList.toggle("dark-mode", newVal);
  });
  
  // Show user
  const showUser = () => {
    showUserPage.value = true;
    showTimeTrackingPage.value = false;
    showTypeLeavePage.value = false;
    showRequestLeavePage.value = false;
  };
  
  // Show time tracking
  const showTimeTracking = () => {
    showUserPage.value = false;
    showTimeTrackingPage.value = true;
    showTypeLeavePage.value = false;
    showRequestLeavePage.value = false;
  };
  
  // Show type leave
  const showTypeLeave = () => {
    showUserPage.value = false;
    showTimeTrackingPage.value = false;
    showTypeLeavePage.value = true;
    showRequestLeavePage.value = false;
  };
  
  // Show request leave
  const showRequestLeave = () => {
    showUserPage.value = false;
    showTimeTrackingPage.value = false;
    showTypeLeavePage.value = false;
    showRequestLeavePage.value = true;
  };
  </script>
  
  <style scoped>
/* Sidebar Collapsed */
.sidebar-collapsed .sidebar {
  width: 80px;
}

.sidebar-collapsed .content {
  margin-left: 80px;
}

/* Header */
.header {
  width: 100%;
  height: 60px;
  background-color: #343a40;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.notification {
  position: relative;
  font-size: 1.5rem;
  color: white;
}

.notification .badge {
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 8px;
  font-size: 0.75rem;
}

/* Sidebar */
.sidebar {
  width: 250px;
  background-color: #343a40;
  color: white;
  padding: 20px;
  position: fixed;
  top: 60px;
  left: 0;
  height: calc(100vh - 60px);
  transition: width 0.3s ease;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 15px 10px;
  color: white;
  text-decoration: none;
  transition: background 0.3s ease;
}

.nav-link:hover {
  background-color: #495057;
  border-radius: 5px;
}

/* Main Content */
.content {
  margin-top: 60px;
  margin-left: 250px;
  padding: 20px;
  background-color: #f8f9fa;
  transition: margin-left 0.3s ease;
}

/* Dark Mode Styles */
body.dark-mode {
  background-color: #1a1a1a;
  color: white;
}

body.dark-mode .header {
  background-color: #343a40;
  box-shadow: none;
}

body.dark-mode .sidebar {
  background-color: #212529;
}
</style>
