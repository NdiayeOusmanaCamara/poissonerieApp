import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import GestionUtilisateurs from '@/views/GestionUtilisateurs.vue';
import GestionLivraisons from '@/views/GestionLivraisons.vue';
import GestionProduits from '@/views/GestionProduit.vue';
import GestionCommandes from '@/views/GestionCommandes.vue';
import GestionVentes from '@/views/GestionVentes.vue';
import GestionReceptions from '@/views/GestionReception.vue';
import GestionMouvements from '@/views/GestionMouvements.vue';
import GestionPaiements from '@/views/GestionPaiements.vue';
import GestionInventaires from '@/views/GestionInventaires.vue';
import AjouterUtilisateur from '@/components/utilisateurs/AjouterUtilisateur.vue';
import ModifierUtilisateur from '@/components/utilisateurs/ModifierUtilisateur.vue';
import DetailUtilisateur from '@/components/utilisateurs/DetailUtilisateur.vue';
import DetailCommande from '@/components/commandes/DetailCommande.vue';
import AjouterCommande from '@/components/commandes/AjouterCommande.vue';
import ModifierCommande from '@/components/commandes/ModifierCommande.vue';
import AjouterPaiement from '@/components/paiements/AjouterPaiement.vue'
import ModifierPaiement from '@/components/paiements/ModifierPaiement.vue';
import DetailPaiement from '@/components/paiements/DetailPaiement.vue';
import AjouterInventaire from '@/components/inventaires/AjouterInventaire.vue';
import DetailInventaire from '@/components/inventaires/DetailInventaire.vue';
import AjouterProduit from '@/components/produits/AjouterProduit.vue';
import ModifierProduit from '@/components/produits/ModifierProduit.vue';
import DetailProduit from '@/components/produits/DetailProduit.vue';
import AjouterLivraison from '@/components/livraisons/AjouterLivraison.vue';
import DetailLivraison from '@/components/livraisons/DetailLivraison.vue';
import AjouterVente from '@/components/ventes/AjouterVente.vue';
import DetailVente from '@/components/ventes/DetailVente.vue';
import ForgetPassword from '@/components/ForgetPassword.vue';
import ResetPassword from '@/components/ResetPassword.vue';
import { useAuthStore } from '@/stores/authStore';
import UpdateProfile from '@/components/updateProfile.vue';
import DetailMouvement from '@/components/mouvements/DetailMouvement.vue';
import AjouterReception from '@/components/receptions/AjouterReception.vue';
import ModifierReception from '@/components/receptions/ModifierReception.vue';
import DetailReception from '@/components/receptions/DetailReception.vue';




const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/forgot',
    name: 'forgot-password',
    component: ForgetPassword,
  },
  {
    path: '/reset-password/:token',
    name: 'reset-password',
    component: ResetPassword,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'utilisateurs',
        name: 'gestion-utilisateurs',
        component: GestionUtilisateurs,
        meta: { requiresAuth: true },
      },
     
      {
        path: 'inventaires',
        name: 'gestion-inventaires',
        component: GestionInventaires,
        meta: { requiresAuth: true },
      },
      {
        path: 'livraisons',
        name: 'gestion-livraisons',
        component: GestionLivraisons,
        meta: { requiresAuth: true },
      },
      {
      path: 'mouvements',
      name: 'gestion-mouvements',
      component: GestionMouvements,
      meta: { requiresAuth: true },
    },
      {
        path: 'produits',
        name: 'gestion-produits',
        component: GestionProduits,
        meta: { requiresAuth: true },
      },
      {
        path: 'ventes',
        name: 'gestion-ventes',
        component: GestionVentes,
        meta: { requiresAuth: true },
      },
      {
        path: 'receptions',
        name: 'gestion-receptions',
        component: GestionReceptions,
        meta: { requiresAuth: true },
      },
      {
        path: 'commandes',
        name: 'gestion-commandes',
        component: GestionCommandes,
        meta: { requiresAuth: true },
      },
      {
        path: 'paiements',
        name: 'gestion-paiements',
        component: GestionPaiements,
        meta: { requiresAuth: true },
      },
      {
        path: 'utilisateurs/ajouter',
        name: 'ajouter-utilisateur',
        component: AjouterUtilisateur,
        meta: { requiresAuth: true },
      },
      {
        path: 'utilisateurs/modifier/:id',
        name: 'modifier-utilisateur',
        component: ModifierUtilisateur,
        meta: { requiresAuth: true },
      },
      {
        path: 'utilisateurs/detail/:id',
        name: 'detail-utilisateur',
        component: DetailUtilisateur,
        meta: { requiresAuth: true },
      },
      {
        path: 'commandes/ajouter',
        name: 'ajout-commande',
        component: AjouterCommande,
        meta: { requiresAuth: true },
      },
      {
        path: 'commandes/modifier/:id',
        name: 'modifier-commande',
        component: ModifierCommande,
        meta: { requiresAuth: true },
      },
      {
        path: 'commandes/detail/:id',
        name: 'detail-commande',
        component: DetailCommande,
        meta: { requiresAuth: true },
      },
      {
        path: 'receptions/ajouter',
        name: 'ajout-reception',
        component: AjouterReception,
        meta: { requiresAuth: true },
      },
      {
        path: 'receptions/modifier/:id',
        name: 'modifier-reception',
        component: ModifierReception,
        meta: { requiresAuth: true },
      },
      {
        path: 'receptions/detail/:id',
        name: 'detail-reception',
        component: DetailReception,
        meta: { requiresAuth: true },
      },
     
      {
      path: 'produits/ajouter',
      name: 'ajout-produit',
      component: AjouterProduit,
      meta: { requiresAuth: true },
    },
  
    {
      path: 'produits/modifier/:id',
      name: 'modifier-produit',
      component: ModifierProduit,
      meta: { requiresAuth: true },
    },
    {
      path: 'produits/detail/:id',
      name: 'detail-produit',
      component: DetailProduit,
      meta: { requiresAuth: true },
    },
 
    {
        path: 'paiements/ajouter',
        name: 'ajout-paiement',
        component: AjouterPaiement,
        meta: { requiresAuth: true },
    },
    {
      path: 'paiements/modifier/:id',
      name: 'modifier-paiement',
      component: ModifierPaiement,
      meta: { requiresAuth: true },
    },
    {
      path: 'paiements/detail/:id',
      name: 'detail-paiement',
      component: DetailPaiement,
      meta: { requiresAuth: true },
    },
   
    {
      path: 'inventaires/ajouter',
      name: 'ajout-inventaire',
      component: AjouterInventaire,
  },

  {
    path: 'inventaires/detail/:id',
    name: 'detail-inventaire',
    component: DetailInventaire,
    meta: { requiresAuth: true },
  },
    {
      path: 'livraisons/ajouter',
      name: 'ajout-livraison',
      component: AjouterLivraison,
      meta: { requiresAuth: true },
  },
  
  {
    path: 'livraisons/detail/:id',
    name: 'detail-livraison',
    component: DetailLivraison,
    meta: { requiresAuth: true },
  },
  {
      path: 'ventes/ajouter',
      name: 'ajout-vente',
      component: AjouterVente,
      meta: { requiresAuth: true },
  },
  
  {
    path: 'ventes/detail/:id',
    name: 'detail-vente',
    component: DetailVente,
    meta: { requiresAuth: true },
  },
  
  {
    path: 'mouvements/detail/:id',
    name: 'detail-mouvement',
    component: DetailMouvement,
    meta: { requiresAuth: true },
  },
  {
    path: 'profil',
    name: 'profil-utilisateur',
    component: UpdateProfile,
    meta: { requiresAuth: true },
  },
      
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes,
});
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.token) {
    next('/');
  } else {
    next();
  }
});

export default router;
