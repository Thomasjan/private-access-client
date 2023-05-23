<template>
        <v-card class="pa-4 mx-auto bg-white " max-width="1000px">
            <v-row class="flex-row justify-space-between pt-1 pb-6">
                <div class="flex justify-space-between ml-2">
                    <img class="cursor-pointer" @click="route='/' ;$router.push('/')" src="../../assets/Logo-GESTIMUM.png" alt="">
                </div>
                <div class="flex-wrap">
                  <v-row class="pa-6"> <p class="px-2 cursor-pointer links"  @click="logout()">Revenir à l'espace public</p> - <p class="px-2 cursor-pointer links" @click="route='/contacts'; $router.push('/contacts')">Contact</p> </v-row> 
                </div>
            </v-row>
            <v-divider></v-divider>

        <div >

            <div class="mx-auto mt-16 pb-16 mb-14" style="width: 90%;" v-if="route=='/'">
                <h3 class="text-center">Bienvenue, <strong class="text-uppercase">{{$store.state.user.name}}</strong> dans votre espace privé Gestimum</h3>
                <div class="mt-14">
                    <v-row class="flex-row justify-center">
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
                </div>
            </div>

            <div v-else>
                <v-layout >
                <v-navigation-drawer class="bg-primary rounded-e-shaped "
                    expand-on-hover
                    rail
                >
                    <v-list>
                    <v-list-item
                        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                        title="Client"
                        subtitle="client88@gmailcom"
                    ></v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list density="compact" nav v-for="item in nav.client" :key="item.route">
                    <v-list-item :class="route==item.route? 'bg-surface rounded-e-xl': ''" :prepend-icon="item.icon" :title="item.text"  @click="handleMenu(item)"></v-list-item>
                    
                    </v-list>
                </v-navigation-drawer>

                <v-main style="height: 90vh" class="ml-0">
                    <router-view></router-view>
                </v-main>
                </v-layout>
            </div>

            <!-- Content -->

            
        </div>
        

            <footer></footer>
        </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import User from '../../services/users.service'

export default {
    data() {
        return {
            route: '/',
            nav:{
                admin:[
                    {
                        icon: 'mdi-school',
                        text: 'Formation',
                        route: '/Formation'
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
                        icon: 'mdi-school',
                        text: 'Formation',
                        route: '/formation'
                    },
                ]
            },

        }
    },
    
    mounted(){

        if (this.$store.state.user.id == '' && this.$route.name !== 'mdpoublie' && this.$route.name !== 'generate-password') {
            let userId = localStorage.getItem('auth')
            console.warn('userId', userId)
            User.getUser(userId)
                .then((response) => { 
                    this.$store.commit('UPDATE_USER', response)
                    console.log('response', response)
                })
                .catch(() => {router.push({ name: 'logout' }) })
        }
    },

    methods:{
        handleMenu(item){
            this.route = item.route;
            this.$router.push(item.route)
        },
        logout(){
            localStorage.removeItem('auth')
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