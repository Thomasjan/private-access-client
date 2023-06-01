<template>
  <v-card class="bg-white pa-2">
    <div class="mt-2">
      <h3 class="text-center">	Gestimum vous propose des formations adaptées à votre rythme et votre budget afin de rendre vos utilisateurs rapidement opérationnels.</h3>

      <div class="mt-8">
        <p class="mb-4">	Choisissez la formation qui vous convient :</p>
        <ul>
          <li class="mt-2">
          <strong class="text-primary"> <v-icon class="pb-1">mdi-arrow-right</v-icon> En ligne</strong>  depuis votre poste Gestimum par internet et téléphone. Cette formule vous assure un maximum de productivité (gain de temps grâce à l'absence de déplacement et 100% personnalisée) sur des thèmes de votre choix pour gagner en performance
          </li>
          <li class="mt-2">
          <strong class="text-primary"> <v-icon class="pb-1">mdi-arrow-right</v-icon> Inter-entreprises chez Gestimum</strong> pour partager vos expériences sur des fonctionnalités récurrentes
          </li>
          <li class="mt-2">
          <strong class="text-primary"> <v-icon class="pb-1">mdi-arrow-right</v-icon> Chez vous</strong> pour une formation sur-mesure
          </li>
        </ul>
      </div>

      <div class="mt-4">
        <span class="font-italic">Téléchargements: </span>
        <h4 class="mt-2">	Notre catalogue de formation <v-icon color="primary" class="cursor-pointer" @click="download('catalogue formation')">mdi-download</v-icon> </h4>
        <h4>	Nos modalités d'accueil <v-icon color="primary" class="cursor-pointer" @click="download(`modalité d\'accueil`)">mdi-download</v-icon> </h4>
      </div>
   </div>
  </v-card>
</template>

<script>
import Download from '../../services/downloads.service'

export default {
  
  data: () => ({
    
  }),

  mounted() {
    
  },
  methods: {
    download(file) {
      // window.open(`https://www.gestimum.com/telechargement/${file}.pdf`, '_blank');
      let download = {
        entreprise_id: this.$store.state.user.entreprise_id,
        email: this.$store.state.user.email,
        name: this.$store.state.user.name,
        surname: this.$store.state.user.surname,
        file_name: file,
      }
      console.log(download)

      Download.addDownload(download)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }

  }

}
</script>
