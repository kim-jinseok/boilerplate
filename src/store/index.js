import Vue from 'vue'
import Vuex from 'vuex'

import VueStringFilter from 'vue-string-filter'
import VueFilterDateFormat from 'vue-filter-date-format'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

Vue.use(VueFilterDateFormat)
Vue.use(VueStringFilter)

Vue.use(Vuex)

Vue.config.productionTip = true



// STATE
const state = {
    user:[],
    loggin: false,
    categoryId : '',
    board : [],
    category : []
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