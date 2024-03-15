// import { createRouter, createWebHistory } from 'vue-router'
// import LoginComponent from '../views/Login.vue'
// import HomeComponent from '../views/Home.vue'
// const routes = [
//     {
//         path: '/login',
//         name: 'Login',
//         component: LoginComponent
//     },
//     {
//         path: '/',
//         name: 'Home',
//         component: HomeComponent
//     },
//     {
//         path: '/register',
//         name: 'Register',
//         component: () => import('../views/Register.vue')
//     },
//     {
//         path: '/admin',
//         name: 'Admin',
//         component: () => import('../views/Admin.vue')
//     },
//     {
//         path: '/page1',
//         name: 'page1',
//         component: () => import('../views/page1.vue')
//     },
//     {
//         path: '/page1_1',
//         name: 'page1_1',
//         component: () => import('../views/page1_1.vue')
//     }
// ]
//
// const router = createRouter({
//     history: createWebHistory(process.env.BASE_URL),
//     routes
// })
//
// export default router
import VueRouter from 'vue-router'
import Vue from 'vue'

import LoginComponent from '../views/Login.vue'
import HomeComponent from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: LoginComponent
    },
    {
        path: '/',
        name: 'Home',
        component: HomeComponent
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('../views/Admin.vue'),
        children: [
            {
                path: '/page1_1',
                name: 'Page1_1',
                component: () => import('../views/page1_1.vue')
            },
            {
                path: '/page1',
                name: 'Page1',
                component: () => import('../views/page1.vue')
            }
        ]
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
