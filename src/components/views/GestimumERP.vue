<template>
  <v-card class="bg-white pa-2">
      <h3 class="text-center">Découvrez nos dernières évolutions</h3>
      <div class="ml-2">


        <div class="mt-6">
          <h3 class="text-primary">Gestimum Gestion Comptable PME</h3>
          <v-divider
            :thickness="1"
            class="border-opacity-100 mt-4"
            color="primary"
          ></v-divider>

          <div class="mt-6">
            <p> <v-icon size="small" class="pb-1" color="primary">mdi-check</v-icon> Possibilité d’importer les comptes généraux et auxiliaires</p> 
            <p> <v-icon size="small" class="pb-1" color="primary">mdi-check</v-icon> Ajout du libellé du mode de règlement dans la personnalisation de la liste de la saisie des écritures </p>
            <p> <v-icon size="small" class="pb-1" color="primary">mdi-check</v-icon> Augmentation de la taille du code journal pour le passer à 10 caractères</p>
            <p> <v-icon size="small" class="pb-1" color="primary">mdi-check</v-icon> Augmentation de la taille du code tiers pour le passer à 20 caractères</p>
            <p> <v-icon size="small" class="pb-1" color="primary">mdi-check</v-icon> Augmentation de la taille du compte pour le passer à 25 caractères</p>
          </div>
        </div>

      <div class="mt-6">
        <h3 class="text-primary">	Gestimum Gestion Commerciale PME</h3>
        <v-divider
          :thickness="1"
          class="border-opacity-100 mt-4"
          color="primary"
        ></v-divider>

        <div class="mt-6">
          <p class="font-weight-medium">Renforcement du module Affaires et CRM</p>
            <p> <v-icon size="small" class="pb-1" color="primary">mdi-check</v-icon> Ajout d’un onglet Affaires dans les fiches tiers</p> 
            <p> <v-icon size="small" class="pb-1" color="primary">mdi-check</v-icon> Ajout d’un onglet Actions dans les affaires </p>
            <p> <v-icon size="small" class="pb-1" color="primary">mdi-check</v-icon> Ajout de champs de recherche dans l’onglet Actions des fiches tiers</p>
            <p> <v-icon size="small" class="pb-1" color="primary">mdi-check</v-icon> Possibilité de paramétrer un rappel automatique selon le type d’actions</p>
            <p> <v-icon size="small" class="pb-1" color="primary">mdi-check</v-icon> Possibilité de paramétrer les états d’actions</p>
          </div>

        <div class="mt-4">
          <p class="font-weight-medium">Renforcement du module EDI</p>
            <p> <v-icon size="small" class="pb-1" color="primary">mdi-check</v-icon>Ajout de l’export des avoirs au format @GP</p> 
            <p> <v-icon size="small" class="pb-1" color="primary">mdi-check</v-icon> Ajout de nouveaux champs dans les exports au format EDICOT </p>
            <p> <v-icon size="small" class="pb-1" color="primary">mdi-check</v-icon> ....</p>
            
          </div>
      </div>


      <div class="mt-6">
        <h3 class="text-primary">Détails des évolutions depuis la version 7</h3>

        <div class="mx-auto">
          <v-img class="cursor-pointer mx-auto" @click="openLink('http://docs.gestimum.com/ERP/9.4/NotesVersion/#t=racine%2Fbienvenue.htm')" width="70%" src="http://espace-prive.gestimum.com/images/Lisez-moi/940.png" aspect-ratio="4/3" />
        </div>
      </div>

      <v-divider
          :thickness="1"
          class="border-opacity-100 mt-4"
          color="primary"
      ></v-divider>

      <div class="mt-4 d-flex justify-space-between">
          <h4 class="cursor-pointer text-hover" @click="openLink('http://docs.gestimum.com/ERP/9/Installation/#t=01%2FPreambule.htm')">Pré-requis et Guide d'installation de SQL Server 2019 Express et de Gestimum</h4>
          <v-icon class="cursor-pointer"  @click="openLink('http://docs.gestimum.com/ERP/9/Installation/#t=01%2FPreambule.htm')" >mdi-help</v-icon>
      </div>


      <v-divider
          :thickness="1"
          class="border-opacity-100 mt-4"
          color="primary"
      ></v-divider>

      
      <!-- TEST -->
      <div class="mt-8 ml-2">
      <h4 class="text-primary">Téléchargements :</h4>
        <div v-for="item in uploads" :key="item.id" class="mt-4" >
          <div class="flex flex-col justify-start align-center">
            <div class="d-flex justify-space-between w-100 px-8">
              
              <p class="d-flex">
                <v-img class="mr-2" :src="getLink(item)" :width="40" aspect-ratio="4/3" contain/>
                Installez
                <span class="font-weight-bold text-primary cursor-pointer ml-2"  @click="downloadLink(item)">{{ item.file_name }}</span> 
              </p>
                <v-icon class="cursor-pointer" color="primary" @click="downloadLink(item)">mdi-download</v-icon>
            </div>
            <!-- <v-img class="cursor-pointer" @click="downloadLink(item)" :src="getLink(item)" :width="100" aspect-ratio="4/3" cover/> -->
          </div>
        </div>
      </div>
      </div>
  </v-card>
</template>

<script>
import Upload from '../../services/uploads.service'

export default {
  
  data: () => ({
    uploads:[]
  }),

  created() {
    Upload.getUploads()
    .then(response => {
      this.uploads = response
      this.uploads.forEach((download) => {
        const { file_name, downloadUrl } = download;
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', file_name);
        // Append the link to the DOM
        document.body.appendChild(link);
      });
    })
    .catch(e => {
      console.log(e)
    })

  },

  methods: {
    getLink(item) {
      let link = 'http://localhost:3000/files/uploads/' + item.image_path
      return link
    },
    downloadLink(item) {
      let link = 'http://localhost:3000/files/uploads/' + item.file_path
      window.open(link, '_blank')
      
    },

    openLink(link) {
      window.open(link, '_blank')
    }
   
  }
}
</script>

<style scoped>
  .text-hover:hover {
    color: #EB6F2A;
  }
</style>
