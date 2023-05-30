<template>
  <v-card class="ml-1 bg-white">
    <h3 class="text-center text-primary mt-4">Liste des Connexions</h3>

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
            <creation-entreprise v-on:closeDialog="entrepriseDialog=false;"></creation-entreprise>
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
       
      <v-table density="compact" class="bg-white">
        <thead>
          <tr class="">
            <th class="text-left text-red" @click="sortByField('social_reason')">Entreprise</th>
            <th class="text-left text-blue" @click="sortByField('category')">Famille</th>
            <th class="text-left text-blue" @click="sortByField('subcategory')">Sous-famille</th>
            <th class="text-left text-black" @click="sortByField('name')">Nom</th>
            <th class="text-left text-black" @click="sortByField('surname')">Prénom</th>
            <!-- <th class="text-left text-orange" @click="sortByField('contract')">Contrat</th>
            <th class="text-left text-orange" @click="sortByField('end_contract')">Date fin contrat</th> -->
            <th class="text-left text-orange" @click="sortByField('created_at')">Date Connexion</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="login in logins"
            :key="login.id"
          >
            <td>{{ login.entreprise.social_reason }}</td>
            <td>{{ login.entreprise.category }}</td>
            <td>{{ login.entreprise.subcategory }}</td>
            <td>{{ login.user.name }}</td>
            <td>{{ login.user.surname }}</td>
            <!-- <td>{{ login.user.surname }}</td>
            <td>{{ login.user.surname }}</td> -->
            <td>{{ login.date }}</td>
          </tr>
        </tbody>
      </v-table>
      
      </div>

        

    </div>
  </v-card>
</template>

<script>
import Auth from '../../../services/auth.service'

export default {
  
  data: () => ({
    entrepriseDialog: false,
    userDialog: false,
    logins: [],
    sortBy: [],
     
  }),

  created() {
    this.fetchLogins()
  },

  methods: {
    //récupération des entreprises
    fetchLogins(){
      Auth.getLogins()
      .then(response => {
        this.logins = response
        
      })
      .catch(err => {
        console.log(err);
      })
    },

    sortByField(field) {
    
    },
  

  },

  

}
</script>
