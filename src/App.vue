
<template>
  <div id="app" class="container-fluid"> 
    <div class="row" v-if="isShow2">
      <div class="col-md-3">
        <nav-menu params="route: route"></nav-menu>
      </div>
      <div class="col-sm-9">
        <b>111</b>
        <router-view></router-view>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-sm-12">  <b>111</b>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import NavMenu from './components/nav-menu'
  import NotFound from './components/study/NotFound'
  import { routes } from './store/router/routes.js'
  export default {
    components: {
      'nav-menu': NavMenu,
      'error': NotFound
    },
    computed : {
      isShow2() {
      
        return this.$store.state.loggin
      }
    },
    data() {

      return {
        routes,
        isShow: true
      }
    }
  }
</script>
<style>
</style>
