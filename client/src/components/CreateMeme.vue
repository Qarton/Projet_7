<template>
<v-row justify="center">
  <v-col md="4" sm="8">
    <!-- panneau de création d'un Meme -->
    <panel title="Créer votre Meme">
      <v-text-field prepend-icon="mdi-pen" required :rules="[required]" v-model="meme.title" label="Saisir un titre"></v-text-field>
      <v-file-input
        label="Ajouter une image"
        filled
        prepend-icon="mdi-camera"
        type="file"
        @change="selectFile"
      ></v-file-input>
      <v-alert dense type="error" v-if="error" v-html="error" />
      <v-btn @click="create" class="black mt-5" dark>Créer</v-btn>
    </panel>
  </v-col>
</v-row>
</template>

<script>
import Panel from '@/components/Panel'
import MemeService from '@/services/MemeService'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'user'
    ])
  },
  data () {
    return {
      meme: {
        title: null,
        imageUrl: null
      },
      error: null,
      required: (value) => !!value || 'Required'
    }
  },
  methods: {
    async create () {
      this.error = null
      const fd = new FormData()
      fd.append('imageUrl', this.meme.imageUrl)
      fd.append('title', this.meme.title)
      // const testFields = await Object.keys(this.meme).every(key => !!this.meme[key])
      // if (!testFields) {
      //   this.error = 'Please fill all the required fields.'
      //   return
      // }
      try {
        await MemeService.post(fd)
        this.$router.push({
          name: 'meme'
        })
      } catch (err) {
        console.log(err)
      }
    },
    selectFile (file) {
      this.meme.imageUrl = file
      console.log(file)
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>

</style>
