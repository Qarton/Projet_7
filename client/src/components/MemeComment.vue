<template>
  <div>
    <v-textarea v-if="isUserLoggedIn" outlined label="Votre message" v-model="text"></v-textarea>
    <v-btn v-if="isUserLoggedIn" @click="addComment" class="black" dark>Comment</v-btn>
    <div v-for="comment in comments" :key="comment.id" class="py-4 px-2">
    <v-card flat outlined>
      <v-card-title>
        <pseudo :Utilisateur="comment" />
         le {{ moment(comment.createdAt).format("DD/MM/YYYY") }} à {{ moment(comment.createdAt).format("HH:MM") }}
      </v-card-title>
      <v-card-text class="text-h6 black--text">{{comment.text}}</v-card-text>
    </v-card>
    <v-btn v-if="isUserLoggedIn && comment && userId===comment.UserId" @click="deleteComment(comment.id)" class="black" dark>Delete</v-btn>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
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
      userId: null,
      owner: null,
      moment: moment
    }
  },
  async mounted () {
    const memeId = await this.$store.state.route.params.memeId
    this.meme = (await MemeService.show(memeId)).data
    this.comments = (await CommentService.index({
      memeId: this.meme.id
    })).data
    if (!this.isUserLoggedIn) {
      return
    }
    this.owner = await this.$store.state.user.name + ' ' + this.$store.state.user.firstName
    this.userId = await this.$store.state.user.id
  },
  methods: {
    async addComment () {
      try {
        this.comment = (await CommentService.post({
          memeId: this.meme.id,
          userId: this.$store.state.user.id,
          text: this.text,
          owner: this.owner
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
