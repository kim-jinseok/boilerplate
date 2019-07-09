import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import Helper from '../../utils/helper/helper'

Vue.use(VueRouter)
Vue.use(Helper)

let router = new VueRouter({
    mode: 'history',
    routes
})


export default router