<template>
  <div>
    <v-textarea v-if="isUserLoggedIn" outlined label="Votre message" v-model="text"></v-textarea>
    <v-btn v-if="isUserLoggedIn" @click="addComment" class="cyan" dark>Comment</v-btn>
    <div v-for="comment in comments" :key="comment.id" class="py-4 px-2">
      {{comment.id}}
    <v-card v-if="isUserLoggedIn && comment" outlined>
      <v-card-title>Message</v-card-title>
      <v-card-subtitle><pseudo :Utilisateur="comment.UserId" /></v-card-subtitle>
      <v-card-text>{{comment.text}}</v-card-text>
    </v-card>
    <v-btn v-if="isUserLoggedIn && comment && userId===comment.UserId" @click="deleteComment(comment.id)" class="cyan" dark>Delete</v-btn>
    </div>
  </div>
</template>

<script>
import MemeService from '@/services/MemeService'
import CommentService from '@/services/CommentService'
import { mapState } from 'vuex'
import Pseudo from '@/components/Pseudo'
export default {
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  components: {
    Pseudo
  },
  data () {
    return {
      comments: null,
      text: '',
      userId: null
    }
  },
  watch: {
    comments: function () {
      console.log('watch test')
    }
  },
  async mounted () {
    const memeId = await this.$store.state.route.params.memeId
    this.meme = (await MemeService.show(memeId)).data
    if (!this.isUserLoggedIn) {
      return
    }
    this.userId = await this.$store.state.user.id
    this.comments = (await CommentService.index({
      memeId: this.meme.id
    })).data
  },
  methods: {
    async addComment () {
      try {
        this.comment = (await CommentService.post({
          memeId: this.meme.id,
          userId: this.$store.state.user.id,
          text: this.text
        })).data
        this.comments = (await CommentService.index({
          memeId: this.meme.id
        })).data
      } catch (err) {
        console.log(err)
      }
    },
    async deleteComment (commentId) {
      try {
        this.comments.filter((obj) => { return obj.id !== commentId })
        console.log(commentId)
        await CommentService.delete(commentId)
        this.comments = (await CommentService.index({
          memeId: this.meme.id
        })).data
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
