<template>
  <v-card class="ml-1 bg-white">
    <h3 class="text-center text-primary mt-4">Liste des Utilisateurs</h3>

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
            <creation-entreprise v-on:closeDialog="entrepriseDialog=false" v-on:fetchEntreprises="fetchEntreprises"></creation-entreprise>
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
            <creation-utilisateur v-on:closeDialog="userDialog=false" v-on:fetchUsers="fetchUsers"></creation-utilisateur>
          </v-dialog>
        </v-btn>
      </div>

      <div class="mt-6">
        

      
      <v-table density="compact" class="bg-white">
        <thead>
          <tr class="">
            <th class="text-left text-red" @click="sortByField('code_client')">Code</th>
            <th class="text-left text-red" @click="sortByField('social_reason')">Entreprise</th>
            <th class="text-left text-blue" @click="sortByField('category')">Famille</th>
            <th class="text-left text-blue" @click="sortByField('subcategory')">Sous-famille</th>
            <th class="text-left text-black" @click="sortByField('name')">Nom</th>
            <th class="text-left text-black" @click="sortByField('surname')">Prénom</th>
            <th class="text-left text-green" @click="sortByField('craeted_at')">Création</th>
            <th class="text-left text-orange" @click="sortByField('contract')">Contrat</th>
            <th class="text-left text-orange" @click="sortByField('end_contract')">Date fin contrat</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
          >
            <td>{{ user.code_client }}</td>
            <td>{{ user.social_reason }}</td>
            <td>{{ user.category }}</td>
            <td>{{ user.subcategory }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.surname }}</td>
            <td>{{ user.created_at.slice(0,10) }}</td>
            <td>{{ user.contract? user.contract: 'pas de contrat' }}</td>
            <td>{{ user.end_contract }}</td>
          </tr>
        </tbody>
      </v-table>
      
      </div>

        

    </div>
  </v-card>
</template>

<script>
import User from '../../../services/users.service'

export default {
  
  data: () => ({
    entrepriseDialog: false,
    userDialog: false,
    users: [],
    sortBy: [],
     
  }),

  mounted() {
    this.fetchUsers()
  },

  methods: {
    // récupération des Utilisateurs
    fetchUsers(){
      User.getUsers()
      .then(response => {
        this.users = response
        
      })
      .catch(err => {
        console.log(err);
      })
    },

    sortByField(field) {
    
    },

    fetchEntreprises(){
      console.log('fetchEntreprises');
    }
  

  },

  

}
</script>
