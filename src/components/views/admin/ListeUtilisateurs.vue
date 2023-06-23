<template>
  <v-card class="ml-1 bg-background pb-4">
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
        
        <v-row class="pa-4">
          <v-col cols="6">
            <v-text-field col="4" v-model="search" label="Rechercher"  class="" prepend-inner-icon="mdi-magnify"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-select v-model="family" :items="familyItems" label="Famille" clearable></v-select>
          </v-col>
          <v-col cols="3">
            <v-select v-model="subfamily" :items="subfamilyItems" label="Sous-famille" clearable></v-select>
          </v-col>
        </v-row>

         <div class="d-flex align-center mb-2 ml-4">
          <v-chip class color="primary">{{usersFiltered.length}}  </v-chip>
          <p class="ml-2">Utilisateurs</p>
        </div>
      
      <v-table density="compact" class="bg-background" >
        <thead>
          <tr class="">
            <!-- <th class="text-left text-red" @click="sortByField('code_client')">Code</th> -->
            <th class="text-left text-blue" @click="sortByField('social_reason')">Entreprise</th>
            <th class="text-left text-black" @click="sortByField('category')">Famille</th>
            <!-- <th class="text-left text-black" @click="sortByField('subcategory')">Sous-famille</th> -->
            <th class="text-left text-red" @click="sortByField('surname')">Prénom</th>
            <th class="text-left text-red" @click="sortByField('name')">Nom</th>
            <th class="text-left text-red" @click="sortByField('email')">Email</th>
            <th class="text-left text-green" @click="sortByField('craeted_at')">Création</th>
            <th class="text-left text-orange text-center" @click="sortByField('contract')">Contrat</th>
            <!-- <th class="text-left text-orange" @click="sortByField('end_contract')">Date fin contrat</th> -->
          </tr>
        </thead>
        <tbody>
          <tr class="text-subtitle-2"
            v-for="user in usersFiltered"
            :key="user.id"
          >
            <!-- <td>{{ user.code_client }}</td> -->
            <td> <v-chip color="blue-darken-3">{{ user.social_reason }} </v-chip> </td>
             <td> <v-chip>{{ user.category }}</v-chip> </td>
            <!-- <td> <v-chip>{{ user.subcategory }}</v-chip> </td> -->
            <td>{{ user.name }}</td>
            <td>{{ user.surname }}</td>
            <td>{{ user.email }}</td>
            <td><v-chip size="small" color="primary">{{ user.created_at.slice(0,10) }}</v-chip> </td>
            <td class="text-center"> <v-chip color="blue-lighten-2">{{ user.contract? user.contract: 'pas de contrat' }}</v-chip> </td>
            <!-- <td>{{ user.end_contract }}</td> -->
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
    search: '',
    family: '',
    subfamily: '',
    familyItems: ['1. PARTENAIRE', '2. PME', '3. AUTRES'],
    subfamilyItems: ['1.1 PARTENAIRES', '1.2 EXPERTS', '1.3 EXPERTS SUPPORT', '1.4 EX-PARTENAIRES', '1.5 EDITEURS EXPERTS', '2.1 PME G-WEB', '2.2 PME G-TEL'],
     
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
      this.fetchUsers()
      console.log('fetchEntreprises');
    }
  

  },

  computed: {
    usersFiltered() {
      let users = this.users

      if (this.search) {
        users = users.filter(user => {
          return user.name.toLowerCase().includes(this.search.toLowerCase()) || user.surname.toLowerCase().includes(this.search.toLowerCase())  || user.social_reason.toLowerCase().includes(this.search.toLowerCase()) || user.email.toLowerCase().includes(this.search.toLowerCase()) //|| user.code_client.toString().includes(this.search.toLowerCase())
        })
      }
      if (this.family) {
        users = users.filter(user => {
          return user.category === this.family
        })
      }
      if (this.subfamily) {
        users = users.filter(user => {
          return user.subcategory === this.subfamily
        })
      }

      return users
    }
  }

  

}
</script>
