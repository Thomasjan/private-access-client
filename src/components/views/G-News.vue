<template>
  <div
    v-motion
    :initial="{
    opacity: 0,
    scale: 2,
    y: 200,
    
}"
    :enter="{
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
      type: 'spring',
      stiffness: 250,
      damping: 40,
      mass: 1.5,
    },
    }"
    class="show-scroll"
  >
  
  <h1 class="text-primary text-center">G-News</h1>

  <div v-if="loading" class="w-75 mx-auto" style="margin-top: 200px">
     <lottie-animation
        ref="anim"
        :animationData="LinkedinAnimation"
        :loop="true"
        :autoPlay="true"
        :speed="1"
        />
  </div>

  <v-card class="bg-white elevation-0">
    <div v-for="post in posts.slice(0,40)" :key="post.id" class="mt-8" >
      <v-card class="bg-white rounded-lg pa-2 w-75 mx-auto elevation-4 text-subtitle-2" v-if="post.commentary || isObjectNotEmpty(post.content) ">

        <div class="d-flex justify-space-between" v-if="post">
          
          <div class="d-flex">
            <v-img class="rounded-be-circle mt-1" src="https://media.licdn.com/dms/image/C4E0BAQEaArVnn0zCXg/company-logo_100_100/0/1519894936937?e=1695254400&v=beta&t=gKVmc4I-SxrmtbzIBy6zG_wOPlOPpCR1zmj61eNTb9Q" width="50px" height="50px" ></v-img>
            <div class="d-flex flex-column ml-4">
              <h4>Gestimum</h4>
              <p>476 abhonnés</p>
              <p class="font-italic text-sm-body-2">{{ getPostTimeDifference(post.lastModifiedAt) }}</p>
            </div>
            </div>
          <div class="mr-1">
              <v-icon>mdi-dots-horizontal</v-icon>
          </div>
        </div>

        <div class=" mt-2">
          <p class="text-start">
             <span ref="paragraph" v-html="post.commentary"></span>
            </p>
        </div>

        <div class="mt-2 bg-grey-lighten-5 pb-2 cursor-pointer" v-if="post.content">
          <div v-if="post.content.article">
            <v-img :src="post.content.article.imageUrl" width="100%" />
            <h4 class="font-weight-bold mt-1 ml-2">{{post.content.article && post.content.article.title}} </h4>
          </div>

          <div v-else-if="post.content.media">
            <v-img v-if="post.content.media.imageUrl" :src="post.content.media.imageUrl" width="100%" />
            <embed v-else-if="post.content.media.videoUrl" :src="post.content.media.videoUrl" width="100%" height="400px" />
            <h4 class="font-weight-bold mt-1 ml-2">{{post.content.media && post.content.media.title}} </h4>
          </div>

          <div class="grid-container" v-else-if="post.content.multiImage">
            <div class="full-width">
              <v-img :src="post.content.multiImage.images[0].imageUrl" width="100%" />
            </div>
            <div class="grid-row">
                <div class="grid-item" v-for="(image, index) in post.content.multiImage.images.slice(1)" :key="index">
                  <v-img :src="image.imageUrl" width="100%" />
                </div>
            </div>
          </div>

          <v-img v-else src="data:image/png;base64,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" width="100%" height="200px" />

        </div>

        <div>

        </div>


      </v-card>
    </div>
  </v-card>
  </div>
</template>

<script>
import linkedin from '../../services/linkedin.service'
import LinkedinAnimation from '../../assets/animations/linkedin.json'
export default {
  
  data: () => ({
    LinkedinAnimation,
    posts: [],
    loading: false,
    
  }),

  mounted() {
    this.loading = true;
    this.getPosts();
  },

  methods:{

    //couleur aléatoire pour les hashtags
    getRandomColor ()  {
      const redTones = ["#FF7F7F", "#FF8787", "#FF8F8F", "#FF9797", "#FF9F9F"];
      const orangeTones = ["#FFB380", "#FFBA8A", "#FFC394", "#FFCDA0", "#FFD7AB"];
      const randomColor = Math.random() < 0.5 ? redTones : orangeTones;
      return randomColor[Math.floor(Math.random() * randomColor.length)];
    },
    
    //récupération des posts linkedin
    getPosts() {
      linkedin.getLinkedinPosts()
        .then((response) => {
          this.posts = response;
          //Remplacer les {hashtag|\\#\|([^}]*)\} par # et en couleur
           this.posts.forEach((post) => {
            let commentary = post.commentary;
            let replacedText = commentary.replace(/\{hashtag\|\\#\|([^}]*)\}/g, '#$1');
            const randomColor = this.getRandomColor();
            const styledText = replacedText.replace(/#(\w+)/g, `<span style="color:${randomColor}">$&</span>`);
            post.commentary = styledText;

            let timestamp = new Date(post.lastModifiedAt);
            let formattedDate = timestamp.toISOString();
            post.lastModifiedAt = formattedDate;
          });
          this.loading = false;
          // console.log(this.posts);
        })
        .catch((error) => {
          console.log(error);
      });
    },

    //vérification si l'objet est vide
    isObjectNotEmpty(obj) {
      if (obj === null || obj === undefined) {
        return false;
      }
      return Object.keys(obj).length !== 0;
    },
    
  },

  computed: {
    //calcul du temps écoulé depuis la publication
     getPostTimeDifference() {
      return function(createdAt) {
        const timestamp = new Date(createdAt);
        const currentTime = new Date();
        const timeDifference = currentTime.getTime() - timestamp.getTime();

        const secondsDifference = Math.floor(timeDifference / 1000);
        const minutesDifference = Math.floor(secondsDifference / 60);
        const hoursDifference = Math.floor(minutesDifference / 60);
        const daysDifference = Math.floor(hoursDifference / 24);

        if (daysDifference >= 365) {
          const yearsDifference = Math.floor(daysDifference / 365);
          return `${yearsDifference} an${yearsDifference > 1 ? 's' : ''} `;
        } else if (daysDifference >= 30) {
          const monthsDifference = Math.floor(daysDifference / 30);
          return `${monthsDifference} mois `;
        } else if (hoursDifference >= 48) {
          const daysDifference = Math.floor(hoursDifference / 24);
          return `${daysDifference} jour${daysDifference > 1 ? 's' : ''} `;
        } else if (hoursDifference >= 1) {
          return `${hoursDifference} heure${hoursDifference > 1 ? 's' : ''} `;
        } else if (minutesDifference >= 1) {
          return `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''} `;
        } else {
          return `${secondsDifference} second${secondsDifference > 1 ? 's' : ''} `;
        }
      }
  
    }
  }

}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr; /* Une seule colonne */
  grid-gap: 10px; /* Espacement entre les éléments */
}

.full-width {
  grid-column: 1 / -1; /* L'image occupe toute la largeur de la grille */
}

.grid-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Les autres images sont alignées en ligne */
  grid-gap: 10px;
}

.grid-item {
  width: 100%;
}

</style>
