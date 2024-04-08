<template>
  <v-card class="bg-background pa-2 elevation-0 mb-4">
    <h2 class="text-primary text-center">Mon Contrat</h2>
    
    <div class="mt-4 px-4">
      <div>
          <h4>Adhérez à la certification qui vous ressemble</h4>
          <p class="mt-2">Vous pouvez choisir le partenariat qui correspond à votre stratégie d'entreprise.</p>
      
        <div class="mt-8">
          <div>
            <h4 class="text-blue">PARTENAIRE : Pour commencer, en toute simplicité ...  en valorisant votre base client</h4>
            <div class="d-flex mt-4">
              <p class="mr-8 text-subtitle-2">Vous êtes amenés à côtoyer des dirigeants de PME et avez matière à présenter GESTIMUM comme un éditeur susceptible de répondre aux exigences de votre contact. Vous bénéficiez d’une licence à usage interne. GESTIMUM vous rémunère en tant que prescripteur apporteur d’affaires.</p>
              <v-img src="/images/Logo-partenaire-2015.png" width="20%" />
            </div>
          </div>
        </div>

        <div class="mt-8">
          <div>
            <h4 class="text-teal">PARTENAIRE EXPERT: Une relation privilégiée...des prestations à haute valeur ajoutée</h4>
            <div class="d-flex mt-4">
              <p class="mr-8 text-subtitle-2">Vous êtes un professionnel de l’intégration en informatique de gestion. Vous maîtrisez l’environnement Microsoft Windows Server et SQL Server, et disposez des ressources commerciales et techniques prêtes à se former sur nos solutions.
                En tant que Partenaire Expert, vous profitez d’un programme d’accompagnement comprenant un Ingénieur d’Affaires dédié, une assistance technique illimitée ainsi qu’un crédit formation. GESTIMUM met à votre disposition des licences pour votre usage interne, ainsi que des outils pour faciliter votre communication et la gestion de vos prospects et clients !
                Vous profitez de conditions commerciales privilégiées sur nos produits et services.
                Vous gérez votre parc client GESTIMUM en toute autonomie et développez un business récurrent à forte valeur ajoutée pour votre entreprise.</p>
              <v-img src="/images/Logo-partenaire-expert-2015.png" width="20%" />
            </div>
          </div>
        </div>

        <div class="mt-8">
          <div>
            <h4 class="text-primary">PARTENAIRE SUPPORT La synergie absolue...</h4>
            <div class="d-flex mt-4">
              <p class="mr-8 text-subtitle-2">Ce contrat est réservé aux Partenaires Experts disposant d’une équipe technique et commerciale dédiée de niveau 2 et d’un parc clients significatif. Le Partenaire Support s’engage à réaliser l’assistance niveau 1 de ses clients. Outre les avantages du programme Expert, les partenaires et les PME utilisatrices apprécient le double accompagnement du Partenaire Support et de l’éditeur.</p>
              <v-img src="/images/Logo-partenaire-expert-support-2015.png" width="20%" />
            </div>
          </div>
        </div>


        <div class="mt-14">
          <v-img src="/images/contrat-gestimum-2024.png" class="img-width" />
          <v-img src="/images/contrat-partenaire-2024.png" class="mt-8 img-width"/>

        </div>

        <div class="d-flex justify-center mt-4">
          <h4 class="text-text-subtitle-1 text-center">Télécharger le contrat partenaire </h4>
          <v-icon @click="downloadPdf('Contrat partenaire', pdfContract)" class="ml-4 cursor-pointer" color="primary">mdi-download</v-icon>
        </div>
      
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  
  data: () => ({
    pdfContract: 'pdfs/Contrat partenaires-2024.pdf'
  }),

  methods: {
   download(file) {
      //Requête dans Store
      this.$store.dispatch('addDownload', file);
    },

    openLink(link) {
      window.open(link, '_blank')
    },

    downloadPdf(file, link) {
      this.download(file)
      this.openLink(link)
    },
  }
}
</script>

<style scoped>
.table-blue {
  background-color: #379fc3;
}

.table-grey {
  background-color: #BCBEC0;
}

.table-orange {
  background-color: #f17736;
}

.img-width {
  width: 80%;
  display: grid;
  margin: auto;
}
</style>
