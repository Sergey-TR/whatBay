import API from "../../components/composables/initApi";
import axios from "axios";
import {baseURL} from "../../constance";

export default {
    actions: {
        async createNewList({dispatch, commit}, {list_name, shop_id, created_at, user_id}) {
            API.post(baseURL + 'lists', {list_name, shop_id, created_at, user_id})
                .then(res => {
                    localStorage.setItem('list', res.data)
                })
        },
        async allLists(ctx) {
            API.get( baseURL + 'lists')
                .then(res => {
                    const lists = res.data
                    ctx.commit('updateAllLists', lists)
                })
        },
        async getListFromUserId({dispatch, commit}, {id}) {
            return API.get(baseURL + 'lists' + '?user_id=' + id)
                .then(res => {
                    const listUserId = res.data
                    commit('updateListUserId', listUserId)
                })

        },
        async getOrderUser({dispatch, commit}, {user_id}) {
            return API.get(baseURL + 'orders' + '?user_id=' + user_id)
                .then(res => {
                    const listQty = res.data
                    commit('updListQty', listQty)
                })
        },
        async getUserListByDate({dispatch, commit}, {user_id, day}) {
           return  API.get(baseURL + 'orders' + '?user_id=' + user_id + '&day=' + day)
                .then(res => {
                    const listByDay = res.data
                    commit('updateListByDay', listByDay)
                })
        },
        async changeCheckbox({dispatch, commit}, {id}) {
            console.log('check')
            return API.patch(baseURL + 'orders/' + id, {is_success: true});
            console.log('after check')
        },
        async unCheckCheckbox({dispatch, commit}, {id}) {
            console.log('uncheck')
            return API.patch(baseURL + 'orders/' + id, {is_success: false});
            console.log('after uncheck')
        },
    },

    mutations: {
        updateAllLists(state, lists) {
            state.lists = lists
        },
        updateListUserId(state, listUserId) {
            state.listUserId = listUserId
        },
        updListQty(state, listQty) {
            state.listQty = listQty
        },
        updateListByDay(state, listByDay) {
            state.listByDay = listByDay
        }
    },

    state: {
        lists: [],
        listUserId: [],
        listQty: '',
        listByDay: []
    },

    getters: {
        getAllLists(state) {
            return state.lists
        },
        getListUserId(state) {
            return state.listUserId
        },
        getQty(state) {
            return state.listQty
        },
        getListByDay(state) {
            return state.listByDay
        }
    }
}