<template>
<!-- page principale affiche la liste des Memes -->
<v-row justify="center">
  <v-col lg ="4" md="6" sm="10">
    <h1 class="mb-15 text-center">Liste des Memes</h1>
    <div v-for="meme in memes" :key="meme.id" class="mb-15">
      <h2 class="text-capitalize text-h5 font-weight-bold" @click="navigateTo({name: 'meme-detail', params: {memeId: meme.id}})"> {{meme.title}} </h2>
        <v-img  class="mb-2" :src='meme.imageUrl' alt="MEME" @click="navigateTo({name: 'meme-detail', params: {memeId: meme.id}})" />
      <v-row align="center">
      <div @click="navigateTo({name: 'history', params: {userId: meme.UserId}})">
        <v-card class="d-flex align-center mr-1" flat>
          <v-avatar rounded color="black" size="36">
            <v-icon class="white--text headline">mdi-account</v-icon>
          </v-avatar>
          <strong class="ml-1">{{meme.User.firstName}} {{meme.User.name}}</strong>
        </v-card>
      </div>
        le {{ moment(meme.createdAt).format("DD/MM/YYYY") }} à {{ moment(meme.createdAt).format("HH:mm") }}
      </v-row>
    </div>
  </v-col>
</v-row>
</template>

<script>
import moment from 'moment'
import MemeService from '@/services/MemeService'
export default {
  data () {
    return {
      memes: null,
      moment: moment
    }
  },
  async mounted () {
    this.memes = (await MemeService.index()).data
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
