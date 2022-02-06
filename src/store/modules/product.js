import API from "../../components/composables/initApi";
import axios from "axios";
import {
    baseURL
} from "../../constance";

export default {
    actions: {
        async getOrderProducts({
            dispatch,
            commit
        }, {
            order_id,
            shop_name,
            user_id,
            day
        }) {
            return API.get(baseURL + 'orders' + '?order_id=' + order_id + '&shop=' + shop_name +
                    '&user_id=' + user_id + '&day=' + day)
                .then(res => {
                    const productList = res.data
                    commit('updateProductList', productList)
                })
        },

        async createNewOrdersProduct({
            dispatch,
            commit
        }, {
            product_name,
            category_id,
            category_name,
            shop_name,
            shop_id,
            day,
            order_id,
            is_success,
            user_id,
            list_id
        }) {
            API.post(baseURL + 'orders', {
                    product_name,
                    category_id,
                    category_name,
                    shop_name,
                    shop_id,
                    day,
                    order_id,
                    is_success,
                    user_id,
                    list_id
                })
                .then(res => {
                    localStorage.setItem('product', JSON.stringify(res.data))
                })
        },
        async createNewProduct({
            dispatch,
            commit
        }, {
            product_name,
            category_id,
            user_id
        }) {
            API.post(baseURL + 'products', {
                    product_name,
                    category_id,
                    user_id
                })
                .then(res => {
                    localStorage.setItem('product', JSON.stringify(res.data))
                })
        },
        async getProductFromUserId({
            dispatch,
            commit
        }, {
            id
        }) {
            API.get(baseURL + 'products' + '?user_id=' + id)
                .then(res => {
                    const productUserId = res.data
                    commit('updateProductUserId', productUserId)
                })
        }

    },
    mutations: {
        updateProductList(state, productList) {
            state.list = productList
        },
        updateAllProducts(state, allProducts) {
            state.products = allProducts
        },
        updateProductUserId(state, productUserId) {
            state.productsUserId = productUserId
        }
    },
    state: {
        list: [],
        productsUserId: []
    },
    getters: {
        getListProducts(state) {
            return state.list
        },
        getProductUserId(state) {
            return state.productsUserId
        }
    }
}