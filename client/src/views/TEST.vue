<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
      ></v-avatar>

      <v-tabs centered class="ml-n9" color="grey darken-1">
        <v-tab v-for="link in links" :key="link">
          {{ link }}
        </v-tab>
      </v-tabs>

      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
      ></v-avatar>
    </v-app-bar>

    <v-container>
      <v-row justify="space-between">
        <v-col md="3">
          <v-card dark tile flat color="error">
            <v-card-text>#1</v-card-text>
          </v-card>
        </v-col>
        <v-col md="3">
          <v-card dark tile flat color="pink darken-4">
            <v-card-text>#2</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="space-around">
        <v-col md="3">
          <v-card dark tile flat color="error">
            <v-card-text>#3</v-card-text>
          </v-card>
        </v-col>
        <v-col md="3">
          <v-card dark tile flat color="pink darken-4">
            <v-card-text>#4</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    links: ['Dashboard', 'Messages', 'Profile', 'Updates']
  })
}
</script>
