<template>
    <v-container class="fill-height my-5" >
        <v-row justify="center" no-gutters>
            <v-card class="elevation-1 text-center justify-content-center" width="600" justify="center" color="white" >
                <v-col order="auto">
                    <v-card-title class="text-center d-flex justify-center align-center">
                        <div>
                            <v-icon size="30" class="mb-3">mdi-account-outline</v-icon>
                            <br />
                        </div>
                        &nbsp;&nbsp;<br />
                        <p class="text-center text-primary font-weight-bold mb-3">
                            Connexion privée
                        </p>
                    </v-card-title>
                    <v-divider class="divider"></v-divider>
                </v-col>
                <v-col order>
                    <v-card-text  align="center">
                        <v-form class="w-75">
                            <v-text-field
                                label="Email*"
                                name="Email"
                                prepend-icon="mdi-email-outline"
                                type="email"
                                color="primary accent-6"
                                v-model="form.email"
                            >
                            </v-text-field>

                            <v-text-field
                            class="pt-8"
                                label="Mot de passe*"
                                name="password"
                                prepend-icon="mdi-lock-outline"
                                :type="showPassword ? 'text' : 'password'"
                                :append-icon="
                                    showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                                "
                                @click:append="showPassword = !showPassword"
                                color="primary accent-6"
                                @keydown.enter="login"
                                v-model="form.password"
                            >
                            </v-text-field>
                            <span class="text-error" v-if="errors">
                                <p>
                                    {{errors}}
                                </p>
                                <!-- <p>
                                    Veuillez vérifier votre adresse email ou
                                    votre mot de passe !
                                </p> -->
                            </span>
                        </v-form>
                    </v-card-text>
                    <v-row class="pt-8">
                        <v-col>
                            <v-btn
                                class=" pa-2 ml-6  "
                                color="primary"
                                @click.prevent="login"
                                type="submit"
                                rounded
                                ><span class="font-serif mr-5 ml-5">Connexion</span> </v-btn
                            >
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="auto">
                            <v-btn
                                @click.prevent="mdpoublie()"
                                type="button"
                                text
                                class="accent--text pa-2 mr-6 "
                                color="primary"
                                > <span class="mdpoublie">Mot de passe oublié ?</span> </v-btn
                            >
                            <br /><br />
                        </v-col> </v-row
                    ><v-row> </v-row>
                </v-col>
                <v-progress-linear
                    :active="loading"
                    :indeterminate="loading"
                    absolute
                    bottom
                    color="#EB6F2A"
                >
                </v-progress-linear>
            </v-card>
        </v-row>
    </v-container>
</template>


<script>
import { mapState } from 'vuex';

import User from '../services/users.service';
import Auth from '../services/auth.service'

export default {
    
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            showPassword: false,
            password: '',
            name: '',
            email: '',
            text: 'login in!',
            loader: null,
            loading3: false,
            errors: '',
            loading: false,
        };
    },

    methods: {
        // Authentification de l'utilisateur
        login() {
            // Activation du visuel de chargement
            this.loading = true;
            // Enregistrement de l'utilisateur puis stockage des infos dans le store

            Auth.login(this.form)
                .then((response) => {
                    this.errors = '';
                    localStorage.setItem('auth', response.id);
                    this.$store.commit('UPDATE_USER', response);
                    console.log(this.$store.state.user)
                    this.$router.push({ name: 'home' });
                })
                .catch((error) => {
                    this.errors = error.response.data.message;
                    this.loading = false;
                });

            
        },

        //redirection vers mot de passe oublié
        mdpoublie(){
             this.$router.push({ name: 'mdp-oublie' });
        },
    },
    
    watch: {
        loader() {
            const l = this.loader;
            this[l] = !this[l];

            setTimeout(() => (this[l] = false), 1000);

            this.loader = null;
        },
        loading(val) {
            if (!val) return;

            setTimeout(() => (this.loading = false), 500);
        },
        else(val) {
            return (this.loading = true);
            
        },
    },
};

</script>

<style>
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
}
@-moz-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@-webkit-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@-o-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}

.divider{
    margin-top: -10px;
    background-color: black;
    margin-left:  20px;
    margin-right: 20px;
    opacity: 0.3;
    
}


</style>
