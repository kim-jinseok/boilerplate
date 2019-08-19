import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'babel-polyfill'
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
import router from './store/router'
import store from './store'
import { sync } from 'vuex-router-sync'
import App from './App'
import init from './utils/init.js'
import Vuetify from 'vuetify'
import moment from 'vue-moment'

Vue.config.productionTip = false

// Vue.use(Antd)

sync(store, router, Vuetify)

new Vue({
    store,
    router,
    Vuetify,
    moment,
    ...init,
    render: h => h(App)
}).$mount('#app')