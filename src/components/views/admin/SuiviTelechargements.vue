<template>
  <v-card class="ml-1 bg-white">
    <h3 class="text-center text-primary mt-4">Suivi téléchargements</h3>

    <div class="mt-10">

      
      <div class="mt-6">

        <v-row class="pa-4">
          <v-col cols="6">
            <v-text-field col="4" v-model="search" label="Rechercher"  class="" prepend-inner-icon="mdi-magnify"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-select v-model="file" :items="files" label="Fichier" clearable></v-select>
          </v-col>
          <!-- <v-col cols="3">
            <v-select v-model="subfamily" :items="subfamilyItems" label="Sous-famille" clearable></v-select>
          </v-col> -->
        </v-row>

        <div class="d-flex align-center mb-2 ml-4">
          <v-chip class color="primary">{{downloadsFiltered.length}}  </v-chip>
          <p class="ml-2">Téléchargements</p>
        </div>
       
      <v-table density="compact" class="bg-white">
        <thead>
          <tr class="">
            <th class="text-left text-red" @click="sortByField('social_reason')">Entreprise</th>
            <th class="text-left text-blue" @click="sortByField('category')">Fichier</th>
            <th class="text-left text-black" @click="sortByField('name')">Nom</th>
            <th class="text-left text-black" @click="sortByField('surname')">Prénom</th>
            <th class="text-left text-black" @click="sortByField('surname')">Email</th>
            <th class="text-left text-orange" @click="sortByField('created_at')">Date</th>
            <th class="text-left text-orange" >Heure</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-subtitle-2"
            v-for="download in downloadsFiltered"
            :key="download.id"
          >
            <td> <v-chip color="purple-darken-3">{{ download.social_reason }}</v-chip> </td>
            <td> <v-chip color="primary">{{ download.file_name }}</v-chip> </td>
            <td>{{ download.name }}</td>
            <td>{{ download.surname }}</td>
            <td>{{ download.email }}</td>
            <td> <v-chip size="small" color="primary">{{ download.date.slice(0,10) }}</v-chip></td>
            <td> <v-chip size="small" color="blue">{{ download.date.slice(10,19) }}</v-chip> </td>
          </tr>
        </tbody>
      </v-table>
      
      </div>

        

    </div>
  </v-card>
</template>

<script>
import Auth from '../../../services/auth.service'
import Download from '../../../services/downloads.service'

export default {
  
  data: () => ({
    entrepriseDialog: false,
    userDialog: false,
    downloads: [],
    sortBy: [],
    search: '',
    file: '',
    files: [],
     
  }),

  created() {
    this.fecthDownloads()
  },

  methods: {
   
    //Récupération des téléchargements
    fecthDownloads(){
      Download.getDownloads()
      .then(response => {
        this.downloads = response
        console.log(this.downloads)

        //Récupération des fichiers
        this.files = Array.from(new Set(this.downloads.map(download => download.file_name)));
      })
      .catch(err => {
        console.log(err);
      })
    },

    sortByField(field) {
    
    },
  

  },

  computed: {
    downloadsFiltered() {
      let downloads = this.downloads

      if (this.search) {
        downloads = downloads.filter(download => {
          return download.name.toLowerCase().includes(this.search.toLowerCase()) || download.surname.toLowerCase().includes(this.search.toLowerCase()) || download.email.toLowerCase().includes(this.search.toLowerCase()) || download.surname.toLowerCase().includes(this.search.toLowerCase()) || download.social_reason.toLowerCase().includes(this.search.toLowerCase()) //|| login.entreprise.code_client.toString().includes(this.search.toLowerCase())
        })
      }
      if (this.file) {
        downloads = downloads.filter(download => {
          return download.file_name === this.file
        })
      }
      

      return downloads
    }
  }


  

}
</script>
