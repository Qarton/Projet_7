<template>
  <div>
    <v-toolbar fixed class="cyan" dark>
      <v-toolbar-title class="mr-4">
        {{ title }}
      </v-toolbar-title>
    </v-toolbar>
    <div class="py-4 px-2">
      <slot> Pas de slot défini </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style scoped>
</style>
