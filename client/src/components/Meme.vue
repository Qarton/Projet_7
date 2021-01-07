<template>
<v-row justify="center">
        <v-col md="4" sm="8">
          <div v-for="meme in memes" :key="meme.id" class="py-4 px-2">
            <meme-model :title="meme.title">
              <v-img  class="mx-2 my-2" :src='meme.imageUrl' alt="MEME" @click="navigateTo({name: 'meme-detail', params: {memeId: meme.id}})" />
              <pseudo :Utilisateur="meme.UserId" />
            </meme-model>
          </div>
        </v-col>
      </v-row>
</template>

<script>
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
      memes: null
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
