<template>
  <v-card class="ml-1 bg-white">
    <h3 class="text-center text-primary mt-4">Liste des Logins</h3>

    <div class="mt-10">

      <div class="mt-6 ml-4 d-flex">
        <v-btn
          color="primary"
        >
          Créer une Entreprise
          <v-dialog
            v-model="entrepriseDialog"
            activator="parent"
            width="600"
            persistent
          >
            <creation-entreprise v-on:closeDialog="entrepriseDialog=false; fetchEntreprises()"></creation-entreprise>
          </v-dialog>
        </v-btn>

        <v-btn class="ml-6"
          color="primary"
        >
          Créer un utilisateur
          <v-dialog
            v-model="userDialog"
            activator="parent"
            width="600"
            persistent
          >
            <creation-entreprise v-on:closeDialog="userDialog=false"></creation-entreprise>
          </v-dialog>
        </v-btn>
      </div>

      <div class="mt-6">
        <v-list class="bg-white ml-8">
          <v-list-items v-for="login in logins" :key="login.id">
            <v-list-item-title>-->{{login.social_reason}} - {{login.code_cient}} - {{login.category}} - {{login.subcategory}} - {{login.contract}} - {{login.end_contract}} </v-list-item-title>
          </v-list-items>
        </v-list>
      </div>

        

    </div>
  </v-card>
</template>

<script>
import Entreprise from '../../../services/entreprises.service'
export default {
  
  data: () => ({
    entrepriseDialog: false,
    userDialog: false,
    logins: [],
    
  }),

  created() {
    this.fetchEntreprises()
  },

  methods: {
    //récupération des entreprises
    fetchEntreprises(){
      Entreprise.getEntreprises()
    .then(response => {
      this.logins = response
    })
    .catch(err => {
      console.log(err);
    })
    }
  },

  

}
</script>
