<template>
  <v-app>
    <v-main>
      <login-form v-if="$router.currentRoute.value.path=='/login'"></login-form>
      <nav-bar v-else></nav-bar>
      <!-- <router-view /> -->
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/layouts/NavBar.vue'
import { useTheme } from 'vuetify'
import LoginForm from './components/LoginForm.vue'

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
    
  }
}
</script>
