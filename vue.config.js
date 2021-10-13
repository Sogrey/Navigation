module.exports = {
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main.js')
      config.set('externals', {
        vue: 'Vue',
        axios: 'axios',
        // jquery:'jquery' // 顺应潮流，弃坑Jquery
      })
      config.plugin('html').tap(args => {
        args[0].isProd = true // 生产发包，设为true，三方依赖使用cdn
        return args
      })
    })

    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main.js')
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  }
}