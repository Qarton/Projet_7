<template>
<v-row justify="center">
  <v-col lg="4" md="6" sm="8">
    <!-- panneau de Modification d'un Meme -->
    <panel title="Modifier votre Meme">
      <v-text-field prepend-icon="mdi-pen" required :rules="[required]" v-model="meme.title" label="Titre"></v-text-field>
      <v-file-input
        label="Ajouter une image"
        filled
        prepend-icon="mdi-camera"
        type="file"
        @change="selectFile"
      ></v-file-input>
      <v-alert dense dark color="#2A3B4D" v-if="error" v-html="error" />
      <v-btn @click="edit" class="black" dark>Modifier</v-btn>
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
      meme: {},
      error: null,
      required: (value) => !!value || 'Required'
    }
  },
  async mounted () {
    const memeId = await this.$route.params.memeId
    this.meme = ((await MemeService.show(memeId))).data
  },
  methods: {
    async edit () {
      this.error = null
      const fd = new FormData()
      const memeId = this.meme.id
      if (!this.meme.title) {
        this.error = 'Veuillez saisir un titre.'
        return
      }
      fd.append('imageUrl', this.meme.imageUrl)
      fd.append('title', this.meme.title)
      fd.append('memeId', memeId)
      try {
        await MemeService.put(fd)
        this.$router.push({
          name: 'meme',
          params: {
            memeId: this.meme.id
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    selectFile (file) {
      this.meme.imageUrl = file
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>

</style>
