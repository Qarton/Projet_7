<template>
<v-row justify="center">
        <v-col md="4" sm="8">
          <div v-for="meme in memes" :key="meme.id" class="py-4 px-2">
            <meme-model :title="meme.title" :imageUrl="meme.imageUrl" />
          </div>
        </v-col>
      </v-row>
</template>

<script>
import MemeService from '@/services/MemeService'
import MemeModel from '@/components/MemeModel'
export default {
  components: {
    MemeModel
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
