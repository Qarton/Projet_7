<template>
<div>
  <!-- Affichage de L'activité d'un utilisateur -->
    <v-row v-if="isUserLoggedIn && userId===user.id">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="350"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="#2A3B4D"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Supprimer votre compte
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          Suppression du compte
        </v-card-title>
        <v-card-text>Attention vous allez supprimer votre compte et tout le contenu qui lui est lié.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#2A3B4D"
            text
            @click="dialog = false"
          >
            Non
          </v-btn>
          <v-btn
            color="#2A3B4D"
            text
            @click="deleteUser(userId)"
          >
            Oui
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <v-row justify="center">
    <v-col
    v-if="isUserLoggedIn && userId===user.id"
    md="8">
      <h1>Votre Historique</h1>
    </v-col>
    <v-col v-else md="8">
      <h1>Historique de {{search.firstName}} {{search.name}}</h1>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col md="8">
      <h2 v-if="isUserLoggedIn && userId===user.id">Vos Memes :</h2>
      <h2 v-else>Memes Postés :</h2>
      <!-- Affichage des Meme -->
    <v-expansion-panels>
    <v-expansion-panel
      v-for="meme in search.Memes"
      :key="'M'+meme.id">
      <v-expansion-panel-header class="title">
        <h3>
        {{meme.title}}
        </h3>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row justify="center">
          <v-col md="8">
            <v-img :src='meme.imageUrl' alt="MEME" @click="navigateTo({name: 'meme-detail', params: {memeId: meme.id}})" />
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col md="8">
      <h2 v-if="isUserLoggedIn && userId===user.id">Vos commentaires :</h2>
      <h2 v-else>Commentaires postés :</h2>
      <!-- Affichage de L'activité des commentaires -->
          <v-expansion-panels>
    <v-expansion-panel v-for="comment in search.Comments" :key="'C'+comment.id">
      <v-expansion-panel-header class="subtitle">
        <h3>
        Commentaire du {{ moment(comment.createdAt).format("DD/MM/YYYY") }} à {{ moment(comment.createdAt).format("HH:mm") }}
        </h3>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
          <p rounded-pill class="text-h6 black--text">{{comment.text}}</p>
          <v-btn @click="navigateTo({name: 'meme-detail', params: {memeId: comment.MemeId}})" class="black" dark>Accéder au Meme</v-btn>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
    </v-col>
  </v-row>
</div>
</template>

<script>
import moment from 'moment'
import AuthenticationService from '@/services/AuthenticationService'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  data () {
    return {
      moment: moment,
      userId: null,
      search: {},
      dialog: false
    }
  },
  async mounted () {
    this.userId = await this.$route.params.userId
    this.search = (await AuthenticationService.index(this.userId)).data
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async deleteUser (userId) {
      try {
        await AuthenticationService.delete(userId)
        this.$store.commit('setToken', null)
        this.$store.commit('setUser', null)
        this.$router.push({
          name: 'meme'
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
