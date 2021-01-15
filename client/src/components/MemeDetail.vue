<template>
<div v-if="this.meme!=null">
  <v-row justify="center">
    <v-col lg ="4" md="6" sm="10">
      <p class="text-capitalize text-h5 font-weight-bold mb-0"> {{meme.title}} </p>
      <v-img class="mx-2 my-2" :src='meme.imageUrl' alt="MEME" />
    </v-col>
  </v-row>
  <v-row justify="center" class="align-center">
    <v-col md="8" class="d-flex align-center ml-4">
      <strong>Créateur :</strong>
      <pseudo :Utilisateur="meme" />
        Crée le {{ moment(meme.createdAt).format("DD/MM/YYYY") }} à {{ moment(meme.createdAt).format("hh:mm") }}
    </v-col>
  </v-row>
  <v-divider></v-divider>
  <v-row class="mt-4" justify="center">
    <v-col md="6" sm="10">
      <v-textarea v-if="isUserLoggedIn" outlined label="Votre message" v-model="text"></v-textarea>
      <v-btn v-if="isUserLoggedIn" @click="addComment" class="black" dark>Comment</v-btn>
      <div v-for="comment in meme.Comments" :key="comment.id" class="py-4 px-2">
        <v-card flat outlined>
          <v-card-title>
            <pseudo :Utilisateur="comment" />
            le {{ moment(comment.createdAt).format("DD/MM/YYYY") }} à {{ moment(comment.createdAt).format("hh:mm") }}
          </v-card-title>
        <v-card-text class="text-h6 black--text">{{comment.text}}</v-card-text>
        </v-card>
        <v-btn v-if="isUserLoggedIn &&  user.id===comment.UserId" @click="deleteComment(comment.id)" class="black" dark>Delete</v-btn>
        <v-btn v-if="isUserLoggedIn && user.admin===true" @click="deleteComment(comment.id)" class="black" dark>Admin Delete</v-btn>
      </div>
    </v-col>
  </v-row>
</div>
</template>

<script>
import moment from 'moment'
import MemeService from '@/services/MemeService'
import CommentService from '@/services/CommentService'
import Pseudo from '@/components/Pseudo'
import { mapState } from 'vuex'
export default {
  components: {
    Pseudo
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  data () {
    return {
      meme: null,
      text: '',
      moment: moment
    }
  },
  async mounted () {
    const memeId = await this.$store.state.route.params.memeId
    this.meme = ((await MemeService.show(memeId))).data
  },
  methods: {
    async deleteComment (commentId) {
      try {
        this.meme.Comments.filter((obj) => { return obj.id !== commentId })
        await CommentService.delete(commentId)
        this.meme = ((await MemeService.show(this.meme.id))).data
      } catch (err) {
        console.log(err)
      }
    },
    async addComment () {
      try {
        this.comment = (await CommentService.post({
          memeId: this.meme.id,
          userId: this.user.id,
          text: this.text
        })).data
        this.meme = ((await MemeService.show(this.meme.id))).data
        this.text = ''
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
