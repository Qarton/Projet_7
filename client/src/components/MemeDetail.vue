<template>
<!-- Détail d'un Meme -->
<div v-if="this.meme!=null">
  <v-btn
  v-if="isUserLoggedIn &&  user.id===meme.UserId"
  @click="navigateTo({name: 'meme-edit', params: {memeId: meme.id}})"
  color="black"
  dark>
  <v-icon left>
    mdi-pencil
  </v-icon>
  Modification
  </v-btn>
  <v-btn
  v-if="isUserLoggedIn && user.id===meme.UserId"
  @click="deleteMeme(meme.id)"
  color="black"
  dark>
  <v-icon left>
    mdi-delete
  </v-icon>
  Supprimer
  </v-btn>
  <v-btn
  v-if="isUserLoggedIn && user.admin===true"
  @click="deleteMeme(meme.id)"
  color="#2A3B4D"
  dark>
  <v-icon left>
    mdi-comment
  </v-icon>
  Supprimer (admin)
  </v-btn>
  <v-row justify="center">
    <v-col lg ="4" md="6" sm="10">
      <meme :memeData="meme" />
    </v-col>
  </v-row>
  <v-divider></v-divider>
  <meme-comment :memeData="meme" />
</div>
</template>

<script>
import MemeService from '@/services/MemeService'
import MemeComment from '@/components/memes/MemeComment'
import Meme from '@/components/memes/Meme'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  components: {
    MemeComment,
    Meme
  },
  data () {
    return {
      meme: null
    }
  },
  async mounted () {
    const memeId = await this.$route.params.memeId
    this.meme = ((await MemeService.show(memeId))).data
  },
  methods: {
    async deleteMeme (memeId) {
      try {
        await MemeService.delete(memeId)
        this.$router.push({
          name: 'meme'
        })
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
