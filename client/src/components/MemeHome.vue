<template>
<!-- page principale affiche la liste des Memes -->
<v-row justify="center">
  <v-col lg ="4" md="6" sm="10">
    <h1 class="mb-15 text-center">Liste des Memes</h1>
    <div v-for="meme in memes" :key="meme.id" class="mb-15">
      <meme :memeData="meme" />
    </div>
  </v-col>
</v-row>
</template>

<script>
import Meme from '@/components/memes/Meme'
import MemeService from '@/services/MemeService'
export default {
  data () {
    return {
      memes: null
    }
  },
  components: {
    Meme
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
