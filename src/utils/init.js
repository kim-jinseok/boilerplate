import Vue from 'vue'
import store from '../store'
import axios from 'axios'
import router from '../store/router'
import { FontAwesomeIcon } from '../utils/plugin/icons'

const user = (localStorage.accessToken !== undefined ? helper.parseJwt(localStorage.accessToken) : "")
const category = (localStorage.categoryData !== undefined ? localStorage.categoryData : "")

const vueGlobalSettings = function() {
    Vue.prototype.$user = user
    Vue.prototype.$http = axios

    Vue.component('icon', FontAwesomeIcon)
}



export default {

    created() {   

 
        if (!helper.isNull(localStorage.accessToken)) {
         

            const current_time = Date.now() / 1000;

            if (user.exp < current_time) {
                store.state.loggin = false
                router.push("/auth")

            } else {
                store.state.loggin = true
                store.state.user = user
                store.state.category = JSON.parse(category)
                axios.defaults.headers.post['Content-Type'] = 'application/json';
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.accessToken}`;

                vueGlobalSettings()
            }
        } else {
            console.log('localStorage false')
            console.log(localStorage.accessToken)
            store.state.loggin = false;
            router.push("/auth")
        }
    }
}