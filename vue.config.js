module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: '\n          @import "@/scss/_variables.scss";\n        '
      },
      // postcss: {
      //   loader: 'postcss-loader',
      // }
    },
    // requireModuleExtension: true
  },

  pwa: {
    name: 'Ever Fit Up',
    themeColor: '#ffa931',
    msTileColor: '#232323'
  }
};