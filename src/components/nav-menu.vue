<template>
  <div class="main-nav">
    <nav class="navbar navbar-expand-md navbar-dark">
      <button class="navbar-toggler" type="button" @click="toggleCollapsed">
        <span class="navbar-toggler-icon"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>

      <router-link class="navbar-brand" to="/"><icon :icon="['fab', 'microsoft']" /> ASP.NET Core & Vue.js</router-link>

      <transition name="slide">
        <div :class="'collapse navbar-collapse' + (!collapsed ? ' show':'')" v-show="!collapsed">
          <ul class="navbar-nav">
            <li class="nav-item" v-for="(route, index) in navNoShow(routes, 'error')" :key="index">
              <router-link :to="route.path"  exact-active-class="active">
                <icon :icon="route.icon" class="mr-2 menu-icon" /><span>{{ route.display }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </transition>
    </nav>


  </div>

</template>

<script>
  import { routes } from '../store/router/routes.js'

<<<<<<< HEAD


=======
>>>>>>> 4a17492000222f7a08a1dfbba5b28f2f0a3d2cb8
  export default {
   

    data() {
      return {
        routes,
        collapsed: true,

      }
    },
    methods: {
      toggleCollapsed: function (event) {
        this.collapsed = !this.collapsed
      },
      navNoShow: function (route, noShowName) {
        return helper.navNoShow(route, noShowName)
      }
    }
  }
</script>

<style scoped>
  .slide-enter-active, .slide-leave-active {
    transition: max-height .35s
  }

  .slide-enter, .slide-leave-to {
    max-height: 0px;
  }

  .slide-enter-to, .slide-leave {
    max-height: 20em;
  }
</style>
