// Learn more on how to config.
// - https://github.com/ant-tool/atool-build#配置扩展
const path = require('path');
const webpack = require('webpack');
const fs  = require('fs');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const lessToJs = require('less-vars-to-js');

const themer = lessToJs(fs.readFileSync(path.join(__dirname, './theme.less'), 'utf8'));

module.exports = function(webpackConfig) {
  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd',
    style: 'css',
  }]);
  webpackConfig.module.loaders.forEach(function(loader) {
    if (loader.test.toString() === '/\\.less$/') {
      loader.loader =
        loader.loader.replace('"modifyVars":{}', '"modifyVars":' + JSON.stringify(themer));
    }
  });

  return webpackConfig;
};
