<template>
    <v-card class="pa-4 mx-auto bg-white  " max-width="1400px">
            <v-row class="flex-row justify-space-between pt-1 pb-6">
                <div class="flex justify-space-between ml-2">
                    <img class="cursor-pointer" @click="route='/' ;$router.push('/')" src="../../assets/Logo-GESTIMUM.png" alt="">
                </div>
                <div class="flex-wrap">
                  <v-row class="pa-6"> <p class="px-2 cursor-pointer links"  @click="logout()">Revenir à l'espace public</p> - <p class="px-2 cursor-pointer links" @click="route='/administration'; $router.push('/administration')">Administration</p> </v-row> 
                </div>
            </v-row>
            <v-divider></v-divider>

            <div>
                <v-layout class="h-screen">
                <v-navigation-drawer 
                    permanent 
                    class="bg-primary rounded-e-shaped"
                    expand-on-hover
                    rail
                >
                    <v-list>
                    <v-list-item
                        prepend-avatar="https://www.pngitem.com/pimgs/m/78-786293_1240-x-1240-0-avatar-profile-icon-png.png"
                        :title="$store.state.user.name"
                        :subtitle="$store.state.user.email"
                    ></v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <!-- menu admin -->
                    <div>
                        <v-list density="compact" nav v-for="item in nav.admin" :key="item.route">
                            <v-list-item :class="route==item.route? 'bg-surface rounded-e-xl': ''" :prepend-icon="item.icon" :title="item.text"  @click="handleMenu(item)"></v-list-item>
                        </v-list>
                    </div>

                </v-navigation-drawer>

                <v-main  style="height: 90vh; overflow-y: scroll" class="ml-0 hide-scroll">
                    <div v-if="$router.currentRoute.value.path=='/administration'">
                       <h3 class="text-primary text-center mt-4">Administration</h3>
                       <div class="w-75 mx-auto mt-6">
                            <p class="text-center">Vous êtes actuellement dans l'espace Administration.</p>
                            <div class="mt-6">
                                <lottie-animation
                                    ref="anim"
                                    :animationData="AdministrationAnim"
                                    :loop="true"
                                    :autoPlay="true"
                                    :speed="1"
                                    />
                            </div>
                       </div>
                    </div>

                    <router-view v-else></router-view>
                </v-main>
                </v-layout>
            </div>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import User from '../../services/users.service'
import AdministrationAnim from '../../assets/animations/administration.json'


export default {
    data() {
        return {
            AdministrationAnim,
            route: '/',
            nav:{
                admin:[
                    {
                        icon: 'mdi-connection',
                        text: 'Suivi des connexions',
                        route: '/administration/suivi-connexions'
                    },
                    {
                        icon: 'mdi-download',
                        text: 'Suivi des téléchargements',
                        route: encodeURI('/administration/suivi-téléchargements')
                    },
                    {
                        icon: 'mdi-update',
                        text: 'Mise à jour des versions en ligne',
                        route: '/administration/maj-versions'
                    },
                    {
                        icon: 'mdi-account-group',
                        text: 'liste des Utilisateurs',
                        route: '/administration/liste-utilisateurs'
                    },
                    {
                        icon: 'mdi-domain',
                        text: 'Liste des Entreprises',
                        route: '/administration/liste-entreprises'
                    },
                ],
            },


        }
    },
    
    mounted(){

        if (this.$store.state.user.id == '' && this.$route.name !== 'mdp-oublie' && this.$route.name !== 'generate-password') {
            let userId = localStorage.getItem('auth')
            User.getUser(userId)
                .then((response) => { 
                    this.$store.commit('UPDATE_USER', response)
                })
                .catch(() => {
                    console.log('erreur')
                    this.$router.push({ name: 'login' })
                    })
        }
    },

    methods:{
        handleMenu(item){
            this.route = item.route;
            this.$router.push(item.route)
        },
        logout(){
            localStorage.removeItem('auth')
            this.$store.commit('UPDATE_USER', {})
            this.$router.push({ name: 'login' })
        }
    },

    computed: {
    ...mapGetters(['getUser']),
  },
    
    


}
</script>

<style scoped>

.links:hover{
    color: red;
}

.hover-card:hover{
    opacity: 0.8;
}


</style>