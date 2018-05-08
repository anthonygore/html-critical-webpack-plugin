# HTML Critical Webpack Plugin  

A fork of Critical Webpack Plugin.

This is simplified and runs after all files have been emitted so you can use it after Extract Text and HTML Webpack Plugin.

### Install

```
npm i --save-dev html-critical-webpack-plugin
```

### Example

```js
const HtmlCriticalPlugin = require("html-critical-webpack-plugin");

module.export = {
  ...
  plugins: [
    new HtmlWebpackPlugin({ ... }),
    new ExtractTextPlugin({ ... }),
    new HtmlCriticalPlugin({
      base: path.resolve(__dirname, 'dist'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      width: 376,
      height: 565,
      penthouse: {
        blockJSRequests: false,
      }
    })
  ] 
};
```

### Detailed explanation

Read [Critical CSS and Webpack: Automatically Minimize Render-Blocking CSS](https://vuejsdevelopers.com/2017/07/24/critical-css-webpack/) blogpost.
