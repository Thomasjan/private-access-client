<template>
  <v-card class="ml-1 bg-white">
    <h3 class="text-center text-primary mt-4">Liste des Entreprises</h3>

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
      
      <v-table density="compact" class="bg-white">
        <thead>
          <tr class="">
            <th class="text-left text-red" @click="sortByField('code_client')">Code</th>
            <th class="text-left text-red" @click="sortByField('social_reason')">Entreprise</th>
            <th class="text-left text-blue" @click="sortByField('category')">Famille</th>
            <th class="text-left text-blue" @click="sortByField('subcategory')">Sous-famille</th>
            <th class="text-left text-green" @click="sortByField('craeted_at')">Création</th>
            <th class="text-left text-orange" @click="sortByField('contract')">Contrat</th>
            <th class="text-left text-orange" @click="sortByField('end_contract')">Date fin contrat</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-subtitle-2"
            v-for="entreprise in entreprisesFiltered"
            :key="entreprise.id"
          >
            <td>{{ entreprise.code_client }}</td>
            <td>{{ entreprise.social_reason }}</td>
            <td>{{ entreprise.category }}</td>
            <td>{{ entreprise.subcategory }}</td>
            <td>{{ entreprise.created_at.slice(0,10) }}</td>
            <td>{{ entreprise.contract? entreprise.contract: 'pas de contrat' }}</td>
            <td>{{ entreprise.end_contract }}</td>
          </tr>
        </tbody>
      </v-table>
      
      </div>

        

    </div>
  </v-card>
</template>

<script>
import Entreprises from '../../../services/entreprises.service'

export default {
  
  data: () => ({
    entrepriseDialog: false,
    userDialog: false,
    entreprises: [],
    sortBy: [],

    search: '',
    family: '',
    subfamily: '',
    familyItems: ['1. PARTENAIRE', '2. PME', '3. AUTRES'],
    subfamilyItems: ['1.1 PARTENAIRES', '1.2 EXPERTS', '1.3 EXPERTS SUPPORT', '1.4 EX-PARTENAIRES', '1.5 EDITEURS EXPERTS', '2.1 PME G-WEB', '2.2 PME G-TEL'],

     
  }),

  mounted() {
    this.fetchEntreprises()
  },

  methods: {
    // récupération des Utilisateurs
    fetchEntreprises(){
      Entreprises.getEntreprises()
      .then(response => {
        this.entreprises = response
      })
      .catch(err => {
        console.log(err);
      })
    },

    sortByField(field) {
    
    },

  },

  computed: {
    entreprisesFiltered() {
      let entreprises = this.entreprises

      if (this.search) {
        entreprises = entreprises.filter(entreprise => {
          return  entreprise.code_client.toString().includes(this.search.toLowerCase()) || entreprise.social_reason.toLowerCase().includes(this.search.toLowerCase()) 
        })
      }
      if (this.family) {
        entreprises = entreprises.filter(entreprise => {
          return entreprise.category === this.family
        })
      }
      if (this.subfamily) {
        entreprises = entreprises.filter(entreprise => {
          return entreprise.subcategory === this.subfamily
        })
      }

      return entreprises
    }
  }

  

}
</script>
