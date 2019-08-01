<template>
  <!-- <div class="main-nav">
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
  </div> -->
  <v-app id="inspire" dark>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>


    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Jikyung</v-toolbar-title>
    </v-toolbar> 
      <router-view></router-view>
    <!-- <v-content> 
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
           
              </template>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content> -->
    <v-footer app fixed>
      <span>    &copy; CopyRight Jikyung 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { routes } from '../store/router/routes.js'
  import homePage from './home-page.vue'

  export default {

    components: {
        homePage
    },
    
    props: {
      source: String
    },
    data() {
      return {
        routes,
        collapsed: true,
        drawer: false
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

  .theme--dark.v-toolbar{
  background-color : #80cbc4;
  }
 
</style>
