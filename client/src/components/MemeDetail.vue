<template>
  <v-row justify="center">
    <v-col md="4" sm="8">
      <meme-model :title="meme.title" :imageUrl="meme.imageUrl" />
    </v-col>
  </v-row>
</template>

<script>
import MemeService from '@/services/MemeService'
import MemeModel from '@/components/MemeModel'
export default {
  components: {
    MemeModel
  },
  data () {
    return {
      meme: {}
    }
  },
  async mounted () {
    const memeId = await this.$store.state.route.params.memeId
    this.meme = (await MemeService.show(memeId)).data
  }
}
</script>

<style scoped>

</style>
