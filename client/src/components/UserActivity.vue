<template>
<v-row justify="center">
        <v-col md="4" sm="8">
          <div v-for="meme in memes" :key="'M'+meme.id" class="py-4 px-2">
            <meme-model :title="meme.title">
              <v-img  class="mx-2 my-2" :src='meme.imageUrl' alt="MEME" @click="navigateTo({name: 'meme-detail', params: {memeId: meme.id}})" />
              <pseudo :Utilisateur="meme.UserId" />
            </meme-model>
          </div>
          <div v-for="comment in comments" :key="'C'+comment.id" class="py-4 px-2">
    <v-card outlined>
      <v-card-title>Message</v-card-title>
      <v-card-subtitle><pseudo :Utilisateur="comment.UserId" /></v-card-subtitle>
      <v-card-text>{{comment.text}}</v-card-text>
    </v-card>
    </div>
        </v-col>
      </v-row>
</template>

<script>
import CommentService from '@/services/CommentService'
import MemeModel from '@/components/MemeModel'
import Pseudo from '@/components/Pseudo'
export default {
  components: {
    MemeModel,
    Pseudo
  },
  data () {
    return {
      memes: null,
      comments: null
    }
  },
  async mounted () {
    const userId = await this.$store.state.route.params.userId
    this.memes = ((await CommentService.search(userId)).data).memes
    this.comments = ((await CommentService.search(userId)).data).comments
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>

</style>
