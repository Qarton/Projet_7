<template>
  <div class="pt-4">
    <v-card v-if="isUserLoggedIn && comment" outlined>
      <v-card-title>Message</v-card-title>
      <v-card-subtitle>User : {{comment.UserId}}</v-card-subtitle>
      <v-card-text>{{comment.text}}</v-card-text>
    </v-card>
    <v-textarea v-if="isUserLoggedIn && !comment" outlined label="Votre message" v-model="text"></v-textarea>
    <v-btn v-if="isUserLoggedIn && !comment" @click="addComment" class="cyan" dark>Comment</v-btn>
    <v-btn v-if="isUserLoggedIn && comment" @click="deleteComment" class="cyan" dark>Delete</v-btn>
  </div>
</template>

<script>
import MemeService from '@/services/MemeService'
import CommentService from '@/services/CommentService'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      comment: null,
      text: ''
    }
  },
  async mounted () {
    const memeId = await this.$store.state.route.params.memeId
    this.meme = (await MemeService.show(memeId)).data
    if (!this.isUserLoggedIn) {
      return
    }
    this.comment = (await CommentService.index({
      memeId: this.meme.id,
      userId: this.$store.state.user.id
    })).data
    // P6 58:22 => todo try catch après séparation
  },
  methods: {
    async addComment () {
      try {
        this.comment = (await CommentService.post({
          memeId: this.meme.id,
          userId: this.$store.state.user.id,
          text: this.text
        })).data
      } catch (err) {
        console.log(err)
      }
    },
    async deleteComment () {
      try {
        await CommentService.delete(this.comment.id)
        this.comment = null
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
