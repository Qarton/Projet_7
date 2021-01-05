<template>
      <v-card>
      <v-toolbar fixed class="cyan" dark>
        <v-toolbar-title class="mr-4 flex text-center">
        {{title}}
        </v-toolbar-title>
      </v-toolbar>
      <slot> Slot vide </slot>
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
</template>

<script>
export default {
  props: ['title'],
  data () {
    return {
      likeTest: {
        like: 0
      }
    }
  }
}
</script>

<style scoped>

</style>
