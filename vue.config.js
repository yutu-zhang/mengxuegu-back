module.exports = {
    // 基本路径  
    publicPath: './',
    // 输出路径   
    outputDir: 'dist',
    // 静态资源    
    assetsDir: './',
    // eslint-loader是否在保存时候检查  
    lintOnSave: false,
    // 服务项配置    
    devServer: {
        host: 'localhost',
        port: 8080,
        https: false,
        open: true,
　　 // 设置代理proxy
        proxy: {
            [process.env.VUE_APP_BASE_API]:{
               target:process.env.VUE_APP_SERVICE_URL,
               changeOrigin:true,    //表示是否跨域，
               pathRewrite:{           //表示需要rewrite重写的
                   ['^' + process.env.VUE_APP_BASE_API]:''
               }
           }
        }   
    }
}