<template>
    <v-container class="fill-height my-5 justify-content-center " >
        <v-card class="elevation-12 text-center justify-content-center mx-auto bg-white " width="600" justify="center">
            <!-- Zone du haut - titre -->
            <v-col order="auto">
                <v-card-title class="text-center justify-content-center primary--text font-weight-bold">
                    <v-icon
                        size="30"
                        class="mb-3 mr-3"
                        color="primary">
                        mdi-account-outline
                    </v-icon>
                    Mot de passe oublié
                </v-card-title>
                <v-divider class="divider"></v-divider>
            </v-col>

            <!-- Paragraphe, milieu -->
            <p class="text-center card-text pt-10 font-thin-bold">
                Inscrivez votre adresse e-mail, 
                <br> un mot de passe provisoire vous sera 
                <br> envoyé
            </p>
                
            
            <v-card-text align="center">
                <v-form>
                    <v-text-field   
                    label="Email*"
                    name="Email"
                    prepend-icon="mdi-email-outline"
                    type="email"
                    class="w-75"
                    v-model="email">
                    </v-text-field>

                    <span class="text-danger" v-if="error">
                        <p>Adresse mail incorrecte !</p>
                    </span>
                            
                    <v-btn
                      class="dark pa-2 primary ml-6 pt-2 pt-2"
                      color="primary"
                      @click.prevent="valider"
                      type="submit"
                      rounded> 
                        <span class="font-serif ml-5 mr-5">Valider</span>  
                    </v-btn>
                </v-form>
            </v-card-text>

            <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                bottom
                color="#EB6F2A">
            </v-progress-linear>
        </v-card>
    </v-container>
</template>


<script>
import Auth from '../services/auth.service'

export default {
    data() {
        return { 

            email: '',
           // userId:null,
            user: {},
            loader: null,
            loading3: false,
            error: false,
            loading: false,
        };
    },

    methods: { 
        // mot de passe oublié
        valider() {       
                Auth.forgotPassword({email: this.email})
                    .then(this.$router.push({ name: 'login' }))
                    .catch(err => this.error = true)
                }

        },   
    

    //loading
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

.card-text{
    font-size: 20px;
    margin : 10px;
    font-style: initial;
}
</style>
