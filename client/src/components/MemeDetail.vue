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
      <h1 class="text-cah1italize text-h5 font-weight-bold mb-0"> {{meme.title}} </h1>
      <v-img class="mx-2 my-2" :src='meme.imageUrl' alt="MEME" />
    </v-col>
  </v-row>
  <v-row justify="center" class="align-center">
    <v-col md="8" class="d-flex align-center ml-4">
      <strong>Créateur :</strong>
      <div @click="navigateTo({name: 'history', params: {userId: meme.UserId}})">
        <v-card class="d-flex align-center mr-1" flat>
          <v-avatar rounded color="black" size="36">
            <v-icon class="white--text headline">mdi-account</v-icon>
          </v-avatar>
          <strong class="ml-1">{{meme.User.firstName}} {{meme.User.name}}</strong>
        </v-card>
      </div>
        Crée le {{ moment(meme.createdAt).format("DD/MM/YYYY") }} à {{ moment(meme.createdAt).format("HH:mm") }}
    </v-col>
  </v-row>
  <v-divider></v-divider>
  <meme-comment />
</div>
</template>

<script>
import moment from 'moment'
import MemeService from '@/services/MemeService'
import MemeComment from '@/components/MemeComment'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  components: {
    MemeComment
  },
  data () {
    return {
      meme: null,
      text: '',
      moment: moment
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
