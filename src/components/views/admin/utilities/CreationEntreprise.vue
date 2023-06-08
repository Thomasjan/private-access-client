<template>
  <v-card class="bg-white pa-4">
    <v-icon 
    class="position-absolute cursor-pointer" 
    style="right: 10px; top: 6px"
    @click="closeDialog()"
    >mdi-close</v-icon>
   <h3 class="text-center">Création d'une nouvelle entreprise</h3>

   <v-btn color="primary" class="w-50 mx-auto mt-2" @click="ImportGestimumClients()">Importer de Gestimum</v-btn>

   <v-dialog v-model="importClientDialog" width="600px">
    <v-card class="bg-white pa-8">
      <p class="text-primary text-center text-subtitle-1 font-weight-bold">Choisissez un client à importer</p>
      <v-autocomplete class="mt-2" v-model="selectedClient" :items="subcategoryItems">
      </v-autocomplete>

      <v-chip>{{ selectedClient }} </v-chip>
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
          type="number"
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
            :rules="[v => !!v || 'Date de fin du contrat requise']"
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

  data: () => ({
    form:{
      social_reason: '',
      code_client: Math.floor(Math.random() * 10000),
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
  }),
  mounted(){
   
  },
  methods:{
    //ajout d'une Entreprise
    addEntreprise(){
      if(this.form.category == '2. PME' && this.form.contract == 'Aucun'){
        this.errorMessage = 'Contrat obligatoire pour les PME !'
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
    },

    ImportGestimumClients(){
      this.importClientDialog = true;

      Gestimum.getGestimumClients()
      .then(res => {
        this.GestimumClients = res;
        console.log(this.GestimumClients);
      })
      .catch(err => {
        console.log(err);
      })
    }


  },

  
}
</script>
