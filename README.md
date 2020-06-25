# HTML Critical Webpack Plugin [![npm version](https://badge.fury.io/js/html-critical-webpack-plugin.svg)](https://badge.fury.io/js/html-critical-webpack-plugin) [![CircleCI](https://circleci.com/gh/anthonygore/html-critical-webpack-plugin/tree/master.svg?style=svg)](https://circleci.com/gh/anthonygore/html-critical-webpack-plugin/tree/master)

This plugin extracts critical CSS and runs after all files have been emitted so you can use it after Mini CSS Extract Plugin and HTML Webpack Plugin. 

Check out the [demo](https://github.com/anthonygore/hcwp-demo) or read the blog post [Critical CSS and Webpack: Automatically Minimize Render-Blocking CSS](https://vuejsdevelopers.com/2017/07/24/critical-css-webpack/) for more details on usage.

## Installation

```
npm i --save-dev html-critical-webpack-plugin
```

> **Note**: [As **critical** itself has a dependency on puppeteer](https://github.com/addyosmani/critical/releases/tag/v1.0.0) in order to run Headless Chrome, consumers of this plugin will need to make sure that their build environment (local, CI, etc) where they are running Webpack with this plugin has the necessary operating system packages installed.  See this page for more information on [troubleshooting](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md) puppeteer.

## Example

```js
...

const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");

module.exports = {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({ ... }),
    new MiniCssExtractPlugin({ ... }),
    new HtmlCriticalWebpackPlugin({
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
  ...
};
```

**Note:** Order is import here since [**critical**](https://www.npmjs.com/package/critical), the underlying package used by this plugin, only operates against the _file system_, and not against **webpack**'s build time compilation.  The order of operations by critical is as such:
1. Reads the file from disk as defined by the _src_ option
2. Extracts the CSS from that file that is deemed as "critical"
3. Writes the new file back to disk with that critical CSS inlined, at the location of the _dest_ option

## Development

### Local environment

Since the main dependency of this project, critical, depends on an environment that supports Headless Chrome, [Docker](https://www.docker.com/) has been provided to support local development of this project.

After you have [installed Docker](https://www.docker.com/community-edition), you can do the following to get setup:
1. Start the container - `docker-compose up -d`
1. SSH into the container - `docker exec -it html-critical-webpack-plugin_nodejs_1 /bin/bash`
1. Install dependencies - `rm -rf node_modules && npm install` (this ensures Linux specific dependencies get installed)

Now you can run the project's `npm` scripts like usual:
1. Run unit tests - `npm run test`
1. Run the build - `npm run ci`

**_Note_**: changes are bi-directional

Learn more about Docker [here](https://docs.docker.com/get-started/) or [configuring Headless Chrome for your own machine](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md).

### Workflows

1. To run unit tests - `npm run test`
1. To build the project - `npm run ci`
1. To build the project for release - `npm run build`
