<template>
  <v-card class="bg-white pa-2 mb-4">
      <h2 class="text-primary text-center">Gestimum ERP</h2>

      <!-- DERNIERE VERSION ERP -->
      <div class="mt-6 mx-auto text-center" v-if="lastUpload != {}">
        <h2 class="text-decoration-underline">Dernière version du logiciel</h2>
        <p class="mt-4 ml-2 text-primary font-italic  font-weight-bold text-subtitle-2">Avant de télécharger la nouvelle version Gestimum ERP, nous vous invitons à consulter le service client au 01 34 84 09 99.</p>
        <div class="mt-2 d-flex flex-column justify-center align-center">
            <h3 class="text-blue mt-2">Version {{lastUpload.version}} </h3>
            <v-img class="mr-2 bg-blue mt-2 w-25" :src="getLink(lastUpload)"  aspect-ratio="4/3" contain/>
            <p class="font-italic text-subtitle-2 mt-4 text-left mx-6" v-html="lastUpload.description"></p>
            <v-btn color="primary w-25 mx-auto mt-4" size="large" @click="downloadLink(lastUpload)"> 
              <v-icon class="mr-4 mt-1">mdi-download</v-icon>
              Télécharger
            </v-btn>
        </div>
      </div>
      <v-divider
          :thickness="1"
          class="border-opacity-100 mt-4 w-75 mx-auto"
          color="primary"
        ></v-divider>

      <h3 class="text-center mt-8">Découvrez nos dernières évolutions</h3>
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


      <div class="mt-6">
        <div>
          <h4>1 - Installation de SQL Server :</h4>
          <div class="d-flex justify-space-between text-subtitle-2 mt-2">
            <p >Pré requis avant l'installation de SQL Server 2019 Express et SQL Server Management Studio (En français):</p>
            <p class="text-hover cursor-pointer">[Pour en savoir +]</p>
          </div>
          <ul class="ml-8 mt-2">
            <li>Installez <a class="text-hover cursor-pointer" @click="openLink('https://support.microsoft.com/fr-fr/kb/3045560')">Microsoft .Net Framework 4.6.</a>  pour SQL Server Express</li>
            <li>Installez <a class="text-hover cursor-pointer" @click="openLink('https://www.microsoft.com/fr-fr/download/details.aspx?id=49981')" >Microsoft .Net Framework 4.6.1.</a> pour SQL Server Management Studio</li>
          </ul>
          
           <div class="d-flex justify-space-between w-100 ml-10 px-8 mt-8 text-hover cursor-pointer">
              <p class="d-flex" @click="openLink('http://espace-prive.gestimum.com/Script-telechargement/VGestimum.php?fichier=SQL_64')">
                Installation de SQL Server 2019 Express 64 bit
                <span class="font-weight-bold text-primary cursor-pointer ml-2"  ></span> 
              </p>
                <v-icon class="cursor-pointer" color="primary"  @click="openLink('http://espace-prive.gestimum.com/Script-telechargement/VGestimum.php?fichier=SQL_64')" >mdi-download</v-icon>
            </div>
           <div class="d-flex justify-space-between w-100 ml-10 px-8 mt-2 text-hover cursor-pointer">
              <p class="d-flex" @click="openLink('http://espace-prive.gestimum.com/Script-telechargement/VGestimum.php?fichier=SSMS')">
              Installation Microsoft SQL Server Management Studio
                <span class="font-weight-bold text-primary cursor-pointer ml-2"  ></span> 
              </p>
                <v-icon class="cursor-pointer" color="primary"  @click="openLink('http://espace-prive.gestimum.com/Script-telechargement/VGestimum.php?fichier=SSMS')" >mdi-download</v-icon>
            </div>
        </div>
      </div>


      <v-divider
          :thickness="1"
          class="border-opacity-100 mt-6"
          color="primary"
      ></v-divider>

      <div class="mt-6">
        <div>
          <h4>2 - Installation de Gestimum</h4>
          <p class="mt-2 text-medium-emphasis font-italic px-4">
            Attention : Toute intervention sur le serveur ou sur les postes clients nécessite des compétences métier. Nous vous conseillons de solliciter votre partenaire informatique avant toute mise à jour ou migration de bases de données. Un changement de version nécessite d’effectuer des tests préalables avant la mise en production de votre dossier ; Dans tous les cas, pensez à effectuer au préalable une sauvegarde de la base. Pour toutes informations complémentaires, se référer à votre partenaire. <br>
            L’assistance G-Web ne se substitue pas aux prestations d’un intégrateur informatique de proximité auquel le client doit pouvoir faire appel pour s’assurer que son infrastructure reste adaptée, que la solution correspond à ses attentes, effectuer ou modifier les paramétrages, former les utilisateurs, effectuer les migrations et mises à jours, se charger d'automatiser les sauvegardes et intervenir sur site.
          </p>

          <p class="mt-4 ml-2 text-primary font-weight-bold text-subtitle-2">Avant de télécharger la nouvelle version Gestimum ERP, nous vous invitons à consulter le service client au 01 34 84 09 99.</p>
        
          <div v-for="item in uploads.slice(0,2)" :key="item.id" class="mt-8 px-12" >
            <div class="flex flex-col justify-start align-center">
              <div class="d-flex justify-space-between w-100 ">
                
                <p class="d-flex">
                  <v-img class="mr-2" :src="getLink(item)" :width="40" aspect-ratio="4/3" contain/>
                  Installez
                  <span class="font-weight-bold text-primary cursor-pointer ml-2 d-flex"  @click="downloadLink(item)">{{ item.file_name }} - <p class="font-italic">{{item.version}}</p>  </span> 
                </p>
                  <v-icon class="cursor-pointer" color="primary" @click="downloadLink(item)">mdi-download</v-icon>
              </div>
              <p class="mt-2 ml-2 font-italic text-start" v-html="item.description"> </p>
            </div>
            <v-divider
              :thickness="1"
              class="border-opacity-100 mt-2"
              color="primary"
          ></v-divider>
          </div>
        </div>
      </div>

      <v-divider
            :thickness="1"
            class="border-opacity-100 mt-6"
            color="primary"
        ></v-divider>


    <div class="mt-4">
      <h3>Dernière Version Bêta ou RC :</h3>
      <div class="text-start font-italic pl-2 mt-2 text-subtitle-2">
        <p> <strong>Version bêta :</strong>  Version du logiciel qui est en phase de test avant sa finalisation, distribuée en quantité limitée pour corriger les derniers bugs.</p>
        <p class="mt-1"> <strong>Version admissible ou pre-release (RC) :</strong>  Version du logiciel qui correspond à la version « finale » ou « stable ». Elle est mise à disposition à des fins de « tests de dernière minute » visant à déceler les toutes dernières erreurs subsistants au sein de l'application.</p>
        <p class="mt-2">Cette version est destinée aux intégrateurs et utilisateurs avertis pour tests & échanges avec l’éditeur sur des bases de données tests. En aucun cas, cette version doit être utilisée pour l'exploitation d'une société.</p>
      </div>

      <h3 class="mt-8 text-primary">Gestimum ERP, l'intégré de gestion haute performance</h3>
    </div>


      <v-divider
            :thickness="1"
            class="border-opacity-100 mt-4"
            color="primary"
        ></v-divider>

    <div class="mt-6">
      <p class="text-start">Gestimum ERP est le premier choix des PME qui recherchent la performance opérationnelle et la maîtrise de leurs coûts d’exploitation.
      GESTIMUM ERP s’adresse aux PME qui désirent une solution de gestion :</p>  
        <div class="mt-4 flex-column">
          <p class="py-1"><strong class="font-italic">Evolutive</strong> <v-icon color="primary">mdi-arrow-right</v-icon>	De 5 à plus de 300 postes.</p>
          <p class="py-1"><strong class="font-italic">Pérenne</strong>   <v-icon color="primary">mdi-arrow-right</v-icon> Gestimum ERP existe depuis 1998, a une base installée de près de 10 000 utilisateurs, est commercialisée par 250 partenaires dans toute la France, la Belgique et l’Afrique francophone.</p>
          <p class="py-1"><strong class="font-italic">Puissante</strong> <v-icon color="primary">mdi-arrow-right</v-icon> 	Nativement sur une base de données MS-SQL Server, Gestimum ERP gère des flux d’informations très importants en toute sécurité et des bases de données quasi-illimitées.</p>
          <p class="py-1"><strong class="font-italic">Intégrée</strong>  <v-icon color="primary">mdi-arrow-right</v-icon>Une seule base de donnée, une interface commune entre la Gestion Comptable, la Gestion Commerciale et la Relation clients.</p>
          <p class="py-1"><strong class="font-italic">Ouverte</strong>   <v-icon color="primary">mdi-arrow-right</v-icon>	Gestimum ERP s’intègre naturellement dans votre existant informatique, et communique simplement avec vos partenaires.</p>
          <p class="py-1"><strong class="font-italic">Complète</strong>  <v-icon color="primary">mdi-arrow-right</v-icon>	Gestimum ERP optimise l'ensemble des processus opérationnels de la PME, hors gestion de production.</p>
          <p class="py-1"><strong class="font-italic">Conviviale</strong><v-icon color="primary">mdi-arrow-right</v-icon>	Intuitive comme une suite bureautique, personnalisable comme un logiciel professionnel.</p>
          <p class="py-1"><strong class="font-italic">Standard</strong>  <v-icon color="primary">mdi-arrow-right</v-icon>	Construit et intégré dans l'environnement Microsoft : Windows, Office et MS-SQL Server.</p>
        </div>

        <div class="mt-4">
          <p class="text-subtitle-1 font-weight-black">Assurant un retour sur investissement rapide</p>
          <ul class="px-8 mt-4">
            <li>durée de mise en œuvre moyenne : 5 à 15 jours</li>
            <li>Affaire type : 15 000 € HT comprenant les licences, l’assistance, le maquettage, l’installation & la formation.</li>
          </ul>

          <p class="mt-4">
            D’une grande flexibilité, Gestimum ERP garantit aux entreprises et à leurs partenaires informatiques une exploitation immédiatement performante et un retour sur investissement rapide. Avec Gestimum ERP, la productivité des PME n’a plus de limite.
          </p>

          <p class="mt-2">Gestimum ERP se décline en deux gammes (livré avec MS-SQL Server Standard ou Express) :</p>
        
          <ul class="px-8 mt-2">
            <li>Gestimum PME, pour les PME matures, ayant des exigences en terme de fonctionnalités et de performance de leur solution de gestion - Licences à partir de 2 400 €HT</li>
            <li>Gestimum PME Initiale, adapté aux TPE ayant des besoins fonctionnels réduits et des budgets serrés - Licences à partir de 600 €HT</li>
          </ul>

          <v-img class="mt-2 mx-auto cursor-pointer" src="http://espace-prive.gestimum.com/images/Planishere/Map%20ERP.png" width="50%" @click="zoomImage('http://espace-prive.gestimum.com/images/Planishere/Map%20ERP.png')" />
        
        </div>
    </div>

    <div class="mt-6">
      <h3 class="text-primary">GESTIMUM Gestion Comptable</h3>
       <v-divider
            :thickness="1"
            class="border-opacity-100 mt-1"
            color="primary"
        ></v-divider>
    </div>

    <div class="mt-6 d-flex">
      <div>
        <p class="text-start">D’une grande richesse fonctionnelle, GESTIMUM Gestion Comptable permet un pilotage haute précision de l’entreprise : gestion budgétaire, analytique, financière.</p>
          <ul class="px-8 mt-4">
            <li>En quelques clics, le centralisateur de GESTIMUM Gestion Comptable affiche les journaux et l’état d’avancement de chaque période de l’exercice en cours.</li>
            <li>Consultez un nombre illimité d’exercices en ligne, gérez vos rapprochements bancaires avec une précision inégalée : traçabilité, historique, édition de rapport par relevé ou par période.</li>
            <li>Établissez un nombre illimité de plans analytiques.</li>
          </ul>

          <p class="text-hover text-orange cursor-pointer">Plus d'infos...</p>
      </div>
      <v-img class="cursor-pointer" src="http://espace-prive.gestimum.com/images/Impressions-ecran-2014/COMPTA/FP-Compta-01.jpg" width="40%" @click="zoomImage('http://espace-prive.gestimum.com/images/Impressions-ecran-2014/COMPTA/FP-Compta-01.jpg')" />
    </div>


    <div class="mt-6">
      <h3 class="text-primary">GESTIMUM Gestion Commerciale</h3>
       <v-divider
            :thickness="1"
            class="border-opacity-100 mt-1"
            color="primary"
        ></v-divider>
    </div>

    <div class="mt-6 d-flex">
      <div>
        <p class="text-start">Dotée de fonction très évoluées, GESTIMUM Gestion Commerciale garantit un suivi de la totalité du cycle commercial : prospection, vente, achats, stocks.
            Avec GESTIMUM Gestion Commerciale, enrichissez votre relation client, gérez rigoureusement vos stocks, optimisez vos achats, en toute sérénité.</p>
          <ul class="px-8 mt-4">
            <li>Administrez vos stocks, vos dépôts multiples et vos transferts, choisissez parmi 6 méthodes de valorisation.</li>
            <li>Identiﬁez vos articles par un numéro de série ou de lot, maîtrisez vos dates de péremption (traçabilité).</li>
            <li>Structurez vos gammes en nomenclatures multi-niveaux.</li>
            <li>Organisez les conditionnements multiples de vos produits. Facturez au volume, au débit ou au poids.</li>
            <li>Générez automatiquement vos commandes fournisseurs à partir des commandes clients par la contremarque.</li>
            <li>Personnalisez vos tableaux de bord dynamiquement pour analyser, contrôler et décider.</li>
            <li>Communiquez vos documents commerciaux en toute simplicité (courriel, EDI, PDF, XML, ...).</li>
            <li>Gérez vos taxes complémentaires (alcools, écotaxe DEEE,...). Établissez une tarification élaborée : grilles, promotions, remises…</li>
          </ul>

          <p class="text-hover text-orange cursor-pointer">Plus d'infos...</p>
      </div>
      <v-img class="cursor-pointer" src="http://espace-prive.gestimum.com/images/Impressions-ecran-2014/GESCO/FP-Gesco-02.jpg" width="40%" @click="zoomImage('http://espace-prive.gestimum.com/images/Impressions-ecran-2014/GESCO/FP-Gesco-02.jpg')"  />
    </div>


    <v-dialog v-model="isZoomedIn" max-width="900px">
      <v-img class="rounded-lg" :src="zoomedImageSrc" width="100%" />
    </v-dialog>

      </div>
  </v-card>
</template>

<script>
import Upload from '../../services/uploads.service'

export default {
  
  data: () => ({
    uploads:[],
    lastUpload: {},

    zoomedImageSrc: '',
    isZoomedIn: false,
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

    Upload.getLastUpload()
    .then(response => {
      this.lastUpload = response
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
    },

    zoomImage(src) {
    this.zoomedImageSrc = src;
    this.isZoomedIn = true;
  },
   
  }
}
</script>

<style scoped>


  ul{
    list-style: none;
  }

  li::before{
    content: "•";
    color: #EB6F2A;
    font-weight: bold;
    display: inline-block; 
    width: 1em;
    margin-left: -1em;
  }

  
</style>
