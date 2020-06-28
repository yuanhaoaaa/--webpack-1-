// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import http from '@/api';

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        state: {
            exam: 'as',
        },
        getters: {
            exam(state) {
                return state.exam;
            },
        },
        mutations: {
            setExam(state, payload) {
                state.exam = payload;
            },
        },
        actions: {
            getExam({ commit }, params) {
                return new Promise((resolve) => {
                    let {scoreId, busLine} = params;
                    http.get(`http://dev.beiwaiguoji.com/open/examDepart/examScore/queryCertificateInfo?scoreId=${scoreId}&busLine=${busLine}`).then(res => {
                        commit('setExam', { ...res.certificateInfo });
                        resolve();
                    });
                });
            },
        },
    });
}
