<template>
  <v-card class="ml-1 bg-background pb-4">
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

        <div class="d-flex align-center mb-2 ml-4">
          <v-chip class color="primary">{{entreprisesFiltered.length}}  </v-chip>
          <p class="ml-2">Entreprises</p>
        </div>
      
      <v-table density="compact" class="bg-background">
        <thead>
          <tr class="">
            <th class="text-left text-red cursor-pointer" @click="sortByField('code_client')">Code</th>
            <th class="text-left text-red cursor-pointer" @click="sortByField('social_reason')">Entreprise</th>
            <th class="text-left text-blue cursor-pointer" @click="sortByField('category')">Famille</th>
            <th class="text-left text-blue cursor-pointer" @click="sortByField('subcategory')">Sous-famille</th>
            <th class="text-left text-green cursor-pointer" @click="sortByField('craeted_at')">Création</th>
            <th class="text-left text-orange text-center cursor-pointer" @click="sortByField('contract')">Contrat</th>
            <th class="text-left text-orange cursor-pointer" @click="sortByField('end_contract')">Date fin contrat</th>
            <th class=""> {{ ' ' }} </th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-subtitle-2"
            v-for="(entreprise, index) in entreprisesFiltered"
            :key="index"
          >
            <td> <v-chip color="purple">{{ entreprise.code_client }}</v-chip> </td>
            <td> <v-chip color="blue-darken-3">{{ entreprise.social_reason }}</v-chip> </td>
            <td> <v-chip>{{ entreprise.category }}</v-chip> </td>
            <td> <v-chip>{{ entreprise.subcategory }}</v-chip> </td>
            <td><v-chip size="small" color="primary">{{ entreprise.created_at.slice(0,10) }}</v-chip> </td>
            <td class="text-center"> <v-chip color="blue-lighten-2">{{ entreprise.contract? entreprise.contract: 'pas de contrat' }} </v-chip> </td>
            <td> <v-chip size="small" :color="isContractExpired(entreprise) ? 'red' : 'green'">{{ entreprise.end_contract }}</v-chip> </td>
            <td> <v-icon @click="editCompany(entreprise)">mdi-pencil</v-icon> </td>
          </tr>
        </tbody>
      </v-table>
      
      </div>

        

    </div>
    <v-dialog 
      v-model="editEntrepriseDialog" 
      class="position-absolute"
      width="600"
      persistent
     >
      <creation-entreprise v-on:closeDialog="editEntrepriseDialog=false" v-bind:entreprise="editingEntreprise" ></creation-entreprise>
    </v-dialog>
  </v-card>

 
</template>

<script>
import Entreprises from '../../../services/entreprises.service'

export default {
  
  data: () => ({
    entrepriseDialog: false,
    editEntrepriseDialog: false,
    userDialog: false,
    entreprises: [],
    sortBy: [],

    editingEntreprise: {},
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

    editCompany(entreprise) {
      console.log(entreprise)
      this.editingEntreprise = entreprise
      this.editEntrepriseDialog = true
    },
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
    if (this.sortBy.includes(field)) {
      this.sortBy = [`${field}_desc`];
      this.entreprisesFiltered.sort((a, b) => a[field] < b[field] ? 1 : -1);
    } else {
      this.sortBy = [field];
      this.entreprisesFiltered.sort((a, b) => a[field] > b[field] ? 1 : -1);
    }
  },

    isContractExpired(entreprise) {
      const currentDate = new Date();
      const endContractDate = new Date(entreprise.end_contract);

      // Compare the end_contract date with the current date
      return endContractDate < currentDate;
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
