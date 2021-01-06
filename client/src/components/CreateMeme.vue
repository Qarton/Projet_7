<template>
<v-row justify="center">
  <v-col md="4" sm="8">
    <panel title="Create Meme">
      <v-text-field required :rules="[required]" v-model="meme.title" label="Title"></v-text-field>
      <v-text-field required :rules="[required]" v-model="meme.imageUrl" label="Image Url"></v-text-field>
      <div class="error" v-if="error">
        {{ error }}
      </div>
      <v-btn @click="create" class="cyan" dark>Create</v-btn>
    </panel>
  </v-col>
</v-row>
</template>

<script>
import Panel from '@/components/Panel'
import MemeService from '@/services/MemeService'
export default {
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
      // const testFields = await Object.keys(this.meme).every(key => !!this.meme[key])
      // if (!testFields) {
      //   this.error = 'Please fill all the required fields.'
      //   return
      // }
      try {
        await MemeService.post(this.meme)
        this.$router.push({
          name: 'meme'
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
