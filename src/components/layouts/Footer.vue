<template>
     <div class="text-center position-absolute w-100 font-italic" style="bottom: 0;">
        <v-icon small color="white">mdi-copyright</v-icon>
       <v-btn
            text
            class="disable"
            style="text-decoration: none; pointer-events: none"
            color="white"
            >
            Gestimum {{new Date().getFullYear()}} 
        </v-btn>
    </div>
</template>