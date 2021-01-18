<template>
<v-row justify="center">
  <v-col md="4" sm="8">
    <!-- panneau de création d'un Meme -->
    <panel title="Create Meme">
      <v-text-field required :rules="[required]" v-model="meme.title" label="Title"></v-text-field>
      <div class="custom-file">
            <input
              name="imageUrl"
              type="file"
              class="custom-file-input"
              id="imageUrl"
              aria-describedby="imageUrlAddon"
              @change="onFileChange"
            />
            <label class="custom-file-label" for="imageUrl">Choose file</label>
          </div>
          <v-alert dense type="error" v-if="error" v-html="error" />
      <v-btn @click="create" class="black" dark>Create</v-btn>
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
    onFileChange (e) {
      this.meme.imageUrl = e.target.files[0] || e.dataTransfer.files
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>

</style>
