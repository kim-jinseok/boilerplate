

<template>
  <div v-if="this.$store.state.l.loggin">
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <!-- <v-sheet class="pa-3 primary lighten-2">
        <v-text-field
          v-model="search"
          label="Search Category"
          dark
          flat
          solo-inverted
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
          box
        ></v-text-field>
      </v-sheet>
     <v-treeview :items=" this.$store.state.c.category" activatable :search="search">
        <template slot="label" slot-scope="{ item }">
          <p style="margin-bottom : 0px; font-size:15px;" @click.prevent="getRecBoard(item.id)">
            <v-icon small dark>folder_open</v-icon>
            {{ item.name }}
          </p>
        </template>
      </v-treeview>-->

      <v-sheet class="pa-3 primary lighten-2">
        <v-text-field
          v-model="search"
          label="Search Category"
          dark
          flat
          solo-inverted
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
          box
          v-on:keyup.enter="searchChildValue(search)"
        ></v-text-field>
      </v-sheet>
      <v-treeview
        :items=" this.$store.state.c.category"
        activatable
        :search="search"
        :open="open"
        item-key="name"
      >
        <template slot="label" slot-scope="{ item ,open, selected}">
          <p style="margin-bottom : 0px; font-size:15px;" @click.prevent="getRecBoard(item.id)">
            <v-icon small dark>{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
            {{ item.name }}
          </p>
        </template>
      </v-treeview>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-layout row wrap>
        <v-flex xs2>
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        </v-flex>
        <v-flex xs5>
          <v-toolbar-title class="toolbarCompanyTitle" @click.prevent="home()">
            <v-img :src="require('@/assets/jikyungLogo.png')" min-width="150px" min-height="15px"></v-img>
          </v-toolbar-title>
        </v-flex>
        <v-flex xs2>
          <v-icon sm left @click.prevent="back()">arrow_back</v-icon>
        </v-flex>
        <v-flex xs3>
          <v-btn flat color="red" style="margin-left:20px;" @click.prevent="logout()">logout</v-btn>
        </v-flex>
      </v-layout>
    </v-toolbar>
    <router-view></router-view>
    <v-footer app fixed>
      <span>&copy; CopyRight Jikyung 2019</span>
    </v-footer>
  </div>

  <div v-else>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-title></v-toolbar-title>
    </v-toolbar>
    <router-view></router-view>
    <v-footer app fixed>
      <span>&copy; CopyRight Jikyung 2019</span>
    </v-footer>
  </div>
</template>

<script>
import auth from "./auth";
import { routes } from "../store/router";
import { userService } from "../modules/auth";
import board from "./getRecBoard";
import homePage from "./home-page";
export default {
  components: {
    auth,
    board,
    homePage
  },
  created() {
    this.isShow = this.$store.state.l.loggin;
  },
  data() {
    return {
      routes,
      isShow: false,
      drawer: false,
      date: new Date(),
      search: null,
      categoryData: [],
      categoryChildData: []
    };
  },
  //computed: {
  // filter() {
  //   return this.categoryData
  //     ? (item, search, textKey) => item[textKey].indexOf(search) > -1
  //     : undefined;
  // },
  methods: {
    home() {
      this.$router.push("/home-page");
    },
    logout() {
      userService.logout();

      this.$store.state.l.loggin = false;
      this.$router.push("/auth");
    },
    getRecBoard(id) {
      this.$router.push("/getRecBoard/" + id);
    },
    back() {
      this.$router.go(-1);
    },
    searchChildValue(val) {
      let arr = [];
      arr = this.$store.state.c.category;
      console.log("1");
      console.log(val);
      let selectedParents = "";

      arr.forEach(function(value, key) {
        let $this = this;
        let parents = value.name;
        if (val !== parents) {
          if (!helper.isNull(value.children)) {
            value.children.forEach(function(value, key) {
              let child = value.name;
              if (child.indexOf(val) > 0) {
                selectedParents = parents;
                console.log("2");
                console.log(child);
              }
            });
          }
        }
      });

      console.log("1");
      console.log(selectedParents);
    }
  }
};
</script>

<style>
.logoutIcon {
  float: right;
  padding-top: 8px;
}
.toolbarCompanyTitle {
  float: left;
  padding-top: 8px;
  color: white;
}
router-link {
  text-decoration: none;
}
.v-text-field.v-text-field--solo .v-input__control {
  min-height: 25px;
}
.v-text-field__slot {
  padding: 0px;
}
.v-treeview-node__root {
  min-height: 25px;
}
.v-icon--left {
  margin: 12px;
  padding-left: 43px;
}
</style>
