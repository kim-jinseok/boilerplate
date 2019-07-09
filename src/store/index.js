import Vue from 'vue'
import Vuex from 'vuex'

import VueStringFilter from 'vue-string-filter'
import VueFilterDateFormat from 'vue-filter-date-format'


Vue.use(VueFilterDateFormat)
Vue.use(VueStringFilter)

Vue.use(Vuex)

Vue.config.productionTip = true



// STATE
let state = {
    user: null,
    loggin: false
}

// MUTATIONS
const mutations = {

    }
    // ACTIONS
const actions = ({

})


let store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store