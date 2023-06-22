<template>
  <v-card class="bg-background pa-2 elevation-0">
      <h2 class="text-primary text-center">Formation</h2>

    <div class="mt-2 ml-2" v-if="$store.state.user.role_id >= 3">
      <h3 class="text-center">	Gestimum vous propose des formations adaptées à votre rythme et votre budget afin de rendre vos utilisateurs rapidement opérationnels.</h3>

      <div class="mt-8">
        <p class="mb-4">	Choisissez la formation qui vous convient :</p>
        <ul class="ml-6">
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
        <div v-for="(pdf, index) in pdfs" :key="index">
          <h4 class="mt-2">	{{pdf.title}} <v-icon color="primary" class="cursor-pointer"  @click="downloadPdf(pdf.title, pdf.link)">mdi-download</v-icon> </h4>
        </div>
      </div>
   </div>

   <div class="mt-2 ml-2" v-else>
    <div v-for="(pdf, index) in pdfs" :key="index">
      <h4 class="mt-2">	{{pdf.title}} <v-icon color="primary" class="cursor-pointer"  @click="downloadPdf(pdf.title, pdf.link)">mdi-download</v-icon> </h4>
    </div>
      <div class="mt-4">
        <h3 class="text-primary mb-4">Intégration & Formation - Durées préconisées</h3>

        <v-btn v-if="$store.state.user.role_id ===1" @click="dialogAdd = true" class="bg-primary ml-4 mb-4">
         <v-icon>mdi-plus </v-icon> 
         Formation
      </v-btn>
        <div class="mt-2" v-for="(item, index) in formations" :key="index">
            <h4>{{item.category}} </h4>
          <ul class="px-6" v-for="(list, i) in item.lists" :key="i">
            <li class="d-flex justify-space-between">
              <div class="d-flex">
                <v-icon class="my-auto" color="primary" size="6">mdi-circle</v-icon>
                  <p class="text-start ml-2">{{list.title}} </p> 
              </div>
              <div class="d-flex">
                <p class="mr-4">{{list.time}} </p>
                <v-icon v-if="$store.state.user.role_id ===1" class="delete" @click="openDelete(list)">mdi-delete</v-icon>
                <v-icon v-if="$store.state.user.role_id ===1" class="edit" @click="openEdit(list)">mdi-pencil</v-icon>
              </div>
            </li>
          </ul>
        </div>
      </div>

       

    <div class="text-center mt-10 font-italic text-subtitle-2">
        Le maquettage fonctionnel permet de réduire significativement la durée de formation et d'améliorer la qualité d'accompagnement. Sans maquettage fonctionnel, la formation ne pourra se dérouler que sur la base de fichier de démonstration générique. La durée des prestations est donnée à titre indicatif et dépend du niveau des utilisateurs et de la profondeur du périmètre fonctionnel à étudier. L'installation de l'ERP doit être effectuée avant toute session de formation.
    </div>

   </div>

    <!-- MODIFICATIONS -->
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
          <v-text-field label="Durée" v-model="itemOnEdit.time"></v-text-field>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between">
          <v-btn color="primary" @click="dialogEdit = false">Annuler</v-btn>
          <v-btn color="primary" @click="confirmEdit()">Enregistrer</v-btn>
        </v-card-actions>
      </v-card>
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
          <v-text-field label="Durée" v-model="form.time"></v-text-field>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between">
          <v-btn color="primary" @click="dialogAdd = false">Annuler</v-btn>
          <v-btn color="primary" @click="addFormation()">Enregistrer</v-btn>
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
  </v-card>

</template>

<script>
import Formations from '../../services/formations.service'
import PDF from '../../services/pdfs.service'

export default {
  
  data: () => ({
    formations: [],
    dialogEdit: false,
    dialogAdd: false,
    dialogDelete: false,

    itemDelete: {},
    itemOnEdit: {},
    form:{
      category: '',
      title: '',
      time: '',
    },

    pdfs: [],
  }),

  mounted() {
    this.fetchFormations();
    this.fetchPdfs();
    
  },
  methods: {

    
    //get Formations
    fetchFormations() {
      Formations.getFormations()
      .then((res) => {
        //on map sur les categories
        const formationsByCategory = res.reduce((acc, item) => {
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

      this.formations = Object.values(formationsByCategory);
      console.log(this.formations)
     })
    .catch((err) => {
      console.log(err)
    })
    },

    fetchPdfs() {
      PDF.getFormationPdfs()
      .then((res) => {
        this.pdfs = res
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
    const categories = this.formations.map((formation) => formation.category);
    return [...new Set(categories)];
    },

    
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
       
      Formations.editFormation(this.itemOnEdit.id, this.itemOnEdit)
      .then((res) => {
        console.log(res)
        this.dialogEdit = false
        this.itemOnEdit = {}
        this.fetchFormations()
      })
      .catch((err) => {
        console.log(err)
      })
      
    },

    //ajout d'un pdf
    addFormation() {
      Formations.addFormation(this.form)
      .then((res) => {
        console.log(res)
        this.dialogAdd = false
        this.form = {}
        this.fetchFormations()
      })
      .catch((err) => {
        console.log(err)
      })
    },


    confirmDelete() {
      Formations.deleteFormation(this.itemDelete.id)
      .then((res) => {
        console.log(res)
        this.dialogDelete = false
        this.itemOnEdit = {}
        this.fetchFormations()
      })
      .catch((err) => {
        console.log(err)
      })
    }

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



