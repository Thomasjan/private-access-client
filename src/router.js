import { createRouter, createWebHistory } from 'vue-router'

import Home from './components/Home.vue'
import HelloWorld from './components/HelloWorld.vue'
import LoginForm from './components/LoginForm.vue'

//layouts
import Administration from './components/layouts/AdminLayout.vue'

//views
import GestimumERP from './components/views/GestimumERP.vue'
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
import ListeLogins from './components/views/admin/ListeLogins.vue' 

const routes = [
  { path: '/', component: Home },
  {name: 'home', path: '/home', component: Home },
  {name: 'login',  path: '/login', component: LoginForm },
  {name: 'logout',  path: '/logout', component: LoginForm },
//   {name: 'administration',  path: '/administration', component: Administration },

  //views
  { path: '/gestimum-erp', component: GestimumERP },
  { path: '/support', component: Support },
  { path: '/formation', component: Formation },
  { path: '/g-news', component: G_News },
  { path: '/contacts', component: Contacts },
  { path: '/contrat', component: Contrat },
  { path: '/aide-vente', component: AideVente },
  { path: '/tarifs', component: Tarifs },

    //views -> admin
    { path: '/administration/suivi-connexions', component: SuiviConnexions },
    { path: '/administration/suivi-téléchargements', component: SuiviTelechargements },
    { path: '/administration/maj-versions', component: MajVersions },
    { path: '/administration/liste-logins', component: ListeLogins },

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
    // } else if (!(to.name === 'login' || await function() {!!store.getters.usersFullName.id})) next({ name: 'login' })
    } else if (!( to.name == 'login' || (to.name == 'mdpoublie') || !! localStorage.getItem('auth'))) {
        next({ name: 'login' })
   
    } else {
        next()
    }
})

export default router
