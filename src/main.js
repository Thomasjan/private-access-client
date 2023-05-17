import { createApp } from 'vue'
import App from './App.vue'
import { loadFonts } from './plugins/webfontloader'

import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

//layouts
import NavBar from './components/layouts/NavBar.vue'
import Footer from './components/layouts/Footer.vue'

//views
import GestimumERP from './components/views/GestimumERP.vue'
import Support from './components/views/Support.vue'
import Formation from './components/views/Formation.vue'
import G_News from './components/views/G-News.vue'
import Contacts from './components/views/Contacts.vue'





const app = createApp(App);


app.component('navbar', NavBar)
app.component('footer', Footer)
app.component('gestimum-erp', GestimumERP )
app.component('support', Support)
app.component('formation', Formation)
app.component('g-news', G_News)
app.component('contacts', Contacts )






loadFonts()

  app
  .use(vuetify)
  .use(router)
  .use(store)
  .mount('#app')
