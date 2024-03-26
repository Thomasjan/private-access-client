<template>
  <v-card class="bg-background pa-2 elevation-0">
    <h2 class="text-primary text-center">Contacts</h2>
    
    <div class="mt-4 px-4">
      <h4>Vos interlocuteurs GESTIMUM</h4>
      <p class="font-italic">Notre équipe est orientée Services en mode Affaire. 
        Chaque projet confié à Gestimum est traité avec le plus grand soin. 
      </p>
      <p v-if="$store.state.user.role_id >= 3"> Avec l’aide de l’intégrateur, nous nous efforçons de vérifier l’adéquation de notre solution au besoin exprimé du client.</p>
    

      <v-img class="mx-auto mt-8" :src="pdfContact" width="100%" />
    
      <p class="mt-6">
      Le support Gestimum est accessible par email
      <a href="#" @click="sendEmail">assistance@gestimum.com</a> et accompagne les PME et leurs intégrateurs par téléphone du lundi au vendredi de <strong>9h00 à 12h30 et de 14h00 à 18h00</strong>.
    </p>
    </div>
  </v-card>
</template>

<script>
export default {
  
  data: () => ({
    pdfContact: 'images/contact-fevrier-2024.png'
  }),

  methods: {
    
    sendEmail() {
      const email = 'assistance@gestimum.com';
      const subject = 'Objet de votre email';
      const body = 'Contenu de votre email';

      const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoUrl;
    }
  }
}
</script>

