<template>
  <v-app>
    <v-main>
      <login-form v-if="$router.currentRoute.value.path=='/login'"></login-form>
      <admin-layout v-else-if="isAdminRoute"></admin-layout>
      <nav-bar v-else></nav-bar>
      <!-- <router-view /> -->
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/layouts/NavBar.vue'
import { useTheme } from 'vuetify'
import LoginForm from './components/LoginForm.vue'

import User from './services/users.service'

export default {
  components: { NavBar, LoginForm },
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
