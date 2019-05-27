import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './services/alert.module';
import { authentication } from './services/authentication.module';
import { users } from './services/users.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        authentication,
        users
    }
});
