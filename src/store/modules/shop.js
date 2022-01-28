import axios from "axios";
import API from "../../components/composables/initApi";
import {baseURL} from "../../constance";

export default {
    actions: {
        async getOptionsList(ctx) {
            try {
                const res = await fetch(
                    baseURL + "shops"
            );
                const shopsOptionList = await res.json()
                ctx.commit('updateShopsOptionList', shopsOptionList)
            } catch (e) {
                console.log('err', e)
                console.error(e)
            }
        },
        async createNewShop({dispatch, commit}, {shop_name, user_id}) {
            API.post(baseURL + 'shops', {shop_name, user_id})
                .then(res => {
                    localStorage.setItem('shop', res.data)
                })
        },
        async getShopFromUserId({dispatch, commit}, {id}) {
            API.get(baseURL + 'shops' + '?user_id=' + id)
                .then(res => {
                   const shopUserId = res.data
                    commit('updateShopUserId', shopUserId)
                })
        }
    },
    mutations: {
        updateAllShopsList(state, shopsList) {
            state.shopsList = shopsList
        },
        updateShopsOptionList(state, shopOptionList) {
            state.shopsOptionList = shopOptionList
        },
        updateShopUserId(state, shopUserId) {
            state.shopUserId = shopUserId
        }
    },
    state: {
        shopsList: [],
        shopsOptionList: [],
        shopUserId: []
    },
    getters: {
        getShopsList(state) {
            return state.shopsList
        },
        getShopsOptionList(state) {
            return state.shopsOptionList
        },
        getShopUserId(state) {
            return state.shopUserId
        }
    }
}