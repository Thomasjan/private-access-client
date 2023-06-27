<template>
  <v-card class="bg-background pa-2 elevation-0">
    <h2 class="text-primary text-center">Support</h2>
    <div class="mt-4">
      <v-btn v-if="$store.state.user.role_id ===1" @click="dialogAdd = true" class="bg-primary ml-4">
         <v-icon>mdi-plus </v-icon> 
         PDF
      </v-btn>
      <h4 class="text-center">Fiches Thématiques</h4>

      <div class="mt-4 px-4" v-for="(item, index) in pdfs" :key="index">
          <div class="d-flex ">
            <v-icon class="my-auto" color="primary" size="8" >mdi-circle</v-icon>
            <h4 class="ml-2 my-auto">{{item.category}}</h4>
          </div>

          <div class="d-flex justify-space-between px-6" v-for="(list, index) in item.lists" :key="index">
            <p class="text-hover cursor-pointer" @click="openLink(list.link)">{{list.title}} </p>
            <div class="d-flex">
              <v-icon v-if="$store.state.user.role_id ===1" class="delete" @click="openDelete(list)">mdi-delete</v-icon>
              <v-icon v-if="$store.state.user.role_id ===1" class="edit" @click="openEdit(list)">mdi-pencil</v-icon>
              <v-icon class="ml-2" @click="downloadPdf(list.title, list.link)" color="primary">mdi-file-pdf-box</v-icon>
            </div>
          </div>
      </div>
    </div>

    <div class="mt-8 w-25 mx-auto">
      <v-btn class="mt-10" color="primary" centered @click="OnlineHelp()">
        Accéder à l'aide en Ligne
      </v-btn>
    </div>


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
import PDF from '../../services/pdfs.service'

export default {

  
  data: () => ({

    pdfs: [],
    dialogEdit: false,
    dialogAdd: false,
    dialogDelete: false,

    itemDelete: {},
    itemOnEdit: {},
    form:{
      category: '',
      title: '',
      link: '',
      ref: 'support'
    },

  }),

  mounted() {

    //get PDfs de la page support
    this.fetchPdfs()
  },

  methods: {

    //get PDfs de la page support
    fetchPdfs() {
      PDF.getSupportsPdfs()
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
      this.form.ref = 'support'
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

    OnlineHelp(){
      window.open('http://docs.gestimum.com/ERP/9/#t=1%2FBienvenue.htm', '_blank')
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
