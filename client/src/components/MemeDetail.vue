<template>
  <v-row justify="center">
    <v-col md="4" sm="8">
      <meme-model :title="meme.title">
        <v-img  class="mx-2 my-2" :src='meme.imageUrl' alt="MEME" />
      </meme-model>
      <v-text-field v-model="meme.comments" label="comment"></v-text-field>
      <v-btn @click="comment" class="cyan" dark>Post comment</v-btn>
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
      meme: {
        title: 'TEST',
        imageUrl: 'https://img-9gag-fun.9cache.com/photo/a27EQOw_700bwp.webp',
        comments: null
      }
    }
  },
  async mounted () {
    const memeId = await this.$store.state.route.params.memeId
    this.meme = (await MemeService.show(memeId)).data
  },
  methods: {
    async comment () {
      const memeId = await this.$store.state.route.params.memeId
      try {
        await MemeService.comment(this.meme)
        this.$router.push({
          name: 'meme',
          params: {
            memeId: memeId
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
