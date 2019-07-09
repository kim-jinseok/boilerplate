import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import Helper from '../../utils/helper/helper'
import Fw from '../../utils/helper/framework'

Vue.use(VueRouter)
Vue.use(Helper)
Vue.use(Fw)

let router = new VueRouter({
    mode: 'history',
    routes
})


export default router