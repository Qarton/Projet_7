<template>
<v-app id="inspire">
  <page-header />
  <main>
    <v-container fluid>
    <router-view/>
    </v-container>
  </main>
</v-app>
</template>

<script>
import PageHeader from './components/Header.vue'
export default {
  name: 'app',
  components: {
    PageHeader
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
