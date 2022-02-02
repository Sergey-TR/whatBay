import Vue from "vue";
import Router from 'vue-router';

Vue.use(Router)

 const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {layout: 'main'},
            component: () => import("../views/Home")
        },
        {
            path: '/registration',
            name: 'registration',
            meta: {layout: 'main'},
            component: () => import("../views/Register")
        },
        {
            path: '/login',
            name: 'login',
            meta: {layout: 'main'},
            component: () => import("../views/Login")
        },
        {
            path: '/my_shop',
            name: 'my_shop',
            meta: {layout: 'main', auth: true},
            props: true,
            component: () => import("../views/MyShops")
        },
        {
            path: '/my_shops_shop/:id/:shop/:day',
            name: 'shop',
            meta: {layout: 'main', auth: true},
            props: true,
            component: () => import("../components/shop/Shop")
        },
        {
            path: '/calendar',
            name: 'calendar',
            meta: {layout: 'main', auth: true},
            component: () => import("../views/Calendar")
        },
        {
            path: '/newList',
            name: 'newList',
            meta: {layout: 'main', auth: true},
            props: true,
            component: () => import("../views/CreateList")
        },
        {
            path: '/create/product/:shop/:day/:id',
            name: 'createProduct',
            meta: {layout: 'main', auth: true},
            props: true,
            component: () => import("../views/CreateProduct")
        },
        {
            path: '/all/user/shops',
            name: 'allShops',
            meta: {layout: 'main', auth: true},
            component: () => import("../views/AllUserShop")
        },
        {
            path: '/all/lists/for/period',
            name: 'period',
            meta: {layout: 'main', auth: true},
            component: () => import("../views/ListForPeriod")
        }
    ]
})

router.beforeEach((to, from, next) => {
    const token = window.localStorage.getItem('saveToken')
    const requireAuth = to.matched.some(record => record.meta.auth)
    if (requireAuth && !token) {
        next('/login')
    } else {
        next()
    }
})

export default router