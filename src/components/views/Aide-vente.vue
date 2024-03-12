<template>
  <v-card class="bg-background pa-2 elevation-0 mb-4">
    <h2 class="text-primary text-center">Aide à la vente</h2>
    
    <div class="mt-4 px-4">
      <h4 class="text-center">Gestimum référence plus de 2 000 clients actifs et 10 000 utilisateurs de don ERP, 70% en France et 30% à l'international.</h4>

      <div class="text-left text-subtitle-2 mt-6">
        <p>85 % des licences en gamme PME et 15% en PME Light (marché français). <br>
            Les PME sélectionnent Gestimum ERP après avoir testés les Majeurs du marché. Elles sont pour la plupart indépendantes (pas d’appartenance à un groupe), matures avec leur process de gestion et savent choisir une alternative représentant un excellent rapport qualité prix performance.</p>
        <p class="mt-2">En dehors des PME, GESTIMUM équipe d’autres organisations : les associations (avec de nombreux établissements – exemple : Emmaüs), les ONG à vocation internationale (exemple : lutte contre le sida, contre la tuberculose, …), les sociétés anonymes sportives professionnelles, les centres de formations (AFPA), les centres d’aptitudes par le travail (CAT ou ESAT), les fédérations (sportives notamment) ou syndicats professionnels.</p>
      </div>

      <div class="mt-4">
          <h3 class="text-primary">ACTIVITE DE LA PME</h3>
          <p class="mt-2 text-start text-subtitle-2">Gestimum ERP est particulièrement bien adapté au monde du négoce à volumétrie. Les PME clientes commercialisent souvent des offres techniques intégrants des n° de série et / ou comprenant des produits à assembler avec une exigence particulière dans la qualité de la gestion de ses stocks (multi-dépôts) et de ses prix de revient. Elles peuvent être sous-traitantes de la grande distribution (EDI-Vente), du monde automobile, de la sécurité incendie. <br>
            Dans le même esprit, la gestion puissante des taxes parafiscales (dont la gestion des taxes sur les alcools) combinée aux dates de péremption et de commercialisation permet d’adresser les PME du monde agroalimentaire.
            En dehors du commerce de gros, Gestimum ERP séduit également les sociétés de service par son ergonomie et sa capacité de personnalisation sans développement (champs utilisateurs). <br>
            Enfin, les PME clientes apprécient son large spectre fonctionnel avec une gestion commerciale intégrant les premiers modules CRM couplée intuitivement à la gestion comptable.</p>
      </div>

      <div class="mt-6">
        <v-img class="mx-auto rounded-lg cursor-pointer" 
        src="images/secteur activités des PME.png" 
        width="40%" 
        aspect-ratio="4/3" 
         @click="zoomImage('images/secteur activités des PME.png')"/>
      </div>

      <!-- <div class="mt-6">
        <v-table density="compact" class="bg-background pa-2">
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
      </div> -->

      <div class="mt-4 w-100">
          <h3 class="text-primary">CRITERE DE TAILLE</h3>
          <p class="mt-2 text-left text-subtitle-2">GESTIMUM s’appuie sur une base de données relationnelle qui permet de gérer une volumétrie quasi illimitée tant en terme de données, qu’en terme d’utilisateurs. A ce titre, l’effectif seul n’est pas un critère de prospection, il faut le croiser à d’autres critères comme par exemple, le secteur d’activité et / ou la date de création de la société. </p> <br>
           <div class="text-center text-subtitle-2 font-weight-bold"> 92 % des PME clientes ont un effectif inférieur à 50 salariés </div> <br>
            <v-img class="mx-auto rounded-sm my-2" src="images/clients par effectifs.PNG" width="60%" />

            <div class="text-center text-subtitle-2 font-weight-bold my-4"> 65 % des PME clientes réalise un CA compris entre 0.75 et 7.5 M€.</div>
            <v-img class="mx-auto rounded-sm my-2" src="images/clients par CA.PNG" width="60%" />


            <div class="text-center text-subtitle-2 font-weight-bold my-4"> 90 % de nos clients ont plus de 10 ans d’activité. </div>
            <v-img class="mx-auto rounded-sm my-2" src="images/clients par ancienneté.PNG" width="60%" />

          
      </div>

      <!-- <div class="mt-4">
        <h4 class="text-primary">DATE D'IMMATRICULATION (Marché Français)</h4>
        <p class="mt-2 text-left text-subtitle-2">93% ont plus de 5 ans d’activité et 75 % des PME plus de 10 ans d’activité.</p>

        <v-table density="compact" class="bg-background pa-2">
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
      </div> -->


      <div class="mt-6">
        <v-btn v-if="$store.state.user.role_id ===1" @click="dialogAdd = true" class="bg-primary ml-4">
          <v-icon>mdi-plus </v-icon> 
          PDF
        </v-btn>
          <div v-for="(pdf, index) in pdfs" :key="index" class="mt-4">
            <h4 class="text-primary">{{pdf.category}} </h4>
            <div class="d-flex justify-space-between w-75" v-for="(list, index) in pdf.lists" :key="index">
              <div class="d-flex ml-6 my-auto">
                <v-icon class="my-auto" color="primary" size="6">mdi-circle</v-icon>
                <p @click="openLink(list.link)" class="ml-2 mt-1 text-hover cursor-pointer">{{list.title}} </p>
              </div>
              <div class="d-flex">
                <v-icon v-if="$store.state.user.role_id ===1" class="delete" @click="openDelete(list)">mdi-delete</v-icon>
                <v-icon v-if="$store.state.user.role_id ===1" class="edit" @click="openEdit(list)">mdi-pencil</v-icon>
                <v-icon class="ml-2" @click="downloadPdf(list.title, list.link)" color="primary">mdi-file-pdf-box</v-icon>
            </div>
            </div>
          </div>
      </div>

      <div class="mt-8">
        <h3 class="text-left text-primary">Descriptif fonctionnel de Gestimum ERP</h3>
        <v-img class="mx-auto w-75 mt-4 cursor-pointer" :src="descriptifFonctionnel"
          @click="zoomImage(descriptifFonctionnel)"
         />
      </div>

      <div class="mt-4">
        <h3 class="text-left text-primary">Comparatif Gestion Commerciale gamme PME et INITIALE</h3>
        <v-img class="mx-auto w-75 mt-4 cursor-pointer" src="images/fonctionnalites-gamme-gesco-2024.png" 
          @click="zoomImage('images/fonctionnalites-gamme-gesco-2024.png')"
        />
        
        <p class="px-8 mt-4 text-primary font-weight-bold text-lg-body-1">Principales Fonctionnalités de le Gestion Commerciale PME :</p>
        <v-img class="mx-auto w-75 mt-1 cursor-pointer" :src="descriptifGestionCommerciale" 
          @click="zoomImage(descriptifGestionCommerciale)"
        />
      </div>

      <div class="mt-4">
        <h3 class="text-left text-primary">Comparatif Gestion Comptable gamme PME et INITIALE</h3>
         <v-img class="mx-auto w-75 mt-4 cursor-pointer" src="images/fonctionnalites-gamme-compta-2024.png" 
          @click="zoomImage('images/fonctionnalites-gamme-compta-2024.png')"
        />
        <p class="px-8 mt-4 text-primary font-weight-bold text-lg-body-1">Principales Fonctionnalités de le Gestion Comptable PME :</p>

        <v-img class="mx-auto w-75 mt-1 cursor-pointer" :src="descriptifGestionComptable" 
          @click="zoomImage(descriptifGestionComptable)"
        />
      </div>

      <div class="mt-8 px-4">
        <h4 class="">Tout PARTENAIRE passant commande est réputé connaître et accepter sans réserve les présentes CONDITIONS GENERALES DE VENTE DES PROGICIELS ET DES SERVICES GESTIMUM et les CONDITIONS DE LICENCES DES PROGICIELS GESTIMUM ET D’UTILISATION DES SERVICES ASSOCIES.	</h4>
        
        <div class="mt-2 d-flex justify-space-between w-75">
          <h3 class="text-primary text-left cursor-pointer"  @click="openLink('https://www.gestimum.com/wp-content/uploads/2021/09/CGV-1.pdf')">Conditions Générales de Vente</h3>
          <v-icon class="cursor-pointer" color="primary"  @click="downloadPdf('CGV', 'https://www.gestimum.com/wp-content/uploads/2021/09/CGV-1.pdf')">mdi-file-pdf-box</v-icon>
        </div>

        <!-- CONTRAT LICENSE -->
        <div class="mt-2 d-flex justify-space-between w-75">
          <h3 class="text-primary text-left cursor-pointer"  @click="openLink(CLS)">Conditions de Licence</h3>
          <v-icon class="cursor-pointer" color="primary"  @click="downloadPdf('Conditions de Licence', CLS)">mdi-file-pdf-box</v-icon>
        </div>
      </div>



    <v-dialog v-model="isZoomedIn" max-width="900px">
      <v-img class="rounded-lg" :src="zoomedImageSrc" width="100%" />
    </v-dialog>

    <!-- AJOUT -->
    <v-dialog v-model="dialogAdd" width="600px">
      <v-card class="bg-white">
        <v-card-title class="text-center">Ajout</v-card-title>
        <v-card-text>
          <!-- <v-text-field label="Catégorie" v-model="itemOnEdit.category"></v-text-field> -->
         <v-autocomplete
          v-model="form.category"
          :items="getCategories()"
          label="Catégorie"
          :tags="true"
          :filter="customFilter"
          @input="handleInput"
          return-object
        >
        </v-autocomplete>
          <v-text-field label="Titre" v-model="form.title"></v-text-field>
          <v-text-field label="Lien" v-model="form.link"></v-text-field>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between">
          <v-btn color="primary" @click="dialogAdd = false">Annuler</v-btn>
          <v-btn color="primary" @click="addPdf()">Enregistrer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- MODIFICATION -->
    <v-dialog v-model="dialogEdit" width="600px">
      <v-card class="bg-white">
        <v-card-title class="text-center">Modification</v-card-title>
        <v-card-text>
          <!-- <v-text-field label="Catégorie" v-model="itemOnEdit.category"></v-text-field> -->
         <v-autocomplete
          v-model="itemOnEdit.category"
          :items="getCategories()"
          label="Catégorie"
          :tags="true"
          :filter="customFilter"
          @input="handleInput"
          return-object
        >
        </v-autocomplete>
          <v-text-field label="Titre" v-model="itemOnEdit.title"></v-text-field>
          <v-text-field label="Lien" v-model="itemOnEdit.link"></v-text-field>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between">
          <v-btn color="primary" @click="dialogEdit = false">Annuler</v-btn>
          <v-btn color="primary" @click="confirmEdit()">Enregistrer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <!-- SUPPRESSION -->
     <v-dialog v-model="dialogDelete" width="600px">
      <v-card class="bg-white">
        <v-card-title class="text-center">Suppression</v-card-title>
        <v-card-text>
          <p>Êtes-vous sûr de vouloir supprimer ce PDF ?</p>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between">
          <v-btn color="primary" @click="dialogDelete = false">Annuler</v-btn>
          <v-btn color="primary" @click="confirmDelete()">Supprimer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    </div>

  </v-card>
</template>

<script>
import PDF from '../../services/pdfs.service'
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

      pdfs:[],
      dialogEdit: false,
      dialogAdd: false,
      dialogDelete: false,

      itemDelete: {},
      itemOnEdit: {},
      form:{
        category: '',
        title: '',
        link: '',
        ref: 'aide-vente'
      },

      //assets
      CLS: 'pdfs/CLS.pdf',
      descriptifFonctionnel: 'images/descriptif-fonctionnel.png',
      descriptifGestionCommerciale: 'images/descriptif-fonctionnel-gestion-commerciale.png',
      descriptifGestionComptable: 'images/descriptif-fonctionnel-gestion-comptable.png',

  }),

  mounted() {
    this.fetchPdfs();
  },

  methods: {
    //get PDfs de la page support
    fetchPdfs() {
      PDF.getAideVentePdfs()
    .then((res) => {
      //on map sur les categories
      const pdfsByCategory = res.reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = {
          category: category,
          lists: [item],
        };
      } else {
        acc[category].lists.push(item);
      }
      return acc;
    }, {});

    this.pdfs = Object.values(pdfsByCategory);
    // console.log(this.pdfs)
  })
    .catch((err) => {
      console.log(err)
    })
    },

 //permettre d'ajouter une catégorie
    handleInput(event) {
    const value = event.target.value;
    const categories = this.getCategories();
    if (!categories.includes(value)) {
      this.dialogEdit && (this.itemOnEdit.category = value);
      this.dialogAdd && (this.form.category = value);
    }
  },

    //permettre de filtrer les catégories
  customFilter(item, queryText, itemText) {
    const hasItem = this.getCategories().includes(queryText);
    const matchesItem = itemText.toLowerCase().includes(queryText.toLowerCase());
    return hasItem || matchesItem;
  },
    //liste des catégories
    getCategories() {
    const categories = this.pdfs.map((pdf) => pdf.category);
    return [...new Set(categories)];
    },

    //télécharger le pdf
    download(file) {
      //Requête dans Store
      this.$store.dispatch('addDownload', file);
    },


    openLink(link) {
      window.open(link, '_blank')
    },

    //ouvrir le pdf et le télécharger
    downloadPdf(file, link) {
      this.download(file)
      this.openLink(link)
    },

    //ouvrir l'édition d'un item
    openEdit(item) {
      this.dialogEdit = true
      this.itemOnEdit = item
      console.log(this.itemOnEdit)
    },

    //ouvrir la suppression d'un item
    openDelete(item) {
      this.dialogDelete = true
      this.itemDelete = item
    },

    //Enregister les modifications
    confirmEdit() {
      
       const updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
       this.itemOnEdit.created_at = this.itemOnEdit.created_at.slice(0, 19).replace('T', ' ');
       this.itemOnEdit.updated_at = updated_at;
       
      PDF.editPdf(this.itemOnEdit.id, this.itemOnEdit)
      .then((res) => {
        console.log(res)
        this.dialogEdit = false
        this.itemOnEdit = {}
        this.fetchPdfs()
      })
      .catch((err) => {
        console.log(err)
      })
      
    },

    //ajout d'un pdf
    addPdf() {
      this.form.ref = 'aide-vente'
      PDF.addPdf(this.form)
      .then((res) => {
        console.log(res)
        this.dialogAdd = false
        this.form = {}
        this.fetchPdfs()
      })
      .catch((err) => {
        console.log(err)
      })
    },


    confirmDelete() {
      PDF.deletePdf(this.itemDelete.id)
      .then((res) => {
        console.log(res)
        this.dialogDelete = false
        this.itemOnEdit = {}
        this.fetchPdfs()
      })
      .catch((err) => {
        console.log(err)
      })
    },

    zoomImage(src) {
      this.zoomedImageSrc = src;
      this.isZoomedIn = true;
    },
  }
}
</script>
<style scoped>

.edit:hover {
  cursor: pointer;
  color: rgb(38, 146, 235);
}

.delete:hover {
  cursor: pointer;
  color: rgb(255, 27, 27);
}
</style>



