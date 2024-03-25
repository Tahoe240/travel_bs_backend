
// export default router
import VueRouter from 'vue-router'
import Vue from 'vue'

import LoginComponent from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: '首页',
        redirect: '/home',
        component: () => import('../views/front/Index.vue'),
        children:[
            {
                path: 'home',
                name: 'home',
                component: () => import('../views/front/home/Home.vue')
            },
            {
                path: '/travelnote/:id',
                name: "游记详情",
                component: () => import('../views/front/travelnote/NoteDetail.vue')
            },
            {
                path: '/write/travelnote',
                name: '写游记',
                component: () => import('../views/front/travelnote/WriteTravelNote.vue')
            },

        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginComponent
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/editortest',
        name: 'EditorTest',
        component: () => import('../views/front/travelnote/WangEditor.vue')
    },
    {
        path: '/mapItem',
        name: '地图测试',
        component: () => import('../components/map/MapItem.vue')
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('../views/admin/Admin.vue'),
        children: [
            {
                path: '/user/list',
                name: 'user',
                component: () => import('../views/admin/users/User.vue')
            },
            {
                path: '/user/role',
                name: 'role',
                component: () => import('../views/admin/users/Role.vue')
            },
            {
                path: '/user/permission',
                name: 'permission',
                component: () => import('../views/admin/users/Permission.vue')
            },
            {
                path: '/user/role_permission',
                name: 'role_permission',
                component: () => import('../views/admin/users/Role_Permission.vue')
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
