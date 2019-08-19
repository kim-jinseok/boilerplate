<<<<<<< HEAD
const path = require("path");

module.exports = {
    outputDir: path.resolve(__dirname, "./wwwroot"),
=======
module.exports = {
    outputDir: 'wwwroot',
>>>>>>> 55ff1b54785141dc5248587f157210a718a9133a
    publicPath: '/',
    chainWebpack: config => {
        // aspnet uses the other hmr so remove this one
        config.plugins.delete('hmr')
    },
    configureWebpack: {
        devtool: 'source-map'
    }
}