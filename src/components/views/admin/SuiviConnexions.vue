<template>
  <v-card class="ml-1 bg-background">
    <h3 class="text-center text-primary mt-4">Suivi des Connexions</h3>

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

         <div class="d-flex justify-space-between mb-2 ml-4">
          <div class="d-flex align-center">
            <v-chip class color="primary">{{loginsFiltered.length}}  </v-chip>
            <p class="ml-2">Connexions</p>
            <v-icon class="cursor-pointer ml-2" @click="downloadLogins">mdi-download</v-icon>
          </div>
          <div class="d-flex align-center cursor-pointer" @click="reset()">
            <v-icon size="40">mdi-backup-restore</v-icon>
            <span class="font-weight-light">Réinitialiser</span>
          </div>
        </div>
       
      <v-table density="compact" class="bg-background">
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
          <tr class="text-subtitle-2"
            v-for="login in loginsFiltered"
            :key="login.id"
          >
            <td> <v-chip color="green-darken-1">{{ login.entreprise.social_reason }}</v-chip> </td>
            <td> <v-chip>{{ login.entreprise.category }}</v-chip> </td>
            <td> <v-chip>{{ login.entreprise.subcategory }}</v-chip> </td>
            <td> <v-chip color="red">{{ login.user.name }}</v-chip> </td>
            <td><v-chip color="red">{{ login.user.surname }}</v-chip></td>
            <td> <v-chip color="primary" size="small">{{ login.date.slice(0,10) }}</v-chip> </td>
            <td><v-chip color="blue" size="small">{{ login.date.slice(10,19) }}</v-chip> </td>
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
    familyItems: ['1.PAR', '2.PME', '3.AUTRE'],
    subfamilyItems: ['1.1PAR', '1.2EXP', '1.3SUP', '1.5EDI', '2.0LOC', '2.1GMA', '2.2GML'],
     
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

    reset() {
      this.search = ''
      this.family = ''
      this.subfamily = ''

      Auth.resetLogins()
      .then(() => {
        this.fetchLogins()
      })
      .catch(err => {
        console.log(err);
      })
    },

    downloadLogins() {
      //export to excel
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Entreprise;Famille;Sous-famille;Nom;Prénom;Date;Heure\n";
      this.loginsFiltered.forEach(login => {
        csvContent += `${login.entreprise.social_reason};${login.entreprise.category};${login.entreprise.subcategory};${login.user.name};${login.user.surname};${login.date.slice(0,10)};${login.date.slice(10,19)}\n`
      })

      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "suivi_connexions.csv");
      document.body.appendChild(link); // Required for FF
      link.click();
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
