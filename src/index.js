const path = require('path');
const critical = require('critical');

class HtmlCriticalWebpackPlugin {

  constructor(options) {
    this.options = options;
  }

  emit(compilation, callback) {
    const css = Object.keys(compilation.assets)
      .filter((filename) => filename.endsWith('.css'))
      .map((filename) => path.join(compilation.outputOptions.path, filename));

    critical
      .generate(Object.assign({ css }, this.options))
      .catch(callback);
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync(
      'HtmlCriticalWebpackPlugin',
      (compilation, callback) => {
        this.emit(compilation, callback);
      });
  }

}

module.exports = HtmlCriticalWebpackPlugin;