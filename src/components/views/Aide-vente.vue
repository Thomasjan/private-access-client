<template>
  <v-card class="bg-white pa-2 elevation-0 mb-4">
    <h2 class="text-primary text-center">Aide à la vente</h2>
    
    <div class="mt-4 px-4">
      <h4 class="text-center">Gestimum référence plus de 2 000 clients actifs et 10 000 utilisateurs de don ERP, 85% en France et 15% à l'international.</h4>

      <div class="text-left text-subtitle-2 mt-6">
        <p>72 % des licences en gamme PME et 28% en PME Light (marché français). <br>
            Les PME sélectionnent Gestimum ERP après avoir testés les Majeurs du marché. Elles sont pour la plupart indépendantes (pas d’appartenance à un groupe), matures avec leur process de gestion et savent choisir une alternative représentant un excellent rapport qualité prix performance.</p>
        <p class="mt-2">En dehors des PME, GESTIMUM équipe d’autres organisations : les associations (avec de nombreux établissements – exemple : Emmaüs), les ONG à vocation internationale (exemple : lutte contre le sida, contre la tuberculose, …), les sociétés anonymes sportives professionnelles, les centres de formations (AFPA), les centres d’aptitudes par le travail (CAT ou ESAT), les fédérations (sportives notamment) ou syndicats professionnels.</p>
      </div>

      <div class="mt-4">
          <h3 class="text-primary">ACTIVITE DE LA PME</h3>
          <p class="mt-2 text-start text-subtitle-2">Gestimum ERP est particulièrement bien adapté au monde du négoce à volumétrie. Les PME clientes commercialisent souvent des offres techniques intégrants des n° de série et / ou comprenant des produits à assembler avec une exigence particulière dans la qualité de la gestion de ses stocks (multi-dépôts) et de ses prix de revient. Elles peuvent être sous-traitantes de la grande distribution (EDI-Vente), du monde automobile, de la sécurité incendie ou encore de l’industrie pharmaceutique (n° de lots). <br>
            Dans le même esprit, la gestion puissante des taxes parafiscales (dont la gestion des taxes sur les alcools) combinée aux dates de péremption et de commercialisation permet d’adresser les PME du monde agroalimentaire.
            En dehors du commerce de gros, Gestimum ERP séduit également les sociétés de service par son ergonomie et sa capacité de personnalisation sans développement (champs utilisateurs). <br>
            Enfin, les PME clientes apprécient son large spectre fonctionnel avec une gestion commerciale intégrant les premiers modules CRM couplée intuitivement à la gestion comptable.</p>
      </div>

      <div class="mt-6">
        <v-table density="compact" class="bg-white pa-2">
         <thead>
            <tr>
              <th class="text-primary text-left" width="90%">
               <h4>Nomenclatures INSEE (marché français)</h4> 
              </th>
              <th class="text-left text-primary">
               <h2>%</h2> 
              </th>
            </tr>
          </thead>

          <tbody>
            
              <tr v-for="(nomenclature, index) in nomenclatures" :key="index">
                <td>{{nomenclature.title}} </td>
                <td>{{nomenclature.pourcentage}} </td>
              </tr>

          </tbody>
        </v-table>
      </div>

      <div class="mt-4">
          <h3 class="text-primary">CRITERE DE TAILLE</h3>
          <p class="mt-2 text-left text-subtitle-2">GESTIMUM s’appuie sur une base de données relationnelle qui permet de gérer une volumétrie quasi illimitée tant en terme de données, qu’en terme d’utilisateurs. A ce titre, l’effectif seul n’est pas un critère de prospection, il faut le croiser à d’autres critères comme par exemple, le secteur d’activité et / ou la date de création de la société. <br>
            75 % des PME clientes ont un effectif compris entre 6 et 100 salariés ; 6 % au-delà de 100 salariés <br>
            62 % des PME clientes réalise un CA compris entre 0.75 et 7.5 M€ ; 12% au-delà.</p>
      </div>

      <div class="mt-4">
        <h4 class="text-primary">DATE D'IMMATRICULATION (Marché Français)</h4>
        <p class="mt-2 text-left text-subtitle-2">93% ont plus de 5 ans d’activité et 75 % des PME plus de 10 ans d’activité.</p>

        <v-table density="compact" class="bg-white pa-2">
            <thead>
                <tr>
                  <th class="text-primary text-left" width="90%">
                  <h4>Ancienneté</h4> 
                  </th>
                  <th class="text-left text-primary">
                  <h2>%</h2> 
                  </th>
                </tr>
            </thead>

              <tbody>
                
                  <tr v-for="(anciennete, index) in anciennetes" :key="index">
                    <td>{{anciennete.title}} </td>
                    <td>{{anciennete.pourcentage}} </td>
                  </tr>

              </tbody>
        </v-table>
      </div>


      <div class="mt-6">
          <div v-for="(pdf, index) in pdfs" :key="index" class="mt-4">
            <h4 class="text-primary">{{pdf.title}} </h4>
            <div class="d-flex justify-space-between w-75" v-for="(list, index) in pdf.lists" :key="index">
              <div class="d-flex ml-6 my-auto">
                <v-icon class="my-auto" color="primary" size="6">mdi-circle</v-icon>
                <p @click="openLink(list.link)" class="ml-2 mt-1 text-hover cursor-pointer">{{list.title}} </p>
              </div>
              <v-icon color="primary" @click="downloadPdf(list.title, list.link)">mdi-file-pdf-box</v-icon>
            </div>
          </div>
      </div>

      <div class="mt-4">
        <h3 class="text-left text-primary">Descriptif fonctionnel de Gestimum ERP</h3>
        <v-img class="mx-auto w-75 mt-4 cursor-pointer" src="http://espace-prive.gestimum.com/images/comparatif-gestion-commerciale-pme-initiale.JPG"
          @click="zoomImage('http://espace-prive.gestimum.com/images/comparatif-gestion-commerciale-pme-initiale.JPG')"
         />
      </div>

      <div class="mt-4">
        <h3 class="text-left text-primary">Comparatif Gestion Comptable gamme PME et INITIALE</h3>
        <v-img class="mx-auto w-75 mt-4 cursor-pointer" src="http://espace-prive.gestimum.com/images/comparatif-gestion-comptable-pme-initiale.JPG" 
          @click="zoomImage('http://espace-prive.gestimum.com/images/comparatif-gestion-comptable-pme-initiale.JPG')"
        />
      </div>

      <div class="mt-8 px-4">
        <h4 class="">Tout PARTENAIRE passant commande est réputé connaître et accepter sans réserve les présentes CONDITIONS GENERALES DE VENTE DES PROGICIELS ET DES SERVICES GESTIMUM et les CONDITIONS DE LICENCES DES PROGICIELS GESTIMUM ET D’UTILISATION DES SERVICES ASSOCIES.	</h4>
        
        <div class="mt-2 d-flex justify-space-between w-75">
          <h3 class="text-primary text-left cursor-pointer"  @click="openLink('http://espace-prive.gestimum.com/fr/cgv.pdf')">Conditions Générales de Vente</h3>
          <v-icon class="cursor-pointer" color="primary"  @click="downloadPdf('CGV', 'http://espace-prive.gestimum.com/fr/cgv.pdf')">mdi-file-pdf-box</v-icon>
        </div>


        <div class="mt-2 d-flex justify-space-between w-75">
          <h3 class="text-primary text-left cursor-pointer"  @click="openLink('http://espace-prive.gestimum.com/fr/cls.pdf')">Conditions de Licence</h3>
          <v-icon class="cursor-pointer" color="primary"  @click="downloadPdf('Conditions de Licence', 'http://espace-prive.gestimum.com/fr/cls.pdf')">mdi-file-pdf-box</v-icon>
        </div>
      </div>




    <v-dialog v-model="isZoomedIn" max-width="900px">
      <v-img class="rounded-lg" :src="zoomedImageSrc" width="100%" />
    </v-dialog>

    </div>
  </v-card>
</template>

<script>
export default {
  
  data: () => ({
    zoomedImageSrc: '',
    isZoomedIn: false,

      nomenclatures: [
        { title: "46 Commerce de gros, à l'exception des automobiles et des motocycles", pourcentage: '26%' },
        { title: '62 Programmation conseil et autres activités informatiques', pourcentage: '15%' },
        { title: "47 Commerce de détail, à l'exception des automobiles et des motocycles", pourcentage: '9%' },
        { title: "43 Travaux de construction spécialisée", pourcentage: '4%' },
        { title: '95 Réparation d’ordinateurs et de biens personnels et domestiques', pourcentage: '3%' },
        { title: '70 Activités des sièges sociaux, conseil de gestion', pourcentage: '2%' },
        { title: '10 Produits des industries alimentaires', pourcentage: '2%' },
      ],

      anciennetes: [
        { title: 'Moins de 5 ans d’activité', pourcentage: '7%' },
        { title: 'Moins de 10 ans d’activité', pourcentage: '29%' },
        { title: 'Moins de 15 ans d’activité', pourcentage: '51%' },
        { title: 'Moins de 20 ans d’activité', pourcentage: '68%' },
        { title: 'Moins de 25 ans d’activité', pourcentage: '81%' },
      ],

      pdfs:[
        {
          title: 'Aide à la vente',
          lists:[
              { title: 'Présentation de GESTIMUM SA',  link: 'http://espace-prive.gestimum.com/PDF/plaquette/Fiche-produit-GESTION-COMMERCIALE.pdf' },
              { title: 'Proposition commerciale',  link: 'http://espace-prive.gestimum.com/PDF/plaquette/Fiche-produit-GESTION-COMMERCIALE.pdf' },
              { title: 'Exemples de Courriers & fax',  link: 'http://espace-prive.gestimum.com/PDF/plaquette/Fiche-produit-GESTION-COMMERCIALE.pdf' },
          ]
        },       
        {
          title: 'Nos Etats',
          lists:[
              { title: "Recueil d'éditions",  link: 'http://espace-prive.gestimum.com/PDF/plaquette/Fiche-produit-GESTION-COMMERCIALE.pdf' },
              { title: "Exemples de modèles Report Builder",  link: 'http://espace-prive.gestimum.com/PDF/plaquette/Fiche-produit-GESTION-COMMERCIALE.pdf' },
          ]
        },       
        {
          title: 'Plaquette produits',
          lists:[
              { title: 'Gestion Commerciale',  link: 'http://espace-prive.gestimum.com/PDF/plaquette/Fiche-produit-GESTION-COMMERCIALE.pdf' },
              { title: 'Gestion Comptable',  link: 'http://espace-prive.gestimum.com/PDF/plaquette/Fiche-produit-GESTION-COMMERCIALE.pdf' },
              { title: 'Guide des Servicese',  link: 'http://espace-prive.gestimum.com/PDF/plaquette/Fiche-produit-GESTION-COMMERCIALE.pdf' },
              { title: 'Comparaison Gestion Commerciale Gamme PME - INITIALE',  link: 'http://espace-prive.gestimum.com/PDF/plaquette/Fiche-produit-GESTION-COMMERCIALE.pdf' },
              { title: 'Comparaison Gestion Comptable Gamme PME - INITIALE',  link: 'http://espace-prive.gestimum.com/PDF/plaquette/Fiche-produit-GESTION-COMMERCIALE.pdf' },
          ]
        },       
        {
          title: 'Nos modules',
          lists:[
              { title: 'G-Change',  link: 'http://espace-prive.gestimum.com/PDF/plaquette/Fiche-produit-GESTION-COMMERCIALE.pdf' },
              { title: 'Les Affaires',  link: 'http://espace-prive.gestimum.com/PDF/plaquette/Fiche-produit-GESTION-COMMERCIALE.pdf' },
              { title: 'EDI - Vente',  link: 'http://espace-prive.gestimum.com/PDF/plaquette/Fiche-produit-GESTION-COMMERCIALE.pdf' },
              { title: 'Immobilisations',  link: 'http://espace-prive.gestimum.com/PDF/plaquette/Fiche-produit-GESTION-COMMERCIALE.pdf' },
              { title: 'Import & Rapprochement Bancaire Automatique',  link: 'http://espace-prive.gestimum.com/PDF/plaquette/Fiche-produit-GESTION-COMMERCIALE.pdf' },
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

    zoomImage(src) {
      this.zoomedImageSrc = src;
      this.isZoomedIn = true;
    },
  }
}
</script>


