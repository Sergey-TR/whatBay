import axios from "axios";
import router from "../../router/router";

const api = axios.create();
//start request
api.interceptors.request.use(config => {
    if (localStorage.getItem('saveToken')) {
        config.headers.authorization = `Bearer ${localStorage.getItem('saveToken')}`
    }
    return config
}, error => {

})
//end request

api.interceptors.response.use(config => {
    if (localStorage.getItem('saveToken')) {
        config.headers.authorization = `Bearer ${localStorage.getItem('saveToken')}`
    }
    return config
}, error => {
    if (error.response.status === 401) {
        router.push('/login')
    }
})

export default api