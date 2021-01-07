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
      </v-card-actions>
      </v-card>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style scoped>

</style>
