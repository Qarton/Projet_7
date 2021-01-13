<template>
<div>
  <v-btn v-if="isUserLoggedIn && userIdActivity===userId" @click="deleteUser(userId)" class="black" dark>Delete</v-btn>
  <v-row justify="center">
    <v-col md="8">
      <h1>Historique de {{search.owner}}</h1>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col md="8">
      <h2>Meme</h2>
    <v-expansion-panels>
    <v-expansion-panel
      v-for="meme in memes"
      :key="'M'+meme.id">
      <v-expansion-panel-header>
        {{meme.title}}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row justify="center">
          <v-col md="8">
            <v-img :src='meme.imageUrl' alt="MEME" @click="navigateTo({name: 'meme-detail', params: {memeId: meme.id}})" />
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col md="8">
      <h2>Commentaire</h2>
          <v-expansion-panels>
    <v-expansion-panel v-for="comment in comments" :key="'C'+comment.id">
      <v-expansion-panel-header>
        {{comment.owner}} le {{ moment(comment.createdAt).format("DD/MM/YYYY") }} à {{ moment(comment.createdAt).format("hh:mm") }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
          <p class="text-h6 black--text">{{comment.text}}</p>
          <v-btn @click="navigateTo({name: 'meme-detail', params: {memeId: comment.MemeId}})" class="black" dark>Go to Meme</v-btn>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
    </v-col>
  </v-row>
</div>
</template>

<script>
import moment from 'moment'
import AuthenticationService from '@/services/AuthenticationService'
import ActivityService from '@/services/ActivityService'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  data () {
    return {
      memes: null,
      comments: null,
      moment: moment,
      userId: null,
      userIdActivity: null,
      search: {}
    }
  },
  async mounted () {
    this.userIdActivity = await this.$store.state.route.params.userId
    this.search = (await ActivityService.search(this.userIdActivity)).data
    this.memes = this.search.memes
    this.comments = this.search.comments
    if (!this.isUserLoggedIn) {
      return
    }
    this.userId = await this.user.id
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async deleteUser (userId) {
      try {
        const userId = this.userId
        await AuthenticationService.delete(userId)
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$router.push({
          name: 'meme'
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
