<template>
  <div class="mt-4">
   <h3 class="text-center text-primary">Mise à jour des versions en ligne</h3> 

    <div class="w-75 mx-auto mt-10">
    <v-form @submit="submitForm">

      <v-row class="my-2">
      <v-text-field class="mx-3" v-model="form.version" label="Version"></v-text-field>

          <v-text-field class="mx-3" v-model="form.file_name" label="File Name"></v-text-field>
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

          <!-- <input id='file' type="file" > -->

      <v-select v-model="form.type" :items="types" label="Type"></v-select>

      <v-file-input 
        class="mx-3 w-75"
        v-model="form.image"
        accept="image/png, image/jpeg, image/bmp"
        placeholder="Pick an avatar"
        prepend-icon="mdi-camera"
        label="Image">
      </v-file-input>

      <v-textarea v-model="form.description" label="Description"></v-textarea>

      <div class="text-center">
        <v-btn type="submit" color="primary">Valider</v-btn>
      </div>
  </v-form>
    </div>


  </div>
</template>

<script>
import Upload from '../../../services/uploads.service'

export default {
  
  data: () => ({
    form:{
      version: '',
      file_name: '',
      file: null,
      type: '',
      image: null,
      description: '',
    },

    types: ['Commerciale', 'Beta', 'Ne pas communiquer'],
  }),

   methods: {
    submitForm(e) {
  e.preventDefault();
  const form = { ...this.form };

  const filePath = `uploads/${form.file_name}`;
  const imagePath = `uploads/${form.image[0].name}`;

  form.file_path = filePath;
  form.image_path = imagePath;

  const formData = new FormData();
  // formData.append('version', form.version);
  // formData.append('file_name', form.file_name);
  // formData.append('type', form.type);
  // formData.append('description', form.description);
  // formData.append('file_path', form.file_path);
  // formData.append('image_path', form.image_path);
  // formData.append('file', form.file[0]);
  // formData.append('image', form.image[0]);
  formData.append('name', form.file_name);
  formData.append('file', this.form.file[0]);

  console.log(formData);

  Upload.addUpload(formData)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });

    // fetch("http://localhost:3000/api/uploads/addUpload", {
    //     method: 'POST',
    //     body: formData,
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     }
    // })
},

    handleFileChange(fileList) {
      if (fileList && fileList.length > 0) {
        this.form.file = fileList[0];
      }
    },
  },
  
}
</script>
