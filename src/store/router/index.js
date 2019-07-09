import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import Helper from '../../utils/helper/helper'
<<<<<<< HEAD

Vue.use(VueRouter)
Vue.use(Helper)
=======
import Fw from '../../utils/helper/framework'

Vue.use(VueRouter)
Vue.use(Helper)
Vue.use(Fw)
>>>>>>> 4a17492000222f7a08a1dfbba5b28f2f0a3d2cb8

let router = new VueRouter({
    mode: 'history',
    routes
})


export default router