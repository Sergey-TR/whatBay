import Vue from "vue";
import Vuex from "vuex"
import calendar from "./modules/calendar";
import shop from "./modules/shop";
import auth from "./modules/auth";
import product from "./modules/product";
import category from "./modules/category";
import list from "./modules/list";

Vue.use(Vuex)

export default
    new Vuex.Store({
        actions: {},
        getters: {},
        modules: {
            calendar,
            shop,
            auth,
            product,
            category,
            list
        }
})