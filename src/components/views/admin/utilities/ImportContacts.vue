<template>
    <v-card class="bg-background pa-4">
      <v-icon 
      class="position-absolute cursor-pointer" 
      style="right: 10px; top: 6px"
      @click="closeDialog()"
      >mdi-close</v-icon>
  
     <h3 class="text-center">Import de Contacts Gestimum</h3>
  
     <div class="mt-6">
        <v-form fast-fail @submit.prevent>
  
          <div class="d-flex mt-2">
             <v-autocomplete
              color="primary"
              class="mr-1"
              :loading="loading"
              v-model="selectedClient"
              :items="entreprises"
              :rules="[v => !!v || 'Entreprise requise']"
              label="Entreprise"
              :item-title="labelEntreprise" 
              item-value="id"
              :update:modelValue="fetchContacts()"
              return-object
              required
          ></v-autocomplete>
          </div>

          <div v-if="contacts.length > 0">
            <v-select
            v-model="selectedContacts"
            label="Select"
            :items="contacts"
            multiple
            item-text="name"
            item-value="id"
            ></v-select>
          </div>
  
          
  
          <p v-if="errorMessage" class="text-error text-center mt-8 font-weight-bold font-italic"> {{errorMessage}} </p>
        <div class="w-25 mx-auto">
          <v-btn color="primary" type="submit" @click="addUser()" block class="mt-2">Valider</v-btn>
        </div>
      </v-form>
     </div>
    </v-card>
  </template>
  
  <script>
  import Entreprise from '../../../../services/entreprises.service'
  import User from '../../../../services/users.service'
  
  export default {
  
    props: {
      userOnEdit: {
        type: Object,
        default: null
      }
    },
  
    data: () => ({
      
      loading: false,
      entreprises: [],
      contacts: [],
      selectedContacts: [],
      selectedClient: null,
      errorMessage: '',
      roleItems: ['Admin', '1.PAR', '2.PME', '3.AUTRES'],
    }),
    mounted(){
      this.fetchEntreprises()
  
      if(this.userOnEdit){
        console.log(this.userOnEdit);
        this.form = {...this.userOnEdit}  
      }
    },
    methods:{

      fetchContacts(){
        if(!this.selectedClient?.code_client) return
        this.selectedContacts = []
        console.log('fetching contacts')
        console.log(this.selectedClient)
        // this.fetchUsers(this.selectedClient.code_client)
        
      },

      fetchUsers(code_client){
            this.loading = true
            User.getGestimumContacts(code_client)
            .then(res => {
                this.contacts = res
                this.loading = false
            })
            .catch(err => {
                console.log(err);
                this.loading = false
            })
        },  
  
      labelEntreprise(item){
        return `${item.social_reason} - ${item.code_client}` 
      },
  
  
      fetchEntreprises(){
        this.loading = true
        Entreprise.getEntreprises()
        .then(res => {
          this.entreprises = res
          this.loading = false
        })
        .catch(err => {
          console.log(err);
          this.loading = false
        })
      },
  
      //fermer le dialog
      closeDialog(){
        this.$emit('closeDialog')
      },
  
  
    },
  
    
  }
  </script>
  