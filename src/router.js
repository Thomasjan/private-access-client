import { createRouter, createWebHistory } from 'vue-router'

import Home from './components/Home.vue'
import LoginForm from './components/LoginForm.vue'
import MdpOublie from './components/MdpOublie.vue'
import Profil from './components/Profil.vue'

//layouts
import Administration from './components/layouts/AdminLayout.vue'

//views
import GestimumERP from './components/views/GestimumERP.vue'
import GestionComptable from './components/views/GestionComptable.vue'
import GestionCommerciale from './components/views/GestionCommerciale.vue'
import Support from './components/views/Support.vue'
import Formation from './components/views/Formation.vue'
import G_News from './components/views/G-News.vue'
import Contacts from './components/views/Contacts.vue'
import Contrat from './components/views/Contrat.vue'
import AideVente from './components/views/Aide-vente.vue'
import Tarifs from './components/views/Tarifs.vue'

//views -> admin
import SuiviConnexions from './components/views/admin/SuiviConnexions.vue'
import SuiviTelechargements from './components/views/admin/SuiviTelechargements.vue'
import MajVersions from './components/views/admin/MajVersions.vue'
import ListeUtilisateurs from './components/views/admin/ListeUtilisateurs.vue' 
import ListeEntreprises from './components/views/admin/ListeEntreprises.vue' 

const routes = [
  {path: '/', component: Home },
  {name: 'home', path: '/home', component: Home },
  {name: 'login',  path: '/login', component: LoginForm },
  {name: 'mdp-oublie',  path: '/mdp-oublie', component: MdpOublie },
  {name: 'logout',  path: '/logout', component: LoginForm },
  {name: 'profil',  path: '/profil', component: Profil },

  //views
  { path: '/gestimum-erp', component: GestimumERP },
  { path: '/gestion-comptable', component: GestionComptable },
  { path: '/gestion-commerciale', component: GestionCommerciale },
  { path: '/support', component: Support },
  { path: '/formation', component: Formation },
  { path: '/g-news', component: G_News },
  { path: '/contacts', component: Contacts },
  { path: '/contrat', component: Contrat },
  { path: '/aide-vente', component: AideVente },
  { path: '/tarifs', component: Tarifs },

    //views -> admin
    { path: '/administration/suivi-connexions', component: SuiviConnexions },
    { path: encodeURI('/administration/suivi-téléchargements'), component: SuiviTelechargements },
    { path: '/administration/maj-versions', component: MajVersions },
    { path: '/administration/liste-utilisateurs', component: ListeUtilisateurs },
    { path: '/administration/liste-entreprises', component: ListeEntreprises },

]


const router = createRouter({
  history: createWebHistory(),
  routes
})

// Autorisation d'accès aux pages via localStorage
router.beforeEach((to, from, next) => {
    // Gestion de la route 'logout'
    if (to.name === 'logout') {
        User.logout().then(() => {
            localStorage.removeItem('auth')
            const blankUsers = {
                id: '',
                name: '',
                surname: '',
                email: '',
                role_id: '',
            }
            store.commit('UPDATE_USER', blankUsers)
            next({ name: 'login' })
        })
    } else if (!( to.name == 'login' || (to.name == 'mdp-oublie') || !! localStorage.getItem('auth'))) {
        next({ name: 'login' })
   
    } else {

        next()
    }
})

export default router
