<template>
  <v-card class="bg-white pa-4">
    <v-icon 
    class="position-absolute cursor-pointer" 
    style="right: 10px; top: 6px"
    @click="closeDialog()"
    >mdi-close</v-icon>
   <h3 class="text-center">Création d'un nouvel utilisateur</h3>
   <div class="mt-6">
      <v-form fast-fail @submit.prevent>
        <v-text-field
          color="primary"
          v-model="form.name"
          type="text"
          label="Nom"
          :rules="[v => !!v || 'Raison sociale requise']"
        ></v-text-field>

        <v-text-field
          color="primary"
          v-model="form.surname"
          type="text"
          label="Prénom"
          :rules="[v => !!v || 'Nom requis']"
        ></v-text-field>
        
        <v-text-field
          color="primary"
          v-model="form.email"
          type="email"
          label="Email"
          :rules="[v => !!v || 'Nom requise']"
        ></v-text-field>
        <v-text-field
          color="primary"
          v-model="form.password"
          type="text"
          label="Mot de passe"
          :rules="[v => !!v || 'Nom requise']"
        ></v-text-field>

        <div class="d-flex mt-2">
           <v-select
            color="primary"
            class="mr-1"
            v-model="form.entreprise"
            :items="entreprises"
            :rules="[v => !!v || 'Famille requise']"
            label="Entreprise"
            :item-title="labelEntreprise" 
            item-value="id"
            return-object
            required
        ></v-select>

          <v-select
          color="primary"
          class="ml-1"
          v-model="form.role"
          :items="roleItems"
          :rules="[v => !!v || 'Sous-famille requise']"
          label="Role"
          required
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

  data: () => ({
    form:{
      name: '',
      surname: '',
      email: '',
      password: '',
      entreprise: null,
      role: '',
      entreprise_id: null,
      role_id: null
    },
    entreprises: [],
    errorMessage: '',
    roleItems: ['Admin', '1. PAR', '2. PME', '3. AUTRES'],
  }),
  mounted(){
    this.fetchEntreprises()
  },
  methods:{

    labelEntreprise(item){
      return `${item.social_reason} - ${item.code_client}` 
    },

    //ajout d'une Entreprise
    addUser(){
      let form = {...this.form}
      form.entreprise_id = form.entreprise.id
      switch (form.role) {
        case 'Admin':
            form.role_id = 1
            break;
        case '1. PAR':
            form.role_id = 2
            break;
        case '2. PME':
            form.role_id = 3
            break;
        default:
            form.role_id = 4
            break;
      }
      console.log(form);
        User.postUser(form)
        .then(res => {
          this.form = {}
          this.$emit('fetchUsers')
          this.closeDialog()
        })
        .catch(err => {
          console.log(err);
          this.errorMessage = err.response.data;
        })
    },

    fetchEntreprises(){
      Entreprise.getEntreprises()
      .then(res => {
        this.entreprises = res
        console.log(this.entreprises)
      })
      .catch(err => {
        console.log(err);
      })
    },

    //fermer le dialog
    closeDialog(){
      this.$emit('closeDialog')
    },


  },

  
}
</script>
