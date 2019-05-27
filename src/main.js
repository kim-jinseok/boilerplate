import Vue from 'vue'

import router from './store/router'
import store from './store'
import { sync } from 'vuex-router-sync'
import App from './App'
import init from './utils/init.js'


Vue.config.productionTip = false

sync(store, router)

new Vue({
    store,
    router,
    ...init,
    render: h => h(App)
}).$mount('#app')