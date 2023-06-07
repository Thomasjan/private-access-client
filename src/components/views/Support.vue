<template>
  <v-card class="bg-white pa-2 elevation-0">
    <h2 class="text-primary text-center">Support</h2>
    <div class="mt-4">
      <h4 class="text-center">Fiches Thématiques</h4>

      <div class="mt-4 px-4" v-for="(item, index) in items" :key="index">
          <div class="d-flex ">
            <v-icon class="my-auto" color="primary" size="8" >mdi-circle</v-icon>
            <h4 class="ml-2 my-auto">{{item.title}}</h4>
          </div>

          <div class="d-flex justify-space-between px-6" v-for="(list, index) in item.lists" :key="index">
            <p class="text-hover cursor-pointer" @click="openLink(list.link)">{{list.title}} </p>
            <v-icon @click="downloadPdf(list.title, list.link)" color="primary">mdi-file-pdf-box</v-icon>
          </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  
  data: () => ({

    items:[
      {
        title: 'Général',
        lists: [
          {
            title: 'Préconisations techniques et installation Gestimum ERP',
            link: 'http://docs.gestimum.com/ERP/8/Installation/#t=Pages%2FPreambule.htm'
          },
          {
            title: 'Installation Gestimum ERP - Mise à jour de version',
            link: 'http://docs.gestimum.com/ERP/8/Installation/#t=Pages%2FPreambule.htm'
          },
          {
            title: 'Téléchargement de la version logiciel gestimum',
            link: 'http://docs.gestimum.com/ERP/8/Installation/#t=Pages%2FPreambule.htm'
          },
          {
            title: "Installation ou récupération des modèles d'impression",
            link: 'http://docs.gestimum.com/ERP/8/Installation/#t=Pages%2FPreambule.htm'
          },
          {
            title: 'Pré-requis pour formation client',
            link: 'http://docs.gestimum.com/ERP/8/Installation/#t=Pages%2FPreambule.htm'
          },
          {
            title: 'Le maquettage des préférences de société et paramétrage de gestion',
            link: 'http://docs.gestimum.com/ERP/8/Installation/#t=Pages%2FPreambule.htm'
          }
        ]
      },
      {
        title: "l'intégré",
        lists: [
          {
            title: "Création d'un champ personnalisé",
            link: 'http://docs.gestimum.com/ERP/8/Installation/#t=Pages%2FPreambule.htm'
          },
          {
            title: 'Création Champs personnalisés avec formules',
            link: 'http://docs.gestimum.com/ERP/8/Installation/#t=Pages%2FPreambule.htm'
          },
          {
            title: 'Renommer les champs personnalisés',
            link: 'http://docs.gestimum.com/ERP/8/Installation/#t=Pages%2FPreambule.htm'
          },
          {
            title: "	Champs à renseigner pour le prélèvement SEPA",
            link: 'http://docs.gestimum.com/ERP/8/Installation/#t=Pages%2FPreambule.htm'
          },
          {
            title: 'Banques et les comptes bancaires',
            link: 'http://docs.gestimum.com/ERP/8/Installation/#t=Pages%2FPreambule.htm'
          },
          {
            title: 'Décaissement - Les modes de règlements',
            link: 'http://docs.gestimum.com/ERP/8/Installation/#t=Pages%2FPreambule.htm'
          }
        ]
      },
      {
        title: 'Général',
        lists: [
          {
            title: 'Préconisations techniques et installation Gestimum ERP',
            link: 'http://docs.gestimum.com/ERP/8/Installation/#t=Pages%2FPreambule.htm'
          },
          {
            title: 'Installation Gestimum ERP - Mise à jour de version',
            link: 'http://docs.gestimum.com/ERP/8/Installation/#t=Pages%2FPreambule.htm'
          },
          {
            title: 'Téléchargement de la version logiciel gestimum',
            link: 'http://docs.gestimum.com/ERP/8/Installation/#t=Pages%2FPreambule.htm'
          },
          {
            title: "Installation ou récupération des modèles d'impression",
            link: 'http://docs.gestimum.com/ERP/8/Installation/#t=Pages%2FPreambule.htm'
          },
          {
            title: 'Pré-requis pour formation client',
            link: 'http://docs.gestimum.com/ERP/8/Installation/#t=Pages%2FPreambule.htm'
          },
          {
            title: 'Le maquettage des préférences de société et paramétrage de gestion',
            link: 'http://docs.gestimum.com/ERP/8/Installation/#t=Pages%2FPreambule.htm'
          }
        ]
      },
    ]
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

