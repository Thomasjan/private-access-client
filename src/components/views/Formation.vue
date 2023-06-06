<template>
  <v-card class="bg-white pa-2 elevation-0">
      <h2 class="text-primary text-center">Formation</h2>

    <div class="mt-2 ml-2" v-if="$store.state.user.role_id >= 3">
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
        <h4 class="mt-2">	Notre catalogue de formation <v-icon color="primary" class="cursor-pointer" @click="dowloadPdf('catalogue formation', 'http://espace-prive.gestimum.com/PDF/formation/Partenaire/CATALOGUE-%20FORMATION-PARTENAIRES-2023.pdf')">mdi-download</v-icon> </h4>
        <h4>	Nos modalités d'accueil <v-icon color="primary" class="cursor-pointer" @click="dowloadPdf(`modalité d\'accueil`, 'http://espace-prive.gestimum.com/PDF/formation/Modalite-accueil-formation-rambouillet-2023.pdf')">mdi-download</v-icon> </h4>
      </div>
   </div>

   <div class="mt-2 ml-2" v-else>
      <h4 class="mt-2">	Notre catalogue de formation <v-icon color="primary" class="cursor-pointer"  @click="dowloadPdf('catalogue formation', 'http://espace-prive.gestimum.com/PDF/formation/Partenaire/CATALOGUE-%20FORMATION-PARTENAIRES-2023.pdf')">mdi-download</v-icon> </h4>
      <h4 class="mt-2">	Nos modalités d'accueil <v-icon color="primary" class="cursor-pointer" @click="dowloadPdf(`modalité d\'accueil`, 'http://espace-prive.gestimum.com/PDF/formation/Modalite-accueil-formation-rambouillet-2023.pdf')">mdi-download</v-icon> </h4>
      <h4 class="mt-2">	Bullentin d'inscription à nos formations <v-icon color="primary" class="cursor-pointer" @click="dowloadPdf(`bulletin inscription`, 'http://espace-prive.gestimum.com/PDF/formation/Bulletin-inscription-Formation-partenaire-2023.pdf')">mdi-download</v-icon> </h4>
  
      <div class="mt-4">
        <h3 class="text-primary mb-4">Intégration & Formation - Durées préconisées</h3>

        <div class="mt-2" v-for="(item, index) in items" :key="index">
            <h4>{{item.title}} </h4>
          <ul class="px-6" v-for="(list, i) in item.liste" :key="i">
            <li class="d-flex justify-space-between">
              <div class="d-flex">
                <v-icon class="my-auto" color="primary" size="6">mdi-circle</v-icon>
                  <p class="text-start ml-2">{{list.title}} </p> 
              </div>
             <p>{{list.time}} </p>
            </li>
          </ul>
        </div>
      </div>

    <div class="text-center mt-10 font-italic text-subtitle-2">
        Le maquettage fonctionnel permet de réduire significativement la durée de formation et d'améliorer la qualité d'accompagnement. Sans maquettage fonctionnel, la formation ne pourra se dérouler que sur la base de fichier de démonstration générique. La durée des prestations est donnée à titre indicatif et dépend du niveau des utilisateurs et de la profondeur du périmètre fonctionnel à étudier. L'installation de l'ERP doit être effectuée avant toute session de formation.
    </div>

   </div>
  </v-card>
</template>

<script>
import Download from '../../services/downloads.service'

export default {
  
  data: () => ({
    items:[
      {
        title: 'Maquettage & intégration des données : 5 à 15 jours',
        liste: [
          {
            title: 'Maquettage - cadrage du projet',
            time: '1 à 2 jours'
          },
          {
            title: 'Base Article, Tiers & Contacts',
            time: '2 à 3 jours'
          },
          {
            title: 'Base Tarifs',
            time: '1 à 2 jours'
          },
          {
            title: 'Base Ecritures, Comptes généraux & analytiques',
            time: '1 à 2 jours'
          },
          {
            title: 'Déclaration de TVA Cerfa & EDI-TVA',
            time: '1 à 2 jours'
          },
          {
            title: "Liaison site vitrine et/ou site e-commerce à partir de l'automate de connexion bidirectionnelle",
            time: '2 à 4 jours'
          },
          {
            title: 'Dématérialisation des documents de vente - EDI (selon solution partenaire sélectionnée)',
            time: '2 à 3 jours'
          },
          {
            title: "Installation de l'ERP",
            time: '0,5 à 1 jour'
          },
        ]
      },
      {
        title: 'Formation Gestion Commerciale PME: 3 à 6 jours',
        liste: [
          {
            title: 'Tiers, contacts et actions',
            time: '0,5 jour'
          },
          {
            title: 'Article (nomenclatures, valorisations ...)',
            time: '2 jours'
          },
          {
            title: 'Tarif et promotions (selon complexité)',
            time: '0,5 jour'
          },
          {
            title: 'Affaires et planning des ressources',
            time: '1 jour'
          },
          {
            title: 'Gestion des échéances et des règlements',
            time: '0,5 jour'
          },
          {
            title: "Décisionnel - exploitation tableaux croisés",
            time: '0,5 jour'
          },
          {
            title: 'Synchronisation données gestimum ERP avec un site vitrine et/ou site e-commerce',
            time: '0,5 jour'
          },
          {
            title: "Synchronisation données des documents de vente en EDI",
            time: '0,5 jour'
          },
        ]
      },
      {
        title: 'Formation Gestion Comptable: 2 à 5 jours',
        liste: [
          {
            title: 'Comptabilité générale et auxiliaire',
            time: '1 jour'
          },
          {
            title: "Gestion de l'analytique et des centres de coûts",
            time: '0,5 jour'
          },
          {
            title: 'Gestion des budgets & engagement achat',
            time: '1 jour'
          },
          {
            title: 'Gestion des échéances et des règlements',
            time: '1 jour'
          },
          {
            title: "Rapprochement bancaire manuel & automatique",
            time: '0,5 jour'
          },
          {
            title: 'Déclaration de TVA Cerfa & EDI-TVA',
            time: '0,5 jour'
          },
          {
            title: "Décisionnel - exploitation tableaux croisés",
            time: '0,5 jour'
          },
        ]
      }
    ]
  }),

  mounted() {
    
  },
  methods: {
    // download(file) {
    //   // window.open(`https://www.gestimum.com/telechargement/${file}.pdf`, '_blank');
    //   let download = {
    //     entreprise_id: this.$store.state.user.entreprise_id,
    //     email: this.$store.state.user.email,
    //     name: this.$store.state.user.name,
    //     surname: this.$store.state.user.surname,
    //     file_name: file,
    //   }
    //   console.log(download)

    //   Download.addDownload(download)
    //     .then(res => {
    //       console.log(res)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    download(file) {
      //Requête dans Store
      this.$store.dispatch('addDownload', file);
    },

    openLink(link) {
      window.open(link, '_blank')
    },

    dowloadPdf(file, link) {
      this.download(file)
      this.openLink(link)
    },

  }

}
</script>

<style scoped>
  
</style>

