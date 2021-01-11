<template>
<div>
  <v-row justify="center">
    <v-col lg ="4" md="6" sm="8">
      <div v-for="meme in memes" :key="'M'+meme.id" class="py-4 px-2">
        <meme-model :title="meme.title">
        <v-img  class="mx-2 my-2" :src='meme.imageUrl' alt="MEME" @click="navigateTo({name: 'meme-detail', params: {memeId: meme.id}})" />
      </meme-model>
      <v-row align="center">
        <pseudo :Utilisateur="meme.UserId" />
        le {{ moment(meme.createdAt).format("DD/MM/YYYY") }} à {{ moment(meme.createdAt).format("HH:MM") }}
      </v-row>
      </div>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col md="8">
      <div v-for="comment in comments" :key="'C'+comment.id" class="py-4 px-2">
        <v-card flat outlined>
          <v-card-title><pseudo :Utilisateur="comment.UserId" />
            le {{ moment(comment.createdAt).format("DD/MM/YYYY") }} à {{ moment(comment.createdAt).format("HH:MM") }}
          </v-card-title>
          <v-card-text class="text-h6 black--text">{{comment.text}}</v-card-text>
        </v-card>
      </div>
    </v-col>
  </v-row>
</div>
</template>

<script>
import moment from 'moment'
import ActivityService from '@/services/ActivityService'
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
      comments: null,
      moment: moment
    }
  },
  async mounted () {
    const userId = await this.$store.state.route.params.userId
    this.memes = ((await ActivityService.search(userId)).data).memes
    this.comments = ((await ActivityService.search(userId)).data).comments
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
