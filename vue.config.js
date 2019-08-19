const path = require("path");

module.exports = {
    outputDir: path.resolve(__dirname, "./wwwroot"),
    publicPath: '/',
    chainWebpack: config => {
        // aspnet uses the other hmr so remove this one
        config.plugins.delete('hmr')
    },
    configureWebpack: {
        devtool: 'source-map'
    }
}