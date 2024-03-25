import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex); // 使用Vuex插件

/**
 * 创建并导出一个Vuex.Store实例
 * @returns {Object} 返回一个配置了state, mutations, actions和modules的Vuex.Store实例
 */
export default new Vuex.Store({
    state: {
        HOST: 'http://localhost:8880', // API主机地址
        login_user:localStorage.getItem("token") || {},
    },
    mutations: {
        /**
         * 更新登录用户信息
         * @param {Object} state Vuex的state对象
         * @param {Object} payload 新的用户登录信息
         */
        updateLoginUser(state,payload){
            localStorage.setItem("token",payload.token); // 设置token
            state.login_user = payload; // 更新state中的登录用户信息
        },
        /**
         * 移除登录用户信息
         * @param {Object} state Vuex的state对象
         */
        removeLoginUser(state){
            localStorage.removeItem("token"); // 移除token
            state.login_user = {}; // 重置state中的登录用户信息
        },
    },
    actions: {
    },
    modules: {
    }
})
