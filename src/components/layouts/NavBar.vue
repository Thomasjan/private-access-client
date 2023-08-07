<template>
        <v-card class="pa-4 mx-auto bg-background " max-width="1200px">
            <v-row class="flex-row justify-space-between pt-1 pb-6">
                <div class="flex justify-space-between ml-2">
                    <img class="cursor-pointer" @click="route='/' ;$router.push('/')" src="../../assets/Logo-GESTIMUM.png" alt="">
                </div>
                    
                <div class="icon-theme">
                     <v-icon @click="toggleTheme" size="large">{{ theme.global.name == 'customDarkTheme'? 'mdi-brightness-4': 'mdi-brightness-7' }}</v-icon>
                </div>
                <div class="flex-wrap">
                  <v-row class="pa-6"> 
                    <v-icon @click="route='/profil'; $router.push('/profil')">mdi-account</v-icon>
                    <p class="px-2 cursor-pointer links" @click="route='/contacts'; $router.push('/contacts')">Contact</p> - 
                    <!-- <p class="px-2 cursor-pointer links"  @click="logout()">Revenir à l'espace public</p> -->
                    <v-icon class=" ml-2 px-2 cursor-pointer links" @click="logout()">mdi-logout</v-icon>
                   </v-row> 
                </div>
            </v-row>
            <v-divider></v-divider>

        <div >

            <div class="mx-auto mt-16 pb-16 mb-14" style="width: 90%;" v-if="route=='/'">
                <h3 class="text-center">Bienvenue, <span class="text-capitalize text-primary"> {{$store.state.user.surname}}</span> <strong class="text-uppercase text-primary">{{$store.state.user.name}}</strong> dans votre espace privé Gestimum</h3>
                <div class="mt-14">
                    

                    <!-- Menu client -->
                    <v-row class="flex-row justify-center" v-if="$store.state.user.role_id >=3">
                        <v-flex v-for="item in nav.client" :key="item.route">
                                <v-card 
                                class="bg-primary pa-2 text-h6 font-weight-regular text-uppercase px-6 ma-2 cursor-pointer hover-card" 
                                style="width: 280px; height: 80px"
                                @click="handleMenu(item)"
                                >
                                    <div class="my-4">
                                        <v-icon color="white" :icon="item.icon" size="x-large">  </v-icon>
                                        <span class="ml-8 text-no-wrap">{{item.text}}</span>
                                    </div>
                                </v-card>
                        </v-flex>
                    </v-row>

                    <!-- menu admin / partenaire -->
                    <v-row class="flex-row justify-center" v-else>
                        <v-flex v-for="item in nav.partenaire" :key="item.route">
                                <v-card 
                                class="bg-primary pa-2 text-h6 font-weight-regular text-uppercase px-6 ma-2 cursor-pointer hover-card" 
                                style="width: 280px; height: 80px"
                                @click="handleMenu(item)"
                                >
                                    <div class="my-4">
                                        <v-icon color="white" :icon="item.icon" size="x-large">  </v-icon>
                                        <span class="ml-8 text-no-wrap">{{item.text}}</span>
                                    </div>
                                </v-card>
                        </v-flex>
                        
                    </v-row>

                    <v-row class="flex-row justify-center">
                        <v-card v-if="$store.state.user.role_id === 1"
                        class="bg-secondary pa-2 text-h6 font-weight-regular text-uppercase px-6 ma-2 cursor-pointer hover-card" 
                        style="width: 290px; height: 80px"
                        @click="$router.push('/administration')"
                        >
                            <div class="my-4">
                                <v-icon color="white" icon="mdi-cog" size="x-large">  </v-icon>
                                <span class="ml-8 text-no-wrap">Administration</span>
                            </div>
                        </v-card>
                    </v-row>
                </div>

                <div class="mt-14">
                    <h3 class="font-italic text-primary text-center">Nos dernières nouveautés !</h3>
                    <div class="mt-4">
                        <g-news></g-news>
                    </div>
                </div>
                
            </div>
            

            <div v-else>
                <v-layout >
                <v-navigation-drawer permanent class="bg-primary rounded-e-shaped "
                    expand-on-hover
                    rail
                >
                    <v-list>
                    <v-list-item
                        @click="route='/profil'; $router.push('/profil')"
                        class="cursor-pointer"
                        prepend-avatar="https://www.pngitem.com/pimgs/m/78-786293_1240-x-1240-0-avatar-profile-icon-png.png"
                        :title="$store.state.user.name"
                        :subtitle="$store.state.user.email"
                    ></v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <!-- menu client -->
                    <div v-if="$store.state.user.role_id >=3">
                        <v-list density="compact" nav v-for="item in nav.client" :key="item.route">
                            <v-list-item :class="route==item.route? 'bg-surface rounded-e-xl': ''" :prepend-icon="item.icon" :title="item.text"  @click="handleMenu(item)"></v-list-item>
                        </v-list>
                    </div>

                    <!-- Menu admin / partenaire -->
                    <div v-else>
                        <v-list density="compact" nav v-for="item in nav.partenaire" :key="item.route">
                            <v-list-item :class="route==item.route? 'bg-surface rounded-e-xl': ''" :prepend-icon="item.icon" :title="item.text"  @click="handleMenu(item)"></v-list-item>
                        </v-list>
                    </div>

                    <v-list-item class="mt-6" v-if="$store.state.user.role_id === 1" prepend-icon="mdi-cog" title="Administration" @click="$router.push({path: '/administration'})"></v-list-item>


                </v-navigation-drawer>

                <v-main style="height: 100vh; overflow-y: scroll" class="ml-0 hide-scroll">
                    <router-view style="min-height: 90vh"></router-view>
                </v-main>
                </v-layout>
            </div>

        </div>
        
        <div class="text-center d-flex justify-center">
                        <v-icon>mdi-copyright</v-icon>
                        <p class="ml-2">Gestimum {{new Date().getFullYear()}} </p>
                    </div>
        </v-card>
</template>

<script>
import { useTheme } from 'vuetify/lib/framework.mjs';
import { mapGetters } from 'vuex';
import User from '../../services/users.service'

export default {
    setup () {
    const theme = useTheme()

    return {
      theme,
        toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'customLightTheme' : 'customDarkTheme'
    }
  },
    data() {
        return {
            route: '/',
            theme: useTheme(),
            nav:{
                admin:[
                    {
                        icon: 'mdi-monitor',
                        text: 'Gestimum ERP',
                        route: '/gestimum-erp'
                    },
                    {
                        icon: 'mdi-school',
                        text: 'Formation',
                        route: '/formation'
                    },
                    {
                        icon: 'mdi-assistant',
                        text: 'Support',
                        route: '/support'
                    },
                    {
                        icon: 'mdi-newspaper',
                        text: 'G-News',
                        route: '/g-news'
                    },
                    {
                        icon: 'mdi-card-account-mail',
                        text: 'Mes contacts',
                        route: '/contacts'
                    },

                    {
                        icon: 'mdi-handshake',
                        text: 'Aide à la vente',
                        route: '/aide-vente'
                    },
                    {
                        icon: 'mdi-file-document-edit',
                        text: 'Mon contrat',
                        route: '/contrat'
                    },
                    {
                        icon: 'mdi-currency-eur',
                        text: 'Tarifs',
                        route: '/tarifs'
                    },
                ],
                client:[
                    {
                        icon: 'mdi-monitor',
                        text: 'Gestimum ERP',
                        route: '/gestimum-erp'
                    },
                    {
                        icon: 'mdi-school',
                        text: 'Formation',
                        route: '/formation'
                    },
                    {
                        icon: 'mdi-assistant',
                        text: 'Support',
                        route: '/support'
                    },
                    {
                        icon: 'mdi-newspaper',
                        text: 'G-News',
                        route: '/g-news'
                    },
                    {
                        icon: 'mdi-card-account-mail',
                        text: 'Mes contacts',
                        route: '/contacts'
                    },
                    
                   
                ],
                partenaire:[
                    {
                        icon: 'mdi-monitor',
                        text: 'Gestimum ERP',
                        route: '/gestimum-erp'
                    },
                    {
                        icon: 'mdi-school',
                        text: 'Formation',
                        route: '/formation'
                    },
                    {
                        icon: 'mdi-assistant',
                        text: 'Support',
                        route: '/support'
                    },
                    {
                        icon: 'mdi-newspaper',
                        text: 'G-News',
                        route: '/g-news'
                    },
                    {
                        icon: 'mdi-card-account-mail',
                        text: 'Mes contacts',
                        route: '/contacts'
                    },

                    {
                        icon: 'mdi-handshake',
                        text: 'Aide à la vente',
                        route: '/aide-vente'
                    },
                    {
                        icon: 'mdi-file-document-edit',
                        text: 'Mon contrat',
                        route: '/contrat'
                    },
                    {
                        icon: 'mdi-currency-eur',
                        text: 'Tarifs',
                        route: '/tarifs'
                    },

                ]
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
                .catch((err) => {
                    console.log(err)
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
        },

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

.icon-theme{
    position: absolute;
    top: 24px;
    left: 50%;
}


</style>