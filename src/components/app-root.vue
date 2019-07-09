
<script>
  import NavMenu from './nav-menu'
  import NotFound from './study/NotFound'
  import { routes } from '.routes'
  export default {
    components: {
      'nav-menu': NavMenu,
      'error': NotFound
    },
    computed : {
      isShow2() {
        log(this.$store.state.loggin);
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
<template>

  <div id="app" class="container-fluid">
    <div class="row" v-if="isShow2">
      <div class="col-md-3">
        <nav-menu params="route: route"></nav-menu>
      </div>
      <div class="col-sm-9">
        <router-view></router-view>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-sm-12">
        <router-view></router-view>
      </div>
      
    </div>

    
  </div>

</template>
<style>
</style>
