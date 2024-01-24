<template>
  <v-card class="bg-background pa-4">
    <v-icon 
    class="position-absolute cursor-pointer" 
    style="right: 10px; top: 6px"
    @click="closeDialog()"
    >mdi-close</v-icon>
   <h3 v-if="!entreprise" class="text-center">Création d'une nouvelle entreprise</h3>
    <h3 v-else class="text-center">Modification de l'entreprise</h3>

   <v-btn v-if="!entreprise" color="primary" class="w-50 mx-auto mt-2" @click="openImportClientDialog()">Importer de Gestimum</v-btn>

   <v-dialog v-model="importClientDialog" width="600px">
    <v-card class="bg-background pa-8">
      <v-icon 
      class="position-absolute cursor-pointer" 
      style="right: 10px; top: 6px"
      @click="importClientDialog = false"
      >mdi-close</v-icon>
      <p class="text-primary text-center text-subtitle-1 font-weight-bold">Choisissez un client à importer</p>
      
      <div v-if="showCharMessage" class="text-error">Taper au moins 4 caractères</div>
      <v-autocomplete
        color="primary" 
        :loading="loadClients"
        class="mt-2" 
        label="Client"
        v-model="selectedClient" 
        :items="GestimumClients"
        :item-title="labelEntreprise" 
        item-value="PCF_CODE"
        return-object
        no-data-text="Aucun client trouvé"
        @keyup="handleChangeClient($event)"
       
         >
      </v-autocomplete>

      <div class="d-flex w-100 justify-space-between" v-if="selectedClient && selectedClient.PCF_RS">
        <v-chip color="primary" class="text-center">{{ selectedClient.PCF_RS }} </v-chip>
        <v-btn outline class="text-primary bg-transparent" @click="handleImport()">Valider</v-btn>
      </div>

      <p v-if="importErrorMessage" class="text-error text-center mt-8 font-weight-bold font-italic"> {{importErrorMessage}} </p>

      
    </v-card>
      
   </v-dialog>
   <div class="mt-6">
      <v-form fast-fail @submit.prevent>
        <v-text-field
          color="primary"
          v-model="form.social_reason"
          type="text"
          label="Raison sociale"
          :rules="[v => !!v || 'Raison sociale requise']"
        ></v-text-field>

        <v-text-field
          color="primary"
          class="w-50 mx-auto text-center mt-2"
          v-model="form.code_client"
          type="text"
          label="Code client"
          :rules="[v => !!v || 'Code client requis']"
        ></v-text-field>

        <div class="d-flex mt-2">
          <v-select
          color="primary"
          class="mr-1"
          v-model="form.category"
          :items="categoryItems"
          :rules="[v => !!v || 'Famille requise']"
          label="Famille"
          required
          ></v-select>

          <v-select
          color="primary"
          class="ml-1"
          v-model="form.subcategory"
          :items="subcategoryItems"
          :rules="[v => !!v || 'Sous-famille requise']"
          label="Sous-famille"
          required
          ></v-select>
        </div>

        <div class="d-flex">
          <div>
            <v-select
            color="primary"
            class="mr-1"
            v-model="form.contract"
            :items="contractItems"
            label="Contrat"
            required
            ></v-select>
            <p v-if="form.category == '2. PME' && form.contract == 'Aucun'" class="text-warning text-center mt-n3 font-weight-bold">*Contrat obligatoire pour les PME</p>
          </div>
          <v-text-field 
            color="primary"
            class="ml-1"
            v-model="form.end_contract"
            type="date"
            label="Date de fin du contrat"
            :rules="[v => (!!v && form.contract != 'Aucun') || 'Date de fin du contrat requise']"
          ></v-text-field>
        </div>

        <p v-if="errorMessage" class="text-error text-center mt-8 font-weight-bold font-italic"> {{errorMessage}} </p>
      <div class="w-25 mx-auto">
        <v-btn color="primary" type="submit" @click="addEntreprise()" block class="mt-2">Valider</v-btn>
      </div>
    </v-form>
   </div>
  </v-card>
</template>

<script>
import Entreprise from '../../../../services/entreprises.service'
import Gestimum from '../../../../services/gestimum.service'


export default {

  props: {
    entreprise: {
      type: Object,
      default: null
    }
  },

  data: () => ({
    form:{
      social_reason: '',
      code_client: '',
      category: '',
      subcategory: '',
      contract: 'Aucun',
      end_contract: '',
    },
    errorMessage: '',
    categoryItems: ['1. PARTENAIRE', '2. PME', '3. AUTRES'],
    subcategoryItems: ['1.1 PARTENAIRES', '1.2 EXPERTS', '1.3 EXPERTS SUPPORT', '1.4 EX-PARTENAIRES', '1.5 EDITEURS EXPERTS', '2.1 PME G-WEB', '2.2 PME G-TEL'],
    contractItems: ['Aucun', 'CSC', 'CS', 'G-WEB', 'G-TEL'],

    importClientDialog: false,
    GestimumClients: [],
    selectedClient: {},
    loadClients: false,
    importErrorMessage: '',
    typingTimer: null,
     showCharMessage: false,
  }),

  mounted(){
   if(this.entreprise){
     this.form = this.entreprise
   }
  },
  
  methods:{
    //ajout d'une Entreprise
    addEntreprise(){
      if(this.form.category == '2. PME' && this.form.contract == 'Aucun'){
        this.errorMessage = 'Contrat obligatoire pour les PME !'
      }
      if(this.entreprise){
        Entreprise.updateEntreprise(this.entreprise.id, this.form)
        .then(res => {
          this.form = {}
          this.form.contract = 'Aucun'
          this.$emit('fetchEntreprises')
          this.closeDialog()
        })
        .catch(err => {
          console.log(err);
          this.errorMessage = err.response.data;
        })
      }
      else{
        Entreprise.addEntreprise(this.form)
        .then(res => {
          this.form = {}
          this.form.contract = 'Aucun'
          this.$emit('fetchEntreprises')
          this.closeDialog()
        })
        .catch(err => {
          console.log(err);
          this.errorMessage = err.response.data;
        })
      }
    },

    //fermer le dialog
    closeDialog(){
      this.$emit('closeDialog')
      this.selectedClient = {
        PCF_RS: '',
        PCF_CODE: '',
        PCF_TYPE: '',
      }
    },



    openImportClientDialog() {
      this.importClientDialog = true;
      // this.loadClients = true;
      // this.ImportGestimumClients();
    },

    handleChangeClient(e){
      clearTimeout(this.typingTimer);
      let text = e.target.value;

      if(text.length > 3 ){
        this.showCharMessage = false;
       this.typingTimer = setTimeout(() => {
        this.loadClients = true;
        this.ImportGestimumClients(text);
      }, 800);
      }
      else{
         this.GestimumClients = [];
         this.showCharMessage = true;
      }
    },


    ImportGestimumClients(query) {
      Gestimum.getGestimumClients(query)
        .then((res) => {
          console.log(res);
          this.GestimumClients = res;
          this.loadClients = false;
        })
        .catch((err) => {
          console.log(err.response.data.message);
          this.importErrorMessage = err.response.data.message;
          this.loadClients = false;
        });
    },



    labelEntreprise(item){
      if(item.PCF_RS != null && item.PCF_CODE != null){
        return `${item.PCF_RS} - ${item.PCF_CODE}` 
      }
      else{
        return ''
      }
    },


    handleImport(){
      this.form.social_reason = this.selectedClient.PCF_RS;
      this.form.code_client = this.selectedClient.PCF_CODE;

      if(this.selectedClient.PCF_TYPE.toLowerCase() == 'p'){
        this.form.category = '1. PARTENAIRE'
      }
      else if(this.selectedClient.PCF_TYPE.toLowerCase() == 'e'){
        this.form.category = '2. PME'
      }
      else{
        this.form.category = '3. AUTRES'
      }


      this.importClientDialog = false;
    }


  },

  
}
</script>
