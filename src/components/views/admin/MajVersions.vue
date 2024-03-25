<template>
  <div class="mt-4">
   <h3 class="text-center text-primary">Mise à jour des versions en ligne</h3> 

    <v-card class="w-75 mx-auto mt-10 bg-background pa-6">
    <v-form @submit="submitForm">

      <v-row class="my-2">
      <v-text-field class="mx-3" v-model="form.version" label="Version"></v-text-field>

          <v-text-field class="mx-3" v-model="form.file_name" label="Nom du fichier"></v-text-field>
      </v-row>
          <v-file-input
            class="mx-3 w-75"
            v-model="form.file" 
            label="Fichier"
            show-size
            accept="application/x-msdownload"
            placeholder="Pick a file"
            @change="handleFileChange"
          ></v-file-input>

      <v-select class="mx-8" v-model="form.type" :items="types" label="Type">

      </v-select>

      <v-file-input 
        class="mx-3 w-75"
        v-model="form.image"
        accept="image/png, image/jpeg, image/bmp, image/gif, image/svg+xml, image/webp, image/tiff, image/x-icon, image/vnd.microsoft.icon"
        placeholder="Pick an avatar"
        prepend-icon="mdi-camera"
        label="Image">
      </v-file-input>

      <p class="ml-2 text-grey-darken-2">Description :</p>
      <vue-editor  v-model="form.description"></vue-editor>

      <p class="ml-2 text-grey-darken-2 mt-4">Note du patch :</p>
      <vue-editor  v-model="form.patch"></vue-editor>

      <div class="text-center mt-4">
        <v-btn type="submit" color="primary">Valider</v-btn>
      </div>
  </v-form>
    </v-card>


  </div>
</template>

<script>
import { VueEditor } from 'vue3-editor';
import Upload from '../../../services/uploads.service'

export default {
 components: {
    VueEditor,
  },
  
  
  data: () => ({
    form:{
      version: '',
      file_name: '',
      file: null,
      type: '',
      image: null,
      description: '',
      patch: `<p><strong style="color: rgb(239, 132, 28);">Titre Module</strong></p><p><strong style="color: rgb(88, 97, 102);"><img src="/images/barre-orange.gif" height="1" width="100%"></strong></p><p><strong style="color: rgb(88, 97, 102);">Sous-module</strong></p><p>	<span style="color: rgb(82, 93, 99);"><img src="/images/tick.gif" height="9" width="10"></span>&nbsp;Description nouveauté / correction</p><p>	<span style="color: rgb(82, 93, 99);"><img src="/images/tick.gif" height="9" width="10"></span>&nbsp;Description nouveauté / correction</p><p><br></p><p><strong style="color: rgb(88, 97, 102);">Sous-module</strong></p><p>	<span style="color: rgb(82, 93, 99);"><img src="/images/tick.gif" height="9" width="10"></span>&nbsp;Description nouveauté / correction</p><p>	<span style="color: rgb(82, 93, 99);"><img src="/images/tick.gif" height="9" width="10"></span>&nbsp;Description nouveauté / correction</p>`,
    },
    

    types: ['Commerciale', 'Beta', 'Ne pas communiquer'],
  }),

   methods: {
    submitForm(e) {
  e.preventDefault();
  const form = { ...this.form };
  console.log(form)

  const filePath = `uploads/${form.file_name}`;
  const imagePath = `uploads/${form.image[0].name}`;

  form.file_path = filePath;
  form.image_path = imagePath;

  const formData = new FormData();
  formData.append('version', form.version);
  formData.append('file_name', form.file_name);
  formData.append('type', form.type);
  formData.append('description', form.description);
  formData.append('patch', form.patch);
  formData.append('file_path', form.file_path);
  formData.append('image_path', form.image_path);
  
  formData.append('name', form.file_name);
  formData.append('file', this.form.file[0]);
  formData.append('image', this.form.image[0]);


  Upload.addUpload(formData)
    .then(res => {
      console.log(res);
      this.form = {
        version: '',
        file_name: '',
        file: null,
        type: '',
        image: null,
        description: '',
        patch: `<p><strong style="color: rgb(239, 132, 28);">Titre Module</strong></p><p><strong style="color: rgb(88, 97, 102);"><img src="/images/barre-orange.gif" height="1" width="100%"></strong></p><p><strong style="color: rgb(88, 97, 102);">Sous-module</strong></p><p>	<span style="color: rgb(82, 93, 99);"><img src="/images/Decor/tick.gif" height="9" width="10"></span>&nbsp;Description nouveauté / correction</p><p>	<span style="color: rgb(82, 93, 99);"><img src="/images/Decor/tick.gif" height="9" width="10"></span>&nbsp;Description nouveauté / correction</p><p><br></p><p><strong style="color: rgb(88, 97, 102);">Sous-module</strong></p><p>	<span style="color: rgb(82, 93, 99);"><img src="/images/Decor/tick.gif" height="9" width="10"></span>&nbsp;Description nouveauté / correction</p><p>	<span style="color: rgb(82, 93, 99);"><img src="/images/Decor/tick.gif" height="9" width="10"></span>&nbsp;Description nouveauté / correction</p>`,
      };
    })
    .catch(err => {
      console.log(err);
    });

},

    handleFileChange(fileList) {
      if (fileList && fileList.length > 0) {
        this.form.file = fileList[0];
      }
    },
  },
  
}
</script>
