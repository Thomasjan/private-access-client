<template>
    <div>
       
        <!-- <v-btn @click="test()" v-if="$store.state.users.role_id ===1" class="ml-2 red">Test</v-btn> -->

        

        <!-- effect mouss hover premiere card -->
        <v-hover v-slot="{ hover }" open-delay="200">
            <v-card
                :elevation="hover ? 10 : 2"
                :class="{ 'on-hover': hover }"
                class="mx-auto mt-16 mb-8 bg-white"
                max-width="600"
                outlined
            >
                <v-flex justify-center>
                    <v-card-title class="text-h5 primary--text">
                        <v-icon
                            class="mr-2"
                            color="#EB6F2A"
                            >mdi-account</v-icon
                        >Informations sur le compte
                    </v-card-title>
                </v-flex>
                <v-list-item three-line>
                    <v-list-item-content>
                        <!-- <h4 class="primary--text text-center">Information sur le compte</h4> -->
                        <v-list-item-title class="text-h6 mb-1">
                            {{ $store.state.user.email }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{ $store.state.user.surname }}
                            {{ $store.state.user.name }}
                        </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-avatar class="rounded-lg"
                        tile
                        size="80"
                        color="#8c8780"
                    >
                    <lord-icon
                        src="https://cdn.lordicon.com/dqxvvqzi.json"
                        trigger="loop"
                        colors="outline:#121331,primary:#f47920,secondary:#4bb3fd"
                        state="hover-looking-around"
                        delay="2000"
                        style="width:70px;height:70px">
                    </lord-icon>
                </v-list-item-avatar>
                </v-list-item>
                <v-card-actions></v-card-actions>
            </v-card>
        </v-hover>
        <!-- fin effect mouss hover premiere card-->

        <v-hover v-slot="{ hover }" close-delay="200">
            <v-card
                :elevation="hover ? 10 : 2"
                :class="{ 'on-hover': hover }"
                class="mx-auto mb-16 bg-white"
                width="600"
            >
                <!-- changer de mot de passe -->
                <v-flex justify-center>
                    <v-card-title>
                        <v-icon
                            class="pb-2"
                            right
                            color="#EB6F2A"
                            >mdi-lock-reset</v-icon
                        >&nbsp;&nbsp;
                        <h4 class="primary--text text-center">
                            Modifiez votre mot de passe
                        </h4>
                    </v-card-title>
                </v-flex>
                <!-- mot de passe actuel -->
                <v-card-text>
                    <v-text-field
                        for="password"
                        label="Ancien mot de passe*"
                        type="password"
                        v-model="form.password"
                        id="newPassword"
                    ></v-text-field>
                    <span class="text-red text-center" v-if="errors.password">
                        <p>Veuillez vérifier votre ancien mot de passe !</p>
                    </span>
                </v-card-text>

                <!-- nouveau mot de passe  -->
                <v-card-text>
                    <v-text-field
                        for="password"
                        label="Nouveau mot de passe*"
                        type="password"
                        v-model="form.newPassword"
                        id="password"
                    ></v-text-field>
                  
                </v-card-text>

                <!-- confirmation nouveau mot de passe -->
                <v-card-text>
                    <v-text-field
                        label="Confirmation du mot de passe*"
                        for="password_confirmation"
                        type="password"
                        v-model="form.password_confirmation"
                        id="password_confirmation"
                    ></v-text-field>
                    <span
                        class="text-red text-center"
                        v-if="errors.password_confirmation"
                    >
                        <p>Vos nouveaux mots de passe ne sont pas identiques !</p>
                    </span>
                </v-card-text>
                <!-- bouton de validation -->
                <v-card-actions class="d-flex justify-center mb-6">
                    <v-btn text class="primary" @click="resetPassword"
                        >Modifier le mot de passe</v-btn
                    >
                </v-card-actions>
                
                <p v-if="message" class="text-center text-success"> {{message}} </p>

                <div v-if="loading" class="loader mx-auto"></div>
            </v-card>
            
        </v-hover>
    </div>
</template>

<script>
import User from '../services/users.service'

export default {
    data() {
        return {
            form: {
                password: "",
                password_confirmation: "",
                email: "",
                newPassword: "",
            },
            errors: [],
            error: "",
            message: "",
            loading: false,
        };
    },
    mounted() {
        //Infos de tous les utilisateurs
       
    },
    methods: {

        test(){
            Test.test()
        },

        //methode de modification de mot de passe
        resetPassword() {
            this.message = "";
            this.errors = [];
            this.form.email = this.$store.state.user.email;
            this.form.id = this.$store.state.user.id;

                if(this.form.newPassword != this.form.password_confirmation){
                    this.errors.password_confirmation = true;
                    return;
                }
            this.loading = true;
            //modification mdp dans BDD
            User.updatePassword(this.form)
                .then((response) => {
                    this.message = 'Votre mot de passe a bien été modifié !';
                    this.loading = false;
                    this.form = {}
                    console.log(this.message);
                    
                })
                .catch((error) => {
                     this.errors.password = true;
                    this.loading = false;
                    console.log(this.error);
                });
        },
    },
    
};
</script>

<style>

.loader {
        width: 84px;
        height: 84px;
        position: relative;
        overflow: hidden;
      }
      .loader:before , .loader:after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        width:64px;
        height: 64px;
        border-radius: 50%;
        background:#EB6F2A;
        transform: translate(-50% , 100%)  scale(0);
        animation: push 2s infinite ease-in;
      }
      .loader:after {
      animation-delay: 1s;
      }
      @keyframes push {
          0% {
            transform: translate(-50% , 100%)  scale(1);
          }
          15% , 25%{
            transform: translate(-50% , 50%)  scale(1);
          }
        50% , 75% {
            transform: translate(-50%, -30%) scale(0.5);
          }
        80%,  100% {
            transform: translate(-50%, -50%) scale(0);
          }
      }

</style>
