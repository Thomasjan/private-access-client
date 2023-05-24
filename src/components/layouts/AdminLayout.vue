<template>
  <v-container>
    <admin-navbar ></admin-navbar>
     <login-form v-if="!$store.state.user.role_id===1"></login-form>
  </v-container>
</template>

<script>
export default {
  
  data: () => ({
    //
  }),
}
</script>
