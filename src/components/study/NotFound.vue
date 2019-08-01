<template>
 <v-app id="inspire" dark>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-title>Jikyung</v-toolbar-title>
    </v-toolbar> 
      <router-view></router-view>
    <v-footer app fixed>
      <span>    &copy; CopyRight Jikyung 2019</span>
    </v-footer>
  </v-app>
</template>

<script>

import auth from '../auth'

  export default {

  }
</script>
<style>
</style>
