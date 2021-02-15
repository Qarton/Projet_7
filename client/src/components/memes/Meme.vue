<template>
  <div v-if="this.meme!=null">
    <h2 class="text-capitalize text-h5 font-weight-bold" @click="navigateTo({name: 'meme-detail', params: {memeId: meme.id}})"> {{meme.title}} </h2>
        <v-img  class="mb-2" :src='meme.imageUrl' alt="MEME" @click="navigateTo({name: 'meme-detail', params: {memeId: meme.id}})" />
        <pseudo :data="meme" />
  </div>
</template>

<script>
import moment from 'moment'
import Pseudo from '@/components/Pseudo'
export default {
  props: ['memeData'],
  data () {
    return {
      meme: null,
      moment: moment
    }
  },
  components: {
    Pseudo
  },
  async mounted () {
    this.meme = this.memeData
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style>

</style>
