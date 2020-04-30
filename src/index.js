const path = require('path');
const critical = require('critical');

class HtmlCriticalWebpackPlugin {

  constructor(options) {
    this.options = options;
  }

  emit(compilation, callback) {
    const css = Object.keys(compilation.assets)
      .filter(function (filename) { return /\.css\??.*/.test(filename); })
      .map(function (filename) { return path.join(compilation.outputOptions.path, filename.split('?').shift())});

    critical.generate(Object.assign({ css }, this.options), (err) => {
      callback(err);
    });
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('HtmlCriticalWebpackPlugin', (compilation, callback) => {
      this.emit(compilation, callback);
    });
  }

}

module.exports = HtmlCriticalWebpackPlugin;