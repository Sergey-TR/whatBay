import API from "../../components/composables/initApi";
import axios from "axios";
import {baseURL} from "../../constance";

export default {
    actions: {
       async getCategories(ctx) {
            API.get(baseURL + 'categories')
                .then(res => {
                    const allCategories = res.data
                    ctx.commit('updateAllCategories', allCategories)
                })
        },

        async createNewCategory({dispatch, commit}, {category_name, user_id}) {
           API.post(baseURL + 'categories', {category_name, user_id})
               .then(res => {
                   console.log(res.data)
                   localStorage.setItem('category', JSON.stringify(res.data))
                   //commit('updateAllCategories')
               })
        },
        async getCategoryFromUserId({dispatch, commit}, {id}) {
           API.get(baseURL + 'categories' + '?user_id=' + id)
               .then(res => {
                   const categoryUserId = res.data
                   commit('updateCategoryUserId', categoryUserId)
               })
        }
    },
    mutations: {
        updateAllCategories(state, allCategories) {
            state.categories = allCategories
        },
        updateCategoryUserId(state, categoryUserId) {
            state.categoriesUserId = categoryUserId
        }
    },
    state: {
        categories: [],
        categoriesUserId: []
    },
    getters: {
        getAllCategories(state) {
            return state.categories
        },
        getCategoryUserId(state) {
            return state.categoriesUserId
        }
    }
}