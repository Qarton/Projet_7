<template>
  <!-- Affichage des commentaires du Meme -->
  <v-row class="mt-4" justify="center">
    <v-col md="6" sm="10">
      <v-textarea v-if="isUserLoggedIn" outlined label="Votre message" v-model="text"></v-textarea>
      <v-btn v-if="isUserLoggedIn" @click="addComment" color="black" dark>Commenter</v-btn>
      <div v-for="comment in comments" :key="comment.id" class="py-4 px-2">
        <v-card flat outlined>
          <v-card-title>
            <pseudo :data="comment" />
          </v-card-title>
        <v-card-text class="text-h6 black--text">{{comment.text}}</v-card-text>
        </v-card>
        <v-btn
        v-if="isUserLoggedIn && user.id===comment.UserId"
        @click="deleteComment(comment.id)"
        dark>
        <v-icon left>
          mdi-delete
        </v-icon>
        Supprimer
        </v-btn>
        <v-btn
        v-if="isUserLoggedIn && user.admin===true"
        @click="deleteComment(comment.id)"
        color="#2A3B4D"
        dark>
        <v-icon left>
          mdi-delete
        </v-icon>
        Supprimer (admin)
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Pseudo from '@/components/Pseudo'
import CommentService from '@/services/CommentService'
import { mapState } from 'vuex'
export default {
  components: {
    Pseudo
  },
  props: ['memeData'],
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  data () {
    return {
      comments: null,
      text: ''
    }
  },
  async mounted () {
    const memeId = await this.memeData.id
    this.comments = ((await CommentService.index(memeId))).data
  },
  methods: {
    async addComment () {
      try {
        const memeId = await this.$route.params.memeId
        this.comment = (await CommentService.post({
          memeId: memeId,
          userId: this.user.id,
          text: this.text
        })).data
        this.comments = ((await CommentService.index(memeId))).data
        this.text = ''
      } catch (err) {
        console.log(err)
      }
    },
    async deleteComment (commentId) {
      try {
        const memeId = await this.$route.params.memeId
        this.comments.filter((obj) => { return obj.id !== commentId })
        await CommentService.delete(commentId)
        this.comments = ((await CommentService.index(memeId))).data
      } catch (err) {
        console.log(err)
      }
    },
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>

</style>
