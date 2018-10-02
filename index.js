"use strict";

function HtmlWebpackBrotliPlugin(options) {
  options = options || {};
}

HtmlWebpackBrotliPlugin.prototype.apply = function(compiler) {
  compiler.hooks.compilation.tap("MyPlugin", compilation => {
    compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
      "HtmlWebpackBrotliPlugin",
      (data, cb) => {
        // Skip if the plugin configuration didn't set `addBrotliExtension` to true
        if (!data.plugin.options.addBrotliExtension) {
          return cb(null);
        }
        const tempArray = data.assets.js;
        data.assets.js = tempArray.map(scriptFile => `${scriptFile}.br`);
        return cb(null, data);
      }
    );
  });
};

module.exports = HtmlWebpackBrotliPlugin;
