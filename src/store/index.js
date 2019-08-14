import Vue from 'vue'
import Vuex from 'vuex'

import VueStringFilter from 'vue-string-filter'
import VueFilterDateFormat from 'vue-filter-date-format'
import Vuetify from 'vuetify'

import router from '../store/router/index'
//import moduleB from '../modules/boardState.js'


Vue.use(Vuetify)

Vue.use(VueFilterDateFormat)
Vue.use(VueStringFilter)

Vue.use(Vuex)

Vue.config.productionTip = true




const loginState = {

    state: {
        user: [],
        loggin: false
    },
    actions: {}

}


const boardState = {

    state: {
        board: [],
        arrData: [],
    },
    // getters: {
    //     doArrData: (state, getters) => {

    //         return state.arrData
    //     }
    // },
    actions: {

        loadBoard({ dispatch, state, rootState }) {

            try {
                var param = {
                    category_id: router.currentRoute.params.bid,
                    user_id: rootState.l.user.userid
                }

                /// 바로 데이터를 받아와서 하려면 async, await를 사용해야함
                const data = helper.getJSON("board_get", param)

                if (data === null) { return }

                data.then(function (result) {

                    state.board = result;


                    try {
                        var param = {
                            board_id: result[0].board_id
                        }
                        /// 바로 데이터를 받아와서 하려면 async, await를 사용해야함
                        const data = helper.getJSON("files_get", param)

                        data.then(function (result) {

                            let obj = {};
                            let arr = [];

                            result.forEach(function (value, key) {

                                obj = {};

                                obj.No = value.rn;
                                obj.fileName = value.file_name;
                                obj.Rev = value.revision;

                                obj.fileId = value.file_id
                                obj.fileHistoryId = value.file_history_id
                                obj.fileSize = value.file_size
                                obj.fileType = value.file_type
                                obj.createUsername = value.create_username
                                obj.createDate = value.create_date

                                arr.push(obj);

                            });

                            state.arrData = arr
                            localStorage.setItem('boardFilesData', JSON.stringify(state.arrData))
                        })
                    } catch (err) {

                    }
                })

            } catch (err) {
                console.log(err)
            }
        }
    }
}



const categoryState = {

    state: {
        categoryId: '',
        category: []
    },
    actions: {}
}



const store = new Vuex.Store({
    namespaced: true,
    modules: {

        l: loginState,
        b: boardState,
        c: categoryState

    }
})


export default store
