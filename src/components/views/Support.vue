<template>
  <v-card class="bg-background pa-2 elevation-0">
    <h2 class="text-primary text-center">Support</h2>
    
    <p class="text-center px-16 mt-4">Gestimum vous propose généreusement d'accéder à son aide en ligne complète et détaillée, une ressource inestimable
       qui saura répondre à toutes vos questions, besoins, et requêtes en un clin d'œil. 
       Profitez de cette opportunité exceptionnelle pour explorer de manière approfondie les nombreuses fonctionnalités, astuces, 
       et guides disponibles via cette ressource en ligne de Gestimum, vous permettant ainsi d'optimiser au maximum votre expérience.
   </p>

    <div class="mt-4 w-25 mx-auto">
      <v-btn class="mt-10" color="primary" centered @click="OnlineHelp()">
        Accéder à l'aide en Ligne
      </v-btn>
    </div>

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
      window.open('https://docs.gestimum.com/', '_blank')
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
