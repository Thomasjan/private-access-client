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
            <v-text-field col="4" type="search" v-model="search" label="Rechercher"  class="" prepend-inner-icon="mdi-magnify"></v-text-field>
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
            <th class="text-left text-blue cursor-pointer" @click="sortByField('social_reason')">Entreprise</th>
            <th class="text-left text-black cursor-pointer" @click="sortByField('category')">Famille</th>
            <th class="text-left text-red cursor-pointer" @click="sortByField('surname')">Nom</th>
            <th class="text-left text-red cursor-pointer" @click="sortByField('name')">Prénom</th>
            <th class="text-left text-red cursor-pointer" @click="sortByField('email')">Email</th>
            <th class="text-left text-green cursor-pointer" @click="sortByField('created_at')">Création</th>
            <th class="text-left text-orange text-center cursor-pointer" @click="sortByField('contract')">Contrat</th>
            <th class=""> {{ ' ' }} </th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-subtitle-2"
            v-for="(user, index) in usersFiltered"
            :key="index"
          >
            <td> <v-chip color="blue-darken-3">{{ user.social_reason }} </v-chip> </td>
             <td> <v-chip>{{ user.category }}</v-chip> </td>
            <td>{{ user.surname }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td><v-chip size="small" color="primary">{{ user.created_at.slice(0,10) }}</v-chip> </td>
            <td class="text-center"> <v-chip color="blue-lighten-2">{{ user.contract? user.contract: 'pas de contrat' }}</v-chip> </td>
            <td>
              <div class="d-flex align-center">
                <v-icon @click="editUser(user)">mdi-pencil</v-icon> 
                <v-icon class="text-red" @click="deleteUser(user)">mdi-delete</v-icon>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
      </div>
    </div>

    <v-dialog 
      v-model="editUserDialog" 
      class="position-absolute"
      width="600"
      persistent
     >
      <creation-utilisateur v-on:closeDialog="editUserDialog=false" v-bind:userOnEdit="editingUser" v-on:fetchUsers="fetchUsers"></creation-utilisateur>
    </v-dialog>

  </v-card>
</template>

<script>
import User from '../../../services/users.service'

export default {
  
  data: () => ({
    entrepriseDialog: false,
    editUserDialog: false,
    userDialog: false,
    editingUser: null,
    users: [],

    sortBy: [],
    search: "",
    family: '',
    subfamily: '',
    familyItems: ['1. PAR', '2. PME', '3. AUTRE'],
    subfamilyItems: ['1.1 PAR', '1.2 EXP', '1.3 SUP', '1.5 EDI', '2.0 LOC', '2.1 GMA', '2.2 GML'],
     
  }),

  mounted() {
    this.fetchUsers()
  },

  methods: {

    editUser(user){
      this.editingUser = user
      this.editUserDialog = true
    },

    deleteUser(user){
      console.log(user)
      window.confirm('Voulez-vous vraiment supprimer cet utilisateur?') && 
      User.deleteUser(user.id)
      .then(response => {
        this.fetchUsers()
      })
      .catch(err => {
        console.log(err);
      })
    },

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
    if (this.sortBy.includes(field)) {
      this.sortBy = [`${field}_desc`];
      this.usersFiltered.sort((a, b) => a[field] < b[field] ? 1 : -1);
    } else {
      this.sortBy = [field];
      this.usersFiltered.sort((a, b) => a[field] > b[field] ? 1 : -1);
    }
  },

    fetchEntreprises(){
      this.fetchUsers()
      console.log('fetchEntreprises');
    }
  

  },

  computed: {
    usersFiltered() {
      let filteredUsers = this.users.slice(); // Create a copy of the original array

      if (this.search !== "") {
        filteredUsers = filteredUsers.filter(user => {
          const searchTerm = this.search.toString().toLowerCase();
          console.log(searchTerm)
          return (
            user.name?.toString().toLowerCase().includes(searchTerm)
            || user.surname?.toLowerCase().includes(searchTerm) 
            || user.email?.toLowerCase().includes(searchTerm) 
            || user.social_reason?.toLowerCase().includes(searchTerm)
          );
        });
      }
      

      if (this.family) {
        filteredUsers = filteredUsers.filter(user => {
          return user.category === this.family;
        });
      }

      if (this.subfamily) {
        filteredUsers = filteredUsers.filter(user => {
          return user.subcategory === this.subfamily;
        });
      }

      if (this.search === "" && !this.family && !this.subfamily) {
        // If search is empty and no other filters are applied, return the original array
        return this.users;
      }

      console.log(filteredUsers.length)
      return filteredUsers;
    }
}

  

}
</script>
