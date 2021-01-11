<template>
      <v-card class="mb-2" flat>
        <v-card-title>
          <p class="text-capitalize text-h5 font-weight-bold mb-0"> {{title}} </p>
        </v-card-title>
      <slot> Slot vide </slot>
      </v-card>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style scoped>

</style>
