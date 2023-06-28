<template>
  <div class="mt-4">
   <h3 class="text-center text-primary">Linkedin API</h3> 
   <div class="w-75 mx-auto mt-8 text-center">
    <v-btn size="x-large" class="mx-auto" color="primary" @click="refreshToken()">Refresh Token</v-btn>
    
    <div class=" text-center mt-10" v-if="message">
      <h2 :class="status==200? 'text-success': 'text-error'">{{message}}</h2>  
    </div>
   </div>
    


  </div>
</template>

<script>
import Linkedin from '../../../services/linkedin.service'

export default {
 
  
  
  data: () => ({
    message: null,
    status: null
  }),

   methods: {
    refreshToken(){
        Linkedin.refreshLinkedinToken()
        .then(() => {
            this.status = 200
            this.message = "Token mis à jour !"
        })
        .catch(err => {
            console.log(err)
            this.status = 500
            this.message = "Erreur lors de la mis à jour du token !"
        })
    }
  },
  
}
</script>
