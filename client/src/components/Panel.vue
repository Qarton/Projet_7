<template>
<!-- panneau -->
  <div>
    <v-toolbar fixed class="black" dark>
      <v-toolbar-title class="mr-4">
        <h1>
        {{ title }}
        </h1>
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
h1 {
  font-size: 25px;
}
</style>
