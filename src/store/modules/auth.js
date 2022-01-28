import axios from "axios";
import API from "../../components/composables/initApi";
import {baseURL} from "../../constance";

export default {
    actions: {
        async login({dispatch, commit}, {email, password}) {
           return  axios.post(baseURL + "login", {email, password})
                .then(res => {
                    const userId = res.data.user.id;

                    localStorage.setItem('saveToken', res.data.accessToken);
                    localStorage.setItem('saveUser', res.data.user);
                    localStorage.setItem('saveUserId', JSON.stringify(res.data.user.id));

                    commit('updateUserId', userId)
                }).catch((error) => {

                console.log(error);
                alert("Пользователя с таким именем и паролем не существует, " +
                    "пройдите регистрацию")
            })
        },
        async registration({dispatch, commit},
                           {user_name, email, password, confirmPassword, firstname, lastname}) {
           return axios.post(baseURL + 'register',
                {user_name, email, password, confirmPassword, firstname, lastname})
                .then(res => {
                    const user = res.data.user;
                    localStorage.setItem('saveToken', res.data.accessToken);
                    localStorage.setItem('saveUser', JSON.stringify(res.data.user));
                    localStorage.setItem('saveUserId', JSON.stringify(res.data.user.id));
                    //commit('auth_success', user)
                    alert("Регистрация прошла успешно")
                })
        },
        async logout({commit}) {
            const user = '';
            localStorage.clear()
            commit('logoutUser', user)
        },
//http://dev.gruppa4.ru:12012/
        async currentUser({commit}) {
            const id = localStorage.getItem('saveUserId')
             if (id) {
                API.get(baseURL + 'users' + '?id=' + id)
                    .then(res => {
                        const user = res.data
                        localStorage.setItem('currentUser', res.data)
                        commit('auth_success', user)
                    })
             }
        }
    },
     mutations: {
        auth_success(state, user) {
            state.user = user
        },
        logoutUser(state, user) {
            state.user = user
        },
        updateUserId(state, userId) {
            state.userId = userId
        },
     },
     state: {
        user: [],
        userId: ''
     },
     getters: {
        getUser(state) {
            return state.user
        },
        getUserId(state) {
            if (!Object.keys(state.user).length) {
                return null
            } else {
                return state.user[0].id
            }
         },
         userId(state) {
            return state.userId
         }
    }
}