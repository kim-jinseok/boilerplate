
<template>
  <a-layout id="app">
    <a-layout-sider
      width="90%"
      breakpoint="lg"
      collapsedWidth="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
      v-if=$store.state.loggin
    >
        <a-directory-tree
          multiple
          defaultExpandAll
          @select="onSelect"
          @expand="onExpand"
          :treeData="gData"
        />
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0, textAlign:'center' }">
          <router-link to="/" class="nav-link">
        <img src="http://125.7.231.48/Content/images/vendor/vendorLogo.png" style="width:180px;" />
        <a-avatar shape="square"  icon="logout" @click.prevent="logout" class="imgLogo" />
          </router-link>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
         
              <router-view></router-view>
           
        </div>
      </a-layout-content>
      <a-layout-footer style="textAlign: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import { userService } from './modules/auth';
  import NavMenu from './components/nav-menu'
  import NotFound from './components/study/NotFound'
  import { routes } from './store/router/routes.js'
 
 const gData = [] 

  export default {
    components: {
      'nav-menu': NavMenu,
      'error': NotFound
    },
    created() {
      this.getCategory()
    },
    data() {

      return {
        gData,
        routes,
      }
    },
    methods: {
      async getCategory(){
          let param = { user_id : this.$store.state.user.userid}
          let m = await fw.getCategory(param);

          this.gData = m;
          
      },
      logout() {
        userService.logout();

        this.$store.state.loggin = false
        this.$router.push("/auth")
      },
      onSelect (keys) {
        console.log('Trigger Select', keys);
      },
      onExpand () {
        console.log('Trigger Expand');
      },
      onCollapse(collapsed, type) {
        console.log(collapsed, type);
      },
      onBreakpoint(broken) {
      
      }
    }
  }
</script>
<style>
.ant-tree-directory{
  color:red !important;
}

.ant-tree-node-content-wrapper{
  color:white !important;
}
.imgLogo{
  position:initial;
  float:right;
  margin:15px;
  display:block;
}
</style>
