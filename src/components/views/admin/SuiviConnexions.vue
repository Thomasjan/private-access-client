<template>
  <v-card class="ml-1 bg-white">
    <h3 class="text-center text-primary mt-4">Liste des Connexions</h3>

    <div class="mt-10">

      
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
            <th class="text-left text-orange" @click="sortByField('created_at')">Date</th>
            <th class="text-left text-orange" >Heure</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="login in loginsFiltered"
            :key="login.id"
          >
            <td>{{ login.entreprise.social_reason }}</td>
            <td>{{ login.entreprise.category }}</td>
            <td>{{ login.entreprise.subcategory }}</td>
            <td>{{ login.user.name }}</td>
            <td>{{ login.user.surname }}</td>
            <td>{{ login.date.slice(0,10) }}</td>
            <td>{{ login.date.slice(10,19) }}</td>
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
    search: '',
    family: '',
    subfamily: '',
    familyItems: ['1. PARTENAIRE', '2. PME', '3. AUTRES'],
    subfamilyItems: ['1.1 PARTENAIRES', '1.2 EXPERTS', '1.3 EXPERTS SUPPORT', '1.4 EX-PARTENAIRES', '1.5 EDITEURS EXPERTS', '2.1 PME G-WEB', '2.2 PME G-TEL'],
     
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

  computed: {
    loginsFiltered() {
      let logins = this.logins

      if (this.search) {
        logins = logins.filter(login => {
          return login.user.name.toLowerCase().includes(this.search.toLowerCase()) || login.user.surname.toLowerCase().includes(this.search.toLowerCase()) || login.entreprise.social_reason.toLowerCase().includes(this.search.toLowerCase()) //|| login.entreprise.code_client.toString().includes(this.search.toLowerCase())
        })
      }
      if (this.family) {
        logins = logins.filter(login => {
          return login.entreprise.category === this.family
        })
      }
      if (this.subfamily) {
        logins = logins.filter(login => {
          return login.entreprise.subcategory === this.subfamily
        })
      }

      return logins
    }
  }


  

}
</script>
