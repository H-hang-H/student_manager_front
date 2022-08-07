const {
  defineConfig
} = require('@vue/cli-service')
module.exports = {
  publicPath: "./",
  assetsDir: "static",
  outputDir: 'dist',
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // assetSubDirectory:'static',
    // assetsPublicPath:'/',
    // 当前的端口
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        // 设置要访问的接口
        target: 'http://112.74.163.235:9090',
        // target: 'http://localhost:9090',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
})