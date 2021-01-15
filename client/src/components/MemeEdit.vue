<template>
<v-row justify="center">
  <v-col md="4" sm="8">
    <!-- panneau de Modification d'un Meme -->
    <panel title="Edit Meme">
      <v-text-field required :rules="[required]" v-model="meme.title" label="Title"></v-text-field>
      <v-text-field required :rules="[required]" v-model="meme.imageUrl" label="Image Url"></v-text-field>
      <v-alert dense type="error" v-if="error" v-html="error" />
      <v-btn @click="edit" class="black" dark>Edit</v-btn>
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
    const memeId = await this.$store.state.route.params.memeId
    this.meme = ((await MemeService.show(memeId))).data
  },
  methods: {
    async edit () {
      this.error = null
      const testFields = await Object.keys(this.meme).every(key => !!this.meme[key])
      if (!testFields) {
        this.error = 'Please fill all the required fields.'
        return
      }
      try {
        await MemeService.put(this.meme)
        this.$router.push({
          name: 'meme',
          params: {
            memeId: this.meme.id
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>

</style>
