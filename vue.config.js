const CompressionWebpackPlugin = require('compression-webpack-plugin');
const getIP = () => {
  const interfaces = require('os').networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (const i in iface) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
};

const isPro = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: '',
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  filenameHashing: true,
  pages: undefined,
  lintOnSave: false,
  runtimeCompiler: false,
  transpileDependencies: [],
  productionSourceMap: !isPro,
  crossorigin: undefined,
  integrity: false,
  configureWebpack: cfg => {
    if (process.env.NODE_ENV === 'production') {
      cfg.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }))
    }
    cfg.resolve.alias = {
      ...cfg.resolve.alias, // 添加现有的别名，
      assets: './src/assets',
      components: './src/components',
      plugins: './src/plugins',
      projects: './src/projects',
      service: './src/service',
      static: './src/static',
      views: './src/views',
    };
  },
  chainWebpack: () => {},
  css: {
    requireModuleExtension: true,
    extract: isPro,
    sourceMap: !isPro
  },
  devServer: {
    open: true,
    host: getIP(),
    port: 2020,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: null
  },
  parallel: require('os').cpus().length > 1,
  pwa: {
    name: 'aiplat.com',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      favicon32: 'img/icons/icon.png',
      favicon16: 'img/icons/icon.png',
      appleTouchIcon: 'img/icons/icon.png',
      msTileImage: 'img/icons/icon.png'
    }
  },
};
