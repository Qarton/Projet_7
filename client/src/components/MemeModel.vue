<template>
      <v-card>
      <v-toolbar fixed class="cyan" dark>
        <v-toolbar-title class="mr-4 flex text-center">
        {{title}}
        </v-toolbar-title>
      </v-toolbar>
        <v-img  class="mx-2 my-2" :src='imageUrl' alt="MEME" />
      <v-card-actions>
      <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-message-reply-text</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-heart-broken</v-icon>
        </v-btn>
        <v-btn icon @click="liked">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-card-actions>
      </v-card>
</template>

<script>
import MemeService from '@/services/MemeService'
export default {
  props: ['title', 'imageUrl'],
  data () {
    return {
      likeTest: {
        like: 0
      }
    }
  },
  methods: {
    async liked () {
      if (this.likeTest.like === 0) {
        console.log('+1')
        this.likeTest.like += 1
      } else {
        console.log('-1')
        this.likeTest.like -= 1
      }
      try {
        await MemeService.like(this.likeTest)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
