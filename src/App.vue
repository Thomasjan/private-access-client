<template>
  <v-app>
    <v-main class="gradient_bg">
      <login-form v-if="$router.currentRoute.value.path=='/login'"></login-form>
      <mdp-oublie v-else-if="$router.currentRoute.value.path=='/mdp-oublie'"></mdp-oublie>
      <admin-layout v-else-if="isAdminRoute"></admin-layout>
      <nav-bar v-else></nav-bar>
    </v-main>
  </v-app>
</template>

<script>
import { useTheme } from 'vuetify'
import NavBar from './components/layouts/NavBar.vue'
import LoginForm from './components/LoginForm.vue'
import MdpOublie from './components/MdpOublie.vue'

export default {
  components: { NavBar, LoginForm, MdpOublie },
  name: 'App',

  setup () {
    const theme = useTheme()

    return {
      theme,
      toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }
  },
  
  data: () => ({
    //
  }),

  mounted(){
    
  },

   computed: {
    isAdminRoute() {
      return this.$router.currentRoute.value.path.startsWith('/administration');
    },
  },
}
</script>
