
// 引入 Vue CLI 服务的 defineConfig 函数
const { defineConfig } = require('@vue/cli-service')

// 导出配置函数，定义项目配置
module.exports = defineConfig({
  // 启用对依赖的转译，例如 Babel 转译
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // 设置开发服务器监听的端口
    port: 8085,
    // 配置代理，以解决跨域问题
    proxy: {
      '/api': {
        // 目标后端服务器地址
        target: 'http://localhost:8080',
        // 允许跨域请求
        changeOrigin: true,
        // 重写请求路径，将 /api 替换为空字符串
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

})
