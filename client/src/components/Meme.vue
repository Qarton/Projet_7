<template>
<v-row justify="center">
        <v-col lg ="4" md="6" sm="10">
          <div v-for="meme in memes" :key="meme.id" class="mb-4">
            <meme-model :title="meme.title">
              <v-img  class="mb-2" :src='meme.imageUrl' alt="MEME" @click="navigateTo({name: 'meme-detail', params: {memeId: meme.id}})" />
            </meme-model>
            <v-row align="center">
              <pseudo :Utilisateur="meme.UserId" />
              le {{ moment(meme.createdAt).format("DD/MM/YYYY") }} à {{ moment(meme.createdAt).format("HH:MM") }}
            </v-row>
          </div>
        </v-col>
      </v-row>
</template>

<script>
import moment from 'moment'
import MemeService from '@/services/MemeService'
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
      moment: moment
    }
  },
  async mounted () {
    this.memes = (await MemeService.index()).data
    console.log(this.memes)
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
