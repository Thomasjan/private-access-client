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
              required
              return-object
          ></v-autocomplete>
          </div>

          <div v-if="selectedClient">
              <v-autocomplete class="cursor-pointer" v-if="contacts.length > 0"
                v-model="selectedContacts"
                :items="contacts"
                label="Choisissez les utilisateurs"
                deletable-chips
                clearable
                dense
                multiple
                chips
                small-chips
                prepend-icon="mdi-account"
                :item-title="getNameSurname"
                return-object
              >
              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :subtitle="item.raw.CCT_EMAIL"
                  :disabled="item.raw.disabled"
                ></v-list-item>
              </template>
            </v-autocomplete>
            <p class="text-center" v-else>Cette entreprise n'a pas de membre enregistré dans la base de données de Gestimum</p>
          </div>
  
          
  
          <div class="w-25 mx-auto">
            <v-btn color="primary" type="submit" @click="addUser()" block class="mt-2">Valider</v-btn>
            <p v-if="errorMessage" class="text-error text-center mt-8 font-weight-bold font-italic"> {{errorMessage}} </p>
        </div>

        <div class="d-flex center justify-center mt-4" v-if="loader">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
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
      usersList: {
        type: Array,
        required: false
      }
    },
  
    data: () => ({
      
      loading: false,
      loader: false,
      entreprises: [],
      contacts: [],
      selectedContacts: [],
      selectedClient: null,
      errorMessage: '',
      roleItems: ['Admin', '1.PAR', '2.PME', '3.AUTRES'],
    }),
    mounted(){
      this.fetchEntreprises()
    },
    methods:{

      getNameSurname(item){
        //check already imported users
        if(this.usersList.some(user => user.email == item.CCT_EMAIL)){
          item.disabled = true
          return `${item.CCT_NOM}: déjà importé`
        }

        //check invalid fields
        if((item.CCT_EMAIL=="") || (item.CCT_NOM=="") || (item.CCT_PRENOM=="") || (!item.CCT_EMAIL)){
          item.disabled = true  
          return `${item.CCT_NOM}: champs invalides`;
          }
          else{ 
            item.disabled = false
            return `${item.CCT_NOM} ${item.CCT_PRENOM}`;
          }
        },

      async fetchUsers(code_client){
            this.loading = true
            try {
              await User.getGestimumContacts(code_client)
              .then(res => {
                this.contacts = res
                this.loading = false
              })
            } catch (error) {
              console.log(error);
              this.loading = false
            }
        },

        addUser(){
          this.loader = true
          if(this.selectedContacts.length == 0){
            this.errorMessage = "Veuillez choisir au moins un utilisateur"
            return
          }
          this.errorMessage = ''

          let users = []
          let role = 4
          switch (this.selectedClient.category) {
            case 'Admin':
                role = 1
                break;
            case '1.PAR':
                role = 2
                break;
            case '2.PME':
                role = 3
                break;
            default:
                role = 4
                break;
          }

          this.selectedContacts.forEach((item) => {
            const user = {
              name: item.CCT_PRENOM,
              surname: item.CCT_NOM,
              email: item.CCT_EMAIL,
              entreprise_id: this.selectedClient.id,
              role_id: role
            }
            users.push(user)
          })

          User.addUsers(users)
          .then(res => {
            this.loader = false
            this.$emit('fetchUsers')
            this.closeDialog()
          })
          .catch(err => {
            console.log(err);
            this.errorMessage = "Une erreur s'est produite lors de l'ajout des utilisateurs"
            this.loader = false
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

    watch: {
      selectedClient: function(val){
        this.contacts = []
        this.selectedContacts = []
        if(!val.code_client) return
        this.fetchUsers(val.code_client)
      }
    }
  
    
  }
  </script>
  