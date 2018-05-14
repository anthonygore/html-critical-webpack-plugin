# HTML Critical Webpack Plugin  

A fork of Critical Webpack Plugin.

This is simplified and runs after all files have been emitted so you can use it after Extract Text and HTML Webpack Plugin.

**Note**: [As **critical** itself has a dependency on puppeteer](https://github.com/addyosmani/critical/releases/tag/v1.0.0) in order to run Headless Chrome, consumers of this plugin will need to make sure that their build environment (local, CI, etc) where running webpack with this plugin has the necessary operating system packages installed.  See this page for more information on [troubleshooting](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md) puppeteer.

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
      width: 375,
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

### Development
Since the main dependency of this project, critical, depends on an environment that supports Headless Chrome, [Docker](https://www.docker.com/) has been provided to support local development of this project.

After you have [installed Docker](https://www.docker.com/community-edition), you can do the following to get setup:
1. Start the container - `docker-compose up -d`
1. SSH into the container - `docker exec -it html-critical-webpack-plugin_nodejs_1 /bin/bash`
1. Install dependencies - `rm -rf node_modules && npm install` (this ensures Linux specific dependencies get installed)

Now you can run the project's `npm` scripts like usuual:
1. Run unit tests - `npm run test`
1. Run the build - `npm run ci`

**_Note_**: changes are bi-directional

Learn more about Docker [here](https://docs.docker.com/get-started/) or [configuring Headless Chrome for your own machine](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md).
