<template>
  <v-app>
    <v-main>
      <nav-bar></nav-bar>
      <!-- <router-view /> -->
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/layouts/NavBar.vue'

export default {
  components: { NavBar },
  name: 'App',
  
  data: () => ({
    //
  }),
}
</script>
