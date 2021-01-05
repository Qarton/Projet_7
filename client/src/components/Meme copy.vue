<template>
<v-row justify="center">
        <v-col md="4" sm="8">
          <panel title="Meme">
            <div v-for="meme in memes" :key="meme.id" class="py-4 px-2">
              <v-card>
                <v-toolbar fixed class="cyan" dark>
                  <v-toolbar-title class="mr-4 flex text-center">
                    {{meme.title}}
                  </v-toolbar-title>
                </v-toolbar>
                <v-img  class="mx-2 my-2" :src='meme.imageUrl' alt="MEME" @click="navigateTo({name: 'meme-detail', params: {memeId: meme.id}})" />
                <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-message-reply-text</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-heart-broken</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-card-actions>
              </v-card>
            </div>
          </panel>
        </v-col>
      </v-row>
</template>

<script>
import MemeService from '@/services/MemeService'
import Panel from '@/components/Panel'
export default {
  components: {
    Panel
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
