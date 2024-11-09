import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import GestionUtilisateurs from '@/views/GestionUtilisateurs.vue';
import GestionLivraisons from '@/views/GestionLivraisons.vue';
import GestionProduits from '@/views/GestionProduit.vue';
import GestionCommandes from '@/views/GestionCommandes.vue';
import GestionVentes from '@/views/GestionVentes.vue';
import GestionMouvements from '@/views/GestionMouvement.vue';
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
import Home from '@/views/Home.vue'
const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: 'utilisateurs',
        name: 'gestion-utilisateurs',
        component: GestionUtilisateurs,
      },
     
      {
        path: 'inventaires',
        name: 'gestion-inventaires',
        component: GestionInventaires,
      },
      {
        path: 'livraisons',
        name: 'gestion-livraisons',
        component: GestionLivraisons,
      },
      {
      path: 'mouvements',
      name: 'gestion-mouvements',
      component: GestionMouvements,
    },
      {
        path: 'produits',
        name: 'gestion-produits',
        component: GestionProduits,
      },
      {
        path: 'ventes',
        name: 'gestion-ventes',
        component: GestionVentes,
      },
      {
        path: 'commandes',
        name: 'gestion-commandes',
        component: GestionCommandes,
      },
      {
        path: 'paiements',
        name: 'gestion-paiements',
        component: GestionPaiements,
      },
      {
        path: 'utilisateurs/ajouter',
        name: 'ajouter-utilisateur',
        component: AjouterUtilisateur,
      },
      {
        path: 'utilisateurs/modifier/:id',
        name: 'modifier-utilisateur',
        component: ModifierUtilisateur,
      },
      {
        path: 'utilisateurs/detail/:id',
        name: 'detail-utilisateur',
        component: DetailUtilisateur,
      },
      {
        path: 'commandes/ajouter',
        name: 'ajout-commande',
        component: AjouterCommande,
      },
      {
        path: 'commandes/modifier/:id',
        name: 'modifier-commande',
        component: ModifierCommande,
      },
      {
        path: 'commandes/detail/:id',
        name: 'detail-commande',
        component: DetailCommande,
      },
      {
      path: 'produits/ajouter',
      name: 'ajout-produit',
      component: AjouterProduit,
    },
    {
      path: 'produits/modifier/:id',
      name: 'modifier-produit',
      component: ModifierProduit,
    },
    {
      path: 'produits/detail/:id',
      name: 'detail-produit',
      component: DetailProduit,
    },
 
    {
        path: 'paiements/ajouter',
        name: 'ajout-paiement',
        component: AjouterPaiement,
    },
    {
      path: 'paiements/modifier/:id',
      name: 'modifier-paiement',
      component: ModifierPaiement,
    },
    {
      path: 'paiements/detail/:id',
      name: 'detail-paiement',
      component: DetailPaiement,
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
  },
    {
      path: 'livraisons/ajouter',
      name: 'ajout-livraison',
      component: AjouterLivraison,
  },
  
  {
    path: 'livraisons/detail/:id',
    name: 'detail-livraison',
    component: DetailLivraison,
  },
  {
      path: 'ventes/ajouter',
      name: 'ajout-vente',
      component: AjouterVente,
  },
  
  {
    path: 'ventes/detail/:id',
    name: 'detail-vente',
    component: DetailVente,
  },
      
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes,
});

export default router;
