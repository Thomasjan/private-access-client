<template>
  <v-card class="bg-background pa-2 mb-4">
      <h2 class="text-primary text-center">Gestimum ERP</h2>

      <!-- DERNIERE VERSION ERP -->
      <div class="mt-6 mx-auto text-center" v-if="lastUpload != {}">
        <h2 class="text-decoration-underline">Dernière version du logiciel</h2>
        <!-- <p class="mt-4 ml-2 text-primary font-italic  font-weight-bold text-subtitle-2">Avant de télécharger la nouvelle version Gestimum ERP, nous vous invitons à consulter le service client au 01 34 84 09 99.</p> -->
        <p class="mt-4 ml-2 text-primary font-italic font-weight-bold text-lg-h5">Si votre version de Gestimum ERP est antérieure à la version <strong class="text-blue">9</strong>, nous vous invitons à consulter le service client au 01 34 84 09 99.</p>
        <div class="mt-2 d-flex flex-column justify-center align-center">
            <h3 class="text-blue mt-2">Version {{lastUpload.version}} </h3>
            <v-img class="mr-2 mt-2 w-25 rounded-lg cursor-pointer" @click="downloadLink(lastUpload)" :src="getLink(lastUpload)"  aspect-ratio="4/3" contain/>
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

      <div class="mt-6 ml-4" v-if="lastUpload">
        <p v-html="lastUpload.patch"></p>
      </div>

        
        <v-divider
          :thickness="1"
          class="border-opacity-100 mt-4 "
          color="primary"
        ></v-divider>
        
      <div class="mt-6">
        <h3 class="text-primary">Détails des évolutions depuis la version 7</h3>

        <div class="mx-auto">
          <v-img class="cursor-pointer mx-auto" @click="openLink('https://docs.gestimum.com/ERP/Production/NotesVersion/Version9/Version_9.5.html')" width="70%" src="https://docs.gestimum.com/ERP/Production/NotesVersion/assets/images/Version9/9.4.jpg" aspect-ratio="4/3" />
        </div>
      </div>

      <v-divider
          :thickness="1"
          class="border-opacity-100 mt-4"
          color="primary"
      ></v-divider>

      <div class="mt-4 d-flex justify-space-between">
          <h4 class="cursor-pointer text-hover" @click="openLink('https://docs.gestimum.com/ERP/Production/Installation/05/InstallationMicrosoftSQLServerExpressFrancais.html?h=2019+sql+server')">Pré-requis et Guide d'installation de SQL Server 2019 Express et de Gestimum</h4>
          <!-- <v-icon class="cursor-pointer"  @click="openLink('http://docs.gestimum.com/ERP/9/Installation/#t=01%2FPreambule.htm')" >mdi-help</v-icon> -->
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
              <p class="d-flex" @click="openLink('https://go.microsoft.com/fwlink/p/?linkid=2216019&clcid=0x40c&culture=fr-fr&country=fr')">
                Installation de SQL Server 2022 Express 64 bit
                <span class="font-weight-bold text-primary cursor-pointer ml-2"  ></span> 
              </p>
                <v-icon class="cursor-pointer" color="primary"  @click="openLink('https://go.microsoft.com/fwlink/p/?linkid=2216019&clcid=0x40c&culture=fr-fr&country=fr')" >mdi-download</v-icon>
            </div>
           <div class="d-flex justify-space-between w-100 ml-10 px-8 mt-2 text-hover cursor-pointer">
              <p class="d-flex" @click="openLink('https://aka.ms/ssmsfullsetup')">
              Installation Microsoft SQL Server Management Studio
                <span class="font-weight-bold text-primary cursor-pointer ml-2"  ></span> 
              </p>
                <v-icon class="cursor-pointer" color="primary"  @click="openLink('https://aka.ms/ssmsfullsetup')" >mdi-download</v-icon>
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
          <p class="py-1"><strong class="font-italic">Pérenne</strong>   <v-icon color="primary">mdi-arrow-right</v-icon> Gestimum ERP existe depuis 1998, a une base installée de près de 10 000 utilisateurs, est commercialisée par 150 partenaires dans toute la France et l’Afrique francophone.</p>
          <p class="py-1"><strong class="font-italic">Puissante</strong> <v-icon color="primary">mdi-arrow-right</v-icon> 	Nativement sur une base de données MS-SQL Server, Gestimum ERP gère des flux d’informations très importants en toute sécurité et des bases de données quasi-illimitées.</p>
          <p class="py-1"><strong class="font-italic">Intégrée</strong>  <v-icon color="primary">mdi-arrow-right</v-icon>Une seule base de données, une interface commune entre la Gestion Comptable, la Gestion Commerciale et la Relation clients.</p>
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
            <li>Gestimum PME Initiale, adaptée aux TPE ayant des besoins fonctionnels réduits et des budgets serrés - Licences à partir de 600 €HT</li>
          </ul>

          <v-img class="mt-2 mx-auto cursor-pointer" :src="pdfMap" width="50%" @click="zoomImage(pdfMap)" />
        
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

          <p class="text-hover text-orange cursor-pointer" @click="moreInfosCompta = !moreInfosCompta"> {{moreInfosCompta? "Moins d'infos..." : "Plus d'infos..."}} </p>
      </div>
    </div>

    <!-- MORE INFOS COMPTA -->
    <div class="content-container">
      <div class="vertical-bar"></div>
        <div class="mt-2"  v-if="moreInfosCompta">

            <div class="mt-6">
              <h3 class="text-primary">PUISSANCE</h3>
                <v-divider
                      :thickness="1"
                      class="border-opacity-100 mt-1"
                      color="primary"
                  ></v-divider>
            </div>

              <div class="mt-6 d-flex">
                <div>
                  <p class="text-start">
                    Développé nativement sous MS-SQL Server, GESTIMUM Gestion Comptable dispose d’une puissance, d’une fiabilité et d’une sécurité des données inédites, pour une taille de base de données illimitée. 
                    D’une grande richesse fonctionnelle, GESTIMUM Gestion Comptable permet un pilotage haute précision de l’entreprise : gestion budgétaire, analytique, financière. 
                    En quelques clics, le centralisateur de GESTIMUM Gestion Comptable affiche les journaux et l’état d’avancement de chaque période de l’exercice en cours. Consultez un nombre illimité d’exercices en ligne, gérez vos rapprochements bancaires avec une précision inégalée : traçabilité, historique, édition de rapport par relevé ou par période. 
                    Établissez un nombre illimité de plans analytiques.
                  </p>
                </div>
                <v-img class="cursor-pointer" src="/images/FP-Compta-01.jpg" width="40%" @click="zoomImage('/images/FP-Compta-01.jpg')" />
              </div>

              <div class="mt-6">
              <h3 class="text-primary">INTÉGRATION</h3>
                <v-divider
                      :thickness="1"
                      class="border-opacity-100 mt-1"
                      color="primary"
                  ></v-divider>
              </div>

              <div class="mt-6 d-flex">
                <v-img class="cursor-pointer" src="/images/02-Comptes.jpg" width="40%" @click="zoomImage('/images/02-Comptes.jpg')" />

                <div>
                  <p class="text-start ml-2">
                    Profitez d’un logiciel de comptabilité s’adaptant parfaitement à votre structure et à vos besoins. 
                    Gagnez en productivité grâce à l’intégration totale avec GESTIMUM Gestion Commerciale. Saisissez une seule fois les informations, elles sont disponibles dans chaque application (même interface). 
                    Traitez de manière identique vos échéances, paiements et règlements.
                  </p>
                </div>
              </div>

              <div class="mt-6">
              <h3 class="text-primary">CONVIVIALITÉ</h3>
                <v-divider
                      :thickness="1"
                      class="border-opacity-100 mt-1"
                      color="primary"
                  ></v-divider>
            </div>

              <div class="mt-6 d-flex">
                <div>
                  <p class="text-start">
                  Travaillez rapidement avec un outil ergonomique d’une grande souplesse. 
                  Un paramétrage très abouti fait de GESTIMUM Gestion Comptable un progiciel personnalisable pour chaque utilisateur et d’une grande flexibilité (mode de saisie : standard, guidée, au kilomètre ou via des écritures automatiques). 
                  Travaillez en mode réel ou simulé. 
                  Utilisez les raccourcis clavier pour une saisie performante. 
                  Gagnez en temps et en fiabilité grâce aux nombreux guides et automatismes de l’application.
                  </p>
                </div>
                <v-img class="cursor-pointer" src="/images/FP-Compta-03.jpg" width="40%" @click="zoomImage('/images/FP-Compta-03.jpg')" />
              </div>

              <div class="mt-6">
              <h3 class="text-primary">OUVERTURE</h3>
                <v-divider
                      :thickness="1"
                      class="border-opacity-100 mt-1"
                      color="primary"
                  ></v-divider>
            </div>

              <div class="mt-6 d-flex">

                <div>
                  <p class="text-start ml-2">
                    Grâce à sa base MS-SQL Server, GESTIMUM Gestion Comptable est d’une ouverture totale. 
                    Intégrez simplement l’application dans votre système d’information ou au sein d’une suite logicielle métier. 
                    Importez et exportez des données dans les formats majeurs du marché. 
                    Communiquez en toute simplicité avec vos clients et partenaires : fournisseurs, cabinets comptables,...
                  </p>
                </div>
              </div>
              
        </div>
        <p class="mt-4 ml-2 font-weight-bold">Télécharger la fiche produit <v-icon color="primary" @click="downloadPdf('fiche produit Gestion Comptable','https://www.gestimum.com/wp-content/uploads/2022/07/2022-Fiche-produit-GESTION-COMPTABLE.pdf')" >mdi-download</v-icon> </p>
    </div>


    <div class="mt-10">
      <h3 class="text-primary">GESTIMUM Gestion Commerciale</h3>
       <v-divider
            :thickness="1"
            class="border-opacity-100 mt-1"
            color="primary"
        ></v-divider>
    </div>

    <div class="mt-6 d-flex">
      <div>
        <p class="text-start">Doté de fonctions très évoluées, GESTIMUM Gestion Commerciale garantit un suivi de la totalité du cycle commercial : prospection, vente, achats, stocks.
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

          <p class="text-hover text-orange cursor-pointer" @click="moreInfosCommercial = !moreInfosCommercial"> {{moreInfosCommercial? "Moins d'infos..." : "Plus d'infos..."}} </p>
      </div>

      <v-img class="cursor-pointer" src="/images/FP-Gesco-02.jpg" width="40%" @click="zoomImage('/images/FP-Gesco-02.jpg')"  />
    </div>

    <!-- MORE INFOS COMMERCIALE -->
    <div class="content-container">
      <div class="vertical-bar"></div>
        <div class="mt-2"  v-if="moreInfosCommercial">

            <div class="mt-6">
              <h3 class="text-primary">PUISSANCE</h3>
                <v-divider
                      :thickness="1"
                      class="border-opacity-100 mt-1"
                      color="primary"
                  ></v-divider>
            </div>

              <div class="mt-6 d-flex">
                <div>
                  <p class="text-start">
                    Développé nativement sous MS-SQL Server, GESTIMUM Gestion Commerciale dispose d’une puissance, d’une fiabilité et d’une sécurité des données inédites, pour une taille de base illimitée. Dotée de fonctions très évoluées, GESTIMUM Gestion Commerciale garantit un suivi de la totalité du cycle commercial : prospection, vente, achat. 
                    Administrez vos stocks, vos dépôts multiples et vos transferts, choisissez parmi 6 méthodes de valorisation. 
                    Identiﬁez vos articles par un numéro de série ou de lot, maîtrisez vos dates de péremption (traçabilité). 
                    Structurez vos gammes en nomenclatures multi-niveaux. 
                    Organisez les conditionnements multiples de vos produits. Facturez au volume, au débit ou au poids. 
                    Générez automatiquement vos commandes fournisseurs à partir des commandes clients par la contremarque. 
                    Personnalisez vos tableaux de bord dynamiquement pour analyser, contrôler et décider. 
                    Communiquez vos documents commerciaux en toute simplicité (courriel, EDI, PDF, XML, ...). 
                    Gérez vos taxes complémentaires (alcools, écotaxe DEEE,...). 
                    Établissez une tarification élaborée : grilles, promotions, remises...
                  </p>
                </div>
                <v-img class="cursor-pointer" src="/images/FP-Gesco-03.jpg" width="30%" @click="zoomImage('/images/FP-Gesco-03.jpg')" />
              </div>

              <div class="mt-6">
              <h3 class="text-primary">INTÉGRATION</h3>
                <v-divider
                      :thickness="1"
                      class="border-opacity-100 mt-1"
                      color="primary"
                  ></v-divider>
              </div>

              <div class="mt-6 d-flex">
                <v-img class="cursor-pointer" src="/images/FP-Gesco-02.jpg" width="40%" @click="zoomImage('/images/FP-Gesco-02.jpg')" />

                <div>
                  <p class="text-start ml-2">
                    Gagnez en productivité grâce à l’intégration totale avec GESTIMUM Gestion Comptable. 
                    Saisissez une seule fois les informations, elles sont disponibles dans chaque application. 
                    Gérez vos paiements et règlements en Gestion Commerciale ou en Gestion Comptable avec une interface commune. 
                    Traitez de manière identique échéances, paiements et règlements. 
                    L’interface est semblable d’une application à l’autre.
                  </p>
                </div>
              </div>

              <div class="mt-6">
              <h3 class="text-primary">CONVIVIALITÉ</h3>
                <v-divider
                      :thickness="1"
                      class="border-opacity-100 mt-1"
                      color="primary"
                  ></v-divider>
            </div>

              <div class="mt-6 d-flex">
                <div>
                  <p class="text-start">
                    Intégralement paramétrable, GESTIMUM Gestion Commerciale s’ajuste à votre organisation opérationnelle. 
                    Travaillez plus efficacement en personnalisant vos écrans d’affichage et de saisie. 
                    Transférez aisément vos prospects en clients, dupliquez vos documents (devis en bon de commande, bon de livraison ou facture) sans ressaisie. 
                    Bénéficiez d’une gestion des utilisateurs conviviale et sûre : accédez aux données individuellement ou en groupe. 
                    Cliquez / Glissez vos articles depuis votre liste pour enrichir vos documents grâce au multifenêtrage. 
                    Créez vos tiers et articles en cours de saisie d’une pièce. Gérez vos filtres tiers/articles/pièces en onglets d’affichage (personnalisables par poste et/ou groupe). 
                    Construisez votre application sur mesure grâce aux champs personnalisés : date, texte, booléen, entier, monétaire, calculé,...
                  </p>
                </div>
                <!-- <v-img class="cursor-pointer" src="" width="30%" @click="zoomImage('')" /> -->
              </div>

              <div class="mt-6">
              <h3 class="text-primary">OUVERTURE</h3>
                <v-divider
                      :thickness="1"
                      class="border-opacity-100 mt-1"
                      color="primary"
                  ></v-divider>
            </div>

              <div class="mt-6 d-flex">

                <div>
                  <p class="text-start ml-2">
                    Grâce à sa base MS-SQL Server, GESTIMUM Gestion Commerciale est d’une ouverture totale. 
                    Vous intégrez simplement l’application dans votre système d’information, votre GPAO ou au sein d’une suite logicielle métier. 
                    Vous importez et exportez des données dans les formats majeurs du marché. 
                    Vous communiquez en toute simplicité avec vos clients, prospects et partenaires (fournisseurs, cabinets comptables).
                  </p>
                </div>
              </div>
        </div>
        <p class="mt-4 ml-2 font-weight-bold">Télécharger la fiche produit <v-icon color="primary" @click="downloadPdf('fiche produit Gestion Commerciale','/pdfs/Fiche-produit-GESTION-COMMERCIALE.pdf')" >mdi-download</v-icon> </p>
    </div>


    <v-dialog v-model="isZoomedIn" max-width="900px">
      <v-img class="rounded-lg ml-8" :src="zoomedImageSrc" width="100%" />
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

    moreInfosCompta: false,
    moreInfosCommercial: false,

    zoomedImageSrc: '',
    isZoomedIn: false,

    pdfMap: 'images/2023-map.png'
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
    .catch((error) => {
      console.log(error)
    })

    Upload.getLastUpload()
    .then(response => {
      this.lastUpload = response
    })
    .catch(error => {
      console.log(error)
    })

  },

  methods: {
    getLink(item) {
      let link = 'https://api-espace-prive.gestimum.com/files/uploads/' + item.image_path
      return link
    },
    downloadLink(item) {
      let link = 'https://api-espace-prive.gestimum.com/files/uploads/' + item.file_path
      window.open(link, '_blank')
    },

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

  .vertical-bar {
    background-color: #EB6F2A;
    width: 2px;
    height: 100%;
    position: absolute;
    left: -8px;
    top: 0;
    opacity: 0.6;
  }

  .content-container {
    position: relative;
  }

  
</style>