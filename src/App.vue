<template>
  <v-app id="app" dark>
    <v-content>
      <AppRoot>
      </AppRoot>
    </v-content>
  </v-app>
</template>

<script>
  import AppRoot from '../src/components/app-root.vue'

export default {
  name: 'App',
  components: {
    AppRoot
  },
  data () {
    return {
      //
    }
  }
}
</script>
